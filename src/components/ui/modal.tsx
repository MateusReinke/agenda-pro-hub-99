import { Card } from './card';
export function Modal({ title, children }: { title: string; children: React.ReactNode }) { return <Card><h2 className="mb-4 text-xl font-bold">{title}</h2>{children}</Card>; }
