import { cn } from '@/lib/utils';
export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) { return <span className={cn('inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-100', className)} {...props} />; }
