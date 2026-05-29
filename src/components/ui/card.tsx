import { cn } from '@/lib/utils';
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn('rounded-3xl border border-rose-100 bg-white/90 p-6 shadow-sm', className)} {...props} />; }
