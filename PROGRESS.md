# Progress

Updated: 2026-05-20

## Current Conclusion

Completed: P0, P1, P2, P3, P4-I1 through P4-I16, and P5-I1.

P5-I1 completed the first frontend API-mode overview data loader contract:

```text
frontend/src/api/overviewDataLoader.ts
frontend/src/api/overviewDataLoader.test.ts
frontend/package.json
context/TODO_NEXT.md
context/*.md
```

Implemented:

```text
loadOverviewData(options) selects mock mode by default and API mode only when explicitly requested
mock mode returns the existing mockOverview without touching an API client
API mode uses getOverview(mallId) through the existing typed reference client
fetch/client injection keeps tests offline and independent from a live backend
OverviewDto is mapped into the frontend OverviewSnapshot domain shape with safe source/status normalization
P5-I2 handoff for dashboard API-mode state wiring
```

P5 has started without changing the default demo behavior. The frontend still defaults to mock/synthetic data. Real MySQL, credentials, Docker Compose, AI services, real video, real mall data, and personal data remain blocked.

## Current Status

| Item | Status | Notes |
| --- | --- | --- |
| Frontend demo | complete | React + TypeScript + Vite, still mock/synthetic data by default |
| Frontend API boundary | complete | typed reference API client, mock mode default |
| Overview data loader | complete | P5-I1 `loadOverviewData` supports mock/API selection with offline tests |
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

P5-I1 local verification:

```bash
npm --prefix frontend run test
npm run quality
npm run quality:audit
```

Results:

```text
npm --prefix frontend run test: 84 passed
npm run quality: passed
npm run quality:audit: found 0 vulnerabilities
```

Vite still prints React Router/Motion `"use client"` warnings during build; these are existing non-blocking dependency warnings.

## Current Risks

```text
DashboardPage is not yet wired to the loader state boundary
no real MySQL connection or migration execution
no browser E2E or live frontend/backend integration test
no coverage report
no AI service
no Docker Compose startup test
```

Continue to block real video, real mall material, real monitoring, face images, personal trajectories, paid tool, and external service unless reviewed and confirmed.

## Next Step

Next increment: `P5-I2 dashboard API-mode state wiring`.

Recommended scope:

```text
wire DashboardPage to loadOverviewData or an equivalent injectable state adapter
keep mock mode and existing dashboard mock rendering as the default
add tests for default mock behavior plus API-mode loading/error boundaries without live backend calls
do not connect real MySQL or change backend fixture behavior
```

P5-I2 must not switch the frontend default mode to API, must not depend on a live backend in tests, and must not connect real MySQL.

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

## Handoff Prompt

Human may enter `请进行下一步`. AI must read `AGENTS.md`, `context/TODO_NEXT.md`, `README.md`, `PROGRESS.md`, `frontend/src/api/overviewDataLoader.ts`, `frontend/src/pages/DashboardPage.tsx`, `frontend/`, `backend/`, and relevant context files, then execute the P5-I2 task card.
