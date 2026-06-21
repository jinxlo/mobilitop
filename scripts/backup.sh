#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR=${BACKUP_DIR:-./backups}
UPLOAD_DIR=${UPLOAD_DIR:-./uploads}
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

mkdir -p "$BACKUP_DIR"

if command -v pg_dump >/dev/null 2>&1; then
  pg_dump "$DATABASE_URL" > "$BACKUP_DIR/postgres-$TIMESTAMP.sql"
else
  echo "pg_dump no está disponible; ejecuta el backup desde un contenedor con cliente PostgreSQL."
fi

if [ -d "$UPLOAD_DIR" ]; then
  tar -czf "$BACKUP_DIR/uploads-$TIMESTAMP.tar.gz" "$UPLOAD_DIR"
fi

ls -1t "$BACKUP_DIR" | tail -n +15 | xargs -r -I {} rm -f "$BACKUP_DIR/{}"
