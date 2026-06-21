# AI Development Team Project Rules

This repository is operated by the World App Technologies AI Development Team.

## Prime Directive

Build production-ready websites and web apps through small, verified tasks. Do not optimize for looking busy; optimize for shippable, tested, maintainable output.

## Required Workflow

1. Read these files before changing code:
   - `AGENTS.md`
   - `.agent-team/team-manifest.md`
   - `.agent-team/loop-protocol.md`
   - `docs/PROJECT_BRIEF.md`
   - `docs/PRD.md`
   - `docs/ARCHITECTURE.md`
   - `docs/TASK_QUEUE.md`
2. Work on one task ID at a time.
3. Keep changes inside the files/areas allowed by the task unless you update the task with a clear reason.
4. Run the task's verification commands.
5. Record evidence in `docs/TASK_QUEUE.md` or a handoff note.
6. If blocked, mark the task blocked with the exact missing input/error.

## Quality Rules

- No committed secrets, API keys, tokens, private cookies, or `.env` files.
- No fake production claims. If a command was not run, say it was not run.
- No placeholder/lorem ipsum in final production pages unless explicitly accepted.
- No broad rewrites unrelated to the current task.
- Prefer simple architecture and readable code over clever abstractions.
- Validate inputs on public/server endpoints.
- Add loading, empty, success, and error states for user-facing flows.
- Maintain responsive behavior for mobile, tablet, and desktop.
- Prefer accessible semantic HTML and labeled form controls.

## Human Escalation Required

Ask Luis/client before:

- spending money;
- deploying to production;
- deleting data;
- changing pricing/product positioning/legal copy;
- using client-visible credentials/accounts;
- making irreversible migrations;
- changing stack/deployment target from the approved architecture.

## Definition of Done

A task is done only when:

- acceptance criteria are met;
- relevant checks pass;
- evidence is recorded;
- no new high-severity QA/security issue is introduced;
- docs are updated if behavior/setup changed.
