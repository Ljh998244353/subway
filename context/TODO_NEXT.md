# TODO Next

更新时间：2026-05-10

## 下一增量

```text
P2-I3 operations overview dashboard
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
```

已创建：

```text
docs/design/SCREEN_LAYOUTS.md
docs/design/DESIGN_TOKENS.md
docs/design/UI_SPEC.md
docs/design/COMPONENT_SPEC.md
docs/design/CHART_SPEC.md
docs/design/INTERACTION_SPEC.md
docs/design/DESIGN_REVIEW_CHECKLIST.md
frontend/README.md
frontend/package.json
frontend/package-lock.json
frontend/src/App.tsx
frontend/src/components/AppShell.tsx
frontend/src/routes/routeConfig.ts
frontend/src/pages/
frontend/src/styles/
frontend/src/types/
frontend/src/mock/
```

已覆盖：

```text
导航结构和 5 个核心页面范围
页面之间的跳转关系和 Query 参数保留规则
加载、空态、错误、权限不足、局部数据和过期数据状态规范
设计素材策略：只使用自绘图形和合成数据，不使用真实商场平面图或 Logo
浅色运营工作台设计 token、App Shell、12 列栅格、卡片、图表和响应式规则
核心组件规范、图表规范、交互规范、可访问性清单和 P2 前端门禁
前端工程骨架：React + TypeScript + Vite、5 个核心路由占位、AppShell、CSS token、Node 内置测试、lint/test/build 脚本
共享类型：Mall、Floor、Store、StoreScore、StoreAlert、CustomerProfile、OverviewMetric、HeatmapPoint、FlowEdge
虚构 Mock 数据：1 个商场、5 个楼层、100 家店铺、8 种业态、20 条预警、运营总览、热力点、流向线、匿名聚合画像
数据边界测试：评分、转化率、停留、几何坐标、热力点、告警状态和引用关系
```

## P2-I3 目标

进入 Frontend Mode，基于现有 Mock 数据实现 `/dashboard` 运营总览页面。P2-I3 只在 `frontend/` 内工作，不实现其他完整业务页面。

建议创建或更新：

```text
frontend/src/pages/DashboardPage.tsx
frontend/src/components/MetricCard.tsx
frontend/src/components/SummaryStrip.tsx
frontend/src/components/StatusBadge.tsx
frontend/src/components/TrendSparkline.tsx
frontend/src/pages/DashboardPage.test.ts
frontend/src/styles/global.css
frontend/package.json
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
README/PROGRESS/context 接力更新
```

## 禁止事项

```text
不要创建 backend/
不要创建 ai-services/
不要创建 infra/
不要实现其他完整业务页面
不要接真实 API
不要接真实视频流
不要新增图表库、3D 库、图标库或字体文件
不要引入付费工具或付费服务
不要使用真实商场平面图、品牌 Logo、监控视频或个人图像
不要使用 PostgreSQL 作为数据库；后续数据库统一使用 MySQL
不要复用旧 Python 虚拟环境；进入 backend/ 或 ai-services/ 时重新创建 venv
不要执行 sudo；遇到 sudo 或系统级提权命令时必须停下来让人类执行
```
