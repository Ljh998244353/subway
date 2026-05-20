# AGENTS.md

Standard entry for AI coding tools. Long roadmap: `AI_Schedule.md`. Current task card: `context/TODO_NEXT.md`.

## Current Task

- Current increment: `P5-I2 dashboard API-mode state wiring`
- Primary role: Frontend Integration Mode
- Auxiliary reviews: Backend, QA, Security/License
- Current base: P4-I1 through P4-I16 and P5-I1 are complete, including CP4 closure review, MySQL readiness planning, and the overview data loader contract.
- Next focus: wire the dashboard page to the overview loader boundary while keeping mock mode as the default demo path.
- Do not connect real MySQL. Do not create `ai-services/`, `infra/`, real Docker Compose, real API integration, real video, real mall material, real brands, face images, or personal trajectories.

## Required Reading

1. `AGENTS.md`
2. `context/TODO_NEXT.md`
3. `PROGRESS.md`
4. `IMPORTANT.md`
5. Files named by the current increment in `docs/`, `context/`, `frontend/`, and `backend/`

## Hard Rules

1. Complete one small increment at a time.
2. Restore context before editing files.
3. Use MySQL for database planning, migrations, connection strings, and future containers. Do not plan PostgreSQL.
4. Add tests or executable checks with every API, data model, or business logic change.
5. Review license, cost, account, and data boundary before adding any dependency, image, model, dataset, asset, external service, or copied code.
6. Do not use unapproved real video, images, maps, floor plans, brand logos, store logos, monitoring footage, model weights, or datasets.
7. Python `backend/` and future `ai-services/` work must use a project virtual environment.
8. If `sudo`, system package installation, service management, or privilege escalation is needed, stop and ask the human to run it.
9. GitHub Actions runs only on GitHub. A Gitee mirror does not run `.github/workflows/ci.yml` automatically.
10. After every increment, update `PROGRESS.md`, affected `context/*.md`, and `context/TODO_NEXT.md`.

## Human Workflow

- Normal continuation: user enters `请进行下一步`; AI completes one increment from `context/TODO_NEXT.md`.
- Human confirmation gates: API contract freeze, MySQL core schema freeze, new dependencies/images/external services, switching from synthetic fixture to real MySQL query, real data/material access, real AI service, or production deployment.
- Review priority: `PROGRESS.md`, `context/TODO_NEXT.md`, quality gate output, risk/blocker notes.

## Quality Gate

```bash
npm run quality
npm run quality:audit
```

`npm run quality` covers docs, task card fields, compliance, boundary, frontend lint/test/build, and backend pytest. `npm run quality:audit` runs frontend high-severity npm audit.
