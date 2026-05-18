# Deployment Plan

更新时间：2026-05-13

## 1. 增量定位

```text
Increment: P3-I4 Docker Compose draft or deployment documentation
Primary role mode: DevOps Mode
Auxiliary checklists: Product, QA, Security/License
```

本文是 P3-I4 的部署计划文档。当前选择“部署文档优先”，不创建 `docker-compose.yml`、`infra/`、`backend/` 或 `ai-services/`。原因是后端和 AI 服务尚不存在，直接写 Docker Compose 会引入未审计镜像、环境变量和不可运行的假部署。

P3-I4 的完成标准是：明确未来 Docker Compose 的服务边界、端口、环境变量、secrets、健康检查、启动顺序、数据卷、日志、备份和许可证审计点，并继续复用 P3-I2 的 `npm run quality` / `npm run quality:audit` 与 P3-I3 的 GitHub Actions CI。

## 2. 当前可运行边界

当前仓库只有 `frontend/` 是可运行应用：

```text
frontend: React + TypeScript + Vite demo
root quality gate: npm run quality
root dependency audit: npm run quality:audit
GitHub CI: .github/workflows/ci.yml
```

当前尚未创建：

```text
backend/
ai-services/
infra/
docker-compose.yml
production deployment
real API integration
real video stream ingestion
real mall floor plans, maps, BIM, brands, surveillance images, personal identities, or personal trajectories
不展示个人轨迹
```

本地开发仍以根级质量门禁为准。GitHub Actions 只在 GitHub 仓库侧运行；仓库同步到 Gitee 后，`.github/workflows/ci.yml` 只是普通文件，不会自动成为 Gitee Go 流水线。

## 3. 未来 Compose 服务边界

| 服务 | 计划职责 | 计划端口 | 当前状态 | P3-I4 决策 |
| --- | --- | --- | --- | --- |
| `frontend` | 静态前端或 Vite preview，访问 `/dashboard`、`/digital-twin`、`/store-analysis`、`/store-alerts`、`/customer-profile` | 开发 `5173`，预览 `4173`，生产可映射 `80` | 已有 `frontend/` | 暂不容器化；P11 或明确增量再选镜像和静态服务器 |
| `backend` | FastAPI REST API、RBAC、审计日志、聚合查询、告警管理 | `8000` | 尚无 `backend/` | P4 后创建；进入 Python 开发时必须新建虚拟环境 |
| `mysql` | 事务事实源、事件表、聚合结果、审计记录 | 内部 `3306` | 尚无数据库服务 | 后续使用 MySQL；镜像、版本、许可证和备份策略需单独审计 |
| `redis` | 缓存、短期任务状态、限流或轻量队列 | 内部 `6379` | 尚无缓存服务 | Redis/替代实现、版本、许可证和镜像条款需单独审计 |
| `ai-services` | 视频接入、检测、追踪、ROI/线段计数、事件输出 | 内部 `8100` 或无公网端口 | 尚无 `ai-services/` | P6 前先审计模型、数据集和视频 fixture 许可证 |
| `worker` | 异步聚合、评分、预警生成、定时任务 | 无公网端口 | 尚无 worker | P7/P8 再决定是否独立服务 |

服务边界原则：

```text
MySQL is the source of truth
Redis is cache/transient only
frontend never connects directly to MySQL or Redis
backend exposes /api/v1 and owns auth, RBAC, audit, validation, and aggregation APIs
ai-services emits structured events, not personally identifiable trajectories
worker jobs must be idempotent and observable
```

## 4. 环境变量与 secrets 边界

P3-I4 只定义变量名，不写真实凭据，不提交 `.env`，不把 secrets 放进 CI 日志。

| 区域 | 变量草案 | 边界 |
| --- | --- | --- |
| Frontend | `VITE_API_BASE_URL`、`VITE_DEMO_MODE` | 当前仍使用 Mock；生产构建不得写真实密钥 |
| Backend | `APP_ENV`、`APP_SECRET_KEY`、`DATABASE_URL`、`REDIS_URL`、`CORS_ORIGINS`、`LOG_LEVEL` | `APP_SECRET_KEY` 和数据库密码必须来自本地未提交 env 或 secret store |
| MySQL | `MYSQL_DATABASE`、`MYSQL_USER`、`MYSQL_PASSWORD`、`MYSQL_ROOT_PASSWORD` | 不提交真实密码；生产-like 环境必须替换默认值 |
| Redis | `REDIS_PASSWORD` | 如启用密码，不提交真实值；只允许内网访问 |
| AI Services | `AI_MODEL_NAME`、`AI_MODEL_VERSION`、`AI_MODEL_LICENSE`、`AI_INPUT_MODE`、`AI_EVENT_ENDPOINT` | 不使用未审计模型权重、真实监控流或个人图像 |
| Worker | `WORKER_CONCURRENCY`、`SCHEDULE_INTERVAL_SECONDS` | 需要幂等和重试策略 |

本仓库不得提交：

```text
.env
real database password
real API key
real video stream URL
real mall tenant data
member ID, face image, personal trajectory, or identifiable customer profile
```

如后续需要示例变量，只能提交 `.env.example`，并使用明显不可用的占位值。

## 5. 健康检查草案

| 服务 | 健康检查草案 | 阻断条件 |
| --- | --- | --- |
| `frontend` | HTTP `GET /` 或静态资源 200 | 静态入口不可访问 |
| `backend` | HTTP `GET /api/v1/health` 返回版本、数据库连接状态和只读依赖状态 | API 不可访问、数据库不可连接、迁移版本不匹配 |
| `mysql` | MySQL readiness probe，确认可接受连接并可读取迁移元信息 | 数据库不可连接或迁移未完成 |
| `redis` | Redis ping/readiness probe | 缓存不可连接时 backend 应降级或明确失败 |
| `ai-services` | HTTP `GET /health` 或进程健康端点，返回模型名、版本、许可证、输入模式 | 模型未加载、许可证未知、输入源不是合成或授权来源 |
| `worker` | 心跳表、队列延迟或最后成功执行时间 | 长时间无心跳、重试堆积、幂等失败 |

P4 创建后端时必须优先提供 `/api/v1/health`，这样后续 Docker Compose 和 CI 才能做真实启动检查。

## 6. 启动顺序草案

未来 Compose 启动顺序建议：

```text
1. mysql starts and passes readiness
2. redis starts and passes readiness
3. backend applies migrations or verifies migration version
4. backend starts /api/v1/health
5. ai-services starts with synthetic or authorized input only
6. worker starts after backend and database are ready
7. frontend starts after backend base URL is configured
```

禁止用 `depends_on` 替代真实 readiness。后续如需要数据库初始化脚本，必须可重复执行，不得写入真实商场或个人数据。

## 7. 数据卷、日志和备份

未来 Compose 草案应至少定义：

```text
mysql_data: persistent volume, backup required before production-like use
redis_data: optional; cache can be rebuilt unless used for queue durability
app_logs: structured logs without secrets, faces, member IDs, personal trajectories, or real video URLs
upload_or_fixture_data: only synthetic or authorized fixtures
```

备份原则：

```text
MySQL backup and restore procedure must be documented before production-like delivery
Redis is not a source of truth
logs must not contain secrets or identifiable personal data
synthetic fixtures must be clearly labeled
```

## 8. 许可证、成本和账号审计点

P3-I4 不新增 Docker 镜像、数据库服务、扫描工具、Gitee Go、云服务或外部账号能力，因此无需更新 `docs/THIRD_PARTY_NOTICES.md` 和 `docs/LICENSE_AUDIT.md` 的第三方条目。

后续真正创建 Compose 或部署配置前，必须先审计：

```text
Docker or container runtime installation source and whether it requires sudo
Node build/runtime image license and image provenance
static server image license and image provenance
Python image license and image provenance
MySQL image, server license, client library license, version, data volume, backup and upgrade path
Redis or alternative cache image, version, license, service terms and compatibility
AI model weights, datasets, video fixtures, tracking libraries and their usage restrictions
Gitee Go, GitHub Actions, registry, artifact storage or deployment platform account and free quota
vulnerability scanner license, network behavior, log visibility and cost
```

若任一项需要账号、付费额度、外网传输、系统级安装或服务条款确认，必须先记录到 `IMPORTANT.md` 和 `context/RISKS_AND_ASSUMPTIONS.md`，必要时等待人类批准。

## 9. CI 与质量门禁映射

当前本地命令：

```bash
npm run quality
npm run quality:audit
```

当前 GitHub Actions：

```text
quality-gate: npm ci --prefix frontend, npm run quality
dependency-audit: npm ci --prefix frontend, npm run quality:audit
```

P3-I4 已将 `docs/DEPLOYMENT_PLAN.md` 纳入根级文档结构检查。CI 仍不运行 Docker、后端测试、AI 验证、浏览器 E2E、覆盖率统计、部署或 Gitee Go。

未来新增 Docker Compose 后，应增加独立检查，而不是替代现有质量门禁：

```text
compose config validation
service health check
backend tests
database migration check
AI synthetic fixture check
privacy and license regression
```

## 10. 人工执行边界

AI 不执行 `sudo`、系统包安装、系统服务管理或 Docker daemon 配置。若后续需要安装 Docker 或调整系统服务，AI 只能写明命令、目的和预期结果，由人类执行后反馈。

P3-I4 当前不要求人类执行 Docker 命令。可选的本地验证只包括：

```bash
npm run quality
npm run quality:audit
```

## 11. P3-I4 结论

P3-I4 结论是“部署计划已建立，但尚未创建真实 Compose 或生产部署”。当前没有引入新第三方镜像、依赖、服务账号、真实数据或真实素材。下一步建议进入 `P4-I1 backend API contract and data model baseline`，先固化后端 API、MySQL 数据模型、健康检查和 Python 环境重建方式，再创建可测试的 FastAPI 骨架。
