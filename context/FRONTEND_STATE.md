# Frontend State

更新时间：2026-05-10

## 当前状态

P2-I1 前端工程初始化和 P2-I2 Mock 数据与共享类型已完成。当前 `frontend/` 是 React + TypeScript + Vite 工程，已有 5 个核心路由占位、AppShell、CSS token、共享领域类型、虚构 Mock 数据和 Node 内置数据边界测试。

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
frontend/src/routes/routeConfig.ts
frontend/src/routes/routeConfig.test.ts
frontend/src/pages/PageScaffold.tsx
frontend/src/pages/DashboardPage.tsx
frontend/src/pages/DigitalTwinPage.tsx
frontend/src/pages/StoreAnalysisPage.tsx
frontend/src/pages/CustomerProfilePage.tsx
frontend/src/pages/StoreAlertsPage.tsx
frontend/src/styles/tokens.css
frontend/src/styles/global.css
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

目前 5 个页面仍是占位页，下一步从 `/dashboard` 开始实现业务页面。

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

结果：通过。`npm audit --audit-level=high` 在沙箱内因 DNS `EAI_AGAIN` 失败，经用户权限规则允许联网后通过，结果为 `found 0 vulnerabilities`。

## 下一步

P2-I3 实现运营总览页面。范围限定在 `/dashboard` 所需页面内容、轻量组件、样式和测试：KPI 条、客流趋势、楼层状态、低效店铺榜、告警摘要、Mock 数据说明和基础状态。不要实现其他完整业务页面，不接真实 API，不创建 `backend/`、`ai-services/` 或 `infra/`。
