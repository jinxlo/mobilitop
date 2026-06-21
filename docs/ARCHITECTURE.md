# Architecture

## Stack

- Next.js App Router 16
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma 6
- PostgreSQL
- NextAuth credentials for admin
- Docker Compose + Caddy for deployment

## Repo Structure

- `app/` public/admin/API routes.
- `components/public/` customer-facing UI.
- `components/admin/` admin UI.
- `components/shared/` reusable UI.
- `lib/` db, auth, validators, services, utilities.
- `prisma/` schema and seed.
- `docs/` AI team and deployment documentation.
- `.agent-team/` role prompts, skills, loop protocol.

## Routes / Pages

- `/`, `/productos`, `/productos/[slug]`, `/categorias/[slug]`, `/marcas/[slug]`, `/promociones`, `/nosotros`, `/garantia`, `/contacto`.
- `/admin/*` protected admin.
- `/api/products`, `/api/categories`, `/api/brands`, `/api/site-settings`, aliases and admin APIs.

## Data Model

Existing Prisma models: User, SiteSettings, Category, Brand, Product, ProductImage, Lead, HeroSlide, FAQ.

## APIs / Integrations

- WhatsApp deep links from public CTAs.
- JSON catalog APIs for external/AI consumption.
- PostgreSQL persistence.

## Environment Variables

See `.env.example`. Required for production: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `WHATSAPP_NUMBER`.

## Security Boundaries

- Admin routes protected by middleware/NextAuth.
- Secrets must remain in `.env`, not committed.
- Public APIs expose active catalog data only.
- Admin APIs require authorization.

## Deployment Target

Docker Compose with Postgres and Caddy, or compatible VPS Node runtime with Postgres.

## Validation Contract

- Commands that must pass: `npm run lint`, `npm run build`.
- Browser flows to verify: home, catalog, product detail, WhatsApp link, admin login page.
- Security checks: no secrets committed, admin protected, env vars documented.

## Configurator Architecture

The MVP fabricator configurator is a no-migration, WhatsApp-first interactive flow.

Routes:

- `/configurador` — public mobile-first configurator page.
- `POST /api/configurator/quote` — validates configurator choices and returns the generated WhatsApp message.

Key files:

- `components/public/ConfiguratorBuilder.tsx`
- `components/public/CustomConfiguratorSection.tsx`
- `lib/configurator/options.ts`
- `lib/validators/configurator.ts`
- `lib/whatsapp.ts`

Security boundary:

- The configurator stores no customer data.
- The public API validates inputs with Zod.
- Prices are not final; the UI says final price and fabrication time are confirmed by WhatsApp.
