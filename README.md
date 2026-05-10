# 商业综合体视觉 AI 数字孪生运营系统

本项目是面向商业综合体运营场景的视觉 AI 数字孪生系统规划。目标是把客流、进出店、停留、热力、动线、店铺评分和低效预警统一到可解释的运营视图中，辅助招商、调铺、营销、安保和现场运营决策。

当前仓库已完成 P0 项目基线、P1 设计规范阶段、P2-I1 前端工程初始化、P2-I2 Mock 数据与共享类型、P2-I3 运营总览页面、P2-I4 店铺分析页面、P2-I5 低效预警页面、P2-I6 数字孪生 Demo 页面、P2-I7 E2E/响应式/演示打磨和 P2-I8 客群画像页面：已有规划文档、需求分析、系统设计、测试策略、许可证审计、`context/` 恢复包、项目 skill、第三方声明、汇报稿、设计规范文档，以及 `frontend/` React + TypeScript + Vite 工程骨架、共享类型、虚构 Mock 数据、数据边界测试、核心演示流转测试、响应式 CSS 检查和 `/dashboard`、`/store-analysis`、`/store-alerts`、`/digital-twin`、`/customer-profile` 页面。尚未开始后端、AI 视频服务或部署工程编码。

## 文档入口

| 文件 | 读者 | 用途 |
| --- | --- | --- |
| [AGENT.md](AGENT.md) | AI | 每次 AI 开发必读入口：当前状态、必读顺序、执行规则、文档职责边界 |
| [AI_Schedule.md](AI_Schedule.md) | AI | P0-P12 路线图、增量拆分、角色模式、技术栈、测试门禁和许可证规则 |
| [PROGRESS.md](PROGRESS.md) | 人类 | 当前进度、已完成事项、下一步、当前风险和检查命令 |
| [IMPORTANT.md](IMPORTANT.md) | AI / 人类 | 非工程问题、付费工具、经济成本、版权、许可证、隐私和潜在侵权风险重点批注 |
| [docs/PRD_v1.md](docs/PRD_v1.md) | AI / 人类 | P0 产品需求基线 |
| [docs/REQUIREMENTS_ANALYSIS.md](docs/REQUIREMENTS_ANALYSIS.md) | AI / 人类 | 需求分析、需求分层、功能和非功能需求 |
| [docs/SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md) | AI / 人类 | 系统架构、模块、数据流、API 草案和部署草案 |
| [docs/design/SCREEN_LAYOUTS.md](docs/design/SCREEN_LAYOUTS.md) | AI / 人类 | P1-I1 信息架构、5 个核心页面范围、跳转关系、状态和素材策略 |
| [docs/design/DESIGN_TOKENS.md](docs/design/DESIGN_TOKENS.md) | AI / 人类 | P1-I2 颜色、字体、间距、状态色、图表色板和可访问性 token |
| [docs/design/UI_SPEC.md](docs/design/UI_SPEC.md) | AI / 人类 | P1-I2 App Shell、栅格、页面模板、卡片密度和响应式规则 |
| [docs/design/COMPONENT_SPEC.md](docs/design/COMPONENT_SPEC.md) | AI / 人类 | P1-I3 核心组件、页面状态、属性边界和 P2 测试关注点 |
| [docs/design/CHART_SPEC.md](docs/design/CHART_SPEC.md) | AI / 人类 | P1-I3 图表口径、图例、状态、可访问性和页面图表映射 |
| [docs/design/INTERACTION_SPEC.md](docs/design/INTERACTION_SPEC.md) | AI / 人类 | P1-I4 路由、筛选恢复、页面交互、键盘、响应式和可访问性规范 |
| [docs/design/DESIGN_REVIEW_CHECKLIST.md](docs/design/DESIGN_REVIEW_CHECKLIST.md) | AI / 人类 | P1-I4 设计评审清单和 P2 前端实现门禁 |
| [frontend/README.md](frontend/README.md) | AI / 人类 | P2 前端工程、Mock 数据、命令和边界 |
| [frontend/package.json](frontend/package.json) | AI | 前端依赖和 `lint/test/build/dev` 命令 |
| [docs/THIRD_PARTY_NOTICES.md](docs/THIRD_PARTY_NOTICES.md) | AI / 人类 | 当前已引用第三方工具、字体、素材或包的许可证记录 |
| [context/TODO_NEXT.md](context/TODO_NEXT.md) | AI | 下一步增量和短指令接力信息 |
| [skills/mall-vision-ai-delivery/SKILL.md](skills/mall-vision-ai-delivery/SKILL.md) | Codex | 本项目专用单 AI 增量迭代开发工作流 |
| [slides/project-intro.typ](slides/project-intro.typ) | 人类 | 课程或汇报用 Typst 演示稿源码 |
| [slides/slide.pdf](slides/slide.pdf) | 人类 | 已生成的项目介绍 PDF |

P0 已完成并新增 `context/` 恢复包。之后每次继续开发时，人类只需输入“请进行下一步”；AI 应先读 `AGENT.md`、`PROGRESS.md` 和 `context/TODO_NEXT.md`，自动判断当前增量。

## 项目范围

一期目标是先做可演示、可测试、可恢复的系统闭环：

- 运营总览：场内人数、累计客流、楼层状态、趋势和拥挤预警。
- 数字孪生：楼层、店铺、热力、预警和历史回放联动展示。
- 店铺分析：进店、停留、转化、评分、趋势和低效原因解释。
- 客群画像：匿名聚合的时间段、楼层、业态偏好和画像统计。
- 低效预警：C/D 级店铺、高客流低转化、连续下滑和异常数据提示。

暂不在第一轮扩大到多租户商业 SaaS、复杂招商推荐、完整 BIM 建模或真实监控系统上线。

## 开发模式

本项目采用单 AI 增量迭代开发模式。`P0` 到 `P12` 是长期路线图，实际执行必须拆成 `P0-I1`、`P0-I2` 这类小增量；每个增量由 AI 自动选择一个主角色模式，其他角色仅作为检查清单使用，避免并行拆分造成上下文分裂和接口冲突。

人类参与方式固定为：检查 AI 交付结果，提出必要修正；确认继续时只输入“请进行下一步”。AI 每次必须自动从 `PROGRESS.md` 和 `context/TODO_NEXT.md` 找到下一任务，并完成开发、测试、文档、context、风险和许可证记录更新。

| 阶段 | 主角色 | 目标 |
| --- | --- | --- |
| P0 | Product Mode | 项目基线与上下文恢复 |
| P1 | Design Mode | 设计规范与信息架构 |
| P2 | Frontend Mode | 前端 Demo MVP |
| P3 | DevOps Mode | 工程化骨架 |
| P4 | Backend Mode | 后端 API 与数据模型 |
| P5 | Frontend Mode | 前后端联调 |
| P6 | AI Video Mode | AI 视频识别 MVP |
| P7 | Backend Mode | 店铺经营评分 MVP |
| P8 | Data Mode | 客群、热力、动线分析 |
| P9 | Frontend Mode | 3D 数字孪生可交付版 |
| P10 | QA Mode | 工业级测试与安全加固 |
| P11 | DevOps Mode | 部署与观测 |
| P12 | Product Mode | 验收与移交 |

完整路线图、默认增量拆分和门禁见 [AI_Schedule.md](AI_Schedule.md)。

## 免费与合规原则

本项目当前不会用于商业化使用，但仍按可审计和低侵权风险标准执行：

- 不引入付费开发工具、付费云服务、付费 API、付费模型或付费素材，除非用户明确批准。
- 不使用来源不明的视频、图片、字体、地图、商场平面图、品牌 Logo、商户 Logo、监控画面、模型权重、数据集或复制代码。
- 优先使用 MIT、Apache-2.0、BSD、ISC、PostgreSQL License、CC0、CC-BY 等许可证清晰的资源；这里的 PostgreSQL License 只指许可证类型，不代表数据库选型。
- 真实商场资料、监控数据、人脸图像、品牌资产和对外发布内容必须经过授权或合规确认。
- 新增第三方内容必须记录到 [docs/THIRD_PARTY_NOTICES.md](docs/THIRD_PARTY_NOTICES.md)，重点风险同步记录到 [IMPORTANT.md](IMPORTANT.md)。

## 环境约束

后续实现阶段需要遵守以下固定约束：

- 数据库统一使用 MySQL；后端数据模型、迁移、连接串、容器服务和部署文档都按 MySQL 设计。
- 后续创建 Python 后端或 AI 服务时必须重新创建虚拟环境，不复用旧 `venv`。
- 任何需要 `sudo`、系统包安装、系统服务管理或提权修改的命令，AI 必须停下来说明命令和目的，由人类手动执行后再继续。

## 当前下一步

下一步应执行 `P2-I9`，做 CP2 前端 Demo 收口和交接。

给 AI 的指令：

```text
请进行下一步
```

AI 收到后必须自动读取项目文档、`frontend/` 和 `context/TODO_NEXT.md`，执行 `P2-I9`：CP2 前端 Demo 收口和交接。P2-I9 只做五个核心页面的演示路径、检查说明、测试报告摘要和下一阶段接力；不要创建后端、AI 视频服务或部署工程，不接真实 API、真实视频、真实商场平面图、真实商场素材或个人轨迹。

## 当前检查方法

当前检查文档、第三方声明、skill、演示稿文件和前端基础门禁：

```bash
test -f AGENT.md
test -f README.md
test -f AI_Schedule.md
test -f PROGRESS.md
test -f IMPORTANT.md
test -f docs/THIRD_PARTY_NOTICES.md
test -f docs/PRD_v1.md
test -f docs/REQUIREMENTS_ANALYSIS.md
test -f docs/SYSTEM_DESIGN.md
test -f docs/LICENSE_AUDIT.md
test -f docs/design/SCREEN_LAYOUTS.md
test -f docs/design/DESIGN_TOKENS.md
test -f docs/design/UI_SPEC.md
test -f docs/design/COMPONENT_SPEC.md
test -f docs/design/CHART_SPEC.md
test -f docs/design/INTERACTION_SPEC.md
test -f docs/design/DESIGN_REVIEW_CHECKLIST.md
test -f frontend/package.json
test -f frontend/package-lock.json
test -f frontend/src/App.tsx
test -f frontend/src/components/AppShell.tsx
test -f frontend/src/types/domain.ts
test -f frontend/src/mock/mockOverview.ts
test -f frontend/src/mock/mockData.test.ts
test -f frontend/src/pages/DashboardPage.tsx
test -f frontend/src/pages/DashboardPage.test.ts
test -f frontend/src/pages/StoreAnalysisPage.tsx
test -f frontend/src/pages/StoreAnalysisPage.test.ts
test -f frontend/src/pages/StoreAlertsPage.tsx
test -f frontend/src/pages/StoreAlertsPage.test.ts
test -f frontend/src/pages/DigitalTwinPage.tsx
test -f frontend/src/pages/DigitalTwinPage.test.ts
test -f frontend/src/routes/demoFlow.test.ts
test -f frontend/src/styles/responsiveChecks.test.ts
test -f context/TODO_NEXT.md
test -f skills/mall-vision-ai-delivery/SKILL.md
test -f skills/mall-vision-ai-delivery/agents/openai.yaml
test -f slides/project-intro.typ
test -f slides/slide.pdf
rg -n "P2-I9|CP2|frontend demo closure|阶段收口|请进行下一步|MySQL|sudo|虚拟环境" PROGRESS.md context/TODO_NEXT.md AGENT.md README.md
cd frontend
npm run lint
npm run test
npm run build
npm audit --audit-level=high
```

## 免责声明

本项目文档和演示内容用于课程设计、学习和项目规划，不构成法律、合规、隐私或商业咨询意见。若后续使用真实商场数据、监控视频、地图、平面图、品牌资产、第三方模型或对外发布成果，必须由权利人、课程负责人或具备资质的法律/合规人员确认授权和使用边界。
