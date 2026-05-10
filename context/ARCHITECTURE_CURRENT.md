# Architecture Current

更新时间：2026-05-10

## 当前架构状态

P0 已完成系统设计初稿，详见 `docs/SYSTEM_DESIGN.md`。P1 设计规范阶段已完成：页面范围和信息架构见 `docs/design/SCREEN_LAYOUTS.md`，设计 token 和布局规则见 `docs/design/DESIGN_TOKENS.md` 与 `docs/design/UI_SPEC.md`，组件、图表和 UI 状态规范见 `docs/design/COMPONENT_SPEC.md` 与 `docs/design/CHART_SPEC.md`，交互、响应式、可访问性和设计评审见 `docs/design/INTERACTION_SPEC.md` 与 `docs/design/DESIGN_REVIEW_CHECKLIST.md`。P2-I1 已创建 `frontend/` React + TypeScript + Vite 工程骨架，P2-I2 已补充共享类型与虚构 Mock 数据。下一步开始实现第一个业务页面 `/dashboard`。

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

## 下一步架构工作

P2-I3 先实现 `/dashboard` 运营总览页面，继续使用 `frontend/src/mock` 和 `frontend/src/types`。P3 再落整体工程化骨架；P4 再固化 API、数据模型和迁移。
