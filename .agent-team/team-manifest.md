# AI Development Team Manifest

## Purpose

This repo is worked by a structured AI development team, not a single free-form agent. The team follows the vault's agentic-engineering lessons: orchestrator/worker/validator roles, validation contracts, structured handoffs, skills, bounded loops, worktrees/cloud isolation, and verification stronger than agent claims.

## Team Topology

- **Orchestrator:** Project Manager + Solution Architect + Lead Integrator.
- **Workers:** Frontend Engineer, Backend Engineer, UX/Copy/Content Agent, Interaction Configurator Architect, Visual Asset Generation Agent, DevOps Agent.
- **Validators:** QA/Test Engineer and Security/Reliability Reviewer.

## Routing Rules

- Product ambiguity -> Project Manager.
- Architecture or stack ambiguity -> Solution Architect.
- UI/components/responsiveness -> Frontend Engineer.
- APIs/database/auth/integrations -> Backend Engineer.
- Copy/positioning/SEO/content -> UX/Copy/Content Agent.
- Guided configurators/custom fabrication flows/visual preview structure -> Interaction Configurator Architect.
- Generated website imagery/banner/product/configurator assets -> Visual Asset Generation Agent.
- Tests/browser checks/regressions -> QA/Test Engineer.
- Secrets/auth/security/abuse/reliability -> Security/Reliability Reviewer.
- Build/deploy/env/CI/runbook -> DevOps Agent.
- Merge conflicts/final release -> Lead Integrator.

## Parallelism Rules

- Parallelize read-only research/review/planning.
- Avoid parallel write-heavy changes in the same files.
- Use worktrees or cloud isolated environments for parallel implementation.
- Validate at milestone boundaries before starting the next batch.

## Handoff Contract

Every agent handoff must include: task ID, role, summary, files changed, commands run with exit codes, evidence, assumptions, risks, and next recommended check.
