# Skill: Deployment Readiness

Use before production deployment.

## Procedure

1. Identify deployment target and required account access.
2. Document install/build/start/deploy commands.
3. Document env vars and secrets without exposing values.
4. Add health check/smoke test and rollback/debug instructions.
5. Run production build if possible.

## Verification

`docs/DEPLOYMENT.md` and `docs/RUNBOOK.md` are complete enough for another operator to deploy/debug.
