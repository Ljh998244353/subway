# Project State

更新时间：2026-05-13

## 当前阶段

当前完成 P0 项目基线与上下文恢复、P1 设计规范阶段、P2-I1 前端工程初始化、P2-I2 Mock 数据与共享类型、P2-I3 运营总览页面、P2-I4 店铺分析页面、P2-I5 低效预警页面、P2-I6 数字孪生 Demo 页面、P2-I7 E2E/响应式/演示打磨、P2-I8 客群画像页面、P2-I9 CP2 前端 Demo 收口和交接。2026-05-13 完成 CP2 后前端视觉重构和 `impeccable` 上下文补齐，新增 `PRODUCT.md`、`DESIGN.md`，升级 OKLCH token、AppShell、Dashboard 运营摘要、Digital Twin 控制区和全局组件样式。同日完成 P3-I1 工程化骨架规划与质量门禁对齐，新增 `docs/ENGINEERING_QUALITY_GATES.md` 和 `docs/CI_PLAN.md`。随后按用户确认追加“极简高级版”全站五页精修，新增已审计 MIT `motion` 依赖和 `MotionSurface`，统一五页页面、面板和状态动效，并继续保持免费、虚构 Mock、自绘 SVG 和无真实素材边界。P3-I2 已完成根级质量门禁脚本和本地统一命令入口，新增根级 `package.json` 与 `scripts/quality-gate.mjs`，提供 `npm run quality` 和 `npm run quality:audit`。P3-I3 已完成 GitHub Actions 免费 CI 配置和本地到 CI 映射，新增 `.github/workflows/ci.yml`，并把合规关键词检查改为 Node 内置扫描，避免 CI 依赖系统 `rg` 或 `sudo` 安装。P3-I4 已完成 Docker Compose 草案或部署文档，新增 `docs/DEPLOYMENT_PLAN.md`，并把部署计划文档纳入根级文档检查。项目已达到 CP2 前端 Demo 收口、P3 工程化骨架和部署计划完成状态，已有 `frontend/` React + TypeScript + Vite 工程骨架、5 个核心路由、共享类型、虚构 Mock 数据、数据边界测试、核心演示流转测试、CP2 演示就绪测试、响应式 CSS 检查、`docs/FRONTEND_DEMO_HANDOFF.md`，以及 `/dashboard`、`/store-analysis`、`/store-alerts`、`/digital-twin`、`/customer-profile` 五个业务页面；尚未进入后端 API 实现、AI 服务、Docker Compose 文件或生产部署工程编码。

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
docs/FRONTEND_DEMO_HANDOFF.md
docs/ENGINEERING_QUALITY_GATES.md
docs/CI_PLAN.md
docs/DEPLOYMENT_PLAN.md
PRODUCT.md
DESIGN.md
context/*.md
skills/mall-vision-ai-delivery/SKILL.md
slides/project-intro.typ
slides/slide.pdf
slides/slidev/
package.json
.github/workflows/ci.yml
scripts/quality-gate.mjs
frontend/README.md
frontend/package.json
frontend/package-lock.json
frontend/src/App.tsx
frontend/src/components/
frontend/src/routes/
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
Docker Compose file
真实 API
真实视频接入
浏览器 E2E
覆盖率统计
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
| P2-I3 运营总览 | `/dashboard` 已使用 Mock 数据展示 KPI、客流趋势、楼层状态、低效店铺榜和告警摘要 |
| P2-I4 店铺分析 | `/store-analysis` 已使用 Mock 数据展示筛选摘要、店铺列表、店铺详情、评分拆解、低效原因和关联入口 |
| P2-I5 低效预警 | `/store-alerts` 已使用 Mock 数据展示告警列表、筛选摘要、告警详情、处理建议、状态统计和关联入口 |
| P2-I6 数字孪生 | `/digital-twin` 已使用 Mock 数据展示自绘楼层平面、热力、动线、告警、评分、店铺选中和空间检查器 |
| P2-I7 QA 打磨 | 已补核心演示流转 helper、query 测试、响应式 CSS 检查和防溢出样式 |
| P2-I8 客群画像 | `/customer-profile` 已使用 Mock 数据展示匿名聚合画像摘要、时段分布、楼层偏好、业态偏好和隐私口径 |
| P2-I9 CP2 收口 | 已补前端 Demo 交接文档、客群画像演示分支 helper、CP2 演示就绪测试、测试报告摘要和 P3 接力 |
| CP2 后前端视觉重构 | 已补 `PRODUCT.md` / `DESIGN.md`，用免费本地代码和自绘 SVG/CSS 升级前端视觉，不新增依赖或素材 |
| CP2 后极简高级全站精修 | 已补 `motion@12.38.0` 和 `MotionSurface`，统一五页克制动效、留白、卡片、表格、列表和数字孪生质感 |
| P3-I1 工程化规划 | 已补 `docs/ENGINEERING_QUALITY_GATES.md` 和 `docs/CI_PLAN.md`，只规划门禁和 CI，不创建后端、AI 服务、infra、根级脚本或 CI 配置 |
| P3-I2 根级质量门禁 | 已补根级 `package.json` 和 `scripts/quality-gate.mjs`，`npm run quality` 串联文档、合规、边界和前端 lint/test/build，`npm run quality:audit` 单独运行高危依赖审计 |
| P3-I3 GitHub Actions CI | 已补 `.github/workflows/ci.yml`，GitHub 端运行 `npm run quality` 和 `npm run quality:audit`；Gitee 镜像不自动运行该 workflow |
| P3-I4 部署计划 | 已补 `docs/DEPLOYMENT_PLAN.md`，明确未来 Compose 服务边界、环境变量、健康检查、启动顺序、日志备份和审计点；暂不创建 `docker-compose.yml` |
| 真实素材 | 未授权真实素材禁用 |
| 前端建议 | React + TypeScript + Vite |
| 后端建议 | FastAPI + MySQL |
| AI 服务建议 | Python 视频分析服务，事件化输出 |
| 部署建议 | Docker Compose first |
| Python 环境 | 后续创建后端或 AI 服务时重新创建虚拟环境 |
| 提权命令 | 需要 `sudo` 时 AI 暂停，由人类执行 |

## 下一目标

进入 P4-I1：后端 API 契约和 MySQL 数据模型基线。优先固化 `/api/v1`、`/api/v1/health`、核心实体、MySQL 表边界、错误码、RBAC 占位和测试策略；不要直接创建 `ai-services/` 或真实部署服务，不要接真实 API、真实视频、真实商场平面图、真实地图、真实商场素材、个人身份或个人轨迹。若 P4-I1 创建 `backend/`，必须重新创建 Python 虚拟环境并同步许可证、测试和风险记录。
