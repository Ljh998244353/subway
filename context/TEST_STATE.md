# Test State

更新时间：2026-05-13

## 当前状态

P0 与 P1 使用文档和结构检查。P2-I1 已创建前端工程基础测试，P2-I2 已补充 Mock 数据边界测试，P2-I3 已补充 Dashboard view model 与路由测试，P2-I4 已补充 Store Analysis view model 与路由测试，P2-I5 已补充 Store Alerts view model 与路由测试，P2-I6 已补充 Digital Twin view model 与空间边界测试，P2-I7 已补充核心演示流转和响应式 CSS 检查，P2-I8 已补充 Customer Profile view model、drill-down、隐私和空态测试，P2-I9 已补充 CP2 Demo readiness 测试和前端交接检查。2026-05-13 前端视觉重构、P3-I1 收尾和极简高级全站精修后 `npm run lint`、`npm run test`、`npm run build`、`npm audit --audit-level=high` 均通过。P3-I1 已新增 `docs/ENGINEERING_QUALITY_GATES.md` 和 `docs/CI_PLAN.md`，并对齐文档结构、合规关键词、工程边界和前端门禁。P3-I2 已新增根级 `npm run quality` 与 `npm run quality:audit`，统一运行文档结构、合规关键词、工程边界、frontend lint/test/build 和高危依赖审计。当前没有后端、AI 服务、CI、浏览器 E2E 或覆盖率统计。

## 当前前端测试命令

```bash
npm run quality
npm run quality:audit
```

当前结果：

| 命令 | 结果 |
| --- | --- |
| `npm run lint` | 2026-05-13 通过，执行 `tsc -b --pretty false` |
| `npm run test` | 2026-05-13 通过，执行 `src/routes/routeConfig.test.ts`、`src/routes/demoFlow.test.ts`、`src/routes/demoReadiness.test.ts`、`src/mock/mockData.test.ts`、`src/pages/DashboardPage.test.ts`、`src/pages/StoreAnalysisPage.test.ts`、`src/pages/StoreAlertsPage.test.ts`、`src/pages/DigitalTwinPage.test.ts`、`src/pages/CustomerProfilePage.test.ts`、`src/styles/responsiveChecks.test.ts`；10 个测试文件全部通过 |
| `npm run build` | 2026-05-13 极简高级全站精修后通过，输出 `frontend/dist/`；Vite 仅提示 React Router 和 Motion/Framer Motion 依赖内 `"use client"` 指令被忽略；JS gzip 约 132.53 kB |
| `npm audit --audit-level=high` | 2026-05-13 极简高级全站精修后通过；沙箱内 DNS `EAI_AGAIN` 失败后按权限规则联网重试，结果 `found 0 vulnerabilities` |
| `npm run quality` | 2026-05-13 P3-I2 通过，运行文档结构、合规关键词、工程边界和 frontend lint/test/build |
| `npm run quality:audit` | 2026-05-13 P3-I2 通过；沙箱内 DNS `EAI_AGAIN` 失败后按权限规则联网重试，返回 `found 0 vulnerabilities` |

说明：`npm audit --audit-level=high` 在沙箱内因 DNS `EAI_AGAIN` 失败，随后按权限规则联网重试并通过。

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
npm run quality
npm run quality:audit
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

## CP2 后前端视觉重构检查结果

| 检查 | 结果 |
| --- | --- |
| `npm run lint` | 通过 |
| `npm run test` | 通过，10 个测试文件全部通过 |
| `npm run build` | 通过；Vite 仅提示 React Router 依赖内 `"use client"` 指令被忽略 |
| 本地预览 | 已启动 `http://127.0.0.1:5174/` |
| 依赖边界 | 通过，未新增依赖、字体文件、图标库、图片、视频、模型、数据集或外部服务 |

## CP2 后极简高级全站精修检查结果

| 检查 | 结果 |
| --- | --- |
| `npm run lint` | 通过 |
| `npm run test` | 通过，10 个测试文件全部通过 |
| `npm run build` | 通过；Vite 提示 React Router 和 Motion/Framer Motion 依赖内 `"use client"` 指令被忽略；JS gzip 约 132.53 kB |
| `npm audit --audit-level=high` | 沙箱内 DNS `EAI_AGAIN` 失败后联网重试通过，`found 0 vulnerabilities` |
| 依赖许可证 | 通过，`motion@12.38.0`、`framer-motion@12.38.0`、`motion-dom@12.38.0`、`motion-utils@12.36.0` 为 MIT，`tslib@2.8.1` 为 0BSD |
| 合规边界 | 通过，未新增字体、图标、图片、视频、真实商场素材、真实品牌、个人图像、个人轨迹或付费服务 |

## P3-I1 检查结果

| 检查 | 结果 |
| --- | --- |
| 工程质量门禁文档 | 已新增 `docs/ENGINEERING_QUALITY_GATES.md` |
| CI 计划文档 | 已新增 `docs/CI_PLAN.md` |
| 文档结构检查 | 通过，P3-I1 关键文档、`PRODUCT.md`、`DESIGN.md` 和 `context/TODO_NEXT.md` 存在 |
| 合规关键词检查 | 通过，隐私、真实素材、付费、MySQL、sudo、虚拟环境和 P3-I2 接力关键词可检索 |
| 前端 lint/test/build/audit | 通过，`npm run lint`、`npm run test`、`npm run build`、`npm audit --audit-level=high` 均通过；audit 沙箱内 DNS 失败后联网重试返回 `found 0 vulnerabilities` |
| 工程边界 | 通过，根目录没有 `backend/`、`ai-services/`、`infra/` |
| 依赖边界 | P3-I1 未新增依赖、镜像、CI 工具或外部服务 |

## 下一步测试关注点

P3-I3 做免费 CI 配置或本地到 CI 映射时至少测试：

```text
确认 CI 或映射复用 npm run quality 和 npm run quality:audit
确认文档记录当前无后端、无 AI 服务、无 CI、无浏览器 E2E 和覆盖率统计
确认 P3 规划和脚本仍保留 MySQL、Python venv 和 sudo 规则
如果新增 CI、Docker 或依赖，必须更新第三方声明和许可证审计
```
