# TODO Next

Updated: 2026-05-20

## Task Card

```text
Increment: P5-I1 API mode overview data loader contract
Primary role: Frontend Integration Mode
Auxiliary reviews: Backend, QA, Security/License
Human command: 请进行下一步
Status: ready after P4-I16 CP4 closure review and MySQL readiness plan
```

## Goal

Start P5 frontend/backend integration with one narrow API mode path for overview/dashboard data loading. Keep mock mode as the default and do not connect real MySQL or replace the existing frontend demo behavior.

## Recommended Scope

```text
add a frontend data loader or adapter for overview data that can choose mock or API mode
use existing resolveFrontendDataMode, resolveApiBaseUrl, createReferenceApiClient, and getOverview(mallId)
keep dashboard mock data unchanged by default
add tests for mock default, API success, API error fallback or propagation, URL/baseUrl boundaries
document how P5 will expand API mode route by route
```

## Non-goals

```text
do not replace the current frontend mock demo
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
docs/CP4_CLOSURE_REVIEW.md
docs/MYSQL_READINESS_PLAN.md
frontend/src/api/apiMode.ts
frontend/src/api/referenceClient.ts
frontend/src/api/referenceClient.test.ts
frontend/src/mock/mockOverview.ts
frontend/src/pages/DashboardPage.tsx
frontend/src/pages/DashboardPage.test.ts
context/*.md
```

## Deliverables

```text
frontend overview API-mode loader/adapter with tests
mock mode remains default and tested
no live backend or real MySQL dependency in frontend tests
updated README, PROGRESS.md, context/*.md, and context/TODO_NEXT.md
no new dependency unless license/cost reviewed first
```

## Acceptance Checks

```bash
npm --prefix frontend run test
npm run quality
npm run quality:audit
```

P5-I1 completion should be searchable with:

```bash
rg -n "P5-I1|API mode|mock mode|getOverview|overview data loader|quality gate|请进行下一步" README.md PROGRESS.md AGENTS.md context/TODO_NEXT.md context/TEST_STATE.md frontend docs
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

After P5-I1, continue API-mode integration route by route only if mock mode remains stable and quality gates pass.
