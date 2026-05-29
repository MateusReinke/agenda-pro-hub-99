import Link from 'next/link';
import { CalendarDays, LayoutDashboard, Users, Scissors, Settings, UserRound } from 'lucide-react';
const items = [
  ['Dashboard','/dashboard',LayoutDashboard], ['Agenda','/appointments',CalendarDays], ['Clientes','/clients',Users], ['Profissionais','/professionals',UserRound], ['Serviços','/services',Scissors], ['Configurações','/settings',Settings],
] as const;
export function Sidebar() { return <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-rose-100 bg-white/85 p-5 backdrop-blur lg:block"><Link href="/dashboard" className="mb-8 block"><div className="text-2xl font-black text-rose-700">Beleza Agenda</div><div className="text-sm text-slate-500">Pro</div></Link><nav className="space-y-2">{items.map(([label,href,Icon])=><Link className="flex items-center gap-3 rounded-2xl px-4 py-3 font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-700" href={href} key={href}><Icon size={18}/>{label}</Link>)}</nav></aside>; }
