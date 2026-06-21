#!/usr/bin/env bash
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Uso: scripts/restore-db.sh backups/db/postgres-YYYYMMDD-HHMMSS.sql"
  exit 1
fi

psql "$DATABASE_URL" < "$1"
