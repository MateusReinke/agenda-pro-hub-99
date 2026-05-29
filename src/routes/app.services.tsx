import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/app/services")({
  head: () => ({ meta: [{ title: "Serviços" }] }),
  component: Services,
});

const services = [
  { name: "Corte feminino", duration: "60 min", price: "R$ 80,00" },
  { name: "Corte masculino", duration: "30 min", price: "R$ 45,00" },
  { name: "Barba", duration: "30 min", price: "R$ 35,00" },
  { name: "Manicure", duration: "45 min", price: "R$ 40,00" },
  { name: "Massagem relaxante", duration: "60 min", price: "R$ 120,00" },
];

function Services() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Serviços</h1>
          <p className="text-sm text-muted-foreground">Catálogo oferecido pelo salão.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Novo serviço
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serviço</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead className="text-right">Preço</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((s) => (
                <TableRow key={s.name}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.duration}</TableCell>
                  <TableCell className="text-right">{s.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
