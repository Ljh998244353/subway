# TODO Next

Updated: 2026-05-25

## Task Card

```text
Increment: P5-I11 CP5 frontend API-mode integration closure review
Primary role: QA Mode
Auxiliary reviews: Backend, QA, Security/License
Human command: 请进行下一步
Status: ready after P5-I10 digital twin API-mode state wiring
```

## Goal

Review and close the CP5 frontend API-mode integration baseline. Confirm each P5 route has explicit API mode boundaries, mock mode remains the default, tests stay offline, and remaining gaps are documented before later phases.

## Recommended Scope

```text
review P5-I1 through P5-I10 loader and state wiring coverage
confirm DashboardPage, StoreAnalysisPage, StoreAlertsPage, CustomerProfilePage, and DigitalTwinPage retain mock mode by default
document API-mode test coverage, remaining gaps, and CP5 go/no-go status
update README, PROGRESS.md, context/*.md, and engineering quality docs
do not add new runtime behavior unless a documentation inconsistency requires a narrow correction
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
frontend/src/pages/digitalTwinState.ts
frontend/src/api/digitalTwinDataLoader.ts
frontend/src/api/*.ts
frontend/src/pages/*State.ts
docs/ENGINEERING_QUALITY_GATES.md
docs/CI_PLAN.md
context/*.md
```

## Deliverables

```text
CP5 closure review and handoff documentation
mock mode remains default and all API-mode behavior remains explicit
quality and audit results are recorded
updated README, PROGRESS.md, context/*.md, and context/TODO_NEXT.md
no new dependency unless license/cost reviewed first
```

## Acceptance Checks

```bash
npm --prefix frontend run test
npm run quality
npm run quality:audit
```

P5-I11 completion should be searchable with:

```bash
rg -n "P5-I11|CP5|API mode|mock mode|frontend API-mode integration|closure review|quality gate|请进行下一步" README.md PROGRESS.md AGENTS.md context/TODO_NEXT.md context/FRONTEND_STATE.md frontend docs
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

After P5-I11, move to the next approved phase only if mock mode remains stable, CP5 gaps are documented, and quality gates pass.
