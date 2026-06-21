# AI Development Team Loop Protocol

## Loop Goal

Run the agent team until the project reaches the Production Definition of Done or a human decision/blocker is encountered.

## State Files

- `docs/PROJECT_BRIEF.md` — business/client goal.
- `docs/PRD.md` — product requirements and acceptance criteria.
- `docs/ARCHITECTURE.md` — technical plan.
- `docs/TASK_QUEUE.md` — source of truth for loop tasks.
- `docs/QA_PLAN.md` — verification plan/results.
- `docs/DECISIONS.md` — durable decisions.
- `docs/DEPLOYMENT.md` and `docs/RUNBOOK.md` — production operation.

## Iteration

1. PM reviews `TASK_QUEUE.md` and selects highest priority unblocked task.
2. Assign task to one role only.
3. Agent reads its role prompt and relevant skill.
4. Agent performs bounded work.
5. Agent runs verification commands listed on task.
6. Agent writes structured handoff.
7. QA/Security/Integrator validate if task touches user flows, APIs, auth, deploy, or shared architecture.
8. PM updates queue: done, new defects, blocked, or next task.
9. Continue until stop condition.

## Hard Stops / Guardrails

Stop and ask Luis/client if: required business/product decision is missing; secrets/account access are missing; deployment or external spending is required; destructive migration or data deletion is needed; same task fails verification twice; no measurable progress after two loop iterations; security reviewer finds unresolved high severity issue.

## Success Stop Condition

The loop can stop successfully only when `production-readiness-checklist.md` is complete and the Lead Integrator writes a release handoff.
