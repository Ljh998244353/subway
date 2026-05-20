# Decisions Log

更新时间：2026-05-19

| Date | Decision | Reason | Impact |
| --- | --- | --- | --- |
| 2026-05-10 | Use single-AI incremental handoff with short continuation commands | Reduce context loss between turns | Every increment must update `PROGRESS.md` and `context/TODO_NEXT.md` |
| 2026-05-10 | First delivery uses only mock, synthetic, or self-authored data | Avoid real material, privacy, and authorization risk | P2/P4 fixtures do not depend on real mall material |
| 2026-05-10 | Database direction is MySQL | User confirmed database direction | Later migrations, connection strings, and deployment planning use MySQL |
| 2026-05-13 | P3-I2 uses root npm scripts as the quality gate | Keep local and CI commands aligned | `npm run quality` is the main quality gate |
| 2026-05-13 | P3-I3 uses GitHub Actions; Gitee mirror does not run it automatically | Avoid misrepresenting Gitee CI behavior | Gitee Go requires a later separate increment |
| 2026-05-13 | P3-I4 keeps deployment documentation-first and does not create runnable Compose | Avoid fake deployment before backend/AI services are ready | `docs/DEPLOYMENT_PLAN.md` records future service boundaries |
| 2026-05-19 | P4-I1 freezes API/Data Model docs as a baseline candidate | API and data model needed alignment first | Added `docs/API_CONTRACT.md` and `docs/DATA_MODEL.md` |
| 2026-05-19 | P4-I2 creates the minimum FastAPI health skeleton | Each stage must include code, docs, and tests | Added `backend/`, health endpoint, Pytest, and CI Python setup |
| 2026-05-19 | P4-I3 creates MySQL/Alembic migration baseline without connecting real MySQL | User approved SQLAlchemy, Alembic, and PyMySQL while deferring real MySQL | Added metadata, offline Alembic migration, migration tests, and license records |
| 2026-05-19 | P4-I4 creates synthetic fixture core read APIs | Provide stable backend contracts for frontend integration while avoiding real MySQL and real mall data | Added mall/floor/store list endpoints, DTOs, fixture, and contract tests |
| 2026-05-19 | P4-I5 creates frontend API client boundary while keeping mock mode default | Prepare typed integration without breaking the current demo | Added `frontend/src/api/` and client tests; no new dependency or real backend access |
| 2026-05-19 | P4-I6 creates `/api/v1/overview` synthetic fixture API | Provide an operations overview backend contract while avoiding real MySQL and real mall data | Added overview DTO, fixture, route, and Pytest contract tests |
| 2026-05-19 | P4-I7 extends frontend overview API client | Frontend needs typed coverage for P4-I6 overview endpoint while keeping mock mode default | Added `ApiEnvelope<T>`, overview DTO, `getOverview(mallId)`, and mocked fetch tests |
| 2026-05-19 | P4-I8 adds store detail synthetic API/client contract | Store detail is a base read model for analysis, alerts, and digital twin links | Added `GET /api/v1/stores/{storeId}`, `STORE_NOT_FOUND`, `getStore(storeId)`, and contract tests |
| 2026-05-19 | P4-I9 adds store score synthetic API/client contract | Store score is a core read model for business analysis and score-mode twin views | Added `GET /api/v1/stores/{storeId}/score`, score DTO/fixture, `getStoreScore(storeId)`, and contract tests |
| 2026-05-19 | P4-I10 adds store flow synthetic API/client contract | Store flow is the time-series read model for traffic and conversion analysis | Added `GET /api/v1/stores/{storeId}/flow`, flow DTO/fixture, `getStoreFlow(storeId)`, and contract tests |
| 2026-05-19 | P4-I11 adds store ranking synthetic API/client contract | Store ranking is the sorted read model for score-based analysis views | Added `GET /api/v1/stores/ranking`, ranking DTO/fixture, `getStoreRanking(mallId)`, and contract tests |
| 2026-05-19 | P4-I12 adds store alerts synthetic API/client contract | Store alerts are the read model for low-efficiency and operational warning views | Added `GET /api/v1/alerts/stores`, alert DTO/fixture, `listStoreAlerts(mallId)`, and contract tests |
| 2026-05-19 | P4-I13 adds customer profile synthetic API/client contract | Customer profile is anonymous aggregate-only and must not expose personal identity or trajectories | Added `GET /api/v1/customer-profile`, aggregate DTO/fixture, `getCustomerProfile(mallId)`, and contract tests |
| 2026-05-19 | P4-I14 adds heatmap synthetic API/client contract | Heatmap data is aggregate-only and must not depend on real video or real floor plans | Added `GET /api/v1/heatmap`, aggregate DTO/fixture, `getHeatmap(mallId)`, and contract tests |
| 2026-05-20 | P4-I15 adds trajectories synthetic API/client contract | Trajectory data is anonymous aggregate-only and must not expose personal or individual trajectories | Added `GET /api/v1/trajectories`, aggregate DTO/fixture, `getTrajectories(mallId)`, and contract tests |
| 2026-05-20 | P4-I16 closes CP4 as a synthetic contract baseline | P4 has enough synthetic backend/API/client coverage for P5, but real MySQL is not ready | Added CP4 closure review, MySQL readiness checklist, and P5-I1 API-mode overview handoff |
