# Risks And Assumptions

更新时间：2026-05-13

## 当前假设

| 假设 | 影响 |
| --- | --- |
| 项目当前用于课程设计、学习和规划 | 仍按可审计、低侵权风险标准执行 |
| 第一轮使用 Mock、合成、自绘数据 | 不需要真实商场授权即可推进 Demo |
| 人类只输入短指令继续 | `PROGRESS.md` 和 `TODO_NEXT.md` 必须保持可接力 |
| 后续按 P1-P12 逐步实现 | 不在 P0 写工程代码 |
| P1-I1 页面范围已固定为 5 个核心页面 | P2 前端 Demo 按该范围拆分页面和 Mock 数据 |
| P1-I2 已固定浅色设计 token 和布局规则 | P2 前端 Demo 按该 token 和 App Shell 实现 UI，不重新发明视觉体系 |
| P1-I3 已固定组件、状态和图表规范 | P2 前端 Demo 按组件边界和图表口径实现，避免页面内临时拼装 |
| P1-I4 已固定交互、响应式、可访问性和设计评审门禁 | P2 前端 Demo 按路由状态、筛选恢复、键盘、响应式和可访问性规则实现 |
| P2-I1 已创建前端工程骨架 | 后续页面在已有 React/Vite 工程内增量实现 |
| P2-I2 已创建虚构 Mock 数据与共享类型 | 后续业务页优先消费 `frontend/src/mock` 和 `frontend/src/types`，避免页面内临时造数据 |
| P2-I3 已完成运营总览页面 | 后续页面可以复用 MetricCard、SummaryStrip、StatusBadge、TrendSparkline 和 Dashboard drill-down 规则 |
| P2-I4 已完成店铺分析页面 | 后续页面可以复用 ScoreBreakdown、StoreList、StatusBadge 和店铺/告警跳转规则 |
| P2-I5 已完成低效预警页面 | 后续页面可以复用 AlertList、AlertDetail、StatusBadge 和告警/店铺/空间位置跳转规则 |
| P2-I6 已完成数字孪生 Demo 页面 | 后续 E2E 和演示打磨可以复用 `/digital-twin` 的自绘 SVG 平面、FloorPlan、TwinInspector 和 query mode 规则 |
| P2-I7 已完成核心演示流转和响应式检查 | 后续页面应复用 demoFlow helper 和响应式防溢出规则，避免跨页 query 规则分叉 |
| P2-I8 已完成客群画像页面 | 后续阶段应继续保持匿名聚合，不引入个人身份、会员 ID、人脸或个人轨迹 |
| P2-I9 已完成 CP2 前端 Demo 收口 | 后续 P3 应以工程质量门禁和可恢复接力为主，不改变 P2 前端演示合同 |
| CP2 后前端视觉重构已完成 | 后续前端改动应继续使用 `PRODUCT.md` / `DESIGN.md`、本地 CSS/React、自绘 SVG 和已审计依赖，不新增未审计素材 |
| 极简高级全站精修允许 `motion` | `motion@12.38.0` 已按 MIT 记录，用于克制状态动效；后续不得借此引入未审计图片、图标、字体或付费服务 |
| P3-I1 工程化规划已完成 | 后续 P3-I2/P3-I3/P3-I4 应按 `docs/ENGINEERING_QUALITY_GATES.md` 和 `docs/CI_PLAN.md` 分步落地，不能跳到生产部署 |
| P3-I2 根级质量门禁已完成 | 后续 P3-I3 应复用 `npm run quality` 和 `npm run quality:audit`，避免 CI 与本地检查分叉 |
| P3-I3 GitHub Actions CI 已完成 | GitHub 端 CI 复用根级门禁；Gitee 镜像不会自动运行 `.github/workflows/ci.yml` |
| P3-I4 部署计划已完成 | 当前只新增 `docs/DEPLOYMENT_PLAN.md` 和部署文档门禁，不创建真实 Compose、镜像、数据库服务或生产部署 |
| P4-I1 将进入后端契约基线 | 先固化 `/api/v1`、`/api/v1/health`、MySQL 数据模型和测试策略；如创建 `backend/` 必须重建 Python venv |
| 数据库使用 MySQL | 后续 P4 数据模型、迁移、容器和连接串必须按 MySQL 设计 |
| 后续 Python 环境重新创建虚拟环境 | 避免旧依赖污染 backend/ 和 ai-services/ |
| 需要 sudo 的命令由人类执行 | AI 必须暂停并等待执行结果 |

## 当前风险

| 风险 | 等级 | 缓解 |
| --- | --- | --- |
| 真实商场平面图、BIM、地图侵权 | 高 | 使用自绘几何楼层图；真实资料必须授权 |
| 真实监控、人脸、个人轨迹隐私风险 | 高 | 禁用未授权真实素材；只展示匿名聚合 |
| 品牌和商户 Logo 侵权 | 高 | 使用虚构店铺名和通用业态 |
| 许可证不清依赖或模型 | 高 | 未审计前禁用；记录 LICENSE_AUDIT |
| 付费服务成本风险 | 中 | 默认本地免费开源方案 |
| Slidev 依赖链 moderate 漏洞 | 中 | 当前只用于本地演示材料，`npm audit --audit-level=high` 未发现 high 级别阻塞；后续升级 Slidev 时复查 |
| MySQL 服务、镜像和 Python driver 许可证需后续审计 | 中 | P4 前记录 MySQL 版本、镜像来源、driver 许可证和部署方式 |
| Python 虚拟环境污染 | 中 | 后端或 AI 服务开始前重建 venv，依赖写入 lock/requirements |
| sudo 操作误执行 | 中 | AI 不直接执行 sudo；由人类在本机执行并反馈结果 |
| 后续范围膨胀 | 中 | 按小增量执行，每次更新 TODO_NEXT |
| 无浏览器 E2E 和覆盖率统计 | 中 | P2-I9 已做阶段收口并记录缺口；后续若引入 Playwright/Vitest 必须先审计许可证、网络和成本 |
| 数字孪生和演示打磨可能诱发真实商场平面图、地图或 BIM 诉求 | 高 | 继续使用虚构楼层、Mock geometry、自绘几何和 Mock 数据；不接真实地图、真实商场平面图、BIM、视频、品牌素材或个人信息 |
| 客群画像可能诱发个人画像或轨迹展示 | 高 | `/customer-profile` 只展示匿名聚合时段、楼层和业态偏好；不展示个人身份、会员 ID、人脸、轨迹或可识别画像 |
| 前端视觉打磨可能诱发外部图片、图标库、字体或付费设计工具 | 中 | 2026-05-13 重构只用本地 CSS/React、自绘 SVG 和系统字体；后续新增素材或依赖必须先审计许可证和成本 |
| 前端动画库增加依赖面和 bundle 体积 | 中 | 已选择 MIT `motion@12.38.0`，只用于克制页面/面板状态动效；保留 reduced motion，运行 lint/test/build/audit |
| CI、Docker、扫描工具可能诱发账号、付费额度或许可证风险 | 中 | P3-I2 只新增本地脚本且未新增依赖；P3-I3/P3-I4 如引入 CI 服务、Docker 镜像或扫描工具，先审计许可证、成本、账号要求和数据传输边界 |
| GitHub Actions 账号、额度和日志数据边界 | 中 | P3-I3 只运行质量门禁和高危 npm audit，不使用 secrets、不上传构建产物、不接真实数据；私有仓库或超额使用需人工确认 GitHub 额度和计费 |
| Gitee 镜像不自动运行 GitHub Actions | 中 | 文档明确 `.github/workflows/ci.yml` 同步到 Gitee 只是普通文件；如需要 Gitee Go，单独增量评估 `/.workflow/`、免费额度、账号、服务条款和日志数据 |
| 过早创建 Docker Compose 造成假部署 | 中 | P3-I4 选择部署文档优先；后续等 `/api/v1/health`、MySQL 数据模型和后端骨架明确后再创建可运行 Compose |

## 下一步动作

P4-I1 做后端 API 契约和 MySQL 数据模型基线时继续避免真实监控、会员身份、人脸、个人轨迹、真实品牌和未授权视觉素材；优先复用 GitHub Actions、`npm run quality` 和 `npm run quality:audit`，先固化 `/api/v1/health`、错误码、RBAC 占位和 MySQL 表边界。如新增 `backend/`、Python 依赖、MySQL driver、Docker 镜像、数据库服务、Gitee Go、依赖或外部服务，必须先审计许可证和成本并更新第三方记录。如 npm 网络审计受限，需要按审批规则处理；如遇 sudo 或系统级安装要求，AI 必须停下来让人类执行。
