# TODO Next

Updated: 2026-05-20

## Task Card

```text
Increment: P5-I5 store alerts API-mode data loader contract
Primary role: Frontend Integration Mode
Auxiliary reviews: Backend, QA, Security/License
Human command: 请进行下一步
Status: ready after P5-I4 store analysis API-mode state wiring
```

## Goal

Continue P5 frontend/backend integration by adding a narrow Store Alerts data loader contract. The loader should support mock mode by default and explicit API mode through the existing typed reference client. Keep the current store-alerts demo stable and do not require a live backend in tests.

## Recommended Scope

```text
add a frontend store-alerts data loader or state adapter that can choose mock or API mode
use existing resolveFrontendDataMode, resolveApiBaseUrl, listStoreAlerts, and getStore where appropriate
keep StoreAlertsPage mock rendering unchanged by default
add tests for mock default, API success, API error/fallback behavior, and no live network dependency
document how later P5 work should wire StoreAlertsPage state after the loader contract
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
frontend/src/pages/storeAnalysisState.ts
frontend/src/pages/StoreAlertsPage.tsx
frontend/src/pages/StoreAlertsPage.test.ts
frontend/src/pages/storeAlertsModel.ts
frontend/src/api/referenceClient.ts
frontend/src/mock/mockAlerts.ts
context/*.md
```

## Deliverables

```text
store-alerts API-mode loader/adapter with offline tests
mock mode remains default and the existing store-alerts demo remains stable
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

P5-I5 completion should be searchable with:

```bash
rg -n "P5-I5|StoreAlertsPage|API mode|mock mode|listStoreAlerts|store alerts loader|quality gate|请进行下一步" README.md PROGRESS.md AGENTS.md context/TODO_NEXT.md context/FRONTEND_STATE.md frontend docs
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

After P5-I5, wire StoreAlertsPage to the loader or continue API-mode integration route by route only if mock mode remains stable and quality gates pass.
