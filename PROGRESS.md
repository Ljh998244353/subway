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
Slidev 功能介绍演示稿
```

`frontend/` 已创建，包含 React + TypeScript + Vite 工程骨架、5 个核心路由占位、AppShell、CSS token、共享 TypeScript 类型、虚构 Mock 数据和 Node 内置测试。下一步进入 `P2-I3 operations overview dashboard`，实现 `/dashboard` 运营总览页面。

## 当前状态

| 项目 | 状态 | 说明 |
| --- | --- | --- |
| README 项目入口 | 已更新 | 当前下一步已指向 P2-I3 |
| AGENT AI 必读入口 | 已更新 | 保留短指令接力规则，下一步为 P2-I3 |
| IMPORTANT 重点风险 | 已更新 | 已记录课程交付、隐私、侵权、许可证、MySQL、Python venv、sudo 规则 |
| AI_Schedule 详细规划 | 已有 | P0-P12 路线图、增量拆分、角色模式和测试门禁 |
| P0 PRD / 需求 / 系统设计 | 已完成 | `docs/PRD_v1.md`、`docs/REQUIREMENTS_ANALYSIS.md`、`docs/SYSTEM_DESIGN.md` |
| P1 设计规范 | 已完成 | 信息架构、设计 token、UI、组件、图表、交互、响应式、可访问性和设计评审 |
| P2-I1 前端工程初始化 | 已完成 | React + TypeScript + Vite、5 个路由占位、AppShell、CSS token、基础测试、依赖许可证记录 |
| P2-I2 Mock 数据和共享类型 | 已完成 | 共享领域类型、1 个虚构商场、5 个楼层、100 家店铺、8 种业态、20 条预警、运营总览、热力点、流向线、匿名聚合画像和边界测试 |
| Slidev 功能介绍演示稿 | 已完成 | `slides/slidev/`，简约浅色主题、动画和鼠标交互场景 |
| context 恢复包 | 已更新 | `context/TODO_NEXT.md` 已指向 P2-I3 |
| 第三方声明 / 许可证审计 | 已更新 | P2-I2 未新增第三方依赖或素材，无需新增条目 |
| 后端 API | 未开始 | 还没有 `backend/` 工程 |
| AI 视频识别 | 未开始 | 还没有 `ai-services/` 工程 |
| 部署 | 未开始 | 还没有 `infra/`、Docker 或 CI |

## P2-I2 新增文件

```text
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

## P2-I2 修改文件

```text
frontend/package.json
frontend/README.md
AGENT.md
README.md
PROGRESS.md
context/PROJECT_STATE.md
context/REQUIREMENTS_CURRENT.md
context/ARCHITECTURE_CURRENT.md
context/DATA_MODEL_CURRENT.md
context/API_CONTRACT_CURRENT.md
context/FRONTEND_STATE.md
context/BACKEND_STATE.md
context/AI_ALGORITHM_STATE.md
context/TEST_STATE.md
context/DEPLOYMENT_STATE.md
context/DECISIONS_LOG.md
context/RISKS_AND_ASSUMPTIONS.md
context/TODO_NEXT.md
```

## 本次 P2-I2 检查结果

| 检查 | 结果 |
| --- | --- |
| 共享类型 | 通过，包含 Mall、Floor、Store、StoreScore、StoreAlert、CustomerProfile、OverviewMetric、HeatmapPoint、FlowEdge 等 |
| Mock 数据规模 | 通过，包含 1 个虚构商场、5 个楼层、100 家虚构店铺、8 种业态、20 条预警 |
| Mock 数据合规 | 通过，未使用真实商场、真实品牌、真实地图、监控视频、人物图像或个人轨迹 |
| 数据边界测试 | 通过，覆盖评分 0-100、转化率 0-100、停留非负、几何坐标、热力点、告警状态和引用关系 |
| 类型检查 | 通过，`npm run lint` |
| 单元测试 | 通过，`npm run test` |
| 生产构建 | 通过，`npm run build` |
| npm 高危安全审计 | 通过，`npm audit --audit-level=high` 返回 `found 0 vulnerabilities` |
| 许可证记录 | 通过，P2-I2 未新增第三方依赖、字体、图标、图片、视频、模型或数据集 |
| 工程边界 | 通过，未创建 `backend/`、`ai-services/`、`infra/`，未接真实 API、真实视频或真实商场素材 |
| 下一步接力 | 通过，`context/TODO_NEXT.md`、`AGENT.md`、`README.md` 已指向 P2-I3 |

说明：`npm audit --audit-level=high` 在沙箱内首次因 DNS `EAI_AGAIN` 失败，随后按权限规则联网重试并通过。

## 当前最大风险

```text
当前业务页面仍是占位页，P2-I3 才开始实现 /dashboard
当前没有后端、AI 服务和 CI，无法运行业务接口测试、AI 验证测试或流水线测试
后续最容易侵权的位置是：真实商场平面图、品牌 Logo、商户 Logo、监控视频、人物图像、网页素材、模型权重和第三方代码片段
后续最容易产生隐私风险的位置是：视频识别、人脸、轨迹、顾客画像、日志和数据留存
后续新增依赖、模型、素材、字体、图标、数据集或外部服务时，必须同步更新 docs/THIRD_PARTY_NOTICES.md 和 docs/LICENSE_AUDIT.md
Slidev 依赖链当前曾有 moderate 漏洞记录，来源为 dompurify/monaco-editor；后续升级 Slidev 或对外发布前应复查
后续数据库统一使用 MySQL，不按 PostgreSQL 规划
后续 Python backend/ 或 ai-services/ 开发必须重新创建虚拟环境
需要 sudo 或系统级提权命令时，AI 必须停下来，让人类执行
P2-I3 仍不得使用真实商场、真实品牌、真实视频或个人图像
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
test -f frontend/src/types/domain.ts
test -f frontend/src/mock/mockOverview.ts
test -f frontend/src/mock/mockData.test.ts
test -f context/TODO_NEXT.md
```

### 2. 检查合规红线

```bash
rg -n "不使用真实监控画面|不存储人脸原图|不展示个人轨迹|不使用未授权商场平面图|不使用真实品牌|不引入付费" docs context IMPORTANT.md
```

### 3. 检查下一步接力

```bash
rg -n "P2-I3|operations overview dashboard|运营总览|/dashboard|MetricCard|SummaryStrip" PROGRESS.md context/TODO_NEXT.md AGENT.md README.md
```

### 4. 检查前端工程

```bash
cd frontend
npm run lint
npm run test
npm run build
npm audit --audit-level=high
```

### 5. 检查 skill 基本结构

```bash
python /home/ljh/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/mall-vision-ai-delivery
```

## 下一步应该做什么

执行 `P2-I3 operations overview dashboard`。

下一步只实现 `/dashboard` 运营总览页面，不要实现其他完整业务页面，不要创建后端、AI 服务或部署工程。

建议产出：

```text
frontend/src/pages/DashboardPage.tsx
frontend/src/components/MetricCard.tsx
frontend/src/components/SummaryStrip.tsx
frontend/src/components/StatusBadge.tsx
frontend/src/components/TrendSparkline.tsx
frontend/src/pages/DashboardPage.test.ts
frontend/src/styles/global.css
```

建议内容：

```text
运营总览 KPI 条：当前场内人数、今日累计客流、峰值客流、拥挤指数、未处理告警
客流趋势：可先用 CSS/HTML 或 SVG 简化展示，不新增图表库
楼层状态：楼层客流、拥挤指数、告警数量，并支持后续跳转到数字孪生的参数设计
低效店铺榜：展示 C/D 店铺、评分、业态、楼层和原因
告警摘要：展示高/中/低等级、状态、位置和建议动作
状态覆盖：至少提供正常数据、空态或错误/权限占位的可测试入口
继续标明 Mock 数据来源和虚构数据边界
保持 npm run lint、npm run test、npm run build 通过
```

## 给人类使用的下一步指令

人类下一次只需要输入：

```text
请进行下一步
```

AI 收到后必须自动读取 `AGENT.md`、`README.md`、`PROGRESS.md`、`AI_Schedule.md`、`IMPORTANT.md`、`frontend/` 和 `context/*.md`，然后按 `context/TODO_NEXT.md` 执行 `P2-I3`。

## 给下一个 AI 的接力信息

```text
人类只会输入“请进行下一步”。AI 必须使用 mall-vision-ai-delivery 工作流，先阅读 AGENT.md、README.md、PROGRESS.md、AI_Schedule.md、IMPORTANT.md、docs/PRD_v1.md、docs/REQUIREMENTS_ANALYSIS.md、docs/SYSTEM_DESIGN.md、docs/design/SCREEN_LAYOUTS.md、docs/design/DESIGN_TOKENS.md、docs/design/UI_SPEC.md、docs/design/COMPONENT_SPEC.md、docs/design/CHART_SPEC.md、docs/design/INTERACTION_SPEC.md、docs/design/DESIGN_REVIEW_CHECKLIST.md、frontend/ 和 context/*.md；然后执行 context/TODO_NEXT.md 指定的 P2-I3：operations overview dashboard。P2-I3 只在 frontend/ 内实现 /dashboard 运营总览页面及必要测试；不要创建 backend、ai-services 或 infra，不要接真实 API、真实视频或真实商场素材，不要新增图表库、3D 库、图标库或字体文件。后续数据库统一使用 MySQL；进入 Python backend/ 或 ai-services/ 开发时必须重新创建虚拟环境；需要 sudo 时必须停下来让人类执行。完成后更新 PROGRESS.md、context/TODO_NEXT.md 和必要风险记录。
```
