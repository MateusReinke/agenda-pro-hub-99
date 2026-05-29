import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { requireUser } from '@/server/auth';
export default async function AppLayout({ children }: { children: React.ReactNode }) { await requireUser(); return <div className="min-h-screen lg:flex"><Sidebar/><main className="min-w-0 flex-1"><Header/><div className="p-4 md:p-8">{children}</div></main></div>; }
