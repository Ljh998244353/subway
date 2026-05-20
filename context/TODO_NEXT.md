# TODO Next

Updated: 2026-05-20

## Task Card

```text
Increment: P5-I2 dashboard API-mode state wiring
Primary role: Frontend Integration Mode
Auxiliary reviews: Backend, QA, Security/License
Human command: 请进行下一步
Status: ready after P5-I1 overview data loader contract
```

## Goal

Wire the P5-I1 overview data loader into the dashboard page state boundary so the dashboard can render mock data by default and use API mode only when explicitly selected. Keep the existing demo stable and do not require a live backend in tests.

## Recommended Scope

```text
connect DashboardPage to loadOverviewData through a small React state/effect boundary
keep initial/default dashboard rendering on mockOverview and existing mock stores/alerts/floors
add explicit loading, error, and recovered mock/default behavior tests where practical
use injected or mocked loader/fetch in tests; do not call a live backend
document how API mode should continue route by route after dashboard overview wiring
```

## Non-goals

```text
do not switch the frontend default from mock mode to API mode
do not make live network calls in tests
do not connect real MySQL
do not create .env with credentials
do not create ai-services/
do not create infra/ or docker-compose.yml
do not add Docker images, external services, paid tools, or account-bound cloud capability
do not add real video, real mall material, real monitoring, face images, real brands, personal trajectories, member IDs, phone numbers, or individual profiles
do not execute sudo
```

## Required Reading

```text
AGENTS.md
README.md
PROGRESS.md
frontend/src/api/overviewDataLoader.ts
frontend/src/api/overviewDataLoader.test.ts
frontend/src/pages/DashboardPage.tsx
frontend/src/pages/DashboardPage.test.ts
frontend/src/pages/dashboardModel.ts
frontend/src/mock/mockOverview.ts
context/*.md
```

## Deliverables

```text
DashboardPage uses the overview loader boundary or an equivalent injectable state adapter
mock mode remains default and the existing dashboard demo remains stable
API mode behavior is covered without live backend or real MySQL dependency
updated README, PROGRESS.md, context/*.md, and context/TODO_NEXT.md
no new dependency unless license/cost reviewed first
```

## Acceptance Checks

```bash
npm --prefix frontend run test
npm run quality
npm run quality:audit
```

P5-I2 completion should be searchable with:

```bash
rg -n "P5-I2|DashboardPage|API mode|mock mode|loadOverviewData|overview loader|quality gate|请进行下一步" README.md PROGRESS.md AGENTS.md context/TODO_NEXT.md context/FRONTEND_STATE.md frontend docs
```

## Human Confirmation Gates

```text
before switching frontend default from mock mode to API mode
before making tests depend on a live backend
before switching from synthetic fixture API to real MySQL query
before creating or committing credentials, .env, Docker images, Docker Compose, or deployment infrastructure
before adding dependencies, external services, paid tools, or account-bound cloud capability
before real data, real video, real mall material, real brands, or personal information
before AI service or production deployment
```

## Next Handoff

After P5-I2, continue API-mode integration route by route only if mock mode remains stable and quality gates pass.
