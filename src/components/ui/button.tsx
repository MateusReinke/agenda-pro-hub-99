import { cn } from '@/lib/utils';
export function Button({ className, variant='primary', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary'|'danger' }) {
  return <button className={cn('inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition disabled:opacity-50', variant==='primary' && 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm', variant==='secondary' && 'bg-white text-rose-700 border border-rose-100 hover:bg-rose-50', variant==='danger' && 'bg-red-600 text-white hover:bg-red-700', className)} {...props} />;
}
