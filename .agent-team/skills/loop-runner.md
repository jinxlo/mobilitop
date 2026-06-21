# Skill: Loop Runner

Use to run one bounded AI development team loop iteration.

## Procedure

1. Inspect `docs/TASK_QUEUE.md`.
2. Pick the highest-priority unblocked task.
3. Assign exactly one role.
4. Load that role prompt and relevant skill.
5. Execute the task with minimal sufficient changes.
6. Run verification commands.
7. Record handoff/evidence.
8. If validation fails, add a defect task instead of pretending done.
9. Stop on hard stop conditions in `.agent-team/loop-protocol.md`.

## Verification

One loop iteration must produce either a done task with evidence, a new defect/blocker with details, or a human escalation question.
