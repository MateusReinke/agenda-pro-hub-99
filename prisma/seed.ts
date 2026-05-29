import { PrismaClient, AppointmentStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
const today = new Date(); today.setHours(0,0,0,0);
const daysFromNow = (d: number) => new Date(today.getFullYear(), today.getMonth(), today.getDate()+d);
async function main() {
  const plans = [
    { name: 'Solo', description: 'Para profissionais autônomos', price: 49, maxProfessionals: 1, maxAppointmentsPerMonth: 120 },
    { name: 'Salão Pequeno', description: 'Para equipes em crescimento', price: 99, maxProfessionals: 5, maxAppointmentsPerMonth: 600 },
    { name: 'Salão Pro', description: 'Agenda completa para operações maiores', price: 199, maxProfessionals: 20, maxAppointmentsPerMonth: 3000 },
  ];
  for (const plan of plans) await prisma.subscriptionPlan.upsert({ where: { name: plan.name }, update: plan, create: plan });
  const salon = await prisma.salon.upsert({ where: { slug: 'salao-bella-demo' }, update: { name: process.env.SEED_SALON_NAME || 'Salão Bella Demo' }, create: { name: process.env.SEED_SALON_NAME || 'Salão Bella Demo', slug: 'salao-bella-demo', phone: '(11) 4002-8922', whatsapp: '5511999999999', email: 'contato@bellademo.com', address: 'Rua das Flores, 123', city: 'São Paulo', state: 'SP', openingTime: '08:00', closingTime: '19:00' } });
  const proPlan = await prisma.subscriptionPlan.findUniqueOrThrow({ where: { name: 'Salão Pro' } });
  await prisma.subscription.upsert({ where: { salonId: salon.id }, update: { planId: proPlan.id, status: 'TRIAL' }, create: { salonId: salon.id, planId: proPlan.id, status: 'TRIAL', expiresAt: daysFromNow(14) } });
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@demo.com';
  const passwordHash = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || '123456', 12);
  await prisma.user.upsert({ where: { email }, update: { name: 'Admin Demo', salonId: salon.id }, create: { name: 'Admin Demo', email, passwordHash, role: 'OWNER', salonId: salon.id } });
  const services = [
    ['Corte Feminino','Corte, lavagem e finalização',60,120], ['Escova','Escova modelada',45,80], ['Manicure','Cutilagem e esmaltação',40,45], ['Pedicure','Cuidado completo dos pés',45,55], ['Massagem Relaxante','Massagem para relaxamento',60,150], ['Design de Sobrancelha','Design personalizado',30,50],
  ] as const;
  for (const [name, description, durationMinutes, price] of services) await prisma.service.upsert({ where: { salonId_name: { salonId: salon.id, name } }, update: { description, durationMinutes, price, active: true }, create: { salonId: salon.id, name, description, durationMinutes, price, active: true } });
  const professionals = [ ['Ana Souza','Cabeleireira','11988887777','ana@demo.com'], ['Carla Lima','Manicure','11977776666','carla@demo.com'], ['Marcos Silva','Massagista','11966665555','marcos@demo.com'] ] as const;
  for (const [name, specialty, phone, emailP] of professionals) {
    const existing = await prisma.professional.findFirst({ where: { salonId: salon.id, name } });
    if (existing) await prisma.professional.update({ where: { id: existing.id }, data: { specialty, phone, email: emailP, active: true } });
    else await prisma.professional.create({ data: { salonId: salon.id, name, specialty, phone, email: emailP, active: true } });
  }
  const clients = [ ['Juliana Martins','11911110000','juliana@demo.com'], ['Fernanda Alves','11922220000','fernanda@demo.com'], ['Roberto Lima','11933330000','roberto@demo.com'] ] as const;
  for (const [name, phone, emailC] of clients) await prisma.client.upsert({ where: { salonId_phone: { salonId: salon.id, phone } }, update: { name, email: emailC }, create: { salonId: salon.id, name, phone, email: emailC, notes: 'Cliente demo' } });
  const existingDemo = await prisma.appointment.count({ where: { salonId: salon.id, notes: { startsWith: 'Seed demo' } } });
  if (existingDemo === 0) {
    const allClients = await prisma.client.findMany({ where: { salonId: salon.id } });
    const allPros = await prisma.professional.findMany({ where: { salonId: salon.id } });
    const allServices = await prisma.service.findMany({ where: { salonId: salon.id } });
    const demo = [ [0,'09:00','CONFIRMED'], [0,'14:00','SCHEDULED'], [1,'10:30','IN_PROGRESS'], [2,'16:00','COMPLETED'], [3,'11:00','NO_SHOW'] ] as const;
    for (let i=0; i<demo.length; i++) { const [day,start,status]=demo[i]; const service=allServices[i % allServices.length]; await prisma.appointment.create({ data: { salonId: salon.id, clientId: allClients[i % allClients.length].id, professionalId: allPros[i % allPros.length].id, serviceId: service.id, date: daysFromNow(day), startTime: start, endTime: start === '09:00' ? '10:00' : '11:30', status: status as AppointmentStatus, price: service.price, notes: `Seed demo ${i+1}` } }); }
  }
  console.log('Seed idempotente concluído.');
}
main().finally(async () => prisma.$disconnect());
