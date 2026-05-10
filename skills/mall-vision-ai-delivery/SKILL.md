---
name: mall-vision-ai-delivery
description: Single-AI incremental delivery workflow for the commercial mall visual AI digital twin project. Use when Codex works in this repository or on project planning, context recovery, iteration planning, automatic role selection, React/Vite frontend demo, FastAPI/PostgreSQL backend, AI video analytics, store scoring, digital twin, testing gates, deployment, open-source resource selection, license compliance, risk tracking, or handoff documentation.
---

# Mall Vision AI Delivery

## Operating Priorities

Optimize in this order:

1. Restore context from repository files before changing anything.
2. Deliver in small increments, not a long waterfall phase.
3. Keep every increment reviewable, runnable or checkable, and easy to continue.
4. Select exactly one primary role mode automatically from the requested deliverable.
5. Add or update tests/checks with every code or contract change.
6. Preserve confirmed requirements, architecture, API contracts, and data model unless the increment explicitly changes them.
7. Use free, open-source, license-clear resources only.
8. Update non-engineering, legal/IP, privacy, license, and cost risks as soon as they appear.

## Required First Step

Before implementation, read these files when they exist:

```text
AGENT.md
README.md
PROGRESS.md
AI_Schedule.md
IMPORTANT.md
docs/THIRD_PARTY_NOTICES.md
docs/LICENSE_AUDIT.md
context/PROJECT_STATE.md
context/REQUIREMENTS_CURRENT.md
context/ARCHITECTURE_CURRENT.md
context/DATA_MODEL_CURRENT.md
context/API_CONTRACT_CURRENT.md
context/FRONTEND_STATE.md
context/BACKEND_STATE.md
context/AI_ALGORITHM_STATE.md
context/TEST_STATE.md
context/DEPLOYMENT_STATE.md
context/DECISIONS_LOG.md
context/RISKS_AND_ASSUMPTIONS.md
context/TODO_NEXT.md
```

If `/context` is missing, use `AGENT.md`, `PROGRESS.md`, `AI_Schedule.md`, and `IMPORTANT.md` as the temporary source of truth, then create only the context files required by the current increment. Do not rely on chat history as the only project state.

If documents conflict, stop implementation and list the conflicts before changing requirements, architecture, contracts, data models, risk decisions, or phase status.

## Human Handoff Protocol

The human should only need to review results and type a short continuation command such as:

```text
请进行下一步
继续
下一步
```

When receiving a short continuation command, do not ask the human to paste a detailed prompt. Automatically recover the next task from repository files:

1. Read the required files.
2. Prefer `context/TODO_NEXT.md` when it exists.
3. Otherwise parse the next-task handoff, incomplete phase, and risk notes in `PROGRESS.md`.
4. If `PROGRESS.md` is incomplete, infer the earliest unfinished increment from the roadmap and current files.
5. Execute exactly one coherent next increment unless the continuation file explicitly recommends a bounded batch.

The AI owns the full increment lifecycle for each continuation:

```text
context recovery
scope confirmation
risk review
implementation or documentation
tests and checks
PROGRESS.md update
affected context/*.md update
IMPORTANT.md risk update when needed
third-party/license records when needed
next-step handoff text
```

The human role is limited to reviewing the result, raising corrections, and typing the next continuation command. Every completed increment must leave `PROGRESS.md` and, when present, `context/TODO_NEXT.md` sufficient for the next AI session to continue from only `请进行下一步`.

## Increment Model

Treat `P0` through `P12` as a roadmap. Execute the roadmap through small increments named like:

```text
P0-I1 project boundary and compliance baseline
P0-I2 metrics and acceptance criteria
P0-I3 test strategy and quality gates
P0-I4 context recovery package initialization
P1-I1 information architecture
P2-I3 overview dashboard page
```

Each increment must have:

```text
increment id
primary role mode
auxiliary review checklists
small deliverable
explicit non-goals
files to read
files likely to change
tests/checks to run
risk review result
next increment recommendation
```

Do not expand an increment into unrelated work. If the task is too large, split it and complete only the first coherent increment unless the user asked for a larger batch.

## Automatic Role Selection

Select exactly one primary role mode using this precedence. Use other modes only as checklists.

```text
Product Mode:
  requirements, scope, user stories, metrics, acceptance criteria, progress handoffs

Architect Mode:
  architecture, module boundaries, API contracts, data flow, data model decisions

Design Mode:
  UX, information architecture, design tokens, component behavior, chart specifications

Frontend Mode:
  React/Vite pages, components, charts, mock data, 3D views, frontend tests

Backend Mode:
  FastAPI, database migrations, services, statistics, auth, backend tests

AI Video Mode:
  video ingestion, detection, tracking, ROI/line counting, event publishing

Data Mode:
  metric definitions, event replay, aggregation logic, data quality

QA Mode:
  test strategy, coverage, regression, E2E, performance, security validation

Security/License Mode:
  privacy, RBAC, dependency audit, model/media license audit, IP/cost risk

DevOps Mode:
  Docker, CI/CD, deployment, monitoring, backup, recovery
```

Default roadmap-to-role mapping:

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

Override the default role when the user request clearly targets another role. Examples:

```text
license/privacy/cost question -> Security/License Mode
test gate or flaky tests -> QA Mode
API contract before backend implementation -> Architect Mode
README/PROGRESS/AGENT workflow update -> Product Mode
```

## Automatic Increment Selection

Choose the current increment this way:

1. If the user names an increment, use it.
2. Else if the user says `请进行下一步`, `继续`, `下一步`, or similar, enter Human Handoff Protocol.
3. Else if `context/TODO_NEXT.md` exists, use its next recommended increment.
4. Else if `PROGRESS.md` contains a next-task handoff, follow it.
5. Else infer the earliest incomplete increment from `PROGRESS.md`.
6. If no context files exist and P0 is incomplete, start with `P0-I1`.

Default P0 breakdown:

```text
P0-I1 project boundary, target users, non-goals, compliance red lines
P0-I2 core metrics, user stories, acceptance criteria
P0-I3 test strategy, quality gates, license audit template
P0-I4 context recovery package initialization and next-stage plan
```

Default P1 breakdown:

```text
P1-I1 information architecture and page scope
P1-I2 design tokens and layout rules
P1-I3 charts, components, and UI states
P1-I4 interaction, responsive, accessibility, and design review
```

Default P2 breakdown:

```text
P2-I1 frontend project initialization
P2-I2 mock data and shared types
P2-I3 operations overview dashboard
P2-I4 store analysis page
P2-I5 store alerts page
P2-I6 digital twin demo page
P2-I7 E2E, responsive checks, and demo polish
```

For P3-P12, split work into similarly small increments that leave a runnable or checkable checkpoint.

## Increment Work Protocol

For every task, execute this sequence:

1. Summarize current state from files, not memory.
2. Identify the current roadmap phase and increment.
3. Select one primary role mode automatically and name auxiliary review checklists.
4. Define the small deliverable, explicit non-goals, and likely file changes.
5. Review risks before implementation.
6. Update `IMPORTANT.md` immediately if non-engineering, legal/IP, privacy, license, or cost risks appear.
7. Implement the increment using existing patterns and conservative dependencies.
8. Add or update tests/checks at the right level.
9. Run relevant commands.
10. Update affected `/context` files when they exist or when the increment creates them.
11. Update human-readable `PROGRESS.md`, including a short continuation command and enough detail for AI to infer the next task automatically.
12. Update `docs/THIRD_PARTY_NOTICES.md` and `docs/LICENSE_AUDIT.md` for new dependencies, models, media, fonts, icons, datasets, copied code, or external services.
13. Finalize with changed files, test results, risk updates, and next increment.

Do not mark work complete if tests/checks were skipped without a concrete reason.

## Dynamic Risk Update Rules

Update `IMPORTANT.md` during the task, not only at the end, when any of these appear:

```text
non-engineering question: scope, course-deliverable boundary, demo-vs-production boundary
legal/IP risk: floor plans, maps, BIM files, logos, images, videos, fonts, models, datasets, copied code
privacy risk: surveillance, face images, personal trajectory, customer profiling, logs, retention
economic cost risk: paid tool, paid cloud, paid API, paid model service, deployment fee, paid asset
license risk: unknown license, Non-Commercial terms, GPL/LGPL/AGPL, unclear service terms
```

For each risk entry, record:

```text
date
risk category
where it appears
why it matters
current decision: allowed, blocked, needs approval, or monitor
required next action
```

Prefer free local/open-source alternatives. Ask the user before introducing anything with account binding, payment, quotas, unclear terms, or external data transfer.

## Project Shape

Treat the target product as a commercial mall visual AI digital twin operations system:

```text
frontend: React + TypeScript + Vite, ECharts, Three.js, Playwright, Vitest
backend: Python 3.11+, FastAPI, Pydantic, SQLAlchemy, Alembic, PostgreSQL, Redis, Pytest
ai-services: Python, video ingestion, detection, tracking, ROI/line counting, event publishing
infra: Docker Compose first, CI quality gates, monitoring and backup docs
```

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

Always test the risky path for the increment:

```text
frontend: routing, loading/error/empty states, chart rendering, store click, floor switch
backend: OpenAPI contract, schema validation, migrations, error codes, idempotency
data: cross-day boundaries, business hours, duplicate events, negative counts, score bounds
AI: video disconnect, schema output, ROI counts, line crossing, latency, repeatability
security: auth, RBAC, injection, XSS, CORS, log redaction, dependency vulnerabilities
deployment: env examples, container startup, health checks, restart recovery
docs: file existence, prompt consistency, risk rules, license records, skill validation
```

When a test cannot run in the current environment, document the exact command attempted, blocker, and remaining risk in `PROGRESS.md` and `context/TEST_STATE.md` when it exists.

## Design Guardrails

Keep the UI as an operational dashboard, not a marketing page:

```text
dense but readable operational interface
1920x1080 first, also verify 2560x1440 and 3840x2160 where relevant
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
paid development tools, paid SaaS, paid APIs, paid model services, paid assets
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
cost or account requirement
decision: allowed, blocked, or needs approval
```

## Deliverable Checklist

Before final response, verify:

```text
current increment and primary role are stated
README or relevant docs still match the implementation
/context files reflect the new state when present or created
PROGRESS.md reflects the human-readable current state
PROGRESS.md includes the short human continuation command and enough AI-readable next-task context
IMPORTANT.md reflects new non-engineering/legal/IP/privacy/license/cost risks
tests/checks were run or a test gap is explicitly recorded
commands and results are reported
new dependencies and assets have license records
next action is written in TODO_NEXT.md when context exists
```
