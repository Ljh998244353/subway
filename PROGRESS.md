# 项目进度一览

更新时间：2026-05-10

## 当前结论

当前已完成：

```text
P0 项目基线与上下文恢复
P0 额外需求分析文档和系统设计文档
P1 设计规范阶段
P2-I1 frontend project initialization
P2-I2 mock data and shared types
P2-I3 operations overview dashboard
P2-I4 store analysis page
P2-I5 store alerts page
P2-I6 digital twin demo page
P2-I7 E2E, responsive checks, and demo polish
P2-I8 customer profile page
Slidev 功能介绍演示稿
```

`frontend/` 已包含 React + TypeScript + Vite 工程骨架、5 个核心业务页面、AppShell、CSS token、共享 TypeScript 类型、虚构 Mock 数据、Node 内置测试、核心演示流转 helper、响应式 CSS 检查和 `/dashboard`、`/store-analysis`、`/store-alerts`、`/digital-twin`、`/customer-profile` 页面。下一步建议执行 `P2-I9 CP2 frontend demo closure and handoff`，做前端 Demo 阶段收口、检查说明和后续 P3 接力。

## 当前状态

| 项目 | 状态 | 说明 |
| --- | --- | --- |
| README 项目入口 | 已更新 | 当前下一步已指向 P2-I9 |
| AGENT AI 必读入口 | 已更新 | 保留短指令接力规则，下一步为 P2-I9 |
| IMPORTANT 重点风险 | 已检查 | P2-I8 未新增风险；继续保留隐私、侵权、许可证、MySQL、Python venv、sudo 规则 |
| P0 PRD / 需求 / 系统设计 | 已完成 | `docs/PRD_v1.md`、`docs/REQUIREMENTS_ANALYSIS.md`、`docs/SYSTEM_DESIGN.md` |
| P1 设计规范 | 已完成 | 信息架构、设计 token、UI、组件、图表、交互、响应式、可访问性和设计评审 |
| P2-I1 前端工程初始化 | 已完成 | React + TypeScript + Vite、5 个路由、AppShell、CSS token、基础测试、依赖许可证记录 |
| P2-I2 Mock 数据和共享类型 | 已完成 | 共享领域类型、1 个虚构商场、5 个楼层、100 家店铺、8 种业态、20 条预警、热力点、流向线、匿名聚合画像和边界测试 |
| P2-I3 运营总览页面 | 已完成 | `/dashboard` 已展示 KPI、客流趋势、楼层状态、低效店铺榜、告警摘要和 Mock 数据说明 |
| P2-I4 店铺分析页面 | 已完成 | `/store-analysis` 已展示筛选摘要、店铺列表、店铺详情、评分拆解、低效原因和关联入口 |
| P2-I5 低效预警页面 | 已完成 | `/store-alerts` 已展示告警列表、筛选摘要、告警详情、处理建议、状态统计和关联入口 |
| P2-I6 数字孪生 Demo 页面 | 已完成 | `/digital-twin` 已展示自绘楼层平面、热力、动线、告警、评分、店铺选中和空间检查器 |
| P2-I7 QA 打磨 | 已完成 | 已补核心演示流转 helper、跨页 query 测试、响应式 CSS 检查和防溢出样式 |
| P2-I8 客群画像页面 | 已完成 | `/customer-profile` 已展示匿名聚合摘要、时段分布、楼层偏好、业态偏好、隐私口径和 drill-down |
| context 恢复包 | 已更新 | `context/TODO_NEXT.md` 已指向 P2-I9 |
| 第三方声明 / 许可证审计 | 已检查 | P2-I8 未新增第三方依赖、字体、图标、图片、视频、模型或数据集，无需新增条目 |
| 后端 API | 未开始 | 还没有 `backend/` 工程 |
| AI 视频识别 | 未开始 | 还没有 `ai-services/` 工程 |
| 部署 | 未开始 | 还没有 `infra/`、Docker 或 CI |

## P2-I8 新增文件

```text
frontend/src/pages/customerProfileModel.ts
frontend/src/pages/CustomerProfilePage.test.ts
```

## P2-I8 修改文件

```text
frontend/package.json
frontend/src/pages/CustomerProfilePage.tsx
frontend/src/routes/demoFlow.ts
frontend/src/routes/demoFlow.test.ts
frontend/src/styles/global.css
frontend/src/styles/responsiveChecks.test.ts
AGENT.md
README.md
AI_Schedule.md
PROGRESS.md
frontend/README.md
context/PROJECT_STATE.md
context/REQUIREMENTS_CURRENT.md
context/ARCHITECTURE_CURRENT.md
context/DATA_MODEL_CURRENT.md
context/API_CONTRACT_CURRENT.md
context/FRONTEND_STATE.md
context/BACKEND_STATE.md
context/AI_ALGORITHM_STATE.md
context/DEPLOYMENT_STATE.md
context/TEST_STATE.md
context/RISKS_AND_ASSUMPTIONS.md
context/DECISIONS_LOG.md
context/TODO_NEXT.md
```

## 本次 P2-I8 检查结果

| 检查 | 结果 |
| --- | --- |
| 客群画像 view model | 通过，新增 `customerProfileModel.ts`，统一构建摘要指标、时段分布、楼层偏好、业态偏好、筛选摘要、隐私边界和空态/小样本状态 |
| 页面实现 | 通过，`/customer-profile` 已替换占位页，展示活跃时段、热门业态、主要楼层、复访倾向、时段柱状图、楼层偏好、业态偏好和隐私口径 |
| Drill-down | 通过，楼层偏好跳转 `/digital-twin?floorId=...&mode=flow`，业态偏好跳转 `/store-analysis?category=...`，并保留全局 `mallId/timeRange` |
| 隐私边界 | 通过，页面和测试明确匿名聚合、无会员 ID、无人脸、无个人轨迹、小样本隐藏 |
| 响应式 | 通过，补充画像页栅格、时段图横向滚动、偏好行移动端单列和 CSS 检查 |
| 依赖边界 | 通过，未新增图表库、图标库、测试框架、图片、视频、字体、模型或数据集 |
| 类型检查 | 通过，`npm run lint` |
| 单元测试 | 通过，`npm run test`，9 个测试文件全部通过 |
| 生产构建 | 通过，`npm run build`；Vite 仅提示 React Router 依赖内 `"use client"` 指令被忽略，不影响构建 |
| npm 高危安全审计 | 通过，`npm audit --audit-level=high` 联网重试后返回 `found 0 vulnerabilities` |
| 工程边界 | 通过，未创建 `backend/`、`ai-services/`、`infra/`，未接真实 API、真实视频、真实商场素材、真实品牌或个人轨迹 |
| 下一步接力 | 通过，`context/TODO_NEXT.md`、`AGENT.md`、`README.md` 已指向 P2-I9 |

说明：`npm audit --audit-level=high` 在沙箱内因 DNS `EAI_AGAIN` 失败，随后按权限规则联网重试并通过。

## 当前最大风险

```text
当前没有后端、AI 服务和 CI，无法运行业务接口测试、AI 验证测试或流水线测试
当前前端仍没有浏览器 E2E 和组件测试框架；P2-I9 可先做无新增依赖的阶段收口，后续如引入 Playwright/Vitest 必须先审计
后续最容易侵权的位置是：真实商场平面图、品牌 Logo、商户 Logo、监控视频、人物图像、网页素材、模型权重和第三方代码片段
后续最容易产生隐私风险的位置是：视频识别、人脸、轨迹、顾客画像、日志和数据留存
后续新增依赖、模型、素材、字体、图标、数据集或外部服务时，必须同步更新 docs/THIRD_PARTY_NOTICES.md 和 docs/LICENSE_AUDIT.md
后续数据库统一使用 MySQL，不按 PostgreSQL 规划
后续 Python backend/ 或 ai-services/ 开发必须重新创建虚拟环境
需要 sudo 或系统级提权命令时，AI 必须停下来，让人类执行
P2-I9 仍不得使用真实商场平面图、真实品牌、真实视频、真实地图、真实 BIM、个人图像或个人轨迹
```

## 当前检查方法

### 1. 检查关键文件

```bash
test -f AGENT.md
test -f README.md
test -f AI_Schedule.md
test -f PROGRESS.md
test -f IMPORTANT.md
test -f docs/THIRD_PARTY_NOTICES.md
test -f docs/LICENSE_AUDIT.md
test -f docs/PRD_v1.md
test -f docs/REQUIREMENTS_ANALYSIS.md
test -f docs/SYSTEM_DESIGN.md
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
test -f frontend/src/routes/demoFlow.ts
test -f frontend/src/routes/demoFlow.test.ts
test -f frontend/src/styles/responsiveChecks.test.ts
test -f frontend/src/pages/DashboardPage.tsx
test -f frontend/src/pages/StoreAnalysisPage.tsx
test -f frontend/src/pages/StoreAlertsPage.tsx
test -f frontend/src/pages/DigitalTwinPage.tsx
test -f frontend/src/pages/CustomerProfilePage.tsx
test -f frontend/src/pages/CustomerProfilePage.test.ts
test -f frontend/src/pages/customerProfileModel.ts
test -f context/TODO_NEXT.md
```

### 2. 检查合规红线

```bash
rg -n "不使用真实监控画面|不存储人脸原图|不展示个人轨迹|不使用未授权商场平面图|不使用真实品牌|不引入付费" docs context IMPORTANT.md
```

### 3. 检查下一步接力

```bash
rg -n "P2-I9|CP2|frontend demo closure|阶段收口|请进行下一步|MySQL|sudo|虚拟环境" PROGRESS.md context/TODO_NEXT.md AGENT.md README.md
```

### 4. 检查前端工程

```bash
cd frontend
npm run lint
npm run test
npm run build
npm audit --audit-level=high
```

### 5. 检查工程边界

```bash
find /home/ljh/project/subway -maxdepth 1 -type d \( -name backend -o -name ai-services -o -name infra \)
```

期望输出为空。

## 下一步应该做什么

执行 `P2-I9 CP2 frontend demo closure and handoff`。

下一步只做前端 Demo 阶段收口和交接，不要创建后端、AI 服务或部署工程，不要接真实 API、真实视频、真实商场素材或个人级轨迹。

建议产出：

```text
前端 Demo 页面清单和演示路径说明
五个核心页面的检查清单
P2 当前测试报告摘要
README / frontend README / PROGRESS / context 接力更新
必要时补充轻量演示入口或文档，不新增依赖
```

建议检查：

```text
5 个核心路由均可访问
核心 drill-down 覆盖 /dashboard -> /digital-twin -> /store-analysis -> /store-alerts，以及 /customer-profile -> /digital-twin /store-analysis
隐私与素材边界仍可被文档和页面文本查到
npm run lint/test/build/audit 通过
未创建 backend/、ai-services/、infra/
```

## 给人类使用的下一步指令

人类下一次只需要输入：

```text
请进行下一步
```

AI 收到后必须自动读取 `AGENT.md`、`README.md`、`PROGRESS.md`、`AI_Schedule.md`、`IMPORTANT.md`、`frontend/` 和 `context/*.md`，然后按 `context/TODO_NEXT.md` 执行 `P2-I9`。

## 给下一个 AI 的接力信息

```text
人类只会输入“请进行下一步”。AI 必须使用 mall-vision-ai-delivery 工作流，先阅读 AGENT.md、README.md、PROGRESS.md、AI_Schedule.md、IMPORTANT.md、docs/PRD_v1.md、docs/REQUIREMENTS_ANALYSIS.md、docs/SYSTEM_DESIGN.md、docs/design/SCREEN_LAYOUTS.md、docs/design/DESIGN_TOKENS.md、docs/design/UI_SPEC.md、docs/design/COMPONENT_SPEC.md、docs/design/CHART_SPEC.md、docs/design/INTERACTION_SPEC.md、docs/design/DESIGN_REVIEW_CHECKLIST.md、frontend/ 和 context/*.md；然后执行 context/TODO_NEXT.md 指定的 P2-I9：CP2 frontend demo closure and handoff。P2-I9 只做前端 Demo 收口、检查说明和接力文档；不要创建 backend、ai-services 或 infra，不要接真实 API、真实视频、真实告警记录、真实商场平面图、真实地图、真实 BIM、真实商场素材、个人图像或个人轨迹。后续数据库统一使用 MySQL；进入 Python backend/ 或 ai-services/ 开发时必须重新创建虚拟环境；需要 sudo 时必须停下来让人类执行。完成后更新 PROGRESS.md、context/TODO_NEXT.md 和必要风险记录。
```
