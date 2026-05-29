import 'server-only';
import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

const COOKIE = 'beleza_session';
const maxAge = 60 * 60 * 24 * 7;
function secret() { return process.env.JWT_SECRET || 'dev-secret-change-me'; }
function sign(payload: string) { return createHmac('sha256', secret()).update(payload).digest('base64url'); }
export async function createSession(userId: string) {
  const payload = Buffer.from(JSON.stringify({ userId, exp: Math.floor(Date.now()/1000)+maxAge })).toString('base64url');
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge });
}
export async function destroySession() { (await cookies()).delete(COOKIE); }
export async function getSessionUser() {
  const token = (await cookies()).get(COOKIE)?.value; if (!token) return null;
  const [payload, sig] = token.split('.'); if (!payload || !sig) return null;
  const expected = sign(payload); if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  const data = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { userId: string; exp: number };
  if (data.exp < Date.now()/1000) return null;
  return prisma.user.findUnique({ where: { id: data.userId }, select: { id: true, name: true, email: true, role: true, salonId: true, createdAt: true, updatedAt: true, salon: true } });
}
export async function requireUser() { const user = await getSessionUser(); if (!user) redirect('/login'); return user; }
