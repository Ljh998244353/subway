# TODO Next

更新时间：2026-05-18

## Task Card

```text
Increment: P4-I1 backend API contract and data model baseline
Primary role: Backend Mode
Auxiliary reviews: Architect, QA, Security/License
Human command: 请进行下一步
```

## Goal

固化后端 `/api/v1` 契约和 MySQL 数据模型基线，为后续 FastAPI 后端实现、前后端联调和部署健康检查提供稳定依据。

## Non-goals

```text
不创建 ai-services/
不接真实 API、真实视频流、真实商场素材、真实地图、真实 BIM、真实品牌或个人轨迹
不实现完整后端业务逻辑
不创建生产部署或真实 Docker Compose
不引入付费工具、付费服务、付费素材或需要账号绑定的云服务
不使用 PostgreSQL；后续数据库统一使用 MySQL
不执行 sudo；需要系统级命令时让人类执行
```

## Required Reading

```text
AGENTS.md
README.md
PROGRESS.md
AI_Schedule.md
IMPORTANT.md
docs/PRD_v1.md
docs/REQUIREMENTS_ANALYSIS.md
docs/SYSTEM_DESIGN.md
docs/FRONTEND_DEMO_HANDOFF.md
docs/ENGINEERING_QUALITY_GATES.md
docs/CI_PLAN.md
docs/DEPLOYMENT_PLAN.md
docs/THIRD_PARTY_NOTICES.md
docs/LICENSE_AUDIT.md
frontend/
context/*.md
```

## Deliverables

```text
docs/API_CONTRACT.md 或同等 API 契约文档
docs/DATA_MODEL.md 或同等 MySQL 数据模型基线文档
/api/v1/health 健康检查约定
统一响应 envelope、错误码和 traceId 约定
RBAC 占位：admin、operator、leasing、security、readonly
核心实体和 MySQL 表边界、索引、唯一键、UTC 时间和数据保留策略
后续 OpenAPI、迁移、契约测试和 Pytest 门禁计划
README、PROGRESS.md、context/*.md 和 context/TODO_NEXT.md 接力更新
```

## Acceptance Checks

```bash
npm run quality
npm run quality:audit
```

P4-I1 完成时还应能检索到：

```bash
rg -n "P4-I1|API 契约|/api/v1/health|MySQL|数据模型|RBAC|错误码|OpenAPI|契约检查|质量门禁|请进行下一步" AGENTS.md AGENT.md README.md PROGRESS.md context/TODO_NEXT.md docs/ENGINEERING_QUALITY_GATES.md docs/CI_PLAN.md context/API_CONTRACT_CURRENT.md context/DATA_MODEL_CURRENT.md context/BACKEND_STATE.md
```

## Human Confirmation Gates

AI 必须在以下节点让人类确认后再继续扩大范围：

```text
API 契约冻结前
MySQL 核心表结构冻结前
新增 Python 依赖、MySQL driver、Docker 镜像、扫描工具、Gitee Go、账号能力或外部服务前
接入真实数据、真实视频、真实商场资料、真实品牌或个人信息前
从文档基线进入真实后端实现、AI 服务实现或生产部署实现前
```

## Next Handoff

完成 P4-I1 后，下一张任务卡应明确指向 P4 的最小后端实现增量，通常是最小 FastAPI 工程骨架、`/api/v1/health` 实现、OpenAPI 输出和后端测试门禁。若 P4-I1 只完成文档基线，不得宣称后端、AI 服务或生产部署已经可用。

