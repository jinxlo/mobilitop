# Mobili Top Website

Base madre reutilizable para catálogos/ecommerce de colchones, mueblería y descanso. Está construida desde cero con Next.js App Router, TypeScript, Prisma, PostgreSQL y Tailwind CSS.

## Funcionalidades incluidas

- Catálogo público con productos, categorías, marcas, promociones y ficha individual.
- Botones de WhatsApp con mensajes prellenados por contexto.
- Panel admin protegido para dashboard, productos, marcas, categorías, solicitudes y configuración.
- Admin ampliado para slides, FAQs y usuarios básicos.
- Filtros por búsqueda, categoría, marca, medida, firmeza, tipo, precio, disponibilidad y promoción.
- API JSON preparada para Nulu AI: `/api/products`, `/api/products/[id]`, `/api/categories`, `/api/brands`, `/api/site-settings`.
- Alias compatibles: `/api/settings`, `/api/slides`, `/api/faqs`, `/api/products/slug/[slug]` y rutas `/api/admin/*`.
- Campo `searchable_content` para indexación futura.
- Prisma schema con usuarios, productos, imágenes, leads, slides, FAQs y configuración del sitio.
- Docker Compose con app, PostgreSQL y Caddy.
- Script básico de backups para base de datos e imágenes.

## Instalación local

1. Copia variables: `cp .env.example .env`.
2. Instala dependencias: `npm install`.
3. Levanta PostgreSQL: `docker compose up -d postgres`.
4. Ejecuta migraciones: `npm run prisma:migrate`.
5. Carga datos iniciales: `npm run prisma:seed`.
6. Inicia desarrollo: `npm run dev`.

## Admin inicial

El seed usa estas variables:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Ruta: `/admin/login`.

## Deploy con Docker

1. Configura `.env` con valores reales.
2. Ajusta `infra/Caddyfile` con el dominio final.
3. Ejecuta `docker compose up -d --build`.
4. Corre migraciones dentro del contenedor app si aplica: `docker compose exec app npm run prisma:deploy`.
5. Ejecuta seed inicial: `docker compose exec app npm run prisma:seed`.

## Personalización por cliente

La tabla `site_settings` permite cambiar nombre, colores, WhatsApp, teléfono, dirección, horario, hero y métodos de pago. El catálogo se adapta con categorías, marcas, productos, promociones e imágenes.

Para fabricante se recomienda enfatizar fabricación, materiales, calidad y venta directa. Para tienda/revendedor se recomienda enfatizar variedad, asesoría, disponibilidad y presupuesto.

## Backups y restore

Ejecuta `npm run backup` con `DATABASE_URL`, `BACKUP_DIR` y `UPLOAD_DIR` configurados. El script conserva respaldos recientes y elimina los más antiguos.

También puedes usar:

- `npm run backup:db`
- `npm run backup:uploads`
- `npm run restore:db -- backups/db/postgres-YYYYMMDD-HHMMSS.sql`

## Próximos pasos recomendados

1. Conectar subida drag & drop de imágenes al formulario de productos.
2. Añadir edición inline/modales para categorías, marcas, slides y FAQs.
3. Añadir tests unitarios/integración y e2e de flujos críticos.
4. Configurar dominio, HTTPS real y cron diario de backups en el VPS.
