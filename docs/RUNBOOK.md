# Runbook

## Common Failures

### Build fails at Prisma generate

Check `DATABASE_URL` format and Prisma schema validity. Run:

```bash
npm run prisma:generate
```

### Admin login fails

Confirm `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and that seed/migrations ran.

### Catalog empty

Run seed or create products/categories in admin. Confirm products/categories are active.

### WhatsApp links wrong

Update `WHATSAPP_NUMBER` and/or site settings in admin.

### Uploads fail

Check upload directory permissions and `lib/upload.ts` path configuration.

## Debug Commands

```bash
npm run lint
npm run build
npm run prisma:generate
npm run prisma:deploy
npm run prisma:seed
```

## Logs

- Docker: `docker compose logs -f app`
- Caddy: `docker compose logs -f caddy`
- Postgres: `docker compose logs -f postgres`

## Contacts / Accounts

- Admin route: `/admin/login`
- Public catalog: `/productos`
- API catalog: `/api/products`

## Configurator Troubleshooting

### `/configurador` does not load

Run:

```bash
npm run build
```

Check `components/public/ConfiguratorBuilder.tsx`, `lib/configurator/options.ts`, and `lib/validators/configurator.ts`.

### WhatsApp message is wrong

Review `buildConfiguratorWhatsAppMessage` in `lib/whatsapp.ts`.

### Final price confusion

The MVP intentionally does not calculate final prices. Sales confirms price and fabrication time by WhatsApp.
