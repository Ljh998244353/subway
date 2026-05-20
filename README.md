# 商业综合体视觉 AI 数字孪生运营系统

本项目是面向商业综合体运营场景的视觉 AI 数字孪生系统。目标是把客流、进出店、停留、热力、动线、店铺评分和低效预警统一到可解释的运营视图中，辅助招商、调铺、营销、安保和现场运营决策。

本仓库采用“先演示、再工程化、再接入真实后端和 AI”的增量路线。当前仍使用 Mock / synthetic 数据，不接真实商场数据、不接真实监控视频、不展示个人轨迹。

## 文档入口

| 文件 | 读者 | 用途 |
| --- | --- | --- |
| [AGENTS.md](AGENTS.md) | AI | AI coding 工具标准入口：硬规则、当前任务、用户工作流和质量门禁 |
| [AGENT.md](AGENT.md) | AI | 兼容旧链接的短入口，指向 `AGENTS.md` 和当前任务卡 |
| [AI_Schedule.md](AI_Schedule.md) | AI / 人类 | P0-P12 路线图、增量拆分、角色模式、技术栈、测试门禁和许可证规则 |
| [PROGRESS.md](PROGRESS.md) | 人类 | 当前进度、已完成事项、下一步、当前风险和检查命令 |
| [IMPORTANT.md](IMPORTANT.md) | AI / 人类 | 付费工具、版权、许可证、隐私、潜在侵权和关键风险记录 |
| [context/TODO_NEXT.md](context/TODO_NEXT.md) | AI | 下一步增量任务卡和“请进行下一步”接力信息 |
| [docs/API_CONTRACT.md](docs/API_CONTRACT.md) | AI / 人类 | P4 后端 `/api/v1` 契约基线 |
| [docs/DATA_MODEL.md](docs/DATA_MODEL.md) | AI / 人类 | MySQL 数据模型基线 |
| [docs/CP4_CLOSURE_REVIEW.md](docs/CP4_CLOSURE_REVIEW.md) | AI / 人类 | CP4 后端/API/客户端覆盖评审和缺口 |
| [docs/MYSQL_READINESS_PLAN.md](docs/MYSQL_READINESS_PLAN.md) | AI / 人类 | 真实 MySQL 前的配置、密钥、迁移、回滚和隐私准入清单 |
| [docs/DEPLOYMENT_PLAN.md](docs/DEPLOYMENT_PLAN.md) | AI / 人类 | 部署计划、未来服务边界、环境变量、健康检查和审计点 |
| [docs/ENGINEERING_QUALITY_GATES.md](docs/ENGINEERING_QUALITY_GATES.md) | AI / 人类 | 工程质量门禁、可执行检查、阻断规则和后续阶段门禁 |
| [docs/CI_PLAN.md](docs/CI_PLAN.md) | AI / 人类 | CI 计划、Job 拆分、本地等价命令和后续扩展点 |
| [docs/THIRD_PARTY_NOTICES.md](docs/THIRD_PARTY_NOTICES.md) | AI / 人类 | 当前已引用第三方工具、字体、素材或包的许可证记录 |
| [docs/LICENSE_AUDIT.md](docs/LICENSE_AUDIT.md) | AI / 人类 | 许可证、成本、账号和使用边界审计 |
| [frontend/README.md](frontend/README.md) | AI / 人类 | 前端工程、Mock 数据、命令和边界 |
| [backend/README.md](backend/README.md) | AI / 人类 | 后端 FastAPI、迁移、测试和当前边界 |
| [package.json](package.json) | AI / 人类 | 根级质量门禁命令入口 |
| [scripts/quality-gate.mjs](scripts/quality-gate.mjs) | AI | 本地质量门禁脚本 |
| [skills/mall-vision-ai-delivery/SKILL.md](skills/mall-vision-ai-delivery/SKILL.md) | Codex | 本项目专用单 AI 增量迭代开发工作流 |

每次继续开发时，人类通常只需输入“请进行下一步”；AI 应先读 `AGENTS.md`、`context/TODO_NEXT.md`、`PROGRESS.md` 和当前增量点名文件，自动判断当前增量。

## 项目范围

一期目标是先做可演示、可测试、可恢复的系统闭环：

- 运营总览：场内人数、累计客流、楼层状态、趋势和拥挤预警。
- 数字孪生：楼层、店铺、热力、预警和历史回放联动展示。
- 店铺分析：进店、停留、转化、评分、趋势和低效原因解释。
- 客群画像：匿名聚合的时间段、楼层、业态偏好和画像统计。
- 低效预警：C/D 级店铺、高客流低转化、连续下滑和异常数据提示。
- 后端契约：FastAPI `/api/v1` 合成数据接口、标准响应 envelope、错误码和 OpenAPI。
- 数据模型：MySQL 表结构、事件表、聚合表、告警表、RBAC 和审计表基线。

暂不扩大到多租户商业 SaaS、复杂招商推荐、完整 BIM 建模或真实监控系统上线。

## 开发模式

本项目采用单 AI 增量迭代开发模式。`P0` 到 `P12` 是长期路线图，实际执行必须拆成 `P0-I1`、`P0-I2` 这类小增量；每个增量都要可恢复、可检查、可测试或明确测试缺口。

当前协作方式是“常规短指令续作 + 关键节点人工确认”。普通增量中，人类检查 AI 交付结果、提出必要修正；确认继续时只输入“请进行下一步”。AI 每次必须自动从 `AGENTS.md` 和 `context/TODO_NEXT.md` 找到下一张任务卡，并完成开发、测试、文档、context、风险和许可证记录更新。

关键节点不自动跳过，AI 必须先让人类确认：

- API 契约冻结前。
- MySQL 核心表结构冻结前。
- 新增依赖、镜像、模型、数据集、外部服务前。
- 接入真实数据、真实视频、真实商场素材或真实品牌前。
- 从 synthetic fixture 切换到真实 MySQL 查询前。
- 进入真实后端、AI 服务或生产部署实现前。

## 阶段路线

| 阶段 | 主角色 | 目标 |
| --- | --- | --- |
| P0 | Product Mode | 项目基线与上下文恢复 |
| P1 | Design Mode | 设计规范与信息架构 |
| P2 | Frontend Mode | 前端 Demo MVP |
| P3 | DevOps Mode | 工程化骨架 |
| P4 | Backend Mode | 后端 API 与数据模型 |
| P5 | Frontend Mode | 前后端联调，Mock/API 模式共存 |
| P6 | AI Video Mode | AI 视频识别 MVP |
| P7 | Backend Mode | 店铺经营评分 MVP |
| P8 | Data Mode | 客群、热力、动线分析 |
| P9 | Frontend Mode | 3D / 2.5D 数字孪生可交付版 |
| P10 | QA Mode | 工业级测试与安全加固 |
| P11 | DevOps Mode | 部署与观测 |
| P12 | Product Mode | 验收与移交 |

完整路线图、默认增量拆分和门禁见 [AI_Schedule.md](AI_Schedule.md)。

## 免费与合规原则

本项目当前用于课程设计、学习和项目规划，但仍按可审计和低侵权风险标准执行：

- 不引入付费开发工具、付费云服务、付费 API、付费模型或付费素材，除非用户明确批准。
- 不使用来源不明的视频、图片、字体、地图、商场平面图、品牌 Logo、商户 Logo、监控画面、模型权重、数据集或复制代码。
- 不使用真实监控视频、真实商场资料、人脸图像、会员身份、手机号或个人轨迹。
- 优先使用 MIT、Apache-2.0、BSD、ISC、CC0、CC-BY 等许可证清晰的资源。
- 新增第三方内容必须记录到 [docs/THIRD_PARTY_NOTICES.md](docs/THIRD_PARTY_NOTICES.md)，重点风险同步记录到 [IMPORTANT.md](IMPORTANT.md)。

## 环境约束

- 数据库统一使用 MySQL；后端数据模型、迁移、连接串、容器服务和部署文档都按 MySQL 设计。
- 当前后端只使用 synthetic fixture，不连接真实 MySQL。
- 当前前端默认使用 Mock mode；P5 只逐步增加 API mode，不能默认替换 Mock mode。
- 后续创建 Python 后端或 AI 服务时必须使用项目虚拟环境。
- 任何需要 `sudo`、系统包安装、系统服务管理或提权修改的命令，AI 必须停下来说明命令和目的，由人类手动执行后再继续。

## 当前检查方法

根级本地质量门禁：

```bash
backend\.venv\Scripts\python.exe -m pytest backend\tests
npm run quality
npm run quality:audit
```

`npm run quality` 覆盖文档结构、`AGENTS.md` 标准入口、`context/TODO_NEXT.md` 任务卡字段、部署计划文档、合规关键词、工程边界、前端 lint/test/build 和后端 Pytest。`npm run quality:audit` 单独运行前端高危依赖审计。

GitHub 端 CI 配置位于 `.github/workflows/ci.yml`。如果仓库同步到 Gitee，`.github/workflows/ci.yml` 只会作为普通文件保留；Gitee Go 不会自动执行 GitHub Actions workflow。

## 当前状态

截至 2026-05-20，已完成：

```text
P0 项目基线与上下文恢复
P1 设计规范阶段
P2 前端 Demo MVP 与 CP2 收口
P3 工程化骨架、根级质量门禁、GitHub Actions 和部署计划
P4-I1 至 P4-I15 后端 API、MySQL 数据模型、迁移基线、合成 API stub、前端 typed client
P4-I16 CP4 closure review and MySQL readiness plan
P5-I1 API mode overview data loader contract
P5-I2 dashboard API-mode state wiring
```

当前已实现的后端 synthetic API：

```text
GET /api/v1/health
GET /api/v1/malls
GET /api/v1/malls/{mallId}/floors
GET /api/v1/floors/{floorId}/stores
GET /api/v1/stores/{storeId}
GET /api/v1/stores/{storeId}/score
GET /api/v1/stores/{storeId}/flow
GET /api/v1/stores/ranking?mallId=mall_demo_001
GET /api/v1/alerts/stores?mallId=mall_demo_001
GET /api/v1/customer-profile?mallId=mall_demo_001
GET /api/v1/heatmap?mallId=mall_demo_001
GET /api/v1/trajectories?mallId=mall_demo_001
GET /api/v1/overview?mallId=mall_demo_001
```

当前边界：

```text
不连接真实 MySQL
不提交 .env 或真实凭据
不创建 docker-compose.yml、infra/ 或生产部署
不创建 ai-services/
不接真实视频、真实商场资料、真实品牌、人脸图像或个人轨迹
```

最近一次验证结果：

```text
backend pytest: 34 passed
npm run quality: passed
frontend tests in quality gate: 87 passed after P5-I2 dashboard state tests
backend tests in quality gate: 34 passed
npm run quality:audit: found 0 vulnerabilities
```

P5-I2 已完成：`DashboardPage` 已接入 overview loader 状态边界，新增 `frontend/src/pages/dashboardOverviewState.ts`。默认仍先渲染 Mock mode；只有显式 `dataMode=api` 才触发 API mode，API 失败会回退到 mock overview，测试不依赖 live backend，也不连接真实 MySQL。

下一步增量是 `P5-I3 store analysis API-mode data loader contract`：为 Store Analysis 增加 API mode 数据加载契约，但仍保持 Mock mode 默认，不切换到真实 API。

给 AI 的指令：

```text
请进行下一步
```

## 免责声明

本项目文档和演示内容用于课程设计、学习和项目规划，不构成法律、合规、隐私或商业咨询意见。若后续使用真实商场数据、监控视频、地图、平面图、品牌资产、第三方模型或对外发布成果，必须由权利人、课程负责人或具备资质的法律/合规人员确认授权和使用边界。
