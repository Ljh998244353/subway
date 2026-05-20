# Progress

Updated: 2026-05-20

## Current Conclusion

Completed: P0, P1, P2, P3, P4-I1 through P4-I16, and P5-I1 through P5-I4.

P5-I4 completed Store Analysis API-mode state wiring:

```text
frontend/src/api/storeAnalysisDataLoader.ts
frontend/src/api/storeAnalysisDataLoader.test.ts
frontend/src/pages/storeAnalysisState.ts
frontend/src/pages/StoreAnalysisPage.tsx
frontend/src/pages/StoreAnalysisPage.test.ts
frontend/src/api/overviewDataLoader.ts
frontend/src/api/overviewDataLoader.test.ts
frontend/package.json
context/TODO_NEXT.md
context/*.md
```

Implemented:

```text
StoreAnalysisPage now uses a React state/effect boundary for store-analysis data
initial/default StoreAnalysisPage state still renders mockStoresWithAlerts and existing mock alerts/floors
dataMode=api can trigger the Store Analysis loader explicitly
API failure falls back to mock Store Analysis state and records an error message
storeAnalysisState tests cover mock default, API success, and API fallback without live backend
P5-I5 handoff for Store Alerts API-mode data loader contract
```

P5 has started without changing the default demo behavior. The frontend still defaults to mock/synthetic data. Real MySQL, credentials, Docker Compose, AI services, real video, real mall data, and personal data remain blocked.

## Current Status

| Item | Status | Notes |
| --- | --- | --- |
| Frontend demo | complete | React + TypeScript + Vite, still mock/synthetic data by default |
| Frontend API boundary | complete | typed reference API client, mock mode default |
| Overview data loader | complete | P5-I1 `loadOverviewData` supports mock/API selection with offline tests |
| Dashboard API-mode state | complete | P5-I2 wires DashboardPage to the overview loader boundary with mock fallback |
| Store Analysis data loader | complete | P5-I3 `loadStoreAnalysisData` supports mock/API selection with offline tests |
| Store Analysis API-mode state | complete | P5-I4 wires StoreAnalysisPage to the store-analysis loader boundary with mock fallback |
| Backend health skeleton | complete | `/api/v1/health`, traceId, error envelope, OpenAPI, Pytest |
| Migration baseline | complete | SQLAlchemy Core metadata + Alembic initial migration |
| Core read API stubs | complete | mall/floor/store fixture APIs + contract tests |
| Overview API stub/client | complete | synthetic `/api/v1/overview` + typed `getOverview(mallId)` |
| Store detail API/client | complete | synthetic `/api/v1/stores/{storeId}` + typed `getStore(storeId)` |
| Store score API/client | complete | synthetic `/api/v1/stores/{storeId}/score` + typed `getStoreScore(storeId)` |
| Store flow API/client | complete | synthetic `/api/v1/stores/{storeId}/flow` + typed `getStoreFlow(storeId)` |
| Store ranking API/client | complete | synthetic `/api/v1/stores/ranking` + typed `getStoreRanking(mallId)` |
| Store alerts API/client | complete | synthetic `/api/v1/alerts/stores` + typed `listStoreAlerts(mallId)` |
| Customer profile API/client | complete | synthetic `/api/v1/customer-profile` + typed `getCustomerProfile(mallId)` |
| Heatmap API/client | complete | synthetic `/api/v1/heatmap` + typed `getHeatmap(mallId)` |
| Trajectories API/client | complete | synthetic `/api/v1/trajectories` + typed `getTrajectories(mallId)` |
| CP4 closure | complete | synthetic contract baseline can move through P5 |
| MySQL readiness | planned | no real connection, credentials, Docker, or Compose |
| Deployment | documentation only | not runnable Compose |

## Verification

P5-I4 local verification:

```bash
npm --prefix frontend run test
npm run quality
npm run quality:audit
```

Results:

```text
npm --prefix frontend run test: 96 passed
npm run quality: passed
npm run quality:audit: found 0 vulnerabilities
```

Vite still prints React Router/Motion `"use client"` warnings during build; these are existing non-blocking dependency warnings.

## Current Risks

```text
StoreAlertsPage is not yet covered by an API-mode loader contract
no real MySQL connection or migration execution
no browser E2E or live frontend/backend integration test
no coverage report
no AI service
no Docker Compose startup test
```

Continue to block real video, real mall material, real monitoring, face images, personal trajectories, paid tool, and external service unless reviewed and confirmed.

## Next Step

Next increment: `P5-I5 store alerts API-mode data loader contract`.

Recommended scope:

```text
add a Store Alerts API-mode loader or adapter using existing typed client methods
keep mock mode and existing StoreAlertsPage rendering as the default
add tests for mock default, API success, and API error/fallback boundaries without live backend calls
do not connect real MySQL or change backend fixture behavior
```

P5-I5 must not switch the frontend default mode to API, must not depend on a live backend in tests, and must not connect real MySQL.

## Stage Log

| Stage | Date | Result |
| --- | --- | --- |
| P4-I1 backend API contract and data model baseline | 2026-05-19 | Added API/Data Model docs; root quality gate passed |
| P4-I2 minimal FastAPI backend skeleton and health endpoint | 2026-05-19 | Added FastAPI health skeleton, Pytest, CI Python setup; quality/audit passed |
| P4-I3 MySQL/Alembic migration baseline | 2026-05-19 | Added SQLAlchemy metadata, Alembic initial migration, migration tests; quality/audit passed |
| P4-I4 core read API stubs and contract tests | 2026-05-19 | Added mall/floor/store synthetic fixture APIs, DTOs, specific 404 error envelope, and contract tests; quality/audit passed |
| P4-I5 API/client integration preparation | 2026-05-19 | Added typed frontend reference API client and tests; quality/audit passed |
| P4-I6 overview API stub and contract tests | 2026-05-19 | Added synthetic overview API route, DTOs, fixture, and tests; quality/audit passed |
| P4-I7 overview API client extension | 2026-05-19 | Added typed overview DTOs and `getOverview(mallId)`; quality/audit passed |
| P4-I8 store detail API stub and client contract | 2026-05-19 | Added synthetic store detail endpoint and `getStore(storeId)`; quality/audit passed |
| P4-I9 store score API stub and client contract | 2026-05-19 | Added synthetic store score endpoint and `getStoreScore(storeId)`; quality/audit passed |
| P4-I10 store flow API stub and client contract | 2026-05-19 | Added synthetic store flow endpoint and `getStoreFlow(storeId)`; quality/audit passed |
| P4-I11 store ranking API stub and client contract | 2026-05-19 | Added synthetic store ranking endpoint, `MALL_NOT_FOUND`, OpenAPI test, typed `getStoreRanking(mallId)`, and mocked fetch tests; quality/audit passed |
| P4-I12 store alerts list API stub and client contract | 2026-05-19 | Added synthetic store alerts endpoint, `MALL_NOT_FOUND`, OpenAPI test, typed `listStoreAlerts(mallId)`, and mocked fetch tests; quality/audit passed |
| P4-I13 customer profile API stub and client contract | 2026-05-19 | Added anonymous aggregate customer profile endpoint, `MALL_NOT_FOUND`, OpenAPI test, typed `getCustomerProfile(mallId)`, and mocked fetch tests; quality/audit passed |
| P4-I14 heatmap API stub and client contract | 2026-05-19 | Added synthetic aggregate heatmap endpoint, `MALL_NOT_FOUND`, OpenAPI test, typed `getHeatmap(mallId)`, and mocked fetch tests; quality/audit passed |
| P4-I15 trajectories API stub and client contract | 2026-05-20 | Added anonymous aggregate trajectories endpoint, `MALL_NOT_FOUND`, OpenAPI test, typed `getTrajectories(mallId)`, and mocked fetch tests; quality/audit passed |
| P4-I16 CP4 closure review and MySQL readiness plan | 2026-05-20 | Added CP4 review, MySQL readiness checklist, explicit no-go boundaries, and P5-I1 handoff |
| P5-I1 API mode overview data loader contract | 2026-05-20 | Added `loadOverviewData`, offline loader tests, and P5-I2 dashboard wiring handoff |
| P5-I2 dashboard API-mode state wiring | 2026-05-20 | Wired DashboardPage to overview state boundary, added mock/API/fallback state tests, and prepared P5-I3 Store Analysis loader handoff |
| P5-I3 store analysis API-mode data loader contract | 2026-05-20 | Added `loadStoreAnalysisData`, API DTO mapping, offline loader tests, and P5-I4 StoreAnalysisPage wiring handoff |
| P5-I4 store analysis API-mode state wiring | 2026-05-20 | Wired StoreAnalysisPage to store-analysis state boundary, added mock/API/fallback state tests, and prepared P5-I5 Store Alerts loader handoff |

## Handoff Prompt

Human may enter `请进行下一步`. AI must read `AGENTS.md`, `context/TODO_NEXT.md`, `README.md`, `PROGRESS.md`, `frontend/src/pages/StoreAlertsPage.tsx`, `frontend/src/api/referenceClient.ts`, `frontend/`, `backend/`, and relevant context files, then execute the P5-I5 task card.
