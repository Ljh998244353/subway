# Risks And Assumptions

Updated: 2026-05-20

## Current Assumptions

| Assumption | Impact |
| --- | --- |
| The project is a course design project | Keep implementation auditable and low-risk |
| The user continues with short commands | `PROGRESS.md` and `context/TODO_NEXT.md` must stay handoff-ready |
| First-round data uses mock or synthetic fixtures | Avoid real video, real mall material, real brands, and personal information |
| Database planning uses MySQL | Do not design migrations, connection strings, or deployment docs around PostgreSQL |
| GitHub Actions runs only on GitHub | A Gitee mirror does not automatically run `.github/workflows/ci.yml` |

## Current Risks

| Risk | Level | Handling |
| --- | --- | --- |
| API contract and MySQL schema may need later adjustment | Medium | P5 starts with narrow API-mode integration and mock remains default |
| Backend dependency/license drift | Medium | Existing dependencies are recorded; audit before adding any new dependency |
| Real MySQL migration execution is not tested | Medium | Follow `docs/MYSQL_READINESS_PLAN.md` before real query work |
| Premature Docker Compose would create fake deployment | Medium | Keep deployment documentation-only for now |
| Privacy and real-material misuse | High | Block real video, real mall material, face images, member IDs, phone numbers, and personal trajectories |
| Coverage, E2E, and AI validation are still missing | Medium | Add later by risk, not inside P5-I5 Store Alerts loader work |

## Next Step Risk Control

P5-I4 completed StoreAnalysisPage API-mode state wiring. P5-I5 may add a Store Alerts API-mode loader contract only. It must not change the frontend default away from mock mode, depend on a live backend in tests, connect real MySQL, create credentials, create Docker/infra, use real video or real floor plans, or expose personal/individual trajectories.
