import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { RegisterForm } from '@/components/auth-form';
import { registerAction } from '@/server/actions';
export default function RegisterPage() { return <main className="grid min-h-screen place-items-center px-4 py-10"><Card className="w-full max-w-2xl"><h1 className="text-3xl font-black text-rose-700">Cadastro inicial do salão</h1><p className="mb-6 mt-2 text-slate-500">O primeiro usuário será criado como dono/admin.</p><RegisterForm action={registerAction}/><p className="mt-5 text-sm text-slate-600">Já tem conta? <Link className="font-bold text-rose-700" href="/login">Entrar</Link></p></Card></main>; }
