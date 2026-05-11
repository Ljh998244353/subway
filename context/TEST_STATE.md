# Test State

更新时间：2026-05-11

## 当前状态

P0 与 P1 使用文档和结构检查。P2-I1 已创建前端工程基础测试，P2-I2 已补充 Mock 数据边界测试，P2-I3 已补充 Dashboard view model 与路由测试，P2-I4 已补充 Store Analysis view model 与路由测试，P2-I5 已补充 Store Alerts view model 与路由测试，P2-I6 已补充 Digital Twin view model 与空间边界测试，P2-I7 已补充核心演示流转和响应式 CSS 检查，P2-I8 已补充 Customer Profile view model、drill-down、隐私和空态测试，P2-I9 已补充 CP2 Demo readiness 测试和前端交接检查。当前没有后端、AI 服务、CI、浏览器 E2E 或覆盖率统计。

## 当前前端测试命令

```bash
cd frontend
npm run lint
npm run test
npm run build
npm audit --audit-level=high
```

当前结果：

| 命令 | 结果 |
| --- | --- |
| `npm run lint` | 通过，执行 `tsc -b --pretty false` |
| `npm run test` | 通过，执行 `src/routes/routeConfig.test.ts`、`src/routes/demoFlow.test.ts`、`src/routes/demoReadiness.test.ts`、`src/mock/mockData.test.ts`、`src/pages/DashboardPage.test.ts`、`src/pages/StoreAnalysisPage.test.ts`、`src/pages/StoreAlertsPage.test.ts`、`src/pages/DigitalTwinPage.test.ts`、`src/pages/CustomerProfilePage.test.ts`、`src/styles/responsiveChecks.test.ts`；10 个测试文件全部通过 |
| `npm run build` | 通过，输出 `frontend/dist/`；Vite 仅提示 React Router 依赖内 `"use client"` 指令被忽略 |
| `npm audit --audit-level=high` | 通过，联网重试后返回 `found 0 vulnerabilities` |

说明：`npm audit --audit-level=high` 在沙箱内首次因 DNS `EAI_AGAIN` 失败，随后按权限规则联网重试并通过。

## 已有测试

```text
frontend/src/routes/routeConfig.test.ts
frontend/src/routes/demoFlow.test.ts
frontend/src/routes/demoReadiness.test.ts
frontend/src/mock/mockData.test.ts
frontend/src/pages/DashboardPage.test.ts
frontend/src/pages/StoreAnalysisPage.test.ts
frontend/src/pages/StoreAlertsPage.test.ts
frontend/src/pages/DigitalTwinPage.test.ts
frontend/src/pages/CustomerProfilePage.test.ts
frontend/src/styles/responsiveChecks.test.ts
```

覆盖内容：

```text
路由切换保留 mallId 和 timeRange
缺失 query 时回退到 demo 默认值
Mock 数据规模：1 个商场、5 个楼层、100 家店铺、8 种业态、20 条预警
店铺指标边界：曝光、进店、转化率、停留、评分、评分分项
空间数据边界：店铺几何坐标、热力点坐标和强度
告警引用与枚举：楼层、店铺、等级、状态、持续时间
运营总览和匿名聚合画像基础可用性
Dashboard KPI、客流趋势、楼层摘要、低效店铺榜和告警摘要 view model
Dashboard 空态和高危状态判断
页面 drill-down 链接保留全局 query 参数
Store Analysis 列表、筛选、选中店铺、评分拆解、相关告警和空间跳转 query
Store Alerts 列表、筛选、选中告警、详情指标、处理建议、空态、引用关系和空间跳转 query
Digital Twin 默认楼层/模式、query 恢复、空间坐标边界、非法 mode 回退和 drill-down query 合并
Customer Profile 匿名聚合摘要、排序/筛选、隐私口径、drill-down query、空态和小样本隐藏
Demo Core Flow 跨页路径、全局 query 保留、route-specific query 覆盖和可选参数省略
Demo Readiness 五个核心路由、主线演示路径、客群画像演示分支和匿名聚合隐私边界
Responsive CSS 断点、布局堆叠、表格横向滚动、SVG 数字孪生平面、画像时段图横向滚动和长文本防溢出规则
```

## 文档和结构检查命令

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
test -f frontend/src/types/domain.ts
test -f frontend/src/mock/mockOverview.ts
test -f frontend/src/mock/mockData.test.ts
test -f frontend/src/pages/DashboardPage.tsx
test -f frontend/src/pages/DashboardPage.test.ts
test -f frontend/src/pages/dashboardModel.ts
test -f frontend/src/pages/StoreAnalysisPage.tsx
test -f frontend/src/pages/StoreAnalysisPage.test.ts
test -f frontend/src/pages/storeAnalysisModel.ts
test -f frontend/src/pages/StoreAlertsPage.tsx
test -f frontend/src/pages/StoreAlertsPage.test.ts
test -f frontend/src/pages/storeAlertsModel.ts
test -f frontend/src/pages/DigitalTwinPage.tsx
test -f frontend/src/pages/DigitalTwinPage.test.ts
test -f frontend/src/pages/digitalTwinModel.ts
test -f frontend/src/pages/CustomerProfilePage.tsx
test -f frontend/src/pages/CustomerProfilePage.test.ts
test -f frontend/src/pages/customerProfileModel.ts
test -f frontend/src/components/FloorPlan.tsx
test -f frontend/src/components/TwinInspector.tsx
test -f frontend/src/routes/demoFlow.ts
test -f frontend/src/routes/demoFlow.test.ts
test -f frontend/src/routes/demoReadiness.test.ts
test -f frontend/src/styles/responsiveChecks.test.ts
test -f context/TODO_NEXT.md
test -f docs/FRONTEND_DEMO_HANDOFF.md
rg -n "不使用真实监控画面|不存储人脸原图|不展示个人轨迹|不使用未授权商场平面图|不使用真实品牌|不引入付费" docs context IMPORTANT.md
rg -n "P3-I1|engineering skeleton|质量门禁|CI|请进行下一步|MySQL|sudo|虚拟环境" PROGRESS.md context/TODO_NEXT.md AGENT.md README.md
python /home/ljh/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/mall-vision-ai-delivery
```

## 覆盖率目标

```text
backend overall coverage >= 80%
core business coverage >= 90%
store scoring and alert rules coverage = 100%
API automation coverage >= 90%
frontend component coverage >= 70%
E2E core user paths pass 100%
AI validation tests include deterministic videos or synthetic fixtures
```

## 测试缺口

```text
当前前端没有组件测试框架、浏览器 E2E 和覆盖率统计，P2 后续可按需要引入 Vitest 或 Playwright，但新增依赖前必须审计许可证和成本
尚无 backend/ 工程，无法运行后端测试
尚无 ai-services/ 工程，无法运行 AI 验证测试
尚无 CI，无法运行流水线
```

## P2-I9 检查结果

| 检查 | 结果 |
| --- | --- |
| `npm run lint` | 通过 |
| `npm run test` | 通过，10 个测试文件全部通过 |
| `npm run build` | 通过；Vite 仅提示 React Router 依赖内 `"use client"` 指令被忽略 |
| `npm audit --audit-level=high` | 沙箱内 DNS `EAI_AGAIN` 失败后联网重试通过，`found 0 vulnerabilities` |
| 工程边界 | 通过，根目录没有 `backend/`、`ai-services/`、`infra/` |
| 合规关键词 | 通过，隐私、真实素材、付费边界仍可在 docs/context/IMPORTANT.md 检索 |

## 下一步测试关注点

P3-I1 做工程化骨架规划与质量门禁对齐时至少测试：

```text
确认 P2 前端门禁仍可通过 npm run lint/test/build/audit
确认根级质量门禁不会跳过 frontend 现有检查
确认文档记录当前无后端、无 AI 服务、无 CI、无浏览器 E2E 和覆盖率统计
确认 P3 规划仍保留 MySQL、Python venv 和 sudo 规则
如果新增 CI、Docker 或依赖，必须更新第三方声明和许可证审计
```
