import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, DollarSign, TrendingUp } from "lucide-react";
import { useTenant } from "@/lib/tenant";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard" }] }),
  component: Dashboard,
});

const stats = [
  { label: "Agendamentos hoje", value: "12", icon: Calendar },
  { label: "Clientes ativos", value: "248", icon: Users },
  { label: "Receita do mês", value: "R$ 8.420", icon: DollarSign },
  { label: "Taxa de ocupação", value: "76%", icon: TrendingUp },
];

const upcoming = [
  { time: "09:00", client: "Maria Silva", service: "Corte feminino", pro: "Ana" },
  { time: "10:30", client: "João Souza", service: "Barba", pro: "Carlos" },
  { time: "14:00", client: "Beatriz Costa", service: "Manicure", pro: "Paula" },
];

function Dashboard() {
  const { currentTenant } = useTenant();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Olá, {currentTenant.name}</h1>
        <p className="text-sm text-muted-foreground">Visão geral do seu salão.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {s.label}
              </CardTitle>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximos agendamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {upcoming.map((u, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-semibold">{u.time}</span>
                  <div>
                    <p className="font-medium">{u.client}</p>
                    <p className="text-sm text-muted-foreground">{u.service}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">com {u.pro}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
