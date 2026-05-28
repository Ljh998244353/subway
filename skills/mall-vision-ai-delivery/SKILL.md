---
name: mall-vision-ai-delivery
description: Single-AI incremental delivery workflow for the commercial mall visual AI digital twin project. Use when Claude Code works in this repository or on project planning, context recovery, iteration planning, automatic role selection, React/Vite frontend demo, FastAPI/MySQL backend, AI video analytics, store scoring, digital twin, testing gates, deployment, open-source resource selection, license compliance, risk tracking, or handoff documentation.
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
9. Use MySQL for the database unless a later explicit user instruction changes it.
10. Recreate Python virtual environments when backend or AI service development starts.
11. Stop and ask the human to run any sudo or system-level command; do not execute sudo directly.

## Tiered Context Recovery

Use staged recovery so the AI can restore the right context without front-loading the whole repository.

### Stage 1: authority set

Claude Code auto-loads `CLAUDE.md`. Then read these to complete the authority set:

```text
context/TODO_NEXT.md
PROGRESS.md
IMPORTANT.md
```

Use them to identify the current increment, role, non-goals, risk boundaries, and whether the task is code, docs/workflow, risk/license, deployment, or planning.

### Stage 2: minimum working set

After classification, open only the smallest file set needed to act safely:

- code/API/data change: implementation files and their nearest tests first; open API/data docs only if the contract changes or tests/docs mention them;
- frontend change: target component/page/model files and nearest tests first; open design docs only if UI requirements are unclear or changed;
- docs/workflow change: affected workflow/docs files only; do not read backend/frontend source unless the doc claim needs verification;
- risk/license/dependency/asset change: `IMPORTANT.md`, license notices/audit docs, and the exact dependency/asset metadata needed;
- deployment change: deployment docs/configs and health/quality gate files only.

### Stage 3: escalation triggers

Read broader files such as `AGENT.md`, `README.md`, `AI_Schedule.md`, extra `context/*.md`, license docs, API docs, deployment docs, or additional source files only when:

- Stage 1 files are missing, stale, ambiguous, or conflict;
- the current task card explicitly names the file and the file is needed for this task;
- the requested change affects that file's facts, requirements, roadmap, architecture, API/data model, risks, license, deployment, or user-facing documentation;
- tests, build, or quality gates fail and point to that file/category;
- a symbol, contract, or behavior cannot be understood from the minimum working set.

### Stage 4: update scope

At completion, update only the docs/context whose facts changed. `PROGRESS.md` and `context/TODO_NEXT.md` are always updated; broad docs are not touched for ritual.

If `/context` is missing, use the Stage 1 authority set as the temporary source of truth, then create or update only the context files required by the current increment. Do not rely on chat history as the only project state.

If documents conflict, stop implementation and list the conflicts before changing requirements, architecture, contracts, data models, risk decisions, or phase status.

## Human Handoff Protocol

The human should only need to review results and type a short continuation command such as:

```text
请进行下一步
继续
下一步
```

When receiving a short continuation command, do not ask the human to paste a detailed prompt. Automatically recover the next task from repository files:

1. Read the Stage 1 authority set.
2. Prefer `context/TODO_NEXT.md` when it exists.
3. Classify the task and build the minimum working set.
4. Read task-card files only when they are needed for that classification; do not treat long task-card lists as mandatory upfront reads.
5. Otherwise parse the next-task handoff, incomplete phase, and risk notes in `PROGRESS.md`.
6. If still unclear, infer the earliest unfinished increment from the roadmap and current files, opening `AI_Schedule.md` only at this point.
7. Execute exactly one coherent next increment unless the continuation file explicitly recommends a bounded batch.

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
minimum working set
escalation files/triggers
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
backend: Python 3.11+, FastAPI, Pydantic, SQLAlchemy, Alembic, MySQL, Redis, Pytest
ai-services: Python, video ingestion, detection, tracking, ROI/line counting, event publishing
infra: Docker Compose first, CI quality gates, monitoring and backup docs
```

Environment rules:

```text
database: MySQL
python env: recreate virtualenv for backend/ and ai-services/ work
sudo: stop and let the human execute sudo/system-level commands
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

Note: PostgreSQL License is a license name only; the project database is MySQL.

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
