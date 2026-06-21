# QA Plan

## Required Checks

- Install: dependencies already present in `node_modules` and `package-lock.json`.
- Lint: `npm run lint`.
- Typecheck: covered by `next build` TypeScript phase.
- Tests: no test suite exists yet.
- Build: `npm run build`.
- Browser smoke: pending visual/manual check if requested.
- Responsive smoke: public components designed mobile/desktop; manual browser check pending.
- Accessibility smoke: semantic headings/links/buttons used; manual audit pending.

## Test Results

- `npm run lint` — PASS.
- `npm run build` — PASS.

## Warnings / Follow-up

- Prisma warns that `package.json#prisma` config is deprecated for Prisma 7; migrate later to `prisma.config.ts`.
- Next.js warns workspace root inferred from `/home/world-app-technologies/package-lock.json`; set `turbopack.root` in `next.config.ts` or remove extra parent lockfile if appropriate.
- Next.js warns `middleware` convention is deprecated in favor of `proxy`.
- Turbopack warns `lib/upload.ts` / `app/api/uploads/route.ts` traces a broad project file via `next.config.ts`; review upload path handling later.
- No automated unit/e2e tests are currently configured.

## Configurator QA — 2026-06-19

Implemented MVP fabricator configurator:

- Route: `/configurador`
- API: `POST /api/configurator/quote`
- Homepage CTA: `CustomConfiguratorSection`
- Mobile nav CTA: `Diseñar`
- Header nav CTA: `Configurador`
- WhatsApp quote message includes product type, model, size, fabric, color, legs/base, extras, delivery, budget, and notes.

Verification:

- `npm run lint` — PASS.
- `npm run build` — PASS.

Security hardening included:

- Removed public `GET /api/leads`; lead listing now remains under `/api/admin/leads`.
- Removed public `POST /api/products`; product creation now remains under `/api/admin/products`.
- Configurator API validates input with Zod and stores no customer data.

Known non-blocking warnings still present:

- Prisma `package.json#prisma` deprecation warning.
- Next.js workspace root warning due parent lockfile.
- Next.js middleware/proxy deprecation warning.
- Turbopack NFT trace warning around `lib/upload.ts` / `app/api/uploads/route.ts`.

## Configurator Redesign + Asset Pass — 2026-06-19

User feedback: first configurator version was too cluttered/ugly. Updated to a guided wizard:

- One step at a time: Producto, Modelo, Tela, Detalles, Entrega, Resumen.
- Progress bar and Back/Next controls.
- Cleaner card-based choices with selected states.
- Preview panel now uses generated/fallback image assets and color overlay.
- WhatsApp CTA remains available at final step with full quote summary.

Agent team updated:

- Added Interaction Configurator Architect.
- Added Visual Asset Generation Agent.
- Updated `.agent-team/team-manifest.md` routing rules.

Image asset pass:

- Created 21 image assets in `public/images/` for hero banners, category cards, products, placeholders, support pages, and configurator previews.
- Attempted Azure OpenAI image generation via the configured image endpoint. The endpoint returned `401 PermissionDenied` during the full batch, so fallback generated MVP branded assets were created locally to avoid leaving sections empty.
- No API key was committed to the repository.

Verification:

- `npm run lint` — PASS.
- `npm run build` — PASS.

## Live Image Wiring + Couch MVP Correction — 2026-06-19

User reported no images visible on live site and configurator did not match expected app flow. Root cause: image files existed in `public/images`, but the database still pointed seeded categories/products/slides to `.svg` paths. Fixed by updating active DB records to `.png` paths.

Live verification after DB update and server restart:

- `curl http://localhost:3002` now shows `/images/hero-1.png`, `/images/category-*.png`, and `/images/product-*.png` references.
- `curl -I http://localhost:3002/configurador` returns `200 OK`.

Configurator corrected to couch-only MVP:

- 3 couch models: loveseat, three-seat, sectional.
- 2 fabrics: chenille, linen.
- 3 colors: beige, gray, navy.
- Total pre-created variation images: 18 under `public/images/configurator/couches/`.
- The configurator now switches between pre-created images instead of pretending to generate in real time.

Validation:

- `npm run lint` — PASS.
- `npm run build` — PASS.
