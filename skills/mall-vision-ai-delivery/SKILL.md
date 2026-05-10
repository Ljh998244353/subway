---
name: mall-vision-ai-delivery
description: Single-AI staged delivery workflow for the commercial mall visual AI digital twin project. Use when Codex works in this repository or on tasks for the project schedule, context recovery pack, role-mode planning, React/Vite frontend demo, FastAPI/PostgreSQL backend, AI video analytics, store scoring, digital twin, testing gates, deployment, open-source resource selection, license compliance, or handoff documentation.
---

# Mall Vision AI Delivery

## Operating Priorities

Optimize for this order:

1. Restore context before changing anything.
2. Keep the project deliverable and runnable at every checkpoint.
3. Add or update strict tests with every code change.
4. Preserve confirmed architecture, API contracts, and data model unless the task explicitly requires a change.
5. Use free, open-source, license-clear resources only.
6. Record unresolved risks instead of hiding them.

## Required First Step

Before implementation, read the project root `README.md`, `AI_Schedule.md`, `PROGRESS.md`, and the `/context` recovery files when they exist:

```text
PROJECT_STATE.md
REQUIREMENTS_CURRENT.md
ARCHITECTURE_CURRENT.md
DATA_MODEL_CURRENT.md
API_CONTRACT_CURRENT.md
FRONTEND_STATE.md
BACKEND_STATE.md
AI_ALGORITHM_STATE.md
TEST_STATE.md
DEPLOYMENT_STATE.md
DECISIONS_LOG.md
RISKS_AND_ASSUMPTIONS.md
TODO_NEXT.md
```

If `/context` is missing, create the minimum files needed for the current phase instead of relying on chat history. Start from `TODO_NEXT.md` when it exists. If documents conflict, stop and report the conflict list before editing contracts or models.

## Project Shape

Treat the target product as a commercial mall visual AI digital twin operations system:

```text
frontend: React + TypeScript + Vite, ECharts, Three.js, Playwright, Vitest
backend: Python 3.11+, FastAPI, Pydantic, SQLAlchemy, Alembic, PostgreSQL, Redis, Pytest
ai-services: Python, video ingestion, detection, tracking, ROI/line counting, event publishing
infra: Docker Compose first, CI quality gates, monitoring and backup docs
```

Prefer the phase order in `AI_Schedule.md`: P0 context baseline, P1 design spec, P2 frontend Demo, P3 engineering, P4 backend, P5 integration, P6 AI video MVP, P7 scoring, P8 heatmap/path, P9 3D, P10 hardening, P11 deployment, P12 acceptance.

## Single-AI Role Modes

Assume one AI is doing the whole project in phases. Do not plan around multiple parallel agents unless the user explicitly requests that.

For every task, choose exactly one primary role mode and use the other roles only as review checklists:

```text
Product Mode: requirements, user stories, metrics, acceptance criteria
Architect Mode: architecture, module boundaries, API contracts, data flow
Design Mode: UX, design tokens, component behavior, chart specifications
Frontend Mode: React/Vite pages, charts, mock data, 3D views, E2E flows
Backend Mode: FastAPI, database migrations, business services, statistics
AI Video Mode: video ingestion, detection, tracking, ROI/line counting
Data Mode: metric definitions, event replay, aggregation, data quality
QA Mode: unit, integration, contract, E2E, performance, security validation
Security/License Mode: privacy, RBAC, dependency audit, model/media license audit
DevOps Mode: Docker, CI/CD, deployment, monitoring, backup, recovery
```

Use this phase-to-role mapping by default:

```text
P0 Product Mode
P1 Design Mode
P2 Frontend Mode
P3 DevOps Mode
P4 Backend Mode
P5 Frontend Mode
P6 AI Video Mode
P7 Backend Mode
P8 Data Mode
P9 Frontend Mode
P10 QA Mode
P11 DevOps Mode
P12 Product Mode
```

## Work Protocol

For each task:

1. Summarize current state from files, not memory.
2. Identify the current phase and checkpoint.
3. Select one primary role mode and name any auxiliary review checklists.
4. State the narrow deliverable and files likely to change.
5. Implement using existing patterns and conservative dependencies.
6. Add or update tests at the right level.
7. Run the relevant checks.
8. Update affected `/context` files and the human-readable `PROGRESS.md`.
9. Update `docs/THIRD_PARTY_NOTICES.md` and `docs/LICENSE_AUDIT.md` for new dependencies, models, media, fonts, icons, datasets, and copied code.
10. Finalize with changed files, test results, risks, and next step.

Do not mark work complete if tests were skipped without a concrete reason.

## Testing Rules

Use strict gates:

```text
backend overall coverage >= 80%
core business coverage >= 90%
store scoring and alert rules coverage = 100%
API automation coverage >= 90%
frontend component coverage >= 70%
E2E core user paths pass 100%
AI validation tests include deterministic videos or synthetic fixtures
```

Always test the risky path for the task:

```text
frontend: routing, loading/error/empty states, chart rendering, store click, floor switch
backend: OpenAPI contract, schema validation, migrations, error codes, idempotency
data: cross-day boundaries, business hours, duplicate events, negative counts, score bounds
AI: video disconnect, schema output, ROI counts, line crossing, latency, repeatability
security: auth, RBAC, injection, XSS, CORS, log redaction, dependency vulnerabilities
deployment: env examples, container startup, health checks, restart recovery
```

When a test cannot run in the current environment, document the exact command attempted, the blocker, and the remaining risk in `TEST_STATE.md`.

## Design Guardrails

Keep the UI as an operational dashboard, not a marketing page:

```text
dark, restrained, dense but readable
1920x1080 first, also verify 2560x1440 and 3840x2160
cards only for metrics, list items, details, and tool panels
all charts need clear metric definitions
all pages need loading, empty, error, and permission states
colors cannot be the only carrier of warning or status
```

Keep API and data contracts stable:

```text
use /api/v1
use Pydantic/OpenAPI as contract
use ISO 8601 times and UTC internally
events are source of truth, statistics must be reproducible
all events need stable IDs for idempotency
```

Keep AI outputs auditable:

```text
record model name, version, license, thresholds, input, output, FPS, accuracy, limitations
configure ROI, line crossing, direction, and debounce rules
never store face originals or personally identifying data
show anonymous aggregate analytics, not individual traces
```

## Open-Source And License Rules

Use resources that are free and license-clear. Prefer:

```text
MIT
Apache-2.0
BSD-2-Clause
BSD-3-Clause
ISC
PostgreSQL License
CC0
CC-BY with attribution
self-generated synthetic data, videos, floor plans, and mock assets
```

Treat these as blocked until reviewed:

```text
GPL, LGPL, AGPL, or other copyleft dependencies in distributed product code
Non-Commercial media licenses
unknown model weights
scraped images or videos
real mall maps, floor plans, brand logos, tenant logos, or surveillance footage without permission
fonts without clear commercial-use terms
```

For every third-party item, record:

```text
name
source
version or commit
license
use in project
commercial-use status
attribution requirement
copyleft or redistribution obligation
decision: allowed, blocked, or needs approval
```

If a popular model or library has unclear or restrictive terms, choose a permissive alternative or ask for approval before using it.

## Deliverable Checklist

Before final response, verify:

```text
README or relevant docs still match the implementation
/context files reflect the new state
PROGRESS.md reflects the human-readable current state
tests were added or a test gap is explicitly recorded
commands and results are reported
new dependencies and assets have license records
next action is written in TODO_NEXT.md
```
