import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Configurações" }] }),
  component: Settings,
});

function Settings() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-sm text-muted-foreground">Dados do salão e página pública.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados do salão</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue="Studio Bella" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug da página pública</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">/b/</span>
                <Input id="slug" defaultValue="demo" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input id="address" defaultValue="Rua das Flores, 123" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about">Sobre</Label>
              <Textarea id="about" rows={4} />
            </div>
            <Button type="submit">Salvar alterações</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
