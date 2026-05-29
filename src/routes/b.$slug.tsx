import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scissors } from "lucide-react";

export const Route = createFileRoute("/b/$slug")({
  head: () => ({ meta: [{ title: "Reservar horário" }] }),
  component: PublicBooking,
});

const services = ["Corte feminino", "Corte masculino", "Barba", "Manicure", "Massagem relaxante"];
const pros = ["Sem preferência", "Ana", "Carlos", "Paula", "Renata"];
const slots = ["09:00", "09:30", "10:00", "10:30", "14:00", "14:30", "15:00", "15:30"];

function PublicBooking() {
  const { slug } = Route.useParams();

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-6 py-4 font-semibold">
          <Scissors className="h-5 w-5 text-primary" />
          Studio Bella
          <span className="text-sm font-normal text-muted-foreground">/{slug}</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-6 py-8">
        <div>
          <h1 className="text-2xl font-bold">Agende seu horário</h1>
          <p className="text-sm text-muted-foreground">
            Escolha serviço, profissional e horário disponível.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1. Escolha o serviço</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2">
            {services.map((s) => (
              <Button key={s} variant="outline" className="justify-start">
                {s}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Profissional</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {pros.map((p) => (
              <Button key={p} variant="outline" size="sm">
                {p}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Horários disponíveis</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {slots.map((t) => (
              <Button key={t} variant="outline">
                {t}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Seus dados</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" />
              </div>
              <Button type="submit" className="w-full">
                Confirmar reserva
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
