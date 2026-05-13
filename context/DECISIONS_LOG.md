# Decisions Log

更新时间：2026-05-13

| 日期 | 决策 | 原因 | 影响 |
| --- | --- | --- | --- |
| 2026-05-10 | 采用单 AI 增量迭代和短指令接力 | 减少上下文断裂，降低人工 prompt 成本 | 每次任务必须更新 `PROGRESS.md` 和 `context/TODO_NEXT.md` |
| 2026-05-10 | P0 一次性完成项目基线文档，并额外完成需求分析和系统设计文档 | 用户明确要求完成 P0 任务并额外补充两类文档 | P1 可直接进入信息架构和页面范围 |
| 2026-05-10 | 第一轮只使用 Mock、合成、自绘数据 | 避免真实素材、隐私和授权风险 | P2 前端 Demo 不依赖真实商场资料 |
| 2026-05-10 | 技术栈草案采用 React/Vite、FastAPI、MySQL、Redis、Python AI services | 用户确认数据库使用 MySQL，其他栈与项目计划一致 | 后续实现、容器服务、迁移和连接串均按 MySQL 设计 |
| 2026-05-10 | 默认不引入付费工具、付费云服务、付费 API、付费模型或付费素材 | 控制经济成本和账号绑定风险 | 如需引入必须先得到用户批准 |
| 2026-05-10 | 后续 Python 环境需要重新创建虚拟环境 | 避免旧环境污染后端和 AI 服务依赖 | 进入 backend/ 或 ai-services/ 开发时先创建新 venv 并记录命令 |
| 2026-05-10 | 需要 sudo 的命令必须停下来让人类执行 | 避免 AI 直接进行系统级提权操作 | AI 只能说明命令、目的和预期结果，等待人类反馈后继续 |
| 2026-05-10 | P1-I1 固定 5 个核心页面和路由 | 让 P2 前端 Demo 能按明确页面范围实现，避免先写代码后补设计 | 后续页面以 `/dashboard`、`/digital-twin`、`/store-analysis`、`/customer-profile`、`/store-alerts` 为主，P1-I2 继续定义 token 和布局 |
| 2026-05-10 | P1-I2 采用浅色运营工作台 token 和 12 列桌面栅格 | 项目需要长期可读的运营界面，不做营销页或装饰性大屏 | P2 前端应优先使用 `DESIGN_TOKENS.md` 和 `UI_SPEC.md` 的 token、App Shell、卡片、图表和响应式规则 |
| 2026-05-10 | P1-I3 固定核心组件、状态组件和图表规范 | P2 前端实现需要稳定组件边界、图表口径和测试关注点 | P2 实现应按 `COMPONENT_SPEC.md` 与 `CHART_SPEC.md` 创建组件、Mock 数据和图表测试 |
| 2026-05-10 | P1-I4 固定交互、响应式、可访问性和设计评审门禁 | P2 前端初始化前需要明确路由状态、筛选恢复、键盘交互、响应式视口和合规门禁 | P2-I1 可以创建 `frontend/`，但只做工程骨架、基础路由、AppShell、样式 token、基础测试和许可证记录 |
| 2026-05-10 | P2-I1 前端工程采用 React + TypeScript + Vite 与 Node 内置测试 | 在网络依赖受限时保持最小依赖集合，并提供可运行 lint/test/build 门禁 | 后续前端页面在 `frontend/` 内增量实现；Playwright/Vitest 可在后续明确增量引入 |
| 2026-05-10 | P2-I2 Mock 数据全部使用虚构商场、虚构店铺、自绘坐标和匿名聚合数据 | 避免真实商场资料、品牌、监控和个人信息风险，同时为页面实现提供稳定数据源 | P2-I3 及后续页面优先复用 `frontend/src/types` 和 `frontend/src/mock`，不要在页面内复制临时数据 |
| 2026-05-10 | P2-I3 运营总览先用 CSS/SVG 和 Node 内置测试实现 | 不新增图表库和测试库，保持依赖面可控，同时让 `/dashboard` 具备可演示业务内容 | 后续页面可复用 StatusBadge、MetricCard、SummaryStrip、TrendSparkline 和 `buildRouteWithGlobalQuery` 的 query 合并能力 |
| 2026-05-10 | P2-I4 店铺分析继续用 CSS/HTML 和 Node 内置测试实现 | 不新增图表库和测试库，保持依赖面可控，同时让 `/store-analysis` 具备可演示业务内容 | 后续预警页可复用 StatusBadge、ScoreBreakdown、StoreList 和店铺/告警 drill-down query 合并能力 |
| 2026-05-10 | P2-I5 低效预警继续用 CSS/HTML 和 Node 内置测试实现 | 不新增图表库和测试库，保持依赖面可控，同时让 `/store-alerts` 具备可演示业务内容 | 后续数字孪生页可复用 StatusBadge、AlertList、AlertDetail 和告警/店铺/空间位置 drill-down query 合并能力 |
| 2026-05-10 | P2-I6 数字孪生 Demo 用自绘 SVG、CSS 和 Node 内置测试实现 | 避免真实商场平面图、地图、BIM、品牌和新增图形依赖风险，同时让 `/digital-twin` 具备热力、动线、告警和评分联动展示 | P2-I7 可以围绕 Dashboard、Digital Twin、Store Analysis、Store Alerts 做核心路径、响应式和演示打磨 |
| 2026-05-10 | P2-I7 不新增 Playwright/Vitest，先用 Node 内置测试固化核心演示流转和响应式 CSS 规则 | 降低新增依赖、浏览器下载、网络和许可证风险，同时满足当前 Demo 的可重复检查 | P2-I8 可复用 `frontend/src/routes/demoFlow.ts` 做客群画像到数字孪生和店铺分析的 drill-down query |
| 2026-05-10 | P2-I8 客群画像继续用 Mock、CSS/HTML 和 Node 内置测试实现 | 避免引入图表库、个人画像、会员身份、人脸和个人轨迹风险，同时补齐第五个核心业务页面 | P2-I9 可以做 CP2 前端 Demo 收口和 P3 工程化骨架接力 |
| 2026-05-11 | P2-I9 不新增依赖，使用文档和 Node 内置测试完成 CP2 前端 Demo 收口 | 保持依赖面、许可证和网络风险可控，同时让 5 个核心路由、演示路径和隐私边界可重复检查 | P3-I1 可以进入工程化骨架规划与质量门禁对齐，仍不得直接接真实 API、真实视频或真实商场素材 |
| 2026-05-13 | CP2 后前端视觉重构只使用本地 CSS/React 和自绘 SVG，不新增依赖或素材 | 用户要求使用前端设计 skill 重构更精美、优雅且免费的页面；继续保持免费工具、可审计和低侵权风险边界 | 新增 `PRODUCT.md` / `DESIGN.md` 作为 impeccable 上下文；升级 AppShell、token、Dashboard、Digital Twin 和全局样式；为后续 P3-I1 工程化规划保留视觉上下文 |
| 2026-05-13 | P3-I1 只产出工程质量门禁和 CI 计划文档，不创建 CI、Docker、后端或 AI 服务 | 先对齐可重复门禁和边界，避免一口气引入工具、镜像、账号或未审计依赖 | 新增 `docs/ENGINEERING_QUALITY_GATES.md` 和 `docs/CI_PLAN.md`；下一步 P3-I2 创建根级质量门禁脚本或统一命令入口 |
| 2026-05-13 | 极简高级全站精修允许新增已审计 MIT `motion` 依赖 | 用户选择“极简高级版”“全站五页”和“允许动画库”；`motion` 可在 React 19 下提供克制状态动效，npm lockfile 记录许可证为 MIT | 新增 `MotionSurface`，五页使用页面/面板入场动效；更新第三方声明和许可证审计；下一步仍保持 P3-I2 |
| 2026-05-13 | P3-I2 采用根级 npm scripts 和 Node 内置脚本实现本地质量门禁 | 避免新增依赖、付费工具、CI 账号或外部服务，同时让文档、合规、边界和前端 lint/test/build 可由一条命令重复执行 | 新增 `package.json` 与 `scripts/quality-gate.mjs`；`npm run quality` 运行基础门禁，`npm run quality:audit` 单独运行高危依赖审计；下一步 P3-I3 复用该入口做免费 CI 映射 |
