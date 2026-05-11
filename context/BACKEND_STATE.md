# Backend State

更新时间：2026-05-11

## 当前状态

尚未创建 `backend/` 工程。

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

P3-I1 只做工程化骨架规划与质量门禁对齐，不创建 `backend/`。P4 开始后端 API 与数据模型实现；进入后端开发时必须重新创建 Python 虚拟环境，并继续使用 MySQL。
