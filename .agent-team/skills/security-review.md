# Skill: Security Review

Use before release or after changes to auth, APIs, payments, uploads, webhooks, secrets, or public endpoints.

## Procedure

1. Review changed files/routes and architecture.
2. Check secrets, auth/authorization, validation, injection, CORS, webhooks, uploads, dependency/script risk, rate limits, and logs.
3. Write findings with severity and concrete remediation.
4. Block release for unresolved high-severity findings.

## Verification

Security handoff lists findings, severity, affected files/routes, and release recommendation.
