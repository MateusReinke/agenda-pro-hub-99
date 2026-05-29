import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search } from "lucide-react";

export const Route = createFileRoute("/app/clients")({
  head: () => ({ meta: [{ title: "Clientes" }] }),
  component: Clients,
});

const clients = [
  { name: "Maria Silva", phone: "(11) 99999-1111", email: "maria@email.com", visits: 12 },
  { name: "João Souza", phone: "(11) 99999-2222", email: "joao@email.com", visits: 5 },
  { name: "Beatriz Costa", phone: "(11) 99999-3333", email: "bia@email.com", visits: 8 },
  { name: "Lucas Lima", phone: "(11) 99999-4444", email: "lucas@email.com", visits: 2 },
];

function Clients() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-sm text-muted-foreground">Sua base de clientes.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Novo cliente
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar cliente..." className="pl-9" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead className="text-right">Visitas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((c) => (
                <TableRow key={c.email}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell className="text-right">{c.visits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
