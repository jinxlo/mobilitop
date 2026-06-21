#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR=${BACKUP_DIR:-./backups/uploads}
UPLOAD_DIR=${UPLOAD_DIR:-./public/uploads}
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_DIR/uploads-$TIMESTAMP.tar.gz" "$UPLOAD_DIR"
ls -1t "$BACKUP_DIR" | tail -n +8 | xargs -r -I {} rm -f "$BACKUP_DIR/{}"
