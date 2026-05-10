# TODO Next

更新时间：2026-05-10

## 下一增量

```text
P2-I9 CP2 frontend demo closure and handoff
```

## 推荐人类指令

```text
请进行下一步
```

## AI 自动续作说明

收到“请进行下一步”后，AI 必须读取：

```text
AGENT.md
README.md
PROGRESS.md
AI_Schedule.md
IMPORTANT.md
docs/PRD_v1.md
docs/REQUIREMENTS_ANALYSIS.md
docs/SYSTEM_DESIGN.md
docs/design/SCREEN_LAYOUTS.md
docs/design/DESIGN_TOKENS.md
docs/design/UI_SPEC.md
docs/design/COMPONENT_SPEC.md
docs/design/CHART_SPEC.md
docs/design/INTERACTION_SPEC.md
docs/design/DESIGN_REVIEW_CHECKLIST.md
frontend/
context/*.md
```

## 已完成增量

```text
P1-I1 information architecture and page scope
P1-I2 design tokens and layout rules
P1-I3 charts, components, and UI states
P1-I4 interaction, responsive, accessibility, and design review
P2-I1 frontend project initialization
P2-I2 mock data and shared types
P2-I3 operations overview dashboard
P2-I4 store analysis page
P2-I5 store alerts page
P2-I6 digital twin demo page
P2-I7 E2E, responsive checks, and demo polish
P2-I8 customer profile page
```

已创建：

```text
frontend/src/components/MetricCard.tsx
frontend/src/components/StatusBadge.tsx
frontend/src/components/SummaryStrip.tsx
frontend/src/components/TrendSparkline.tsx
frontend/src/components/ScoreBreakdown.tsx
frontend/src/components/StoreList.tsx
frontend/src/components/AlertList.tsx
frontend/src/components/AlertDetail.tsx
frontend/src/components/FloorPlan.tsx
frontend/src/components/TwinInspector.tsx
frontend/src/components/scoreBreakdownUtils.ts
frontend/src/routes/demoFlow.ts
frontend/src/routes/demoFlow.test.ts
frontend/src/styles/responsiveChecks.test.ts
frontend/src/pages/DashboardPage.tsx
frontend/src/pages/DashboardPage.test.ts
frontend/src/pages/dashboardModel.ts
frontend/src/pages/StoreAnalysisPage.tsx
frontend/src/pages/StoreAnalysisPage.test.ts
frontend/src/pages/storeAnalysisModel.ts
frontend/src/pages/StoreAlertsPage.tsx
frontend/src/pages/StoreAlertsPage.test.ts
frontend/src/pages/storeAlertsModel.ts
frontend/src/pages/DigitalTwinPage.tsx
frontend/src/pages/DigitalTwinPage.test.ts
frontend/src/pages/digitalTwinModel.ts
frontend/src/pages/CustomerProfilePage.tsx
frontend/src/pages/CustomerProfilePage.test.ts
frontend/src/pages/customerProfileModel.ts
frontend/src/types/
frontend/src/mock/
```

已覆盖：

```text
前端工程骨架：React + TypeScript + Vite、5 个核心路由、AppShell、CSS token、Node 内置测试、lint/test/build 脚本
共享类型：Mall、Floor、Store、StoreScore、StoreAlert、CustomerProfile、OverviewMetric、HeatmapPoint、FlowEdge
虚构 Mock 数据：1 个商场、5 个楼层、100 家店铺、8 种业态、20 条预警、运营总览、热力点、流向线、匿名聚合画像
运营总览页面：KPI 条、客流趋势、楼层状态、低效店铺榜、告警摘要、Mock 数据说明
店铺分析页面：筛选摘要、店铺列表、店铺详情、评分拆解、低效原因、关联告警和空间位置入口
低效预警页面：告警列表、筛选摘要、告警详情、处理建议、状态统计、店铺分析入口和空间位置入口
数字孪生页面：楼层切换、模式切换、自绘平面、热力点、流向线、告警标记、评分显示、店铺选中和空间检查器
客群画像页面：匿名聚合摘要、时段分布、楼层偏好、业态偏好、隐私口径、小样本隐藏和 drill-down
核心演示流转：/dashboard -> /digital-twin -> /store-analysis -> /store-alerts 的 query 构造和全局参数保留
客群画像流转：/customer-profile -> /digital-twin?mode=flow 和 /customer-profile -> /store-analysis?category=...
响应式检查：1199px/767px 断点、布局堆叠、表格横向滚动、SVG 数字孪生平面、画像时段图横向滚动和长文本防溢出
```

## P2-I9 目标

进入 QA Mode，完成 CP2 前端 Demo 收口和交接。P2-I9 只做五个核心页面的阶段检查、演示路径说明、测试报告摘要和下一阶段接力，不实现后端、AI 服务或部署工程。

建议创建或更新：

```text
README.md
frontend/README.md
PROGRESS.md
context/PROJECT_STATE.md
context/FRONTEND_STATE.md
context/TEST_STATE.md
context/RISKS_AND_ASSUMPTIONS.md
context/DECISIONS_LOG.md
context/TODO_NEXT.md
```

可选新增文档：

```text
docs/FRONTEND_DEMO_HANDOFF.md
```

建议内容：

```text
五个核心页面清单和可演示入口
推荐演示路径：/dashboard -> /digital-twin -> /store-analysis -> /store-alerts，以及 /customer-profile -> /digital-twin /store-analysis
每个页面的数据来源、Mock 边界、隐私和素材边界
当前测试命令和最近通过结果
P2 Demo 已知缺口：无真实 API、无后端、无 AI 服务、无 CI、无浏览器 E2E
P3 工程化骨架的下一步拆分建议
```

## 禁止事项

```text
不要创建 backend/
不要创建 ai-services/
不要创建 infra/
不要接真实 API
不要接真实视频流
不要接真实会员、支付、画像或轨迹数据
不要展示个人轨迹、个人身份、人脸、会员 ID 或个人画像
不要使用真实商场平面图、真实地图、真实 BIM 或真实商场素材
不要新增真实品牌 Logo、监控视频或个人图像
不要引入付费工具、付费服务、付费素材或需要账号绑定的云服务
不要使用 PostgreSQL 作为数据库；后续数据库统一使用 MySQL
不要复用旧 Python 虚拟环境；进入 backend/ 或 ai-services/ 时重新创建 venv
不要执行 sudo；遇到 sudo 或系统级提权命令时必须停下来让人类执行
```

## P2-I9 检查建议

```bash
cd frontend
npm run lint
npm run test
npm run build
npm audit --audit-level=high
find /home/ljh/project/subway -maxdepth 1 -type d \( -name backend -o -name ai-services -o -name infra \)
rg -n "不使用真实监控画面|不存储人脸原图|不展示个人轨迹|不使用未授权商场平面图|不使用真实品牌|不引入付费" docs context IMPORTANT.md
```
