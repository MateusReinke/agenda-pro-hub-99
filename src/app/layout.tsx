import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Beleza Agenda Pro', description: 'MVP SaaS para gestão de agendamentos de beleza e bem-estar' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="pt-BR"><body>{children}</body></html>; }
