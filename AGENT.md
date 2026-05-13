# AGENT.md

本文件是每次 AI 继续本项目时的必读入口。它只保存执行规则和文档索引，不复制 `AI_Schedule.md` 的详细排期。

## 当前项目状态

- 当前阶段：P0 项目基线与上下文恢复、P1 设计规范阶段、P2-I1 前端工程初始化、P2-I2 Mock 数据和共享类型、P2-I3 运营总览页面、P2-I4 店铺分析页面、P2-I5 低效预警页面、P2-I6 数字孪生 Demo 页面、P2-I7 E2E/响应式/演示打磨、P2-I8 客群画像页面、P2-I9 CP2 前端 Demo 收口和交接、CP2 后前端视觉重构、P3-I1 工程化骨架规划与质量门禁对齐已完成；下一步进入 P3-I2 根级质量门禁脚本或统一命令入口。
- 当前代码状态：已有 `frontend/` React + TypeScript + Vite 工程骨架、5 个核心路由、共享 TypeScript 类型、虚构 Mock 数据、数据边界测试、核心演示流转测试、CP2 演示就绪测试、响应式 CSS 检查和 `/dashboard`、`/store-analysis`、`/store-alerts`、`/digital-twin`、`/customer-profile` 五个业务页面；已有 `docs/ENGINEERING_QUALITY_GATES.md` 和 `docs/CI_PLAN.md`；尚无 `backend/`、`ai-services/`、`infra/`、根级脚本或 CI 配置。
- 当前已有交付：项目规划文档、P0 需求与系统设计文档、P1 设计规范文档、P2-I1 前端工程骨架、P2-I2 Mock 数据与共享类型、P2-I3 运营总览页面、P2-I4 店铺分析页面、P2-I5 低效预警页面、P2-I6 数字孪生 Demo 页面、P2-I7 QA 打磨与核心路径检查、P2-I8 客群画像页面、P2-I9 前端 Demo 交接文档和演示就绪测试、CP2 后视觉重构、P3-I1 工程质量门禁文档和 CI 计划文档、`context/` 恢复包、Codex 项目 skill、第三方声明、Typst 汇报稿和已生成的 `slides/slide.pdf`。
- 开发模型：单 AI 增量迭代开发。`P0` 到 `P12` 是路线图，实际工作按 `P0-I1`、`P0-I2` 这类小增量逐步交付。
- 人类参与边界：人类只负责检查结果、提出修正和输入“请进行下一步”等短指令；AI 必须自动从 `PROGRESS.md` 和 `context/TODO_NEXT.md` 找到下一步并完成完整增量。
- 下一步：执行 `P3-I2`，做根级质量门禁脚本或统一命令入口。优先把 P3-I1 定义的文档结构检查、合规关键词检查、工程边界检查和 frontend lint/test/build 串成可重复本地命令；不要直接创建后端或 AI 视频服务，不接真实 API、真实视频、真实商场平面图、真实商场素材或个人轨迹；如新增依赖或 CI/扫描工具，必须先审计许可证和成本。

## 每次任务必读顺序

| 文件地址 | 摘要 |
| --- | --- |
| `AGENT.md` | 当前文件。确认本次 AI 必须遵守的执行顺序、文档职责、免费工具和版权约束。 |
| `README.md` | 面向人类的项目介绍、文档入口、权限与免责声明。 |
| `PROGRESS.md` | 面向人类的当前进度、已完成事项、下一步和当前风险。 |
| `AI_Schedule.md` | 面向 AI 的 P0-P12 路线图、增量拆分、阶段门禁、技术栈、测试规则和许可证规则。 |
| `IMPORTANT.md` | 动态风险记录，尤其是非工程问题、侵权、许可证不清、付费工具、经济成本和隐私事项。 |
| `docs/THIRD_PARTY_NOTICES.md` | 当前已记录的第三方包、字体、素材或工具声明。新增依赖或素材时必须同步更新。 |
| `skills/mall-vision-ai-delivery/SKILL.md` | Codex 项目专用 skill。处理本仓库任务时必须按该工作流执行。 |
| `context/*.md` | P0 后的上下文恢复包。存在时必须读取；不存在时按 P0 计划创建，不依赖聊天记录替代。 |

## 固定执行规则

1. 使用 `mall-vision-ai-delivery` 工作流；每次任务必须自动识别当前增量并选择一个主角色模式，其他角色只作为检查清单。
2. 先从文件恢复项目状态，再决定当前阶段和增量；如果文档互相冲突，先列出冲突，不要直接改接口、数据模型或阶段结论。
3. 不跳阶段、不做大爆炸开发。当前下一步是 `P3-I2`，只做根级质量门禁脚本或统一命令入口；除非该增量明确拆出边界，不要提前创建后端、AI 视频服务、CI 配置或生产部署工程。
4. 不引入付费开发工具、付费 SaaS、付费 API、付费素材、付费模型或有商业授权门槛的服务，除非用户明确批准。
5. 优先使用免费、开源、许可证清晰的工具和素材；即使项目当前不商业化，也默认按未来可审计、可替换、低侵权风险处理。
6. 不使用来源不明的视频、图片、字体、地图、商场平面图、品牌 Logo、商户 Logo、监控画面、模型权重、数据集或复制代码。
7. 任何新增第三方依赖、模型、字体、图标、图片、视频、模板、数据集或复制代码，都要更新 `docs/THIRD_PARTY_NOTICES.md`；当 `docs/LICENSE_AUDIT.md` 创建后也必须同步更新。
8. 发现非工程问题、法律侵权、许可证不清、隐私不清、经济成本或需要授权的内容，必须立即在 `IMPORTANT.md` 中加重点批注。
9. 新增或修改业务代码时必须补对应测试；当前没有源码时，只运行文档和结构检查，并在 `PROGRESS.md` 记录测试缺口。
10. 每个增量结束必须更新受影响的 `context/*.md` 和 `PROGRESS.md`，并让 `PROGRESS.md` 足以支持下一次只输入“请进行下一步”后自动续作。
11. 后续数据库统一使用 MySQL；不要再按 PostgreSQL 规划数据库、容器服务、连接串、迁移示例或部署文档。
12. 后续进入 Python 后端或 AI 服务开发时，需要重新创建虚拟环境；不要复用旧虚拟环境状态。
13. 任何需要 `sudo`、系统包安装、系统服务管理或提权修改的命令，AI 必须停下来，把命令和目的写清楚，让人类手动执行；AI 不得直接执行 `sudo`。

## 短指令接力规则

当人类输入以下短指令时，AI 必须自动继续，不要求人类粘贴详细 prompt：

```text
请进行下一步
继续
下一步
```

AI 每次需要完成完整增量闭环：

```text
读取必读文件
从 context/TODO_NEXT.md 或 PROGRESS.md 找到下一增量
恢复上下文并检查冲突
自动选择一个主角色模式
完成开发或文档产出
补充或更新测试与检查
运行相关命令
更新 PROGRESS.md
更新受影响的 context/*.md
必要时更新 IMPORTANT.md、THIRD_PARTY_NOTICES.md、LICENSE_AUDIT.md
留下下一步 AI 可读接力信息
```

人类不需要选择角色、不需要拼接上下文、不需要手写长 prompt。人类只检查交付结果；确认继续时输入“请进行下一步”。

## 自动化增量流程

每次 AI 必须按以下顺序执行：

```text
1. 读取必读文件
2. 总结当前状态
3. 识别当前增量：优先 context/TODO_NEXT.md，其次 PROGRESS.md 的下一步信息，其次最早未完成增量
4. 自动选择一个主角色模式
5. 写明本次小交付和明确不做的范围
6. 先检查非工程、法律侵权、隐私、许可证、经济成本风险
7. 如发现风险，先更新 IMPORTANT.md
8. 实现或产出文档
9. 运行测试或检查
10. 更新 PROGRESS.md、context 和第三方/许可证记录
11. 留出下一次短指令可自动续作的 AI 接力信息
```

## 自动角色选择规则

```text
需求、范围、用户故事、指标、验收、进度接力 -> Product Mode
架构、模块边界、API、数据模型、数据流 -> Architect Mode
信息架构、设计 token、组件和图表规范 -> Design Mode
React/Vite 页面、组件、Mock、图表、3D -> Frontend Mode
FastAPI、数据库、服务、统计、鉴权 -> Backend Mode
视频接入、检测、追踪、ROI 计数 -> AI Video Mode
指标聚合、事件回放、数据质量 -> Data Mode
测试策略、覆盖率、E2E、性能、安全测试 -> QA Mode
隐私、许可证、侵权、付费工具、成本风险 -> Security/License Mode
Docker、CI/CD、部署、监控、备份恢复 -> DevOps Mode
```

## 环境与提权规则

```text
数据库：MySQL
Python 环境：后续创建 backend/ 或 ai-services/ 时必须重新创建虚拟环境
sudo 规则：遇到 sudo 或系统级提权命令时必须暂停，让人类执行
```

默认阶段角色：

```text
P0 Product Mode
P1 Design Mode
P2 Frontend Mode
P3 DevOps Mode
P4 Backend Mode
P5 Frontend Mode
P6 AI Video Mode
P7 Backend Mode
P8 Data Mode
P9 Frontend Mode
P10 QA Mode
P11 DevOps Mode
P12 Product Mode
```

## 文档职责边界

| 文件 | 负责内容 | 不负责内容 |
| --- | --- | --- |
| `README.md` | 项目是什么、为什么做、文档入口、免责声明、如何开始 | 不展开完整排期和每个阶段细节 |
| `AI_Schedule.md` | AI 路线图、增量拆分、角色模式、技术规范、测试门禁、交付清单 | 不作为人类进度日报 |
| `PROGRESS.md` | 人类快速理解当前做到哪里、还差什么、怎么检查 | 不保存长篇技术方案 |
| `AGENT.md` | 每次 AI 必读规则、文档索引、执行约束 | 不复制详细需求或排期 |
| `IMPORTANT.md` | 非工程、授权、侵权、隐私、付费工具、经济成本风险批注 | 不替代第三方声明和许可证审计 |

## 当前推荐下一步指令

人类下一次只需要输入：

```text
请进行下一步
```

AI 必须据此读取 `PROGRESS.md` 和 `context/TODO_NEXT.md`，自动识别当前应执行 `P3-I2`，并完成根级质量门禁脚本或统一命令入口、风险记录和上下文更新。

## 交付前检查

```text
已读取必读文件
已确认当前阶段和增量
已选择一个主角色模式
未引入付费开发工具
未引入来源不明或授权不清内容
新增第三方内容已记录
相关测试或检查已运行
PROGRESS.md 已更新
PROGRESS.md 已写入短指令接力信息，可支持人类下一次只输入“请进行下一步”
context/ 已按阶段要求更新，下一步写入 context/TODO_NEXT.md
```
