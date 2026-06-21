#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR=${BACKUP_DIR:-./backups/db}
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

mkdir -p "$BACKUP_DIR"
pg_dump "$DATABASE_URL" > "$BACKUP_DIR/postgres-$TIMESTAMP.sql"
ls -1t "$BACKUP_DIR" | tail -n +8 | xargs -r -I {} rm -f "$BACKUP_DIR/{}"
