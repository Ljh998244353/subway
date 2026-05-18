# Engineering Quality Gates

更新时间：2026-05-13

## 1. 增量定位

```text
Increment: P3-I4 Docker Compose draft or deployment documentation
Primary role mode: DevOps Mode
Auxiliary checklists: Product, QA, Security/License
```

本文定义 P3 工程化骨架的质量门禁。P3-I1 已完成规划和门禁对齐，P3-I2 已创建根级本地质量门禁脚本和统一命令入口，P3-I3 已新增 GitHub Actions CI 配置 `.github/workflows/ci.yml`，P3-I4 已新增 `docs/DEPLOYMENT_PLAN.md` 并纳入根级文档结构检查。2026-05-18 已补充 AI coding 工作流门禁：`AGENTS.md` 作为标准入口，`context/TODO_NEXT.md` 作为单页任务卡。当前仍不创建 `backend/`、`ai-services/`、`infra/` 或 Docker Compose 文件，不接真实 API、真实视频、真实商场素材或个人轨迹。

## 2. 当前工程状态

| 区域 | 当前状态 | P3-I1 结论 |
| --- | --- | --- |
| Frontend | `frontend/` 已有 React + TypeScript + Vite、5 个核心页面、Node 内置测试、lint/test/build 脚本 | 继续作为当前唯一可运行代码门禁 |
| Backend | 尚无 `backend/` | P3-I1 不创建，P4 再进入 FastAPI/MySQL 实现 |
| AI Services | 尚无 `ai-services/` | P3-I1 不创建，P6 前先完成模型和数据集许可证审计 |
| Quality Gate | 已有根级 `package.json` 和 `scripts/quality-gate.mjs` | P3-I2 已落地本地统一门禁入口；P3-I3 已去除对 `rg` 的 CI 运行时依赖 |
| CI | 已有 `.github/workflows/ci.yml` | GitHub Actions 运行根级门禁；Gitee 镜像不自动运行该 workflow |
| Infra | 尚无 `infra/`、Docker Compose 文件；已有 `docs/DEPLOYMENT_PLAN.md` | P3-I4 已完成部署文档优先方案，后续真正创建 Compose 前必须审计镜像、成本和账号边界 |
| License | 已有 `docs/THIRD_PARTY_NOTICES.md` 和 `docs/LICENSE_AUDIT.md` | 新增依赖、镜像、工具前必须更新 |

## 3. 根级门禁目标

后续根级质量门禁应成为唯一入口，至少覆盖：

```text
文档结构检查和部署计划检查
AGENTS.md 标准入口检查
context/TODO_NEXT.md 任务卡字段检查
合规关键词检查
工程边界检查
前端 lint
前端测试
前端生产构建
前端高危依赖审计
新增第三方内容许可证记录检查
```

P3-I2 已新增根级脚本和 `package.json`，统一调用现有 `frontend` 命令。P3-I4 起，文档结构检查还会验证 `docs/DEPLOYMENT_PLAN.md` 中的服务边界、环境变量、健康检查、MySQL、sudo、GitHub Actions、Gitee 和隐私红线。2026-05-18 起，文档结构检查还验证 `AGENTS.md` 包含标准入口、硬规则和用户工作流，验证 `context/TODO_NEXT.md` 包含 Task Card、Goal、Non-goals、Required Reading、Deliverables、Acceptance Checks 和 Human Confirmation Gates。

### 3.1 根级命令入口

```bash
npm run quality
npm run quality:docs
npm run quality:compliance
npm run quality:boundary
npm run quality:frontend
npm run quality:audit
```

说明：`npm run quality` 覆盖文档结构、合规关键词、工程边界和 frontend lint/test/build；`npm run quality:audit` 单独运行高危依赖审计，可能需要网络审批。

P3-I3 起，`npm run quality:compliance` 使用 Node 内置文件扫描，不再要求 CI runner 预装 `ripgrep`，避免为了合规关键词检查执行系统安装或 `sudo`。

## 4. 当前可执行门禁

### 4.1 文档结构检查

```bash
npm run quality:docs
```

### 4.2 合规关键词检查

```bash
npm run quality:compliance
```

### 4.3 AI 工作流入口和任务卡检查

```bash
npm run quality:docs
```

根级脚本必须检查：

```text
AGENTS.md：标准 AI coding 入口、当前增量、硬规则、用户工作流和质量门禁
AGENT.md：兼容旧链接，指向 AGENTS.md 和 context/TODO_NEXT.md
context/TODO_NEXT.md：单页任务卡，包含目标、非目标、必读文件、交付物、验收命令、人工确认门和下一步接力
```

任务卡存在的目的不是替代详细路线图，而是让下一次短指令续作时只需要读取最小上下文即可知道当前要做什么、不要做什么、怎么验收。

### 4.4 工程边界检查

P3-I1 结束时应仍未创建后端、AI 服务或部署工程目录：

```bash
npm run quality:boundary
```

期望输出为空。若后续 P3-I4 创建 `infra/`，必须同步更新本文和 `context/DEPLOYMENT_STATE.md`。

### 4.5 前端门禁

```bash
npm run quality:frontend
npm run quality:audit
```

当前 `npm audit --audit-level=high` 可能需要网络。若沙箱 DNS 或网络失败，必须按权限规则重试；仍失败时记录命令、错误和剩余风险，不能静默跳过。

### 4.6 GitHub Actions 门禁

```bash
npm run quality
npm run quality:audit
```

CI 配置位于 `.github/workflows/ci.yml`，包含：

```text
quality-gate: checkout、setup-node、npm ci --prefix frontend、npm run quality
dependency-audit: checkout、setup-node、npm ci --prefix frontend、npm run quality:audit
```

该 workflow 只在 GitHub Actions 中生效。同步到 Gitee 后，`.github/workflows/ci.yml` 不会自动变成 Gitee Go 流水线；Gitee Go 需要另行评估 `/.workflow/` 配置、账号、免费额度和日志数据边界。

### 4.7 部署文档门禁

```bash
npm run quality:docs
```

P3-I4 已新增 `docs/DEPLOYMENT_PLAN.md`，根级脚本会检查该文档包含：

```text
P3-I4 和 DevOps Mode 定位
frontend/backend/mysql/redis/ai-services/worker 服务边界
环境变量、secrets 和 /api/v1/health 健康检查
MySQL、sudo、GitHub Actions、Gitee、真实监控和个人轨迹边界
不创建 docker-compose.yml、不创建真实 Compose、不新增第三方镜像或服务账号的结论
```

## 5. 后续阶段门禁

| 阶段 | 必须新增的门禁 | 完成条件 |
| --- | --- | --- |
| P3-I2 | 根级脚本或命令入口 | 已完成：一条命令可运行文档结构、合规关键词、工程边界和 frontend lint/test/build |
| P3-I3 | CI 配置 | 已完成：GitHub Actions 自动运行 P3-I2 门禁，并清晰阻断失败 |
| P3-I4 | Docker Compose 草案或部署文档 | 已完成：新增 `docs/DEPLOYMENT_PLAN.md`，明确服务、健康检查、环境变量、MySQL/Redis 许可证审计点和不使用付费云 |
| AI workflow | 标准入口和任务卡门禁 | 已完成：新增 `AGENTS.md` 标准入口，`context/TODO_NEXT.md` 改为可执行任务卡，根级 docs 门禁检查关键字段 |
| P4-I1 | 后端 API 契约和 MySQL 数据模型基线 | 固化 `/api/v1`、`/api/v1/health`、核心实体、错误码、MySQL 约束和后端测试策略 |
| P4 | 后端 API 和数据模型门禁 | FastAPI/OpenAPI、OpenAPI schema lint、MySQL 迁移 dry-run、Pytest、错误码和契约检查 |
| P6 | AI 视频验证门禁 | 合成视频 fixture、模型许可证、输出 schema、ROI/线段计数和延迟记录 |
| P10 | 工业级测试门禁 | 覆盖率、浏览器 E2E、安全、隐私、依赖漏洞和回归报告 |

## 6. 阻断规则

任一情况出现时，不允许标记增量完成：

```text
前端 lint/test/build 失败且未修复
测试无法运行但未记录具体命令、错误和剩余风险
新增依赖、镜像、字体、图标、图片、模型、数据集或外部服务未审计
使用真实商场平面图、真实品牌、真实监控、人脸、会员身份或个人轨迹
后续文档继续按 PostgreSQL 规划数据库
需要 sudo 或系统安装时 AI 直接执行
PROGRESS.md 或 context/TODO_NEXT.md 没有下一步接力信息
AGENTS.md 不存在或 context/TODO_NEXT.md 缺少任务卡字段
API 契约冻结、MySQL 核心表冻结、新增依赖/镜像/外部服务或接入真实数据前未经过人工确认
Gitee 镜像被误写为已运行 GitHub Actions workflow
```

## 7. P3-I4 风险结论

P3-I4 新增部署计划文档和部署文档门禁，不新增 npm 依赖、Docker 镜像、数据库服务、真实数据、真实素材、云服务或付费服务。当前选择“部署文档优先”，避免在 `backend/`、`ai-services/` 尚不存在时创建不可运行的 Compose 文件。后续真正创建 Docker Compose、MySQL、Redis、Python 镜像、Gitee Go、扫描工具或外部部署平台前，必须先审计许可证、成本、账号要求、网络数据边界和是否需要 sudo。
