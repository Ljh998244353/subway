# CLAUDE.md

Commercial mall visual AI digital twin operations system. Current task card: `context/TODO_NEXT.md`.

## Required Recovery

Read the authority set first:

```text
context/TODO_NEXT.md
PROGRESS.md
IMPORTANT.md
```

Then classify the task and open only the minimum working set. Read roadmap, broad context, license docs, API docs, or source trees only when the task, a conflict, or a failing check requires them.

## Workflow Skill

Project workflow is documented in `skills/mall-vision-ai-delivery/SKILL.md`. Use it for repository increments, handoff updates, quality gates, risk/license review, and cleanup rules.

## Hard Rules

1. One small increment at a time.
2. Restore context from repository files before editing.
3. MySQL only for database planning.
4. Add or run appropriate checks for code, contract, frontend state, rendering, or workflow changes.
5. Do not add dependencies, models, media, fonts, icons, datasets, copied code, or external services without license/cost/account/data review.
6. Do not use unapproved real video, images, maps, floor plans, BIM/CAD, brand logos, monitoring footage, face images, personal trajectories, or production data.
7. Stop for human action when `sudo`, system package installation, service management, or privilege escalation is needed.
8. After every increment, update `PROGRESS.md`, affected `context/*.md`, and `context/TODO_NEXT.md`.

## Project Shape

```text
frontend: React + TypeScript + Next.js App Router, Tailwind CSS, Framer Motion, Zustand, Three.js/R3F
backend: FastAPI, Pydantic, SQLAlchemy, Alembic, MySQL, Pytest
ai-services: Python/OpenCV synthetic fixture baseline
data mode: mock/synthetic by default
```

## Cleanup Policy

Keep recovery files compact:

```text
TODO_NEXT.md: one executable next task
PROGRESS.md: current snapshot, last 3 increments, milestone summary, latest verification, known blockers
context/*.md: current facts only
```
