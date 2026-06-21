# Production Readiness Checklist

## Product

- [ ] PRD acceptance criteria satisfied.
- [ ] No unresolved P0/P1 tasks.
- [ ] Human/client-required decisions resolved or documented.

## Frontend

- [ ] Responsive mobile/tablet/desktop smoke check complete.
- [ ] Navigation and all critical user flows work.
- [ ] Forms have validation, loading, success, and error states.
- [ ] No unwanted placeholder content.
- [ ] Basic accessibility: labels, semantic HTML, keyboard focus, contrast.

## Backend

- [ ] Inputs validated.
- [ ] Auth/authorization checked where applicable.
- [ ] API/integration failure paths handled.
- [ ] Important errors logged without leaking secrets.
- [ ] Environment variables documented.

## Quality

- [ ] Install succeeds.
- [ ] Lint passes or issues documented.
- [ ] Typecheck passes or issues documented.
- [ ] Test suite passes or gaps documented.
- [ ] Production build passes.
- [ ] Browser/e2e smoke checks done for critical flows.

## Security / Reliability

- [ ] No secrets committed.
- [ ] No obvious injection/auth bypass issue.
- [ ] Public endpoints have reasonable protection.
- [ ] Dependencies/scripts reviewed for obvious risk.
- [ ] Rollback/debug path documented.

## Deployment / Handoff

- [ ] Deployment target documented.
- [ ] Build/start commands documented.
- [ ] Required env vars documented.
- [ ] Runbook created.
- [ ] Release notes written.
- [ ] Known limitations listed.
