# TODO Next

更新时间：2026-05-13

## 下一增量

```text
P3-I2 root quality gate script and local command entry
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
docs/FRONTEND_DEMO_HANDOFF.md
docs/THIRD_PARTY_NOTICES.md
docs/LICENSE_AUDIT.md
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
P2-I3 operations overview dashboard
P2-I4 store analysis page
P2-I5 store alerts page
P2-I6 digital twin demo page
P2-I7 E2E, responsive checks, and demo polish
P2-I8 customer profile page
P2-I9 CP2 frontend demo closure and handoff
CP2 后前端视觉重构和 impeccable 上下文补齐
P3-I1 engineering skeleton planning and quality gate alignment
```

P2 已覆盖：

```text
前端工程骨架：React + TypeScript + Vite、5 个核心路由、AppShell、CSS token、Node 内置测试、lint/test/build 脚本
共享类型：Mall、Floor、Store、StoreScore、StoreAlert、CustomerProfile、OverviewMetric、HeatmapPoint、FlowEdge
虚构 Mock 数据：1 个商场、5 个楼层、100 家店铺、8 种业态、20 条预警、运营总览、热力点、流向线、匿名聚合画像
五个业务页面：/dashboard、/digital-twin、/store-analysis、/store-alerts、/customer-profile
核心演示流转：/dashboard -> /digital-twin -> /store-analysis -> /store-alerts
客群画像流转：/customer-profile -> /digital-twin?mode=flow 和 /customer-profile -> /store-analysis?category=...
响应式检查：1199px/767px 断点、布局堆叠、表格横向滚动、SVG 数字孪生平面、画像时段图横向滚动和长文本防溢出
CP2 收口：docs/FRONTEND_DEMO_HANDOFF.md、demoReadiness.test.ts、测试报告摘要、P3 接力
CP2 后视觉重构：PRODUCT.md、DESIGN.md、OKLCH token、AppShell、Dashboard 运营摘要、Digital Twin 控制区和全局组件样式
P3-I1 工程化规划：docs/ENGINEERING_QUALITY_GATES.md、docs/CI_PLAN.md、根级门禁目标、CI 计划和 P3 拆分
```

2026-05-13 P3-I1 已完成。下一步是 P3-I2，不要跳到新页面、后端、AI 服务、CI 配置或部署工程。

## P3-I2 目标

进入 DevOps Mode，完成根级质量门禁脚本或统一命令入口。P3-I2 优先把 P3-I1 定义的文档结构检查、合规关键词检查、工程边界检查和 frontend lint/test/build 串成可重复本地命令；不直接创建后端或 AI 服务，不接真实 API，不引入真实素材。

建议创建或更新：

```text
根级 package.json 或 scripts/quality-gate 脚本
README.md
PROGRESS.md
context/PROJECT_STATE.md
context/ARCHITECTURE_CURRENT.md
context/TEST_STATE.md
context/DEPLOYMENT_STATE.md
context/RISKS_AND_ASSUMPTIONS.md
context/DECISIONS_LOG.md
context/TODO_NEXT.md
```

可选小范围代码改动：

```text
根目录 package.json 或脚本入口，用于统一调用 docs/boundary checks 和 frontend lint/test/build
如果包含 npm audit，需要明确网络失败处理方式
```

如果新增根级脚本、CI 工具、Docker 镜像、依赖或外部服务，必须先检查许可证、成本和账号要求，并同步更新：

```text
docs/THIRD_PARTY_NOTICES.md
docs/LICENSE_AUDIT.md
IMPORTANT.md
```

## P3-I2 建议内容

```text
根级质量门禁脚本：文档结构检查、合规关键词检查、工程边界检查、frontend lint/test/build
可选 audit 脚本：保留 npm audit --audit-level=high，但允许单独运行以处理网络审批
README / docs 更新：说明本地质量门禁入口
P3 增量接力：P3-I3 CI 配置，P3-I4 Docker Compose 草案或部署文档
明确当前仍无 backend/、ai-services/、infra/，不得伪造生产可用性
继续记录 MySQL、Python venv、sudo、真实素材和隐私边界
```

## 禁止事项

```text
不要直接创建 backend/ 或 ai-services/
不要接真实 API
不要接真实视频流
不要接真实会员、支付、画像或轨迹数据
不要展示个人轨迹、个人身份、人脸、会员 ID 或个人画像
不要使用真实商场平面图、真实地图、真实 BIM 或真实商场素材
不要新增真实品牌 Logo、监控视频或个人图像
不要引入付费工具、付费服务、付费素材或需要账号绑定的云服务
不要使用 PostgreSQL 作为数据库；后续数据库统一使用 MySQL
不要复用旧 Python 虚拟环境；进入 backend/ 或 ai-services/ 时重新创建 venv
不要执行 sudo；遇到 sudo 或系统级提权命令时必须停下来让人类执行
```

## P3-I2 检查建议

```bash
test -f docs/ENGINEERING_QUALITY_GATES.md
test -f docs/CI_PLAN.md
cd frontend
npm run lint
npm run test
npm run build
find /home/ljh/project/subway -maxdepth 1 -type d \( -name backend -o -name ai-services -o -name infra \)
rg -n "P3-I2|quality gate|质量门禁|CI|MySQL|sudo|虚拟环境|请进行下一步" PROGRESS.md context/TODO_NEXT.md AGENT.md README.md docs/ENGINEERING_QUALITY_GATES.md docs/CI_PLAN.md
rg -n "不使用真实监控画面|不存储人脸原图|不展示个人轨迹|不使用未授权商场平面图|不使用真实品牌|不引入付费" docs context IMPORTANT.md
```
