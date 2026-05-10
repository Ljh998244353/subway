# Project State

更新时间：2026-05-10

## 当前阶段

当前完成 P0 项目基线与上下文恢复、P1 设计规范阶段、P2-I1 前端工程初始化和 P2-I2 Mock 数据与共享类型。项目已进入前端 Demo MVP，已有 `frontend/` React + TypeScript + Vite 工程骨架、5 个核心路由占位、共享类型、虚构 Mock 数据和数据边界测试；尚未进入后端、AI 服务或部署工程编码。

## 已完成

```text
README.md
AGENT.md
AI_Schedule.md
IMPORTANT.md
PROGRESS.md
docs/PRD_v1.md
docs/REQUIREMENTS_ANALYSIS.md
docs/USER_STORIES.md
docs/ACCEPTANCE_CRITERIA.md
docs/METRICS_DEFINITION.md
docs/TEST_STRATEGY.md
docs/QUALITY_GATE.md
docs/LICENSE_AUDIT.md
docs/SYSTEM_DESIGN.md
docs/THIRD_PARTY_NOTICES.md
docs/design/SCREEN_LAYOUTS.md
docs/design/DESIGN_TOKENS.md
docs/design/UI_SPEC.md
docs/design/COMPONENT_SPEC.md
docs/design/CHART_SPEC.md
docs/design/INTERACTION_SPEC.md
docs/design/DESIGN_REVIEW_CHECKLIST.md
context/*.md
skills/mall-vision-ai-delivery/SKILL.md
slides/project-intro.typ
slides/slide.pdf
slides/slidev/
frontend/README.md
frontend/package.json
frontend/package-lock.json
frontend/src/App.tsx
frontend/src/components/AppShell.tsx
frontend/src/routes/routeConfig.ts
frontend/src/routes/routeConfig.test.ts
frontend/src/pages/
frontend/src/styles/
frontend/src/types/
frontend/src/mock/
```

## 未开始

```text
backend/
ai-services/
infra/
Docker Compose
CI
业务页面测试
真实 API
真实视频接入
```

## 当前决策

| 事项 | 决策 |
| --- | --- |
| 开发方式 | 单 AI 增量迭代，短指令接力 |
| 当前产品范围 | 商业综合体视觉 AI 数字孪生运营系统 |
| 第一轮数据 | Mock、合成、自绘数据 |
| 功能介绍演示稿 | 使用 Slidev，文件位于 `slides/slidev/` |
| P1-I1 页面范围 | 5 个核心页面为 `/dashboard`、`/digital-twin`、`/store-analysis`、`/customer-profile`、`/store-alerts` |
| P1-I2 设计规范 | 使用浅色运营工作台 token、12 列栅格、App Shell、卡片/图表/表格/数字孪生布局规则 |
| P1-I3 组件和图表规范 | 已定义核心组件、页面状态、图表口径、页面映射和 P2 测试关注点 |
| P1-I4 交互和设计评审 | 已定义路由参数、筛选恢复、页面交互、键盘、响应式、可访问性和 P2 前端门禁 |
| P2-I1 前端工程 | React + TypeScript + Vite、React Router、AppShell、5 个路由占位、CSS token 和 Node 内置测试 |
| P2-I2 Mock 数据 | 使用虚构商场、5 个楼层、100 家虚构店铺、8 种业态、20 条预警、热力点、流向线和匿名聚合画像 |
| 真实素材 | 未授权真实素材禁用 |
| 前端建议 | React + TypeScript + Vite |
| 后端建议 | FastAPI + MySQL |
| AI 服务建议 | Python 视频分析服务，事件化输出 |
| 部署建议 | Docker Compose first |
| Python 环境 | 后续创建后端或 AI 服务时重新创建虚拟环境 |
| 提权命令 | 需要 `sudo` 时 AI 暂停，由人类执行 |

## 下一目标

进入 P2-I3：运营总览页面。基于 `frontend/src/mock` 和 `frontend/src/types` 实现 `/dashboard` 的 KPI、客流趋势、楼层状态、低效店铺榜和告警摘要；不要创建 `backend/`、`ai-services/` 或 `infra/`，不要接真实 API、真实视频或真实商场素材。
