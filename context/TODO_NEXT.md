# TODO Next

Updated: 2026-05-20

## Task Card

```text
Increment: P5-I4 store analysis API-mode state wiring
Primary role: Frontend Integration Mode
Auxiliary reviews: Backend, QA, Security/License
Human command: 请进行下一步
Status: ready after P5-I3 store analysis API-mode data loader contract
```

## Goal

Wire the P5-I3 Store Analysis data loader into the StoreAnalysisPage state boundary so the page can render mock data by default and use API mode only when explicitly selected. Keep the existing demo stable and do not require a live backend in tests.

## Recommended Scope

```text
connect StoreAnalysisPage to loadStoreAnalysisData through a small React state/effect boundary
keep initial/default StoreAnalysisPage rendering on mockStoresWithAlerts and existing mock alerts/floors
add explicit mock default, API success, loading, and error/fallback tests where practical
use injected or mocked loader/fetch in tests; do not call a live backend
document how later P5 work should continue route by route
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
frontend/src/api/storeAnalysisDataLoader.ts
frontend/src/api/storeAnalysisDataLoader.test.ts
frontend/src/pages/StoreAnalysisPage.tsx
frontend/src/pages/StoreAnalysisPage.test.ts
frontend/src/pages/storeAnalysisModel.ts
frontend/src/pages/dashboardOverviewState.ts
frontend/src/mock/mockStores.ts
context/*.md
```

## Deliverables

```text
StoreAnalysisPage uses the store-analysis loader boundary or an equivalent injectable state adapter
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

P5-I4 completion should be searchable with:

```bash
rg -n "P5-I4|StoreAnalysisPage|API mode|mock mode|loadStoreAnalysisData|store analysis state|quality gate|请进行下一步" README.md PROGRESS.md AGENTS.md context/TODO_NEXT.md context/FRONTEND_STATE.md frontend docs
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

After P5-I4, continue API-mode integration route by route only if mock mode remains stable and quality gates pass.
