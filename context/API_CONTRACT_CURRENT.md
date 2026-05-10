# API Contract Current

更新时间：2026-05-10

## 当前状态

P0 只定义 API 草案，尚未实现后端服务或 OpenAPI 文件。

## API 草案

```text
GET /api/v1/overview
GET /api/v1/malls
GET /api/v1/malls/{mallId}/floors
GET /api/v1/floors/{floorId}/stores
GET /api/v1/stores/{storeId}
GET /api/v1/stores/{storeId}/flow
GET /api/v1/stores/{storeId}/score
GET /api/v1/stores/ranking
GET /api/v1/alerts/stores
GET /api/v1/customer-profile
GET /api/v1/heatmap
GET /api/v1/trajectories
```

## 契约规则

```text
use /api/v1
use Pydantic/OpenAPI as source of contract
use ISO 8601 time
use UTC internally
standard error codes: 400, 401, 403, 404, 409, 422, 500
RBAC required after auth implementation
```

## 下一步

P2 前端先使用 Mock 数据；P4 创建正式 OpenAPI 契约和 FastAPI 实现。
