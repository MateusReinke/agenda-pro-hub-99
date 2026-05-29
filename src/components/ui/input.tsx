import { cn } from '@/lib/utils';
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) { return <input {...props} className={cn('w-full rounded-xl border border-rose-100 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200', props.className)} />; }
