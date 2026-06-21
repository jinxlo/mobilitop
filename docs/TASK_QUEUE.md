# Task Queue

## Status Legend

queued | in_progress | review | blocked | done

## Tasks

- [x] ID: T001
  Role: Project Manager
  Priority: P0
  Status: done
  Goal: Create project brief and PRD.
  Acceptance criteria: PRD has goals, non-goals, pages/features, acceptance criteria, and open questions.
  Files/areas allowed: docs/PROJECT_BRIEF.md, docs/PRD.md, docs/TASK_QUEUE.md
  Verification commands: none
  Evidence required: PRD and brief completed.
  Notes: Completed by Hermes.

- [x] ID: T002
  Role: Solution Architect
  Priority: P0
  Status: done
  Goal: Create initial architecture and validation contract.
  Acceptance criteria: Architecture covers stack, routes, data, env vars, deployment, security boundaries, and checks.
  Files/areas allowed: docs/ARCHITECTURE.md, docs/TASK_QUEUE.md
  Verification commands: none
  Evidence required: Architecture doc complete enough for implementation.
  Notes: Completed by Hermes.

- [x] ID: T003
  Role: Frontend Engineer
  Priority: P0
  Status: done
  Goal: Upgrade public website polish and production quality without breaking existing catalog/admin architecture.
  Acceptance criteria: Home and shared public components feel production-ready, responsive, conversion-focused, and support empty states.
  Files/areas allowed: app/page.tsx, app/layout.tsx, app/globals.css, components/public/*, components/shared/*, lib/seo.ts, app/manifest.ts
  Verification commands: npm run lint; npm run build
  Evidence required: changed files, build/lint result.
  Notes: Completed by Hermes. Changed public homepage/shared components, SEO metadata, empty states, and conversion sections. `npm run lint` PASS; `npm run build` PASS.

- [ ] ID: T004
  Role: Backend Engineer
  Priority: P1
  Status: queued
  Goal: Check public APIs and lead/admin protection for production readiness.
  Acceptance criteria: no obvious public mutation/security issue; validators and auth remain in place.
  Files/areas allowed: app/api/*, lib/auth.ts, middleware.ts, lib/validators/*
  Verification commands: npm run lint; npm run build
  Evidence required: security notes and changed files if any.
  Notes:

- [x] ID: T005
  Role: QA / Test Engineer
  Priority: P0
  Status: done
  Goal: Run final lint/build and document results.
  Acceptance criteria: lint/build pass or failures documented with remediation.
  Files/areas allowed: docs/QA_PLAN.md, docs/TASK_QUEUE.md
  Verification commands: npm run lint; npm run build
  Evidence required: command output summary.
  Notes: Completed by Hermes. `npm run lint` PASS; `npm run build` PASS with non-blocking framework/deprecation warnings documented in `docs/QA_PLAN.md`.

- [x] ID: T006
  Role: Lead Integrator / Release Manager
  Priority: P0
  Status: done
  Goal: Produce release handoff and production readiness notes.
  Acceptance criteria: docs/RUNBOOK.md and docs/DEPLOYMENT.md include current commands and blockers.
  Files/areas allowed: docs/DEPLOYMENT.md, docs/RUNBOOK.md, docs/QA_PLAN.md
  Verification commands: none
  Evidence required: handoff summary.
  Notes: Completed by Hermes. Deployment and runbook docs updated.
