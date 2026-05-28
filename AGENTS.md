# AGENTS.md

Standard entry for AI coding tools. Long roadmap: `AI_Schedule.md`. Current task card: `context/TODO_NEXT.md`.

## Current Task

- Current increment: `P7-R7 Enterprise Next Digital Twin frontend rebuild review`.
- Primary role: Frontend Mode
- Auxiliary reviews: Design, Architect, QA, Security/License
- Current base: the unsatisfactory previous frontend attempt was rolled back; frontend design and modeling implementation specifications are saved in `docs/P7_R7_ENTERPRISE_NEXT_DIGITAL_TWIN_FRONTEND_SPEC.md` and `docs/P7_R8_MULTI_FLOOR_RING_MALL_MODELING_SPEC.md`.
- Current focus: review and stabilize the clean React + Next.js App Router Digital Twin OS frontend before starting the new Blender multi-floor model.
- Do not start Blender/P7-R8 modeling, connect real MySQL, create deployment infrastructure, use real video, real mall material, BIM/CAD, real brands, face images, personal trajectories, external asset APIs, downloaded models/textures, or production data.

## Required Reading

1. `AGENTS.md`
2. `context/TODO_NEXT.md`
3. `PROGRESS.md`
4. `IMPORTANT.md`
5. Files named by the current increment in `docs/`, `context/`, `frontend/`, and `scripts/`

## Hard Rules

1. Complete one small increment at a time.
2. Restore context before editing files.
3. Use MySQL for database planning, migrations, connection strings, and future containers. Do not plan PostgreSQL.
4. Add tests or executable checks with every API, data model, business logic, frontend state, or rendering contract change.
5. Review license, cost, account, and data boundary before adding any dependency, image, model, texture, font, asset, external service, or copied code.
6. Do not use unapproved real video, images, maps, floor plans, brand logos, store logos, monitoring footage, model weights, datasets, downloaded models, or downloaded textures.
7. Python `backend/` and future `ai-services/` work must use a project virtual environment.
8. If `sudo`, system package installation, service management, or privilege escalation is needed, stop and ask the human to run it.
9. GitHub Actions runs only on GitHub. A Gitee mirror does not run `.github/workflows/ci.yml` automatically.
10. After every increment, update `PROGRESS.md`, affected `context/*.md`, and `context/TODO_NEXT.md`.

## Human Workflow

- Normal continuation: user enters `请进行下一步`; AI completes one increment from `context/TODO_NEXT.md`.
- Human confirmation gates: API contract freeze, MySQL core schema freeze, new dependencies/images/external services, starting P7-R8 Blender model generation, switching from synthetic fixture to real MySQL query, real data/material access, real AI service, or production deployment.
- Review priority: `/digital-twin` frontend in the browser, `PROGRESS.md`, `context/TODO_NEXT.md`, quality gate output, risk/blocker notes.

## Quality Gate

```bash
npm run quality
npm run quality:audit
```

`npm run quality` covers docs, task card fields, compliance, boundary, frontend lint/test/build, and backend pytest. `npm run quality:audit` runs frontend high-severity npm audit.
