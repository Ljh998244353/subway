---
name: mall-vision-ai-delivery
description: Single-AI incremental delivery workflow for the commercial mall visual AI digital twin project. Use when Codex works in this repository or on project planning, context recovery, iteration planning, React/Next.js frontend, FastAPI/MySQL backend, AI video analytics, store scoring, digital twin, testing gates, deployment, license/compliance, risk tracking, or handoff documentation.
---

# Mall Vision AI Delivery

## Operating Priorities

1. Restore context from the compact authority set before changing files.
2. Deliver exactly one coherent increment unless the task card explicitly scopes a bounded batch.
3. Keep work reviewable, runnable or checkable, and easy to continue.
4. Preserve confirmed requirements, architecture, API contracts, data model, and compliance boundaries unless the increment explicitly changes them.
5. Use free, open-source, license-clear resources only.
6. Use MySQL for database planning.
7. Stop and ask the human for `sudo`, system package installation, service management, or privilege escalation.

## Tiered Context Recovery

### Stage 1: Authority Set

Read these first:

```text
AGENTS.md or CLAUDE.md
context/TODO_NEXT.md
PROGRESS.md
IMPORTANT.md
```

Use them to identify the current increment, role, non-goals, confirmation gates, risk boundaries, and required checks.

### Stage 2: Minimum Working Set

Open only the smallest file set needed:

```text
frontend change: target Next app/component/lib/test files
backend change: target route/schema/service/test files
docs/workflow change: affected workflow/context/docs/check scripts only
license/asset/dependency change: IMPORTANT.md plus license/audit records and exact package/asset metadata
deployment change: deployment docs/configs, quality gate, and health checks
```

Read broader roadmap, context, API/data docs, or source trees only when the task card names them and they are needed, when files conflict, or when a failing check points there.

## Human Handoff Protocol

For short continuation commands such as `请进行下一步`, `继续`, or `下一步`:

1. Read the authority set.
2. Prefer `context/TODO_NEXT.md`.
3. Build the minimum working set.
4. Execute one increment.
5. Update `PROGRESS.md`, affected `context/*.md`, and `context/TODO_NEXT.md`.

Do not treat generic continuation as approval for confirmation-gated actions such as P7-R8 Blender model generation, real MySQL, real data/material, new dependencies/assets/services, API/schema freezes, or deployment.

## Increment Requirements

Each task card should contain:

```text
Increment
Primary role
Auxiliary reviews
Goal
Deliverables
Non-goals
Minimum Working Set
Acceptance Checks
Human Confirmation Gates
Next Handoff
```

Primary role choices:

```text
Product, Architect, Design, Frontend, Backend, AI Video, Data, QA, Security/License, DevOps
```

## Cleanup And Retention Rules

Keep recovery compact after every increment:

```text
context/TODO_NEXT.md: one next task only
PROGRESS.md: Current Snapshot + Recent Increments (max 3) + Milestone Summary + Verification Snapshot + Next Handoff
context/*.md: current facts only, not long chronological logs
```

When old details are no longer needed:

```text
summarize them into PROGRESS.md Milestone Summary
delete verbose repeated logs from active context
keep legal/license/privacy records in IMPORTANT.md and docs/* audit files
```

Do not create archive folders unless a later task explicitly asks for archival records.

## Risk And License Rules

Update `IMPORTANT.md`, `docs/THIRD_PARTY_NOTICES.md`, and `docs/LICENSE_AUDIT.md` when adding or changing:

```text
dependencies, models, textures, images, videos, fonts, icons, copied code, datasets, external services, paid/account-bound services
```

Standing blocked items:

```text
real monitoring footage
face images or personal trajectories
real mall floor plans, maps, BIM/CAD
real brand/store logos or shop signs
downloaded models/textures/HDRIs or unclear-license assets
real MySQL/production data without a separate gate
```

## Project Shape

```text
frontend: React + TypeScript + Next.js App Router, Tailwind CSS, Framer Motion, Zustand, Three.js/R3F
backend: FastAPI, Pydantic, SQLAlchemy, Alembic, MySQL, Pytest
ai-services: Python/OpenCV synthetic fixture baseline
default data mode: mock/synthetic
```

## Testing Rules

Run the relevant gate for the risky path:

```text
workflow/docs: npm run quality:docs, npm run quality:compliance, npm run quality:boundary
frontend: npm --prefix frontend run lint, npm --prefix frontend run test, npm --prefix frontend run build, npm run quality:frontend
dependencies/assets: npm run quality:audit plus license records
backend: backend/.venv/bin/python -m pytest backend/tests
```

If a check cannot run, record the attempted command, exact blocker, and remaining risk in `PROGRESS.md` and `context/TEST_STATE.md`.
