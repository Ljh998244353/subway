# Architecture Current

更新时间：2026-05-13

## 当前架构状态

P0 已完成系统设计初稿，详见 `docs/SYSTEM_DESIGN.md`。P1 设计规范阶段已完成：页面范围和信息架构见 `docs/design/SCREEN_LAYOUTS.md`，设计 token 和布局规则见 `docs/design/DESIGN_TOKENS.md` 与 `docs/design/UI_SPEC.md`，组件、图表和 UI 状态规范见 `docs/design/COMPONENT_SPEC.md` 与 `docs/design/CHART_SPEC.md`，交互、响应式、可访问性和设计评审见 `docs/design/INTERACTION_SPEC.md` 与 `docs/design/DESIGN_REVIEW_CHECKLIST.md`。P2-I1 已创建 `frontend/` React + TypeScript + Vite 工程骨架，P2-I2 已补充共享类型与虚构 Mock 数据，P2-I3 已完成 `/dashboard`，P2-I4 已完成 `/store-analysis`，P2-I5 已完成 `/store-alerts`，P2-I6 已完成 `/digital-twin`，P2-I7 已完成核心演示流转和响应式检查，P2-I8 已完成 `/customer-profile` 客群画像页面，P2-I9 已完成 CP2 前端 Demo 收口和交接。P3-I1 已完成工程化骨架规划与质量门禁对齐，新增 `docs/ENGINEERING_QUALITY_GATES.md` 和 `docs/CI_PLAN.md`。P3-I2 已完成根级质量门禁脚本和统一命令入口，新增 `package.json` 与 `scripts/quality-gate.mjs`。下一步做 P3-I3 免费 CI 配置或本地到 CI 映射。

## 技术栈草案

| 层 | 技术 |
| --- | --- |
| Frontend | React + TypeScript + Vite |
| Visualization | ECharts + Three.js |
| Frontend Test | Node built-in test currently; Vitest + Playwright later |
| Backend | Python 3.11+ + FastAPI + Pydantic |
| ORM / Migration | SQLAlchemy + Alembic |
| Database | MySQL |
| Cache / Queue | Redis |
| AI Services | Python video ingestion, detection, tracking, ROI/line counting |
| Quality Gate | Root npm scripts + Node built-in quality gate script |
| Infra | Docker Compose first, CI quality gates |

## 模块边界

```text
frontend: UI, routes, mock/API mode, charts, digital twin
backend: REST API, auth, RBAC, aggregation query, alert management
ai-services: video ingestion, detection, tracking, event output
data: events, stats, score, alerts, audit logs
infra: containers, CI, health, logs, backup docs
```

## 数据流

```text
synthetic video or mock data
  -> frontend mock generator currently; later AI event service
  -> event tables
  -> aggregation and scoring
  -> /api/v1
  -> frontend dashboard and digital twin
```

## 关键约束

```text
use /api/v1
Pydantic/OpenAPI as contract
UTC internally
events are source of truth
stable IDs for idempotency
MySQL is the source of truth
Redis is cache/transient only
Python backend and AI service work must recreate a virtual environment
AI must pause and ask the human to run any sudo or system-level command
```

## P3-I1 工程化规划结论

```text
当前可运行门禁是根级 npm run quality 与 npm run quality:audit
P3-I1 不创建 backend/、ai-services/、infra/、Docker Compose 或 CI 配置
P3-I2 已创建根级脚本或统一命令入口
P3-I3 再创建 CI 配置
P3-I4 再规划或创建 Docker Compose 草案
新增 CI 工具、Docker 镜像、扫描工具或依赖前必须审计许可证和成本
```

## 下一步架构工作

P3-I3 不改变 API 或数据模型边界，优先复用根级质量门禁创建免费 CI 配置或本地到 CI 映射。P4 再固化 API、数据模型和迁移。
