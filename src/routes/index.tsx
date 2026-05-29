import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Scissors, Calendar, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Beleza Agenda Pro — Gestão de agendamentos para salões" },
      {
        name: "description",
        content:
          "MVP SaaS de agendamento para salões de beleza, barbearias, manicures, esteticistas e massagistas.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-semibold">
            <Scissors className="h-5 w-5 text-primary" />
            Beleza Agenda Pro
          </div>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Criar conta</Link>
            </Button>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Gestão de agendamentos para o seu salão
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Organize horários, profissionais, clientes e serviços em um só lugar.
          Página pública de reservas para seus clientes agendarem online.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button size="lg" asChild>
            <Link to="/register">Começar grátis</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/b/$slug" params={{ slug: "demo" }}>
              Ver página de reserva
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 sm:grid-cols-3">
        {[
          { icon: Calendar, title: "Agenda completa", text: "Visualize e gerencie todos os agendamentos." },
          { icon: Users, title: "Clientes & equipe", text: "Cadastre profissionais e clientes facilmente." },
          { icon: Sparkles, title: "Reserva online", text: "Link público para seus clientes agendarem." },
        ].map((f) => (
          <div key={f.title} className="rounded-lg border bg-card p-6">
            <f.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-3 font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
