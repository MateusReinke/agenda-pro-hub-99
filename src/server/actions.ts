'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { addMinutes, cleanPhone, slugify } from '@/lib/utils';
import { createSession, destroySession, requireUser } from './auth';
import type { AppointmentStatus } from '@prisma/client';

const s = (fd: FormData, k: string) => String(fd.get(k) ?? '').trim();
const n = (fd: FormData, k: string) => Number(String(fd.get(k) ?? '0').replace(',', '.'));

export async function registerAction(_prev: unknown, fd: FormData) {
  const salonName = s(fd,'salonName'), name = s(fd,'name'), email = s(fd,'email').toLowerCase(), password = s(fd,'password');
  if (!salonName || !name || !email || password.length < 6) return { error: 'Preencha todos os campos. A senha deve ter ao menos 6 caracteres.' };
  const exists = await prisma.user.findUnique({ where: { email } }); if (exists) return { error: 'E-mail já cadastrado.' };
  const baseSlug = slugify(salonName); let slug = baseSlug; let i = 2;
  while (await prisma.salon.findUnique({ where: { slug } })) slug = `${baseSlug}-${i++}`;
  const hash = await bcrypt.hash(password, 12);
  const salon = await prisma.salon.create({ data: { name: salonName, slug, email, whatsapp: cleanPhone(s(fd,'whatsapp')), city: s(fd,'city'), state: s(fd,'state'), users: { create: { name, email, passwordHash: hash, role: 'OWNER' } } }, include: { users: true } });
  await createSession(salon.users[0].id); redirect('/dashboard');
}
export async function loginAction(_prev: unknown, fd: FormData) {
  const email = s(fd,'email').toLowerCase(), password = s(fd,'password');
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return { error: 'E-mail ou senha inválidos.' };
  await createSession(user.id); redirect('/dashboard');
}
export async function logoutAction() { await destroySession(); redirect('/login'); }
export async function updateSalon(fd: FormData) { const user = await requireUser(); await prisma.salon.update({ where: { id: user.salonId }, data: { name: s(fd,'name'), phone: s(fd,'phone'), whatsapp: cleanPhone(s(fd,'whatsapp')), email: s(fd,'email'), address: s(fd,'address'), city: s(fd,'city'), state: s(fd,'state'), openingTime: s(fd,'openingTime') || '08:00', closingTime: s(fd,'closingTime') || '18:00' } }); revalidatePath('/settings'); }
export async function upsertClient(fd: FormData) { const u = await requireUser(); const id=s(fd,'id'); const data={ name:s(fd,'name'), phone:cleanPhone(s(fd,'phone')), email:s(fd,'email')||null, notes:s(fd,'notes')||null, salonId:u.salonId}; if(id) await prisma.client.update({where:{id, salonId:u.salonId}, data}); else await prisma.client.create({data}); revalidatePath('/clients'); }
export async function deleteClient(fd: FormData) { const u=await requireUser(); await prisma.client.delete({where:{id:s(fd,'id'), salonId:u.salonId}}); revalidatePath('/clients'); }
export async function upsertProfessional(fd: FormData) { const u=await requireUser(); const id=s(fd,'id'); const data={name:s(fd,'name'), specialty:s(fd,'specialty')||null, phone:cleanPhone(s(fd,'phone')), email:s(fd,'email')||null, active: fd.get('active') !== 'false', salonId:u.salonId}; if(id) await prisma.professional.update({where:{id, salonId:u.salonId}, data}); else await prisma.professional.create({data}); revalidatePath('/professionals'); }
export async function toggleProfessional(fd: FormData) { const u=await requireUser(); await prisma.professional.update({where:{id:s(fd,'id'), salonId:u.salonId}, data:{active: s(fd,'active')==='true'}}); revalidatePath('/professionals'); }
export async function upsertService(fd: FormData) { const u=await requireUser(); const id=s(fd,'id'); const data={name:s(fd,'name'), description:s(fd,'description')||null, durationMinutes:n(fd,'durationMinutes'), price:n(fd,'price'), active: fd.get('active') !== 'false', salonId:u.salonId}; if(id) await prisma.service.update({where:{id, salonId:u.salonId}, data}); else await prisma.service.create({data}); revalidatePath('/services'); }
export async function toggleService(fd: FormData) { const u=await requireUser(); await prisma.service.update({where:{id:s(fd,'id'), salonId:u.salonId}, data:{active: s(fd,'active')==='true'}}); revalidatePath('/services'); }
export async function createAppointment(fd: FormData) { const u=await requireUser(); const service=await prisma.service.findFirstOrThrow({where:{id:s(fd,'serviceId'), salonId:u.salonId}}); const start=s(fd,'startTime'); await prisma.appointment.create({data:{salonId:u.salonId, clientId:s(fd,'clientId'), professionalId:s(fd,'professionalId'), serviceId:service.id, date:new Date(s(fd,'date')), startTime:start, endTime:addMinutes(start, service.durationMinutes), status:'SCHEDULED', price:service.price, notes:s(fd,'notes')||null}}); revalidatePath('/appointments'); }
export async function updateAppointmentStatus(fd: FormData) { const u=await requireUser(); await prisma.appointment.update({where:{id:s(fd,'id'), salonId:u.salonId}, data:{status:s(fd,'status') as AppointmentStatus}}); revalidatePath('/appointments'); }
export async function cancelAppointment(fd: FormData) { fd.set('status','CANCELED'); await updateAppointmentStatus(fd); }
export async function createPublicAppointment(_prev: unknown, fd: FormData) { const salon=await prisma.salon.findUnique({where:{slug:s(fd,'slug')}}); if(!salon) return {error:'Salão não encontrado.'}; const service=await prisma.service.findFirst({where:{id:s(fd,'serviceId'), salonId:salon.id, active:true}}); const pro=await prisma.professional.findFirst({where:{id:s(fd,'professionalId'), salonId:salon.id, active:true}}); if(!service||!pro) return {error:'Serviço ou profissional inválido.'}; const phone=cleanPhone(s(fd,'phone')); const client=await prisma.client.upsert({where:{salonId_phone:{salonId:salon.id, phone}}, update:{name:s(fd,'name')}, create:{salonId:salon.id,name:s(fd,'name'),phone}}); const start=s(fd,'startTime'); await prisma.appointment.create({data:{salonId:salon.id,clientId:client.id,professionalId:pro.id,serviceId:service.id,date:new Date(s(fd,'date')),startTime:start,endTime:addMinutes(start,service.durationMinutes),status:'SCHEDULED',price:service.price,notes:'Solicitado pelo agendamento público'}}); const msg=encodeURIComponent(`Olá, acabei de solicitar um agendamento para ${service.name} no dia ${s(fd,'date')} às ${start}.`); return {success:'Agendamento solicitado com sucesso!', whatsapp:`https://wa.me/${cleanPhone(salon.whatsapp||'') || '5500000000000'}?text=${msg}`}; }
