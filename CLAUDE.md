# CLAUDE.md

Commercial mall visual AI digital twin operations system. Incremental single-AI delivery; long roadmap in `AI_Schedule.md`, current task card in `context/TODO_NEXT.md`.

## Skill

The project delivery workflow skill is at `skills/mall-vision-ai-delivery/SKILL.md`. Invoke it with the Skill tool when working on project increments:

```
/mall-vision-ai-delivery
```

The skill defines: tiered context recovery, automatic role selection, increment work protocol, risk update rules, testing rules, design guardrails, license rules, and deliverable checklists. Read it before executing any increment.

## Current Task

- **Increment**: P7-R7 Enterprise Next Digital Twin frontend rebuild review
- **Primary role**: Frontend Mode
- **Auxiliary reviews**: Design, Architect, QA, Security/License
- **Current base**: the rejected previous frontend attempt was rolled back, then the new frontend and modeling specifications were saved before rebuilding a clean Next.js frontend
- **Focus**: stabilize and serve the React + Next.js App Router Digital Twin OS frontend for human review
- **Do not**: start Blender/P7-R8 model generation before frontend review, connect real MySQL, create deployment infrastructure, use real video/real mall material/BIM-CAD/real brands/face images/personal trajectories/external asset APIs/downloaded models/textures/production data

## Required Reading Order

1. `context/TODO_NEXT.md` - current task card
2. `PROGRESS.md` - current progress and verification state
3. `IMPORTANT.md` - risk, license, and compliance rules
4. Then read only the files named by the task card or directly affected by the requested change

Do not front-load README, AI_Schedule, all context files, license docs, API docs, or source files as mandatory reads.

## Hard Rules

1. One small increment at a time. Do not expand into unrelated work.
2. Restore context from repository files before editing anything.
3. MySQL only. No PostgreSQL planning.
4. Add tests or executable checks with every API, data model, or business logic change.
5. Review license, cost, account, and data boundary before adding any dependency, image, model, dataset, asset, external service, or copied code.
6. Do not use unapproved real video, images, maps, floor plans, brand logos, store logos, monitoring footage, model weights, or datasets.
7. Python `backend/` and `ai-services/` must use a project virtual environment.
8. If `sudo`, system package installation, service management, or privilege escalation is needed, stop and ask the human to run it.
9. GitHub Actions runs only on GitHub. Gitee mirror does not run `.github/workflows/ci.yml` automatically.
10. After every increment, update `PROGRESS.md`, affected `context/*.md`, and `context/TODO_NEXT.md`.
11. Update `docs/THIRD_PARTY_NOTICES.md` and `docs/LICENSE_AUDIT.md` for new dependencies, models, media, fonts, icons, datasets, copied code, or external services.

## Human Workflow

- **Normal continuation**: user enters `请进行下一步`; AI completes one increment from `context/TODO_NEXT.md`.
- **Human confirmation gates**: API contract freeze, MySQL core schema freeze, new dependencies/images/external services, switching from synthetic fixture to real MySQL query, real data/material access, real AI service, or production deployment.
- **Context recovery**: CLAUDE.md is auto-loaded. Then read `context/TODO_NEXT.md`, `PROGRESS.md`, `IMPORTANT.md` to complete the authority set. Classify the task, open the minimum working set, escalate only on explicit triggers or failures.

## Quality Gate

```bash
npm run quality
npm run quality:audit
```

`npm run quality` covers docs, task card fields, compliance, boundary, frontend lint/test/build, and backend pytest. `npm run quality:audit` runs frontend high-severity npm audit.

## Project Shape

```
frontend: React + TypeScript + Next.js App Router, Tailwind CSS, Framer Motion, Zustand, Three.js/R3F
backend: Python 3.11+, FastAPI, Pydantic, SQLAlchemy, Alembic, MySQL, Pytest
ai-services: Python, OpenCV HOG detector, synthetic fixtures
```

## Document Map

| File | Purpose |
| --- | --- |
| `AI_Schedule.md` | P0-P12 roadmap, increment splits, role modes, tech stack, test gates |
| `PROGRESS.md` | Current progress, verification results, risks, handoff prompt |
| `IMPORTANT.md` | Paid tools, copyright, license, privacy, potential infringement, risk log |
| `context/TODO_NEXT.md` | Current task card and "请进行下一步" handoff |
| `docs/API_CONTRACT.md` | P4 backend `/api/v1` contract baseline |
| `docs/DATA_MODEL.md` | MySQL data model baseline |
| `docs/THIRD_PARTY_NOTICES.md` | Third-party license records |
| `docs/LICENSE_AUDIT.md` | License, cost, account, and usage boundary audit |
| `scripts/quality-gate.mjs` | Local quality gate script |
