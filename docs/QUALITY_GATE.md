# Quality Gate

Updated: 2026-05-20

## General Gate

Every increment must leave:

```text
clear delivery boundary
runnable code or checkable documentation
tests or documented checks executed
PROGRESS.md updated
context/ updated
risks synchronized
license/cost records updated when needed
context/TODO_NEXT.md updated with the next task
```

## Stage Gates

| Stage | Gate |
| --- | --- |
| CP0 | PRD, requirements, design, acceptance, test strategy, license audit, and context complete |
| CP1 | IA, design tokens, components, charts, interaction, responsive/accessibility review complete |
| CP2 | Frontend demo core pages, interactions, and responsive checks pass |
| CP3 | Engineering skeleton, CI, lint/test commands, and deployment plan complete |
| CP4 | Backend API, data model, migration baseline, contract tests, and coverage review complete |
| CP5 | Frontend API mode integration passes while mock mode remains demo-ready |
| CP6 | AI event output schema is stable and synthetic video validation passes |

## Current CP4 Status

P4-I16 closes CP4 as a synthetic contract baseline. `docs/CP4_CLOSURE_REVIEW.md` records backend/API/client coverage and explicit gaps. `docs/MYSQL_READINESS_PLAN.md` records the readiness gates required before real MySQL query work.

## Blockers

```text
tests cannot run and no reason is recorded
core path lacks tests or check plan
new dependency is not audited
unknown-source assets are used
API contract and implementation diverge
context recovery package is incomplete
TODO_NEXT.md has no next step
privacy or infringement risk is found but not recorded
```
