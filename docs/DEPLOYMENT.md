# Deployment

## Target

Docker Compose on VPS with app, PostgreSQL, and Caddy, or equivalent Node.js host with PostgreSQL.

## Environment Variables

Required:

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `WHATSAPP_NUMBER`

Recommended:

- `NEXT_PUBLIC_SITE_URL`
- `BACKUP_DIR`
- `UPLOAD_DIR`

Do not commit real secret values.

## Build Command

```bash
npm run build
```

## Start Command

```bash
npm run start
```

## Deploy Steps

1. Configure `.env` with production values.
2. Set final domain in `infra/Caddyfile` and `NEXTAUTH_URL` / `NEXT_PUBLIC_SITE_URL`.
3. Start services:

```bash
docker compose up -d --build
```

4. Apply migrations:

```bash
docker compose exec app npm run prisma:deploy
```

5. Seed initial admin/catalog if needed:

```bash
docker compose exec app npm run prisma:seed
```

6. Verify public home, product catalog, product detail, WhatsApp links, and admin login.

## Rollback

- Keep database backups via `npm run backup` / scripts before major deploys.
- Revert container image or source revision and restart Compose.
- Restore DB with `scripts/restore-db.sh` if a migration/seed corrupts data.
