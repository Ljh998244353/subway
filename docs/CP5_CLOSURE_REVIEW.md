# CP5 Frontend API-Mode Integration Closure Review

Updated: 2026-05-25

Increment: P5-I11 CP5 frontend API-mode integration closure review

## Scope

This review closes the CP5 frontend API-mode integration baseline. It covers P5-I1 through P5-I10 only:

```text
overview loader and DashboardPage state wiring
Store Analysis loader and StoreAnalysisPage state wiring
Store Alerts loader and StoreAlertsPage state wiring
Customer Profile loader and CustomerProfilePage state wiring
Digital Twin heatmap/trajectory loader and DigitalTwinPage state wiring
```

The review does not switch the product default to API mode, does not require a live backend, does not connect real MySQL, and does not create AI services or deployment infrastructure.

## Coverage Matrix

| Route / feature | Loader coverage | Page state coverage | Default mode | API-mode trigger | Fallback |
| --- | --- | --- | --- | --- | --- |
| Dashboard overview | `frontend/src/api/overviewDataLoader.ts` | `frontend/src/pages/dashboardOverviewState.ts` and `DashboardPage.test.ts` | mock | explicit API mode only | mock overview snapshot |
| Store Analysis | `frontend/src/api/storeAnalysisDataLoader.ts` | `frontend/src/pages/storeAnalysisState.ts` and `StoreAnalysisPage.test.ts` | mock | explicit API mode only | mock store analysis data |
| Store Alerts | `frontend/src/api/storeAlertsDataLoader.ts` | `frontend/src/pages/storeAlertsState.ts` and `StoreAlertsPage.test.ts` | mock | explicit API mode only | mock alert data |
| Customer Profile | `frontend/src/api/customerProfileDataLoader.ts` | `frontend/src/pages/customerProfileState.ts` and `CustomerProfilePage.test.ts` | mock | explicit API mode only | mock anonymous aggregate profile |
| Digital Twin | `frontend/src/api/digitalTwinDataLoader.ts` | `frontend/src/pages/digitalTwinState.ts` and `DigitalTwinPage.test.ts` | mock | explicit API mode only | mock heatmap and flow data |

All loader and page-state tests use injected clients or mocked fetch boundaries. They do not require a live backend, real MySQL, real video, real mall material, real floor plans, face images, or personal trajectories.

## Go / No-Go

Result: go for the next planning phase as a synthetic frontend API-mode integration baseline.

Go conditions met:

```text
mock mode remains the frontend default
API mode is explicit and isolated behind loader/state boundaries
all P5 API-mode tests stay offline
typed frontend client methods align with the P4 synthetic backend contract
quality gate and dependency audit are expected to remain the release gate for each increment
no new dependency, external service, model, asset, credential, Docker image, or deployment service was added by P5-I11
```

No-go boundaries that remain blocked:

```text
switching frontend default from mock mode to API mode
tests that depend on a live backend
real MySQL queries or real migration execution
auth/RBAC enforcement claims
browser E2E claims
real video, real mall material, real brands, face images, member identifiers, phone numbers, or personal trajectories
AI service implementation, model selection, model weights, datasets, or video ingestion
Docker Compose, infra/, production deployment, cloud services, or credentials
```

## Remaining Gaps

```text
no live frontend/backend browser integration test
no browser E2E suite
no backend coverage report
no committed OpenAPI artifact
no real MySQL readiness execution
no auth/RBAC enforcement implementation
no AI event output schema yet
no AI synthetic fixture validation yet
no production deployment or observability implementation
```

These gaps are intentional for the current stage. They should be addressed by later increments only after their specific boundary, license, privacy, and quality gates are documented.

## Next Handoff

Next increment: P6-I1 AI event schema and synthetic fixture boundary.

P6-I1 should define the AI event output contract and synthetic fixture validation boundary before any AI service exists. It should not create `ai-services/`, choose model weights, download datasets, ingest real video, add dependencies, connect external services, or create infrastructure.

Recommended P6-I1 deliverables:

```text
project-authored AI event schema documentation
synthetic fixture boundary and validation plan
updated context handoff files
quality and audit gate results
```

Human confirmation is still required before real AI service work, model or dataset selection, video fixture import, real data access, new dependency, external service, Docker image, or deployment infrastructure.
