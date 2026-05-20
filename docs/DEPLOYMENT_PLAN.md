# Deployment Plan

更新时间：2026-05-19

## 1. Increment Metadata

```text
Increment: P3-I4 Docker Compose draft or deployment documentation
Primary role: DevOps Mode
Decision: deployment documentation first
```

P3-I4 只交付部署计划文档，不交付可运行 Compose。P4-I2 后已有最小 `backend/` health skeleton，P4-I3 后已有 MySQL/Alembic migration baseline，但仍不创建真实部署。

## 2. Service Boundaries

未来服务边界草案：

```text
frontend: React/Vite UI, never connects directly to MySQL or Redis
backend: FastAPI REST API, /api/v1/health, auth/RBAC later
mysql: source of truth for events, stats, alerts, audit logs
redis: cache/transient state only
ai-services: future video analysis service, not created yet
worker: future aggregation or scheduled jobs, not created yet
```

## 3. Configuration And Health

Deployment implementation must define environment variables, secrets handling, health checks and startup order before any production-like run. The current backend health endpoint is `/api/v1/health`; database and Redis dependencies currently report `not_configured`.

No `.env`, real credentials, real video URLs, real mall data, real monitoring feed, personal trajectories or personal information may be committed.

## 4. Current Decision

```text
do not create `docker-compose.yml`
do not create infra/
do not start a real MySQL service
do not start a real Redis service
do not create production deployment bindings
this document is not a runnable Compose
```

Creating Docker images, database services, Gitee Go workflow, cloud deployment, scanning tools or external service bindings requires separate license/cost/account review. Update `docs/THIRD_PARTY_NOTICES.md` and `docs/LICENSE_AUDIT.md` before adding those dependencies.

## 5. Platform Boundaries

GitHub Actions runs only on GitHub. When the repository is mirrored to Gitee, `.github/workflows/ci.yml` is just a normal file and does not become a Gitee Go workflow. Any Gitee Go configuration requires a separate increment and review.

System-level installation, `sudo`, service management and privilege escalation must be performed by the human operator, not by AI.

## 6. P4-I16 MySQL Readiness Boundary

`docs/MYSQL_READINESS_PLAN.md` is a readiness checklist only. It does not create `.env`, Docker Compose, a real MySQL service, real credentials, cloud deployment, or production deployment bindings.
