# 项目进度一览

更新时间：2026-05-13

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
P2-I9 CP2 frontend demo closure and handoff
Slidev 功能介绍演示稿
CP2 后前端视觉重构和 impeccable 上下文补齐
P3-I1 engineering skeleton planning and quality gate alignment
CP2 后极简高级全站五页精修
P3-I2 root quality gate script and local command entry
P3-I3 free GitHub Actions CI configuration and local-to-CI mapping
P3-I4 Docker Compose draft or deployment documentation
AI coding workflow optimization
```

`frontend/` 已包含 React + TypeScript + Vite 工程骨架、5 个核心业务页面、AppShell、CSS token、共享 TypeScript 类型、虚构 Mock 数据、Node 内置测试、核心演示流转 helper、CP2 演示就绪测试、响应式 CSS 检查和 `/dashboard`、`/store-analysis`、`/store-alerts`、`/digital-twin`、`/customer-profile` 页面。2026-05-13 已按 `frontend-design`、`impeccable` 和 Vercel React 前端规范完成免费工具边界内的前端视觉重构：新增 `PRODUCT.md`、`DESIGN.md` 作为设计上下文，升级 OKLCH token、AppShell、运营总览摘要、数字孪生控制区、卡片/表格/选中态/自绘 SVG 视觉细节。同日已完成 `P3-I1 engineering skeleton planning and quality gate alignment`，新增工程质量门禁和 CI 计划文档。随后按用户确认完成“极简高级版”全站五页精修：新增已审计 MIT `motion@12.38.0` 和 `MotionSurface`，统一五页页面/面板入场动效，进一步收敛留白、卡片、表格、列表、数字孪生和画像图表质感；未新增字体、图标、图片、视频、真实商场素材、真实品牌或付费工具。当前已完成 `P3-I2 root quality gate script and local command entry`、`P3-I3 free GitHub Actions CI configuration and local-to-CI mapping` 和 `P3-I4 Docker Compose draft or deployment documentation`：根级 `package.json` 和 `scripts/quality-gate.mjs` 提供 `npm run quality` / `npm run quality:audit`，`.github/workflows/ci.yml` 在 GitHub Actions 中运行 `quality-gate` 和 `dependency-audit`，`docs/DEPLOYMENT_PLAN.md` 记录未来 frontend/backend/mysql/redis/ai-services/worker 的服务边界、环境变量、健康检查、启动顺序、日志备份和许可证审计点。P3-I4 选择部署文档优先，未创建 `docker-compose.yml`、`infra/`、`backend/` 或 `ai-services/`，避免在后端和 AI 服务尚不存在时制造不可运行的假部署。2026-05-18 已完成 AI coding workflow optimization：新增 `AGENTS.md` 标准入口，恢复 `AGENT.md` 兼容入口，`context/TODO_NEXT.md` 改为单页任务卡，根级质量门禁增加标准入口和任务卡字段检查，并明确用户后续采用常规短指令续作和关键节点人工确认。下一步建议执行 `P4-I1 backend API contract and data model baseline`。

## 当前状态

| 项目 | 状态 | 说明 |
| --- | --- | --- |
| README 项目入口 | 已更新 | 当前下一步已指向 P4-I1 |
| AGENTS AI 标准入口 | 已更新 | `AGENTS.md` 为 AI coding 标准入口，`AGENT.md` 保留兼容旧链接 |
| IMPORTANT 重点风险 | 已更新 | 新增 P3-I4 部署计划边界；继续保留 GitHub/Gitee、隐私、侵权、MySQL、Python venv、sudo、Docker/扫描工具许可证和成本规则 |
| P0 PRD / 需求 / 系统设计 | 已完成 | `docs/PRD_v1.md`、`docs/REQUIREMENTS_ANALYSIS.md`、`docs/SYSTEM_DESIGN.md` |
| P1 设计规范 | 已完成 | 信息架构、设计 token、UI、组件、图表、交互、响应式、可访问性和设计评审 |
| P2 前端 Demo | 已完成 CP2 收口 | 5 个核心页面、Mock 数据、演示路径、测试摘要和交接文档已完成 |
| P2-I9 交接文档 | 已完成 | 新增 `docs/FRONTEND_DEMO_HANDOFF.md` |
| P2-I9 演示就绪测试 | 已完成 | 新增 `frontend/src/routes/demoReadiness.test.ts`，覆盖 5 个核心路由、演示路径和隐私边界 |
| CP2 后前端视觉重构 | 已完成 | 补齐 `PRODUCT.md` / `DESIGN.md`，升级 token、AppShell、Dashboard、Digital Twin 和全局组件样式 |
| CP2 后极简高级全站精修 | 已完成 | 新增已审计 MIT `motion@12.38.0`，五页统一克制动效和高级极简视觉质感 |
| P3-I1 工程化规划 | 已完成 | 新增 `docs/ENGINEERING_QUALITY_GATES.md` 和 `docs/CI_PLAN.md`，只规划门禁和 CI，不引入新工具 |
| P3-I2 根级质量门禁 | 已完成 | 新增根级 `package.json` 和 `scripts/quality-gate.mjs`，提供 `npm run quality` 与 `npm run quality:audit` |
| P3-I3 GitHub Actions CI | 已完成 | 新增 `.github/workflows/ci.yml`，GitHub 端运行根级质量门禁和高危依赖审计；Gitee 镜像不自动运行该 workflow |
| P3-I4 部署计划 | 已完成 | 新增 `docs/DEPLOYMENT_PLAN.md`，明确未来 Compose 服务边界、环境变量、健康检查、启动顺序、日志备份和审计点；未创建真实 Compose |
| AI coding 工作流优化 | 已完成 | 新增标准入口、任务卡、人类关键确认门和门禁检查；未进入 P4-I1 实现 |
| context 恢复包 | 已更新 | `context/TODO_NEXT.md` 已指向 P4-I1 |
| 第三方声明 / 许可证审计 | 已更新 | 已记录 `motion@12.38.0` 及其传递依赖许可证；P3-I2 记录本地检查工具 `ripgrep@15.1.0` 为 Unlicense/MIT；P3-I3 记录 GitHub Actions、`actions/checkout@v6.0.2` 和 `actions/setup-node@v6.4.0`；P3-I4 未新增第三方镜像、依赖、服务账号或付费服务 |
| 后端 API | 未开始 | 还没有 `backend/` 工程 |
| AI 视频识别 | 未开始 | 还没有 `ai-services/` 工程 |
| 部署 / CI | 部分完成 | P3-I1 已完成 CI 计划文档，P3-I2 已完成根级本地门禁，P3-I3 已完成 GitHub Actions CI，P3-I4 已完成部署计划文档；还没有 `infra/`、Docker Compose 文件或生产部署 |

## P2-I9 新增文件

```text
docs/FRONTEND_DEMO_HANDOFF.md
frontend/src/routes/demoReadiness.test.ts
```

## P2-I9 修改文件

```text
AGENT.md
README.md
PROGRESS.md
frontend/README.md
frontend/package.json
frontend/src/routes/demoFlow.ts
frontend/src/routes/demoFlow.test.ts
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

## CP2 后前端视觉重构

新增文件：

```text
PRODUCT.md
DESIGN.md
```

修改文件：

```text
frontend/src/components/AppShell.tsx
frontend/src/pages/DashboardPage.tsx
frontend/src/pages/DigitalTwinPage.tsx
frontend/src/styles/tokens.css
frontend/src/styles/global.css
PROGRESS.md
context/PROJECT_STATE.md
context/FRONTEND_STATE.md
context/TEST_STATE.md
context/DECISIONS_LOG.md
context/RISKS_AND_ASSUMPTIONS.md
context/TODO_NEXT.md
frontend/README.md
```

本次重构内容：

```text
补齐 impeccable 上下文：PRODUCT.md 记录产品型工作台定位，DESIGN.md 记录免费本地代码、自绘 SVG 和系统字体边界
视觉 token：从十六进制色值升级为 OKLCH 语义 token，补充 tinted neutral、状态边框、hover shadow 和数字孪生平面色
AppShell：增加紧凑品牌标记、精细 topbar/sidebar 状态、完整边框选中态，移除粗侧边色条模式
Dashboard：新增运营巡检摘要，强化高风险未闭环入口和 Mock 演示边界
Digital Twin：新增空间模式控制摘要，提升楼层/模式切换的结构清晰度
全局样式：打磨卡片、表格、告警、画像图表、数字孪生 SVG、选中态和响应式视觉层次
合规边界：未新增依赖、字体文件、图标库、图片、视频、真实商场平面图、真实品牌或付费工具
```

本次检查结果：

| 检查 | 结果 |
| --- | --- |
| `npm run lint` | 通过 |
| `npm run test` | 通过，10 个测试文件全部通过 |
| `npm run build` | 通过；Vite 仅提示 React Router 依赖内 `"use client"` 指令被忽略 |
| 本地预览 | 已启动 `http://127.0.0.1:5174/` |

## P3-I1 工程化骨架规划与质量门禁对齐

新增文件：

```text
docs/ENGINEERING_QUALITY_GATES.md
docs/CI_PLAN.md
```

修改文件：

```text
AGENT.md
README.md
PROGRESS.md
IMPORTANT.md
context/PROJECT_STATE.md
context/REQUIREMENTS_CURRENT.md
context/ARCHITECTURE_CURRENT.md
context/FRONTEND_STATE.md
context/DEPLOYMENT_STATE.md
context/TEST_STATE.md
context/DECISIONS_LOG.md
context/RISKS_AND_ASSUMPTIONS.md
context/TODO_NEXT.md
```

本次交付内容：

```text
定义当前可执行工程质量门禁：文档结构、合规关键词、工程边界、frontend lint/test/build/audit
定义后续根级门禁目标和 P3-I2/P3-I3/P3-I4 拆分
定义 CI 计划：触发条件、Job 拆分、缓存策略、失败处理和后续扩展点
明确 P3-I1 不创建 backend/、ai-services/、infra/、CI 配置、Docker Compose、根级脚本或外部服务
新增 IMPORTANT.md 风险记录：后续 CI、Docker、扫描工具必须先审计许可证、成本、账号和数据边界
下一步转为 P3-I2 root quality gate script and local command entry
说明：该接力已由 P3-I2、P3-I3 和 P3-I4 完成，当前最新下一步见文末 P4-I1
```

本次检查结果：

| 检查 | 结果 |
| --- | --- |
| 文档结构检查 | 通过，P3-I1 关键文档、`PRODUCT.md`、`DESIGN.md` 和 `context/TODO_NEXT.md` 存在 |
| 合规关键词检查 | 通过，隐私、真实素材、付费、MySQL、sudo、虚拟环境和 P3-I2 接力关键词可检索 |
| 工程边界检查 | 通过，根目录无 `backend/`、`ai-services/`、`infra/` |
| `npm run lint` | 通过 |
| `npm run test` | 通过，10 个测试文件全部通过 |
| `npm run build` | 通过；Vite 仅提示 React Router 依赖内 `"use client"` 指令被忽略 |
| `npm audit --audit-level=high` | 通过；沙箱内 DNS `EAI_AGAIN` 失败后按权限规则联网重试，结果 `found 0 vulnerabilities` |

## CP2 后极简高级全站五页精修

新增文件：

```text
frontend/src/components/MotionSurface.tsx
```

修改文件：

```text
DESIGN.md
IMPORTANT.md
PROGRESS.md
README.md
AGENT.md
docs/THIRD_PARTY_NOTICES.md
docs/LICENSE_AUDIT.md
frontend/package.json
frontend/package-lock.json
frontend/README.md
frontend/src/components/SummaryStrip.tsx
frontend/src/pages/DashboardPage.tsx
frontend/src/pages/DigitalTwinPage.tsx
frontend/src/pages/StoreAnalysisPage.tsx
frontend/src/pages/StoreAlertsPage.tsx
frontend/src/pages/CustomerProfilePage.tsx
frontend/src/styles/tokens.css
frontend/src/styles/global.css
context/PROJECT_STATE.md
context/FRONTEND_STATE.md
context/TEST_STATE.md
context/DECISIONS_LOG.md
context/RISKS_AND_ASSUMPTIONS.md
context/TODO_NEXT.md
```

本次交付内容：

```text
新增 MotionSurface：基于 motion/react，支持 reduced motion，用于克制页面和面板入场动效
全站五页接入动效：Dashboard、Digital Twin、Store Analysis、Store Alerts、Customer Profile
极简高级视觉精修：更轻的页面标题区、更安静的背景、更克制的阴影、更统一的卡片/表格/列表/状态样式
数字孪生精修：降低装饰感，提升自绘 SVG 平面、热力、流向、告警和选中态质感
许可证与风险记录：记录 motion@12.38.0 为 MIT；说明 Motion+ 是付费内容但未使用
```

本次检查结果：

| 检查 | 结果 |
| --- | --- |
| `npm run lint` | 通过 |
| `npm run test` | 通过，10 个测试文件全部通过 |
| `npm run build` | 通过；Vite 仅提示 React Router 和 Motion/Framer Motion 依赖内 `"use client"` 指令被忽略；输出 JS gzip 约 132.53 kB |
| `npm audit --audit-level=high` | 通过；沙箱内 DNS `EAI_AGAIN` 失败后按权限规则联网重试，结果 `found 0 vulnerabilities` |
| 许可证记录 | 通过，`docs/THIRD_PARTY_NOTICES.md` 和 `docs/LICENSE_AUDIT.md` 已记录 `motion@12.38.0`、`framer-motion@12.38.0`、`motion-dom@12.38.0`、`motion-utils@12.36.0` 和 `tslib@2.8.1` |
| 合规边界 | 通过，未新增字体、图标、图片、视频、真实商场资料、真实品牌、真实人物或付费服务 |

## P3-I2 根级质量门禁脚本和本地统一命令入口

新增文件：

```text
package.json
scripts/quality-gate.mjs
```

修改文件：

```text
AGENT.md
README.md
PROGRESS.md
docs/ENGINEERING_QUALITY_GATES.md
docs/CI_PLAN.md
docs/THIRD_PARTY_NOTICES.md
docs/LICENSE_AUDIT.md
context/PROJECT_STATE.md
context/ARCHITECTURE_CURRENT.md
context/DEPLOYMENT_STATE.md
context/TEST_STATE.md
context/DECISIONS_LOG.md
context/RISKS_AND_ASSUMPTIONS.md
context/TODO_NEXT.md
```

本次交付内容：

```text
新增根级 npm scripts：quality、quality:docs、quality:compliance、quality:boundary、quality:frontend、quality:audit
新增 scripts/quality-gate.mjs：使用 Node 内置模块串联文档结构、合规关键词、工程边界和 frontend lint/test/build
保留 npm run quality:audit 为单独高危依赖审计入口，避免网络审计阻塞基础离线门禁
更新 README、工程门禁文档、CI 计划和 context 接力信息，下一步转为 P3-I3
说明：该接力已由 P3-I3 和 P3-I4 完成，当前最新下一步见文末 P4-I1
记录 ripgrep@15.1.0 为本地开发检查工具，许可证为 Unlicense OR MIT；本增量未新增 npm 依赖、CI 服务、Docker 镜像、图片、视频、字体、图标、真实数据或付费工具
```

本次检查结果：

| 检查 | 结果 |
| --- | --- |
| `npm run quality:docs` | 通过，检查 68 个关键文件 |
| `npm run quality:compliance` | 通过，合规、工程约束和许可证关键词可检索 |
| `npm run quality:boundary` | 通过，根目录没有 `backend/`、`ai-services/`、`infra/` |
| `npm run quality:frontend` | 通过，串联 frontend lint/test/build |
| `npm run quality` | 通过，串联 docs/compliance/boundary/frontend |
| `npm run quality:audit` | 通过；沙箱内 DNS `EAI_AGAIN` 失败后按权限规则联网重试，结果 `found 0 vulnerabilities` |
| `npm view @vscode/ripgrep license version` | 沙箱网络 DNS `EAI_AGAIN` 失败；未作为审计依据 |
| 许可证记录 | 通过，`docs/THIRD_PARTY_NOTICES.md` 和 `docs/LICENSE_AUDIT.md` 已记录本地工具 `ripgrep@15.1.0` |
| 合规边界 | 通过，未新增真实商场资料、真实品牌、真实人物、真实数据、CI 服务、Docker 镜像或付费服务 |

## P3-I3 GitHub Actions 免费 CI 配置和本地到 CI 映射

新增文件：

```text
.github/workflows/ci.yml
```

修改文件：

```text
AGENT.md
README.md
PROGRESS.md
IMPORTANT.md
scripts/quality-gate.mjs
docs/ENGINEERING_QUALITY_GATES.md
docs/CI_PLAN.md
docs/THIRD_PARTY_NOTICES.md
docs/LICENSE_AUDIT.md
context/PROJECT_STATE.md
context/ARCHITECTURE_CURRENT.md
context/DEPLOYMENT_STATE.md
context/TEST_STATE.md
context/DECISIONS_LOG.md
context/RISKS_AND_ASSUMPTIONS.md
context/TODO_NEXT.md
```

本次交付内容：

```text
新增 GitHub Actions workflow：quality-gate job 运行 npm ci --prefix frontend 和 npm run quality
新增 dependency-audit job：运行 npm ci --prefix frontend 和 npm run quality:audit，阻断 high severity npm 漏洞
CI 使用 Node 24、ubuntu-24.04、actions/checkout@v6.0.2 和 actions/setup-node@v6.4.0
scripts/quality-gate.mjs 的 compliance 检查改为 Node 内置文件扫描，避免 CI 依赖系统 rg 或 sudo 安装
记录 GitHub Actions 账号/额度/日志边界：不发布、不上传构建产物、不使用 secrets、不接真实数据
记录 Gitee 同步边界：.github/workflows/ci.yml 同步到 Gitee 只是普通文件，不会自动运行 Gitee Go
```

本次检查结果：

| 检查 | 结果 |
| --- | --- |
| `npm run quality:docs` | 通过，检查 69 个关键文件 |
| `npm run quality:compliance` | 通过，隐私红线、工程接力、许可证/成本关键词可检索 |
| `npm run quality:boundary` | 通过，根目录没有 `backend/`、`ai-services/`、`infra/` |
| `npm run quality:frontend` | 通过，串联 frontend lint/test/build；10 个测试文件全部通过 |
| `npm run quality` | 通过，串联 docs/compliance/boundary/frontend |
| `npm run quality:audit` | 通过；沙箱内 DNS `EAI_AGAIN` 失败后按权限规则联网重试，结果 `found 0 vulnerabilities` |
| CI 配置语义 | 已映射到根级门禁；远端 GitHub runner 需要推送到 GitHub 后实际验证 |
| Gitee 边界 | 已记录，当前不启用 Gitee Go |
| 许可证记录 | 已记录 GitHub Actions、`actions/checkout@v6.0.2`、`actions/setup-node@v6.4.0` |
| 合规边界 | 未新增真实商场资料、真实品牌、真实人物、真实数据、Docker 镜像、部署服务或付费服务 |

## P3-I4 Docker Compose 草案或部署文档

新增文件：

```text
docs/DEPLOYMENT_PLAN.md
```

修改文件：

```text
AGENT.md
README.md
PROGRESS.md
IMPORTANT.md
scripts/quality-gate.mjs
docs/ENGINEERING_QUALITY_GATES.md
docs/CI_PLAN.md
docs/THIRD_PARTY_NOTICES.md
docs/LICENSE_AUDIT.md
context/PROJECT_STATE.md
context/REQUIREMENTS_CURRENT.md
context/ARCHITECTURE_CURRENT.md
context/DEPLOYMENT_STATE.md
context/TEST_STATE.md
context/DECISIONS_LOG.md
context/RISKS_AND_ASSUMPTIONS.md
context/TODO_NEXT.md
```

本次交付内容：

```text
新增 docs/DEPLOYMENT_PLAN.md：记录未来 frontend/backend/mysql/redis/ai-services/worker 服务边界
明确 P3-I4 选择“部署文档优先”，暂不创建 docker-compose.yml、infra/、backend/ 或 ai-services/
定义环境变量与 secrets 边界：不提交 .env、不写真实凭据、不写真实视频流或个人信息
定义健康检查草案：frontend /、backend /api/v1/health、MySQL readiness、Redis ping、AI service health、worker heartbeat
定义启动顺序、数据卷、日志、备份和后续 Compose 审计点
scripts/quality-gate.mjs 将 docs/DEPLOYMENT_PLAN.md 纳入必需文档，并检查部署计划关键词
README、工程质量门禁、CI 计划、IMPORTANT 和 context 已更新到 P4-I1 接力
未新增 Docker 镜像、数据库服务、npm 依赖、云服务、Gitee Go、真实数据、真实素材或付费工具
```

本次检查结果：

| 检查 | 结果 |
| --- | --- |
| `npm run quality:docs` | 通过，检查 70 个关键文件并验证部署计划关键词 |
| `npm run quality:compliance` | 通过，检索到隐私红线、P3-I4/P4-I1 接力、部署文档、健康检查、MySQL、sudo、Gitee/GitHub 和许可证/成本关键词 |
| `npm run quality:boundary` | 通过，根目录没有 `backend/`、`ai-services/`、`infra/` |
| `npm run quality` | 通过，串联 docs/compliance/boundary/frontend；10 个前端测试全部通过；build 仅提示 React Router 和 Motion/Framer Motion 依赖内 `"use client"` 指令被忽略 |
| `npm run quality:audit` | 通过；沙箱内 DNS `EAI_AGAIN` 失败后按权限规则联网重试，结果 `found 0 vulnerabilities` |
| 许可证记录 | 已说明 P3-I4 未新增第三方运行时、镜像、依赖、外部账号或付费服务，不新增审计条目 |
| 合规边界 | 未接真实 API、真实视频、真实地图、真实 BIM、真实商场素材、真实品牌、个人图像或个人轨迹 |

## 本次 P2-I9 检查结果

| 检查 | 结果 |
| --- | --- |
| CP2 交接文档 | 通过，`docs/FRONTEND_DEMO_HANDOFF.md` 记录 5 个核心页面、推荐演示路径、页面检查清单、测试摘要、已知缺口和 P3 接力 |
| 演示流转 | 通过，`demoFlow.ts` 补充客群画像演示分支，覆盖 `/customer-profile -> /digital-twin?mode=flow -> /store-analysis?category=...` |
| 演示就绪测试 | 通过，`demoReadiness.test.ts` 覆盖 5 个核心路由、主线演示路径、画像分支和匿名聚合隐私边界 |
| 依赖边界 | 通过，未新增图表库、图标库、测试框架、图片、视频、字体、模型、数据集、外部 API 或付费服务 |
| 类型检查 | 通过，`npm run lint` |
| 单元测试 | 通过，`npm run test`，10 个测试文件全部通过 |
| 生产构建 | 通过，`npm run build`；Vite 仅提示 React Router 依赖内 `"use client"` 指令被忽略，不影响构建 |
| npm 高危安全审计 | 通过，`npm audit --audit-level=high` 沙箱内 DNS `EAI_AGAIN` 失败后按权限规则联网重试，结果 `found 0 vulnerabilities` |
| 工程边界 | 通过，未创建 `backend/`、`ai-services/`、`infra/`，未接真实 API、真实视频、真实商场素材、真实品牌或个人轨迹 |
| P2-I9 接力 | 通过，当时已完成 P3-I1 接力；当前 `context/TODO_NEXT.md`、`AGENT.md`、`README.md` 已更新到 P3-I2 |

## 当前最大风险

```text
当前没有后端、AI 服务、Docker Compose 文件和生产部署，无法运行业务接口测试、AI 验证测试或真实部署启动测试；GitHub Actions CI 已配置但需推送到 GitHub 后验证远端 runner 结果
当前前端仍没有浏览器 E2E、组件测试框架和覆盖率统计；后续如引入 Playwright/Vitest 必须先审计
后续最容易侵权的位置是：真实商场平面图、品牌 Logo、商户 Logo、监控视频、人物图像、网页素材、模型权重和第三方代码片段
后续最容易产生隐私风险的位置是：视频识别、人脸、轨迹、顾客画像、日志和数据留存
后续新增依赖、模型、素材、字体、图标、数据集、Docker 镜像、MySQL/Redis 服务、Gitee Go、CI 工具或外部服务时，必须同步更新 docs/THIRD_PARTY_NOTICES.md 和 docs/LICENSE_AUDIT.md
`motion` 已加入前端依赖并通过 MIT 审计；它带来额外 bundle 体积和更多 Vite `"use client"` 提示，当前可接受，后续如追求更小包体可改回纯 CSS 动效
后续数据库统一使用 MySQL，不按 PostgreSQL 规划
后续 Python backend/ 或 ai-services/ 开发必须重新创建虚拟环境
需要 sudo 或系统级提权命令时，AI 必须停下来，让人类执行
P3-I4 已选择部署文档优先，未创建 docker-compose.yml；后续创建 Compose 前必须先审计镜像、许可证、成本、账号和 sudo 边界
P4-I1 仍不得接真实 API、真实视频、真实地图、真实 BIM、真实商场素材、真实品牌、个人图像或个人轨迹
P4-I1 只应做后端 API 契约和 MySQL 数据模型基线；不要直接创建 AI 服务或伪造生产可用性
GitHub Actions 只在 GitHub 端运行；同步到 Gitee 后 `.github/workflows/ci.yml` 不会自动运行
```

## AI 增量复盘

| 增量 | 日期 | 实际产物 | 检查 | 返工点 | 人工确认点 | 遗留风险 |
| --- | --- | --- | --- | --- | --- | --- |
| AI coding workflow optimization | 2026-05-18 | `AGENTS.md` 标准入口、`AGENT.md` 兼容入口、`context/TODO_NEXT.md` 任务卡、门禁脚本任务卡检查、README/工程门禁/skill/PROGRESS 更新 | `npm run quality` 待本次执行；`npm run quality:audit` 视网络执行 | 发现工作树已有 `AGENT.md` 删除和 `AGENTS.md` 未跟踪，已采用兼容入口方案避免旧链接断裂 | 后续 API 契约冻结、MySQL 核心表冻结、新增依赖/镜像/外部服务、接入真实数据前必须确认 | 本次只优化流程，不进入 P4-I1；后端、AI 服务、真实部署仍未开始 |

## 当前检查方法

### 1. 运行根级质量门禁

```bash
npm run quality
```

### 2. 检查高危依赖审计

```bash
npm run quality:audit
```

### 3. 检查下一步接力

```bash
rg -n "AGENTS.md|Task Card|P4-I1|API 契约|/api/v1/health|MySQL|RBAC|OpenAPI|契约检查|quality gate|质量门禁|请进行下一步|sudo|人工确认" AGENTS.md AGENT.md PROGRESS.md context/TODO_NEXT.md README.md docs/ENGINEERING_QUALITY_GATES.md docs/CI_PLAN.md
```

## 下一步应该做什么

执行 `P4-I1 backend API contract and data model baseline`。

下一步只做后端 API 契约和 MySQL 数据模型基线，不要直接创建 AI 视频服务，不要接真实 API、真实视频、真实商场素材或个人级轨迹，不要宣称生产部署可用。

建议产出：

```text
docs/API_CONTRACT.md 或同等 API 契约文档
docs/DATA_MODEL.md 或同等 MySQL 数据模型基线
健康检查 /api/v1/health 草案和错误码约定
README / docs 的 P4 接力说明
README / PROGRESS / context 接力更新
如新增 Python 依赖、MySQL 服务、Docker 镜像、Gitee Go、账号能力或外部服务必须先审计许可证和成本
```

建议检查：

```text
本地 npm run quality 和 npm run quality:audit 仍通过
文档记录当前无后端、无 AI 服务、无生产部署、无浏览器 E2E 和覆盖率统计
API 契约不跳过根级质量门禁和 GitHub Actions
MySQL、Python venv、sudo、真实素材和隐私边界仍可被文档检索
未创建 ai-services/、infra/ 或真实部署；如 P4-I1 创建 backend/ 骨架，必须同步更新风险、许可证、测试和工程边界
```

## 给人类使用的下一步指令

人类下一次只需要输入：

```text
请进行下一步
```

AI 收到后必须自动读取 `AGENTS.md`、`context/TODO_NEXT.md`、`README.md`、`PROGRESS.md`、`AI_Schedule.md`、`IMPORTANT.md`、`frontend/` 和相关 `context/*.md`，然后按任务卡执行 `P4-I1`。

## 给下一个 AI 的接力信息

```text
人类通常只会输入“请进行下一步”。AI 必须使用 mall-vision-ai-delivery 工作流，先阅读 AGENTS.md、context/TODO_NEXT.md、README.md、PROGRESS.md、AI_Schedule.md、IMPORTANT.md、docs/PRD_v1.md、docs/REQUIREMENTS_ANALYSIS.md、docs/SYSTEM_DESIGN.md、docs/FRONTEND_DEMO_HANDOFF.md、docs/ENGINEERING_QUALITY_GATES.md、docs/CI_PLAN.md、docs/DEPLOYMENT_PLAN.md、frontend/ 和相关 context/*.md；然后执行 context/TODO_NEXT.md 任务卡指定的 P4-I1：backend API contract and data model baseline。P4-I1 主角色为 Backend Mode，辅助检查 Architect、QA、Security/License。P4-I1 优先固化 /api/v1 契约、/api/v1/health、MySQL 数据模型、错误码、鉴权占位和测试策略；不要直接创建 ai-services 或真实部署服务，不要接真实 API、真实视频、真实告警记录、真实商场平面图、真实地图、真实 BIM、真实商场素材、个人图像或个人轨迹。API 契约冻结、MySQL 核心表冻结、新增依赖/镜像/外部服务或接入真实数据前必须让人类确认。后续数据库统一使用 MySQL；进入 Python backend/ 或 ai-services/ 开发时必须重新创建虚拟环境；需要 sudo 时必须停下来让人类执行。完成后更新 PROGRESS.md、context/TODO_NEXT.md 和必要风险记录。
```
