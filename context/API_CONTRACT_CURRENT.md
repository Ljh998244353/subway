# API Contract Current

更新时间：2026-05-11

## 当前状态

P0 只定义 API 草案，尚未实现后端服务或 OpenAPI 文件。P3-I4 已在 `docs/DEPLOYMENT_PLAN.md` 中要求后续后端提供 `/api/v1/health`，用于 Docker Compose 和 CI 的真实健康检查。

## API 草案

```text
GET /api/v1/overview
GET /api/v1/health
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

P4-I1 创建后端 API 契约和 MySQL 数据模型基线，优先固化 `/api/v1/health`、响应 envelope、错误码、RBAC 占位、分页和核心业务查询接口；是否创建最小 `backend/` 骨架由 P4-I1 范围决定。路径继续使用 `/api/v1`，不接真实 API、真实视频、真实商场数据或个人轨迹。
