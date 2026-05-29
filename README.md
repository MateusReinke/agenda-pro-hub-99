# Beleza Agenda Pro

MVP SaaS completo para gestão de agendamentos de salões de beleza, cabeleireiros, manicures, barbeiros, esteticistas, massagistas e serviços de relaxamento.

## Tecnologias

- Next.js com App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Docker e Docker Compose
- Autenticação por e-mail/senha com senha criptografada por bcrypt
- Sessão assinada em cookie HTTP-only

## Como rodar com Docker

```bash
cp .env.example .env
docker compose up --build
```

Acesse: <http://localhost:3000>

Login demo:

- E-mail: `admin@demo.com`
- Senha: `123456`

O container da aplicação executa automaticamente:

1. espera o PostgreSQL ficar disponível;
2. `npx prisma migrate deploy`;
3. `npx prisma db seed`;
4. `npm start`.

## Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste:

```env
DATABASE_URL="postgresql://beauty_user:beauty_password@db:5432/beauty_app?schema=public"
POSTGRES_USER="beauty_user"
POSTGRES_PASSWORD="beauty_password"
POSTGRES_DB="beauty_app"
APP_URL="http://localhost:3000"
JWT_SECRET="troque-essa-chave-em-producao"
SEED_ADMIN_EMAIL="admin@demo.com"
SEED_ADMIN_PASSWORD="123456"
SEED_SALON_NAME="Salão Bella Demo"
```

Nunca versione um `.env` real.

## Rotas

- `/login` — autenticação
- `/register` — cadastro inicial do salão, criando o primeiro usuário OWNER
- `/dashboard` — indicadores, próximos agendamentos e status
- `/appointments` — agenda, criação, filtros, atualização de status e cancelamento
- `/clients` — cadastro, edição, exclusão e histórico simples
- `/professionals` — cadastro, edição e ativação/desativação
- `/services` — cadastro, edição e ativação/desativação
- `/settings` — dados do salão e link público
- `/public/salao-bella-demo` — página pública de agendamento

## Banco, migrations e seed

Para ambientes com dependências instaladas:

```bash
npx prisma migrate deploy
npx prisma db seed
```

O seed é idempotente e cria planos, salão demo, admin demo, serviços, profissionais, clientes e agendamentos sem duplicar os registros principais ao reiniciar o container.

## Deploy

1. Configure as variáveis de ambiente do provedor.
2. Use o `Dockerfile` para build da aplicação.
3. Garanta um PostgreSQL acessível via `DATABASE_URL`.
4. No start do container, `scripts/entrypoint.sh` aplica migrations e seed automaticamente.

## Subir para o GitHub

```bash
git init
git add .
git commit -m "Initial Beleza Agenda Pro MVP"
git branch -M main
git remote add origin git@github.com:SEU_USUARIO/beleza-agenda-pro.git
git push -u origin main
```

## Melhorias futuras

- Convites e permissões granulares para usuários profissionais.
- Calendário visual com drag-and-drop.
- Integração real com WhatsApp, Pix e gateways de pagamento.
- Confirmações automáticas e lembretes.
- Relatórios financeiros e recorrência de clientes.
- Testes E2E com Playwright e pipeline de CI.
