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
| [docs/CP5_CLOSURE_REVIEW.md](docs/CP5_CLOSURE_REVIEW.md) | AI / 人类 | CP5 frontend API-mode integration closure review、go/no-go、缺口和 P6 接力 |
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

## 小阶段明细

README 保留可直接检索的小阶段编号；更完整的角色、门禁和上下文恢复规则见 [AI_Schedule.md](AI_Schedule.md)，当前执行结果见 [PROGRESS.md](PROGRESS.md)。

| 小阶段 | 状态 | 交付重点 |
| --- | --- | --- |
| P0-I1 | 已完成 | 项目边界、目标用户、非目标范围、合规红线 |
| P0-I2 | 已完成 | 用户故事、核心指标、验收标准 |
| P0-I3 | 已完成 | 测试策略、质量门禁、许可证审计模板 |
| P0-I4 | 已完成 | context 恢复包初始化与 P1 接力 |
| P1-I1 | 已完成 | 信息架构和页面范围 |
| P1-I2 | 已完成 | 设计 token 和布局规则 |
| P1-I3 | 已完成 | 图表、组件和状态规范 |
| P1-I4 | 已完成 | 交互、响应式、可访问性和设计评审 |
| P2-I1 | 已完成 | 前端工程初始化 |
| P2-I2 | 已完成 | Mock 数据和共享类型 |
| P2-I3 | 已完成 | 运营总览页面 |
| P2-I4 | 已完成 | 店铺分析页面 |
| P2-I5 | 已完成 | 低效预警页面 |
| P2-I6 | 已完成 | 数字孪生 Demo 页面 |
| P2-I7 | 已完成 | E2E、响应式和演示打磨 |
| P2-I8 | 已完成 | 客群画像页面 |
| P2-I9 | 已完成 | CP2 前端 Demo 收口和交接 |
| P3-I1 | 已完成 | 工程化入口与项目规则收口 |
| P3-I2 | 已完成 | 根级质量门禁和本地检查脚本 |
| P3-I3 | 已完成 | GitHub Actions CI 配置和 Gitee 边界说明 |
| P3-I4 | 已完成 | 部署计划文档；不创建可运行 Compose |
| P4-I1 | 已完成 | 后端 API 契约和 MySQL 数据模型基线 |
| P4-I2 | 已完成 | 最小 FastAPI backend skeleton 和 health endpoint |
| P4-I3 | 已完成 | MySQL/Alembic 迁移基线 |
| P4-I4 | 已完成 | mall/floor/store 核心读取 API stub 和契约测试 |
| P4-I5 | 已完成 | 前端 typed reference API client 准备 |
| P4-I6 | 已完成 | overview API stub 和后端契约测试 |
| P4-I7 | 已完成 | overview API client 扩展 |
| P4-I8 | 已完成 | store detail API stub 和 client contract |
| P4-I9 | 已完成 | store score API stub 和 client contract |
| P4-I10 | 已完成 | store flow API stub 和 client contract |
| P4-I11 | 已完成 | store ranking API stub 和 client contract |
| P4-I12 | 已完成 | store alerts list API stub 和 client contract |
| P4-I13 | 已完成 | customer profile API stub 和 client contract |
| P4-I14 | 已完成 | heatmap API stub 和 client contract |
| P4-I15 | 已完成 | trajectories API stub 和 client contract |
| P4-I16 | 已完成 | CP4 closure review 和 MySQL readiness plan |
| P5-I1 | 已完成 | overview API-mode data loader contract |
| P5-I2 | 已完成 | DashboardPage API-mode state wiring |
| P5-I3 | 已完成 | Store Analysis API-mode data loader contract |
| P5-I4 | 已完成 | StoreAnalysisPage API-mode state wiring |
| P5-I5 | 已完成 | Store Alerts API-mode data loader contract |
| P5-I6 | 已完成 | StoreAlertsPage API-mode state wiring |
| P5-I7 | 已完成 | Customer Profile API-mode data loader contract |
| P5-I8 | 已完成 | CustomerProfilePage API-mode state wiring |
| P5-I9 | 已完成 | Digital Twin API-mode data loader contract |
| P5-I10 | 已完成 | DigitalTwinPage API-mode state wiring |
| P5-I11 | 已完成 | CP5 frontend API-mode integration closure review |
| P6-I1 | 已完成 | AI event schema and synthetic fixture boundary |
| P6-I2 | 已完成 | AI service implementation with synthetic fixtures |
| P6-I* | 规划中 | AI video MVP remaining increments; runtime service/model/video work requires later human-confirmed gates |
| P7-I* | 规划中 | 店铺经营评分 MVP，需后续拆分 |
| P8-I* | 规划中 | 客群、热力、动线分析，需后续拆分 |
| P9-I* | 规划中 | 3D / 2.5D 数字孪生可交付版，需后续拆分 |
| P10-I* | 规划中 | 工业级测试与安全加固，需后续拆分 |
| P11-I* | 规划中 | 部署与观测，需后续拆分 |
| P12-I* | 规划中 | 验收与移交，需后续拆分 |

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

截至 2026-05-25，已完成：

```text
P0-I1 项目边界与合规基线
P0-I2 指标、用户故事与验收标准
P0-I3 测试策略、质量门禁与许可证审计模板
P0-I4 context 恢复包初始化与下一阶段计划
P1-I1 信息架构与页面范围
P1-I2 设计 token 和布局规则
P1-I3 图表、组件和状态规范
P1-I4 交互、响应式和可访问性检查
P2-I1 前端工程初始化
P2-I2 Mock 数据和共享类型
P2-I3 运营总览页面
P2-I4 店铺分析页面
P2-I5 低效预警页面
P2-I6 数字孪生 Demo 页面
P2-I7 E2E、响应式和演示打磨
P2-I8 客群画像页面
P2-I9 CP2 前端 Demo 收口和交接
P3-I1 工程化入口与项目规则收口
P3-I2 根级质量门禁和本地检查脚本
P3-I3 GitHub Actions CI 配置和 Gitee 边界说明
P3-I4 部署计划文档
P4-I1 backend API contract and data model baseline
P4-I2 minimal FastAPI backend skeleton and health endpoint
P4-I3 MySQL/Alembic migration baseline
P4-I4 core read API stubs and contract tests
P4-I5 API/client integration preparation
P4-I6 overview API stub and contract tests
P4-I7 overview API client extension
P4-I8 store detail API stub and client contract
P4-I9 store score API stub and client contract
P4-I10 store flow API stub and client contract
P4-I11 store ranking API stub and client contract
P4-I12 store alerts list API stub and client contract
P4-I13 customer profile API stub and client contract
P4-I14 heatmap API stub and client contract
P4-I15 trajectories API stub and client contract
P4-I16 CP4 closure review and MySQL readiness plan
P5-I1 API mode overview data loader contract
P5-I2 dashboard API-mode state wiring
P5-I3 store analysis API-mode data loader contract
P5-I4 store analysis API-mode state wiring
P5-I5 store alerts API-mode data loader contract
P5-I6 store alerts API-mode state wiring
P5-I7 customer profile API-mode data loader contract
P5-I8 customer profile API-mode state wiring
P5-I9 digital twin API-mode data loader contract
P5-I10 digital twin API-mode state wiring
P5-I11 CP5 frontend API-mode integration closure review
P6-I1 AI event schema and synthetic fixture boundary
P6-I2 AI service implementation with synthetic fixtures
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

当前已实现的 AI 服务：

```text
ai-services/ 目录结构
OpenCV HOG 人物检测器 (Apache 2.0 许可证)
合成视频 fixture 生成器
人物检测事件输出
事件 schema 验证
20 个测试通过
```

当前边界：

```text
不连接真实 MySQL
不提交 .env 或真实凭据
不创建 docker-compose.yml、infra/ 或生产部署
AI 服务仅使用合成数据，不接真实视频
不接真实商场资料、真实品牌、人脸图像或个人轨迹
```

最近一次验证结果：

```text
backend pytest: 34 passed
ai-services pytest: 20 passed
npm run quality: passed
frontend tests in quality gate: 124 passed
backend tests in quality gate: 34 passed
npm run quality:audit: found 0 vulnerabilities
```

P6-I2 已完成：新增 `ai-services/` 目录，包含 FastAPI 应用、OpenCV HOG 人物检测器（Apache 2.0 许可证，无需外部权重）、合成视频 fixture 生成器、人物检测事件输出和事件 schema 验证。20 个测试通过，质量门禁通过。

P5-I4 已完成：`StoreAnalysisPage` 已接入 store-analysis loader 状态边界，新增 `frontend/src/pages/storeAnalysisState.ts`。默认仍先渲染 Mock mode；只有显式 `dataMode=api` 才触发 API mode，API 失败会回退到 mock store analysis 数据，测试不依赖 live backend，也不连接真实 MySQL。

P5-I5 已完成：新增 `frontend/src/api/storeAlertsDataLoader.ts`。Store Alerts loader 默认返回 Mock mode 数据；只有显式 API mode 才通过 typed client 调用 `listStoreAlerts(mallId)`，并用 `getStore(storeId)` 补齐相关店铺引用。测试使用注入 client/fetch，不依赖 live backend，也不连接真实 MySQL。

下一步增量是 `P5-I6 store alerts API-mode state wiring`：把 `StoreAlertsPage` 接到 store-alerts loader 状态边界，但仍保持 Mock mode 默认，不切换到真实 API。

P5-I6 已完成：新增 `frontend/src/pages/storeAlertsState.ts`，并把 `StoreAlertsPage` 接到 store-alerts loader 状态边界。默认仍先渲染 Mock mode；只有显式 `dataMode=api` 才触发 API mode，API 失败会回退到 mock store alerts 数据，测试不依赖 live backend，也不连接真实 MySQL。

下一步增量是 `P5-I7 customer profile API-mode data loader contract`：为 Customer Profile 增加 API mode 数据加载契约，但仍保持 Mock mode 默认，不切换到真实 API。

P5-I7 已完成：新增 `frontend/src/api/customerProfileDataLoader.ts`。Customer Profile loader 默认返回 Mock mode 数据；只有显式 API mode 才通过 typed client 调用 `getCustomerProfile(mallId)`，并把 API 的 `cat_*` 业态 ID、比例小数和 synthetic source 映射到前端领域模型。测试使用注入 client/fetch，不依赖 live backend，也不连接真实 MySQL。

下一步增量是 `P5-I8 customer profile API-mode state wiring`：把 `CustomerProfilePage` 接到 customer-profile loader 状态边界，但仍保持 Mock mode 默认，不切换到真实 API。

P5-I8 已完成：新增 `frontend/src/pages/customerProfileState.ts`，并把 `CustomerProfilePage` 接到 customer-profile loader 状态边界。默认仍先渲染 Mock mode；只有显式 `dataMode=api` 才触发 API mode，API 失败会回退到 mock customer profile 数据，测试不依赖 live backend，也不连接真实 MySQL。

P5-I9 接力增量是 `P5-I9 digital twin API-mode data loader contract`：为 Digital Twin 增加热力/动线 API mode 数据加载契约，但仍保持 Mock mode 默认，不切换到真实 API。

P5-I9 已完成：新增 `frontend/src/api/digitalTwinDataLoader.ts`。Digital Twin loader 默认返回 Mock heatmap/flow 数据；只有显式 API mode 才通过 typed client 调用 `getHeatmap(mallId)` 和 `getTrajectories(mallId)`，并把 API DTO 映射到前端 `HeatmapPoint` 与 `FlowEdge`。测试使用注入 client/fetch，不依赖 live backend，也不连接真实 MySQL。

下一步增量是 `P5-I10 digital twin API-mode state wiring`：把 `DigitalTwinPage` 接到 digital-twin loader 状态边界，但仍保持 Mock mode 默认，不切换到真实 API。

P5-I10 已完成：新增 `frontend/src/pages/digitalTwinState.ts`，并把 `DigitalTwinPage` 接到 digital-twin loader 状态边界。默认仍先渲染 Mock mode；只有显式 `dataMode=api` 才触发 API mode，API 失败会回退到 mock heatmap/flow 数据，测试不依赖 live backend，也不连接真实 MySQL。

P6-I1 已完成：新增 [docs/AI_EVENT_SCHEMA.md](docs/AI_EVENT_SCHEMA.md) 和 [docs/SYNTHETIC_FIXTURE_VALIDATION.md](docs/SYNTHETIC_FIXTURE_VALIDATION.md)，定义 AI event schema 和 synthetic fixture validation boundary。不创建 `ai-services/`，不选择模型权重，不导入数据集或真实视频。

下一步增量是 `P6-I2`（待定）：需要人类确认 AI 服务边界、模型选择、数据集、视频 fixture 和依赖后才能继续。

给 AI 的指令：

```text
请进行下一步
```

## 免责声明

本项目文档和演示内容用于课程设计、学习和项目规划，不构成法律、合规、隐私或商业咨询意见。若后续使用真实商场数据、监控视频、地图、平面图、品牌资产、第三方模型或对外发布成果，必须由权利人、课程负责人或具备资质的法律/合规人员确认授权和使用边界。
