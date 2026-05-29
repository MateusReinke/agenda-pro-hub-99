import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { LoginForm } from '@/components/auth-form';
import { loginAction } from '@/server/actions';
export default function LoginPage() { return <main className="grid min-h-screen place-items-center px-4"><Card className="w-full max-w-md"><h1 className="text-3xl font-black text-rose-700">Entrar</h1><p className="mb-6 mt-2 text-slate-500">Acesse o painel do seu salão.</p><LoginForm action={loginAction}/><p className="mt-5 text-sm text-slate-600">Ainda não tem conta? <Link className="font-bold text-rose-700" href="/register">Cadastre seu salão</Link></p></Card></main>; }
