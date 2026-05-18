# Backend State

更新时间：2026-05-11

## 当前状态

尚未创建 `backend/` 工程。P3-I4 已完成部署计划文档，要求后续后端提供 `/api/v1/health`，并在创建 Compose 前明确 MySQL、Redis、健康检查、环境变量和 secrets 边界。

## 后端计划

```text
Python 3.11+
FastAPI
Pydantic
SQLAlchemy
Alembic
MySQL
Redis
Pytest
```

## 后端约束

```text
MySQL is source of truth
Redis is cache/transient only
OpenAPI contract must match implementation
RBAC and operation logs required before production-like use
backend Python environment must be recreated when backend development starts
AI must not execute sudo; human runs sudo or system-level setup commands
```

## 下一步

P4-I1 开始后端 API 契约和 MySQL 数据模型基线，优先固化 `/api/v1`、`/api/v1/health`、响应 envelope、错误码、RBAC 占位、核心实体和测试策略。进入后端开发时必须重新创建 Python 虚拟环境，并继续使用 MySQL；如新增 Python 依赖或 MySQL driver，必须同步第三方声明和许可证审计。
