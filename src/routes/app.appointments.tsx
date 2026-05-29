import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/app/appointments")({
  head: () => ({ meta: [{ title: "Agendamentos" }] }),
  component: Appointments,
});

const rows = [
  { date: "27/05/2026", time: "09:00", client: "Maria Silva", service: "Corte feminino", pro: "Ana", status: "Confirmado" },
  { date: "27/05/2026", time: "10:30", client: "João Souza", service: "Barba", pro: "Carlos", status: "Pendente" },
  { date: "27/05/2026", time: "14:00", client: "Beatriz Costa", service: "Manicure", pro: "Paula", status: "Confirmado" },
  { date: "28/05/2026", time: "11:00", client: "Lucas Lima", service: "Massagem", pro: "Renata", status: "Cancelado" },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  Confirmado: "default",
  Pendente: "secondary",
  Cancelado: "destructive",
};

function Appointments() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Agendamentos</h1>
          <p className="text-sm text-muted-foreground">Gerencie todos os horários do salão.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Novo agendamento
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Profissional</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r, i) => (
                <TableRow key={i}>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.time}</TableCell>
                  <TableCell className="font-medium">{r.client}</TableCell>
                  <TableCell>{r.service}</TableCell>
                  <TableCell>{r.pro}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
