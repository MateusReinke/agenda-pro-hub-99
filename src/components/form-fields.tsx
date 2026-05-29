import { Input } from '@/components/ui/input';
export function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="grid gap-1 text-sm font-medium text-slate-700"><span>{label}</span>{children}</label>; }
export function Hidden({ name, value }: { name: string; value: string }) { return <Input type="hidden" name={name} value={value} />; }
