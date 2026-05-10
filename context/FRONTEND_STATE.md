# Frontend State

更新时间：2026-05-10

## 当前状态

P2-I1 前端工程初始化、P2-I2 Mock 数据与共享类型、P2-I3 运营总览页面、P2-I4 店铺分析页面、P2-I5 低效预警页面、P2-I6 数字孪生 Demo 页面、P2-I7 E2E/响应式/演示打磨、P2-I8 客群画像页面已完成。当前 `frontend/` 是 React + TypeScript + Vite 工程，已有 5 个核心路由、AppShell、CSS token、共享领域类型、虚构 Mock 数据、Node 内置数据边界测试、核心演示流转测试、响应式 CSS 检查，以及 `/dashboard`、`/store-analysis`、`/store-alerts`、`/digital-twin`、`/customer-profile` 五个业务页面。

## 已完成文件

```text
frontend/README.md
frontend/package.json
frontend/package-lock.json
frontend/index.html
frontend/vite.config.ts
frontend/tsconfig.json
frontend/tsconfig.app.json
frontend/tsconfig.node.json
frontend/src/main.tsx
frontend/src/App.tsx
frontend/src/components/AppShell.tsx
frontend/src/components/MetricCard.tsx
frontend/src/components/SummaryStrip.tsx
frontend/src/components/StatusBadge.tsx
frontend/src/components/TrendSparkline.tsx
frontend/src/components/ScoreBreakdown.tsx
frontend/src/components/StoreList.tsx
frontend/src/components/AlertList.tsx
frontend/src/components/AlertDetail.tsx
frontend/src/components/FloorPlan.tsx
frontend/src/components/TwinInspector.tsx
frontend/src/components/scoreBreakdownUtils.ts
frontend/src/routes/routeConfig.ts
frontend/src/routes/routeConfig.test.ts
frontend/src/routes/demoFlow.ts
frontend/src/routes/demoFlow.test.ts
frontend/src/pages/PageScaffold.tsx
frontend/src/pages/DashboardPage.tsx
frontend/src/pages/DashboardPage.test.ts
frontend/src/pages/dashboardModel.ts
frontend/src/pages/DigitalTwinPage.tsx
frontend/src/pages/DigitalTwinPage.test.ts
frontend/src/pages/digitalTwinModel.ts
frontend/src/pages/StoreAnalysisPage.tsx
frontend/src/pages/StoreAnalysisPage.test.ts
frontend/src/pages/storeAnalysisModel.ts
frontend/src/pages/StoreAlertsPage.tsx
frontend/src/pages/StoreAlertsPage.test.ts
frontend/src/pages/storeAlertsModel.ts
frontend/src/pages/CustomerProfilePage.tsx
frontend/src/pages/CustomerProfilePage.test.ts
frontend/src/pages/customerProfileModel.ts
frontend/src/styles/tokens.css
frontend/src/styles/global.css
frontend/src/styles/responsiveChecks.test.ts
frontend/src/types/domain.ts
frontend/src/types/index.ts
frontend/src/mock/mockMall.ts
frontend/src/mock/mockFloors.ts
frontend/src/mock/mockStores.ts
frontend/src/mock/mockAlerts.ts
frontend/src/mock/mockOverview.ts
frontend/src/mock/mockCustomerProfile.ts
frontend/src/mock/linkMockRelations.ts
frontend/src/mock/index.ts
frontend/src/mock/mockData.test.ts
```

## 当前 Mock 数据

```text
1 个虚构商场：示范商业中心
5 个虚构楼层
100 家虚构店铺
8 种通用业态
20 条虚构预警
运营总览 KPI、客流趋势、楼层摘要
热力点和流向线
匿名聚合客群画像
```

数据不包含真实商场、真实品牌、商户 Logo、真实地图、监控视频、人物图像、人脸、会员 ID 或个人轨迹。

## 当前路由

```text
/dashboard
/digital-twin
/store-analysis
/customer-profile
/store-alerts
```

五个核心路由均已完成业务页面：

```text
/dashboard          运营总览
/digital-twin       数字孪生 Demo
/store-analysis     店铺分析
/customer-profile   客群画像
/store-alerts       低效预警
```

## 前端约束

```text
React + TypeScript + Vite
P2 当前不新增图表库、3D 库、图标库或字体文件
Mock mode first, API mode later
routes preserve mallId, timeRange, floorId, storeId, category, alertId when relevant
no real mall floor plans, real brands, merchant logos, surveillance footage, or personal images
light operational UI, 12-column desktop grid, fixed app shell, responsive fallbacks
status and warning cannot rely on color alone
components and charts must expose loading, empty, error, permission, partial, stale states
charts must include unit, legend, metric definition, text summary or table fallback
keyboard interaction, visible focus, aria-label, chart summaries, table fallback and reduced motion are required
```

## 最近检查

```bash
cd frontend
npm run lint
npm run test
npm run build
npm audit --audit-level=high
```

结果：通过。`npm audit --audit-level=high` 在沙箱内因 DNS `EAI_AGAIN` 失败，经权限规则允许联网后通过，结果为 `found 0 vulnerabilities`。

## P2-I3 已完成

```text
KPI 条：当前场内人数、今日累计客流、峰值客流、拥挤指数、未处理告警
客流趋势：SVG 折线和文字摘要，不新增图表库
楼层状态：按拥挤指数排序，保留跳转数字孪生的 floorId/mode 参数
低效店铺榜：展示 C/D 店铺、评分、业态、楼层、转化和原因
告警摘要：展示等级、处理状态、位置、持续时间和建议动作
路由 helper 支持页面 query 与全局 mallId/timeRange 合并
```

## P2-I4 已完成

```text
筛选摘要：楼层、业态、评分等级、关键词和当前选中店铺
店铺列表：店铺名、楼层、业态、评分、等级、转化率、告警数
店铺详情：曝光、进店、转化、停留、店内人数、评分和趋势
评分拆解：客流、转化、停留、趋势四个分项，显示权重和贡献
低效原因：高曝光低进店、转化低、停留短、连续下滑、数据质量
关联入口：空间位置跳转到 /digital-twin，相关告警跳转到 /store-alerts
```

## P2-I5 已完成

```text
告警列表：标题、等级、状态、店铺、楼层、持续时间和触发指标
筛选摘要：等级、状态、楼层、店铺、关键词和当前选中告警
告警详情：风险等级、处理状态、持续时间、触发指标、影响位置和 Mock 边界
处理建议：运营巡检、转化优化、现场分流、采集配置和数据质量复核
关联入口：店铺分析跳转到 /store-analysis，空间位置跳转到 /digital-twin
```

## P2-I6 已完成

```text
筛选摘要：商场、时间、楼层、模式、选中店铺、选中告警和 Mock geometry 边界
楼层切换：按 mockFloors 切换 floorId，并保留当前 mode
模式切换：heatmap、flow、alerts、score 四种 query mode
自绘平面：SVG 绘制楼层边界、走廊、店铺几何和图例
热力模式：展示当前楼层 mockHeatmapPoints 的位置和强度
动线模式：展示当前楼层 mockFlowEdges 的方向、流量和箭头
告警模式：展示当前楼层告警标记，跳转 /store-alerts
评分模式：展示店铺评分和等级，支持选中店铺
空间检查器：展示楼层状态、选中店铺、关联告警和跳转入口
```

## P2-I7 已完成

```text
演示流转 helper：统一构造 /dashboard、/digital-twin、/store-analysis、/store-alerts 核心路径
Query 检查：覆盖 mallId、timeRange、floorId、storeId、alertId、mode 的保留和覆盖规则
页面链接统一：Dashboard、Digital Twin、Store Analysis、Store Alerts 复用 demoFlow helper
响应式防溢出：长文本、按钮、筛选标签、数字孪生平面和 SVG 容器补充约束
响应式测试：覆盖 1199px、767px 断点、布局堆叠、表格横向滚动、SVG 高度和长文本控制
依赖边界：未新增 Playwright/Vitest/浏览器依赖，继续使用 Node 内置测试
```

## P2-I8 已完成

```text
客群画像 view model：构建摘要指标、时段分布、楼层偏好、业态偏好、筛选摘要、隐私边界和状态
画像摘要：活跃时段、热门业态、主要楼层、复访倾向
时段分布：自绘轻量柱状图，标记峰值时段并提供文字摘要
楼层偏好：按客流占比排序，点击跳转 /digital-twin?floorId=...&mode=flow
业态偏好：按客流占比排序，点击跳转 /store-analysis?category=...
隐私口径：匿名聚合、无会员 ID、无人脸、无个人轨迹、小样本隐藏
测试覆盖：view model、排序/筛选、隐私文案、drill-down query、空态和小样本状态
```

## 下一步

P2-I9 做 CP2 前端 Demo 收口和交接。范围限定在五个核心页面演示路径、测试报告摘要、已知缺口、文档接力和 P3 准备；不要实现其他业务页面，不接真实 API，不创建 `backend/`、`ai-services/` 或 `infra/`，不要展示个人轨迹、会员身份、人脸、真实商场素材或真实品牌。
