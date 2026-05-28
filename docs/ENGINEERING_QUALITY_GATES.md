# Engineering Quality Gates

更新时间：2026-05-19

## 当前定位

根级 quality gate 是本项目本地和 CI 的统一检查入口。P4-I3 后，它覆盖：

```text
docs structure
CLAUDE.md / AGENTS.md standard AI coding entry
context/TODO_NEXT.md task card
compliance keywords
engineering boundary
frontend lint/test/build
backend Pytest
```

## 当前命令

```bash
npm run quality
npm run quality:docs
npm run quality:compliance
npm run quality:boundary
npm run quality:frontend
npm run quality:backend
npm run quality:audit
```

`npm run quality` 串联 docs/compliance/boundary/frontend/backend。`npm run quality:audit` 单独运行 frontend high-severity npm audit，可能需要网络。

## 当前边界

```text
backend/ is allowed after P4-I2
backend/migrations/ is allowed after P4-I3
ai-services/ is still blocked
infra/ is still blocked
docker-compose.yml is still not created
real MySQL connection is still not configured
```

## P4-I3 完成条件

P4-I3 需要满足：

```text
SQLAlchemy metadata exists
Alembic initial migration exists
PyMySQL dependency is recorded
offline migration SQL can be generated
backend Pytest covers metadata and migration baseline
THIRD_PARTY_NOTICES and LICENSE_AUDIT are updated
PROGRESS.md and context/TODO_NEXT.md are updated
```

## 后续阶段门禁

| 阶段 | 必须新增的检查 |
| --- | --- |
| P4-I4 | complete: core read API contract tests, fixture-only data boundary |
| P4-I5 | complete: API/client integration checks and mock-mode boundary |
| P4-I6 | complete: overview API contract tests with synthetic fixture |
| P4-I7 | complete: frontend overview API client tests and mock-mode boundary |
| P4-I8 | complete: store detail API/client contract tests with synthetic fixture |
| P4-I9 | complete: store score API/client contract tests with synthetic fixture |
| P4-I10 | complete: store flow API/client contract tests with synthetic fixture |
| P4-I11 | complete: store ranking API/client contract tests with synthetic fixture |
| P4-I12 | complete: store alerts list API/client contract tests with synthetic fixture |
| P4-I13 | complete: customer profile API/client contract tests with anonymous synthetic aggregate fixture |
| P4-I14 | complete: heatmap API/client contract tests with synthetic aggregate fixture |
| P4-I15 | complete: trajectories API/client contract tests with anonymous synthetic aggregate fixture |
| P4-I16 | complete: CP4 closure review, MySQL readiness checklist, quality gate and coverage alignment |
| P5-I1 | complete: API mode overview data loader tests, mock mode remains default |
| P5-I2 | complete: dashboard API-mode state wiring tests, mock mode remains default |
| P5-I3 | complete: Store Analysis API-mode loader tests, mock mode remains default |
| P5-I4 | complete: StoreAnalysisPage API-mode state wiring tests, mock mode remains default |
| P5-I5 | complete: Store Alerts API-mode loader tests, mock mode remains default |
| P5-I6 | complete: StoreAlertsPage API-mode state wiring tests, mock mode remains default |
| P5-I7 | complete: Customer Profile API-mode loader tests, mock mode remains default |
| P5-I8 | complete: CustomerProfilePage API-mode state wiring tests, mock mode remains default |
| P5-I9 | complete: Digital Twin API-mode loader tests, mock mode remains default |
| P5-I10 | complete: DigitalTwinPage API-mode state wiring tests, mock mode remains default |
| P5-I11 | complete: CP5 frontend API-mode integration closure review and handoff |
| P6-I1 | AI event schema and synthetic fixture boundary documentation; no runtime AI service |
| Real MySQL query | migration execution test, database config validation, no committed secrets |
| AI service | synthetic video fixtures, model/data license audit, output schema tests |
| Production-like deployment | Compose config check, health checks, backup/logging docs, security review |

任何新增 dependency、Docker image、external service、paid tool、real video、real mall material、face images 或 personal trajectories 前，必须先完成人工确认和 license/cost/account review。
