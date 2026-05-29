import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/app/professionals")({
  head: () => ({ meta: [{ title: "Profissionais" }] }),
  component: Professionals,
});

const pros = [
  { name: "Ana Ribeiro", role: "Cabeleireira", specialties: ["Corte", "Coloração"] },
  { name: "Carlos Mendes", role: "Barbeiro", specialties: ["Barba", "Corte masculino"] },
  { name: "Paula Dias", role: "Manicure", specialties: ["Manicure", "Pedicure"] },
  { name: "Renata Alves", role: "Massagista", specialties: ["Relaxante", "Drenagem"] },
];

function Professionals() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Profissionais</h1>
          <p className="text-sm text-muted-foreground">Equipe do salão.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Novo profissional
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pros.map((p) => (
          <Card key={p.name}>
            <CardHeader className="flex flex-row items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{p.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{p.role}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {p.specialties.map((s) => (
                  <Badge key={s} variant="secondary">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
