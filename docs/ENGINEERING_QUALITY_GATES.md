# Engineering Quality Gates

更新时间：2026-05-13

## 1. 增量定位

```text
Increment: P3-I1 engineering skeleton planning and quality gate alignment
Primary role mode: DevOps Mode
Auxiliary checklists: Product, QA, Security/License
```

本文定义 P3 工程化骨架的质量门禁。P3-I1 只做规划和门禁对齐，P3-I2 已创建根级本地质量门禁脚本和统一命令入口。当前仍不创建 `backend/`、`ai-services/`、`infra/`、Docker Compose 文件或 CI 配置，不接真实 API、真实视频、真实商场素材或个人轨迹。

## 2. 当前工程状态

| 区域 | 当前状态 | P3-I1 结论 |
| --- | --- | --- |
| Frontend | `frontend/` 已有 React + TypeScript + Vite、5 个核心页面、Node 内置测试、lint/test/build 脚本 | 继续作为当前唯一可运行代码门禁 |
| Backend | 尚无 `backend/` | P3-I1 不创建，P4 再进入 FastAPI/MySQL 实现 |
| AI Services | 尚无 `ai-services/` | P3-I1 不创建，P6 前先完成模型和数据集许可证审计 |
| Quality Gate | 已有根级 `package.json` 和 `scripts/quality-gate.mjs` | P3-I2 已落地本地统一门禁入口 |
| Infra | 尚无 `infra/`、Docker Compose、CI | 后续 P3-I3/P3-I4 分步落地 |
| License | 已有 `docs/THIRD_PARTY_NOTICES.md` 和 `docs/LICENSE_AUDIT.md` | 新增依赖、镜像、工具前必须更新 |

## 3. 根级门禁目标

后续根级质量门禁应成为唯一入口，至少覆盖：

```text
文档结构检查
合规关键词检查
工程边界检查
前端 lint
前端测试
前端生产构建
前端高危依赖审计
新增第三方内容许可证记录检查
```

P3-I2 已新增根级脚本和 `package.json`，统一调用现有 `frontend` 命令。

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

## 4. 当前可执行门禁

### 4.1 文档结构检查

```bash
npm run quality:docs
```

### 4.2 合规关键词检查

```bash
npm run quality:compliance
```

### 4.3 工程边界检查

P3-I1 结束时应仍未创建后端、AI 服务或部署工程目录：

```bash
npm run quality:boundary
```

期望输出为空。若后续 P3-I4 创建 `infra/`，必须同步更新本文和 `context/DEPLOYMENT_STATE.md`。

### 4.4 前端门禁

```bash
npm run quality:frontend
npm run quality:audit
```

当前 `npm audit --audit-level=high` 可能需要网络。若沙箱 DNS 或网络失败，必须按权限规则重试；仍失败时记录命令、错误和剩余风险，不能静默跳过。

## 5. 后续阶段门禁

| 阶段 | 必须新增的门禁 | 完成条件 |
| --- | --- | --- |
| P3-I2 | 根级脚本或命令入口 | 已完成：一条命令可运行文档结构、合规关键词、工程边界和 frontend lint/test/build |
| P3-I3 | CI 配置 | CI 自动运行 P3-I2 门禁，并清晰阻断失败 |
| P3-I4 | Docker Compose 草案或部署文档 | 明确服务、健康检查、环境变量、MySQL/Redis 许可证和不使用付费云 |
| P4 | 后端 API 和数据模型门禁 | FastAPI/OpenAPI、MySQL 迁移、Pytest、错误码和契约检查 |
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
```

## 7. P3-I1 风险结论

P3-I1 不新增第三方依赖、Docker 镜像、CI 服务、外部账号或付费服务，因此不需要更新第三方声明条目。后续真正引入 CI、Docker 镜像、扫描工具、后端依赖或 AI 模型前，必须先更新 `docs/THIRD_PARTY_NOTICES.md`、`docs/LICENSE_AUDIT.md` 和必要的 `IMPORTANT.md` 风险记录。
