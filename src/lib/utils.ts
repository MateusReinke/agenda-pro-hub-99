import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function money(value: unknown) { return Number(value ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
export function dateOnly(date = new Date()) { return date.toISOString().slice(0, 10); }
export function addMinutes(time: string, minutes: number) {
  const [h, m] = time.split(':').map(Number); const d = new Date(2000, 0, 1, h, m + minutes);
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}
export function slugify(value: string) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') || 'salao'; }
export function cleanPhone(value: string) { return value.replace(/[^0-9+]/g, ''); }
