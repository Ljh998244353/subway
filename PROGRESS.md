# Progress

Updated: 2026-05-20

## Current Conclusion

Completed: P0, P1, P2, P3, P4-I1 through P4-I16.

P4-I16 completed CP4 closure review and MySQL readiness planning:

```text
docs/CP4_CLOSURE_REVIEW.md
docs/MYSQL_READINESS_PLAN.md
docs/ENGINEERING_QUALITY_GATES.md
docs/CI_PLAN.md
context/TODO_NEXT.md
context/*.md
```

Implemented:

```text
CP4 synthetic backend/API/client coverage review
explicit P4 gaps and go/no-go decisions
MySQL readiness checklist before real query work
confirmation gates for real MySQL, credentials, Docker, external services, real data, and production deployment
P5-I1 handoff for API mode overview data loader contract
```

CP4 is acceptable for a synthetic contract baseline. The project can move to P5 frontend API-mode integration using the existing synthetic backend and typed frontend client. It must keep mock mode as the default until a later human confirmation changes that boundary.

## Current Status

| Item | Status | Notes |
| --- | --- | --- |
| Frontend demo | complete | React + TypeScript + Vite, still mock/synthetic data |
| Frontend API boundary | complete | typed reference API client, mock mode default |
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
| CP4 closure | complete | synthetic contract baseline can move to P5 |
| MySQL readiness | planned | no real connection, credentials, Docker, or Compose |
| Deployment | documentation only | not runnable Compose |

## Verification

P4-I16 final verification:

```bash
backend\.venv\Scripts\python.exe -m pytest backend\tests
npm run quality
npm run quality:audit
```

Results:

```text
backend pytest: 34 passed
npm run quality: passed
frontend tests in quality gate: 78 passed
backend tests in quality gate: 34 passed
npm run quality:audit: found 0 vulnerabilities
```

Vite still prints React Router/Motion `"use client"` warnings during build; these are existing non-blocking dependency warnings.

## Current Risks

```text
no real MySQL connection or migration execution
no browser E2E or live frontend/backend integration test
no coverage report
no AI service
no Docker Compose startup test
```

Continue to block real video, real mall material, real monitoring, face images, personal trajectories, paid tool, and external service unless reviewed and confirmed.

## Next Step

Next increment: `P5-I1 API mode overview data loader contract`.

Recommended scope:

```text
add a frontend overview data loader or adapter that can choose mock or API mode
use existing getOverview(mallId), resolveFrontendDataMode, and resolveApiBaseUrl
keep mock mode as the default demo path
add tests for mock default, API success, API error handling, and no live network dependency
```

P5-I1 must not switch the default frontend mode to API, must not depend on a live backend in tests, and must not connect real MySQL.

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

## Handoff Prompt

Human may enter `请进行下一步`. AI must read `AGENTS.md`, `context/TODO_NEXT.md`, `README.md`, `PROGRESS.md`, `docs/CP4_CLOSURE_REVIEW.md`, `docs/MYSQL_READINESS_PLAN.md`, `frontend/`, `backend/`, and relevant context files, then execute the P5-I1 task card.
