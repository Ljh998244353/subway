# TODO Next

Updated: 2026-05-20

## Task Card

```text
Increment: P5-I3 store analysis API-mode data loader contract
Primary role: Frontend Integration Mode
Auxiliary reviews: Backend, QA, Security/License
Human command: 请进行下一步
Status: ready after P5-I2 dashboard API-mode state wiring
```

## Goal

Continue P5 frontend/backend integration by adding a narrow Store Analysis data loader contract. The loader should support mock mode by default and explicit API mode through the existing typed reference client. Keep the current store-analysis demo stable and do not require a live backend in tests.

## Recommended Scope

```text
add a frontend store-analysis data loader or state adapter that can choose mock or API mode
use existing resolveFrontendDataMode, resolveApiBaseUrl, getStoreRanking, getStore, getStoreScore, and getStoreFlow where appropriate
keep StoreAnalysisPage mock rendering unchanged by default
add tests for mock default, API success, API error/fallback behavior, and no live network dependency
document how later P5 work should wire StoreAnalysisPage state after the loader contract
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
frontend/src/api/apiMode.ts
frontend/src/api/referenceClient.ts
frontend/src/api/overviewDataLoader.ts
frontend/src/pages/StoreAnalysisPage.tsx
frontend/src/pages/StoreAnalysisPage.test.ts
frontend/src/pages/DashboardPage.tsx
frontend/src/pages/dashboardOverviewState.ts
frontend/src/mock/mockStores.ts
context/*.md
```

## Deliverables

```text
store-analysis API-mode loader/adapter with offline tests
mock mode remains default and the existing store-analysis demo remains stable
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

P5-I3 completion should be searchable with:

```bash
rg -n "P5-I3|StoreAnalysisPage|API mode|mock mode|getStoreRanking|getStoreScore|store analysis loader|quality gate|请进行下一步" README.md PROGRESS.md AGENTS.md context/TODO_NEXT.md context/FRONTEND_STATE.md frontend docs
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

After P5-I3, wire StoreAnalysisPage to the loader or continue API-mode integration route by route only if mock mode remains stable and quality gates pass.
