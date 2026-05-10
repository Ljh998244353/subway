# Architecture Current

更新时间：2026-05-10

## 当前架构状态

P0 已完成系统设计初稿，详见 `docs/SYSTEM_DESIGN.md`。当前还没有工程代码，架构处于可评审草案状态。

## 技术栈草案

| 层 | 技术 |
| --- | --- |
| Frontend | React + TypeScript + Vite |
| Visualization | ECharts + Three.js |
| Frontend Test | Vitest + Playwright |
| Backend | Python 3.11+ + FastAPI + Pydantic |
| ORM / Migration | SQLAlchemy + Alembic |
| Database | PostgreSQL |
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
  -> AI event service or mock generator
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
PostgreSQL is the source of truth
Redis is cache/transient only
```

## 下一步架构工作

P1 先完成信息架构和页面范围；P3 再落工程骨架；P4 再固化 API、数据模型和迁移。
