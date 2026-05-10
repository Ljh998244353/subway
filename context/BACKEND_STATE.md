# Backend State

更新时间：2026-05-10

## 当前状态

尚未创建 `backend/` 工程。

## 后端计划

```text
Python 3.11+
FastAPI
Pydantic
SQLAlchemy
Alembic
PostgreSQL
Redis
Pytest
```

## 后端约束

```text
PostgreSQL is source of truth
Redis is cache/transient only
OpenAPI contract must match implementation
RBAC and operation logs required before production-like use
```

## 下一步

P4 开始后端 API 与数据模型实现。
