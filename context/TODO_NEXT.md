# TODO Next

Updated: 2026-05-25

## Task Card

```text
Increment: P5-I10 digital twin API-mode state wiring
Primary role: Frontend Integration Mode
Auxiliary reviews: Backend, QA, Security/License
Human command: 请进行下一步
Status: ready after P5-I9 digital twin API-mode data loader contract
```

## Goal

Continue P5 frontend/backend integration by wiring DigitalTwinPage through a narrow state boundary that uses the existing Digital Twin data loader. The page should keep mock mode as the default and only trigger API mode when explicitly requested. Keep tests offline and do not require a live backend.

## Recommended Scope

```text
add a frontend Digital Twin state adapter similar to existing dashboard/store/customer state adapters
use existing loadDigitalTwinData and preserve mock data as the initial/default state
wire DigitalTwinPage to use state result heatmapPoints and flowEdges instead of direct mock spatial arrays
read mallId, dataMode, and apiBaseUrl from query params/options as existing API-mode pages do
show a small data-source/status indicator and fallback error text without changing the default demo
add tests for mock default, API option forwarding, API result view-model inputs, and API error/fallback behavior without live backend calls
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
frontend/src/pages/DigitalTwinPage.tsx
frontend/src/pages/DigitalTwinPage.test.ts
frontend/src/pages/digitalTwinModel.ts
frontend/src/api/digitalTwinDataLoader.ts
frontend/src/api/referenceClient.ts
frontend/src/api/apiMode.ts
context/*.md
```

## Deliverables

```text
DigitalTwinPage state adapter and page wiring with offline tests
mock mode remains default and the existing digital-twin demo remains stable
API mode state behavior is covered without live backend or real MySQL dependency
updated README, PROGRESS.md, context/*.md, and context/TODO_NEXT.md
no new dependency unless license/cost reviewed first
```

## Acceptance Checks

```bash
npm --prefix frontend run test
npm run quality
npm run quality:audit
```

P5-I10 completion should be searchable with:

```bash
rg -n "P5-I10|DigitalTwinPage|API mode|mock mode|loadDigitalTwinData|digital twin state|quality gate|请进行下一步" README.md PROGRESS.md AGENTS.md context/TODO_NEXT.md context/FRONTEND_STATE.md frontend docs
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

After P5-I10, continue API-mode integration route by route only if mock mode remains stable and quality gates pass.
