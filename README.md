# 商业综合体视觉 AI 数字孪生运营系统

这是一个面向商业综合体运营的视觉 AI 数字孪生项目。目标是通过客流、店铺进出、停留、热力、动线、店铺评分和低效预警，帮助运营人员看清商场状态，并辅助招商、调铺、营销和现场运营决策。

当前项目处于开发前准备阶段，尚未开始前端、后端或 AI 视频服务编码。

## 文档入口

| 文件 | 用途 |
| --- | --- |
| [AI_Schedule.md](AI_Schedule.md) | 完整 AI 分阶段开发计划、设计规范、测试门禁、许可证规则 |
| [PROGRESS.md](PROGRESS.md) | 给人类看的当前进度：做到哪里、还差什么、怎么检查 |
| [skills/mall-vision-ai-delivery/SKILL.md](skills/mall-vision-ai-delivery/SKILL.md) | 给 Codex 使用的项目专用 skill |

## 开发模式

本项目采用“单 AI 分阶段开发”模式，不使用多个 AI 并行拆分任务。

同一个 AI 在每个阶段只选择一个主角色模式，其他角色只作为检查清单使用：

| 角色模式 | 负责内容 |
| --- | --- |
| Product Mode | 需求、用户故事、指标口径、验收标准 |
| Architect Mode | 架构、模块边界、接口契约、数据流 |
| Design Mode | 页面结构、设计 token、组件与交互规范 |
| Frontend Mode | React/Vite 页面、图表、Mock、E2E、3D 展示 |
| Backend Mode | FastAPI、数据库、业务服务、统计计算 |
| AI Video Mode | 视频接入、检测、追踪、ROI/进出计数 |
| Data Mode | 事件口径、聚合统计、数据质量和回放验证 |
| QA Mode | 单元、接口、契约、E2E、性能、安全测试 |
| Security/License Mode | 隐私、安全、依赖、模型、素材许可证审计 |
| DevOps Mode | Docker、CI/CD、监控、备份和部署 |

## 阶段路线

| 阶段 | 主角色 | 目标 |
| --- | --- | --- |
| P0 | Product Mode | 项目基线与上下文恢复 |
| P1 | Design Mode | 设计规范与信息架构 |
| P2 | Frontend Mode | 前端 Demo MVP |
| P3 | DevOps Mode | 工程化骨架 |
| P4 | Backend Mode | 后端 API 与数据模型 |
| P5 | Frontend Mode | 前后端联调 |
| P6 | AI Video Mode | AI 视频识别 MVP |
| P7 | Backend Mode | 店铺经营评分 MVP |
| P8 | Data Mode | 客群、热力、动线分析 |
| P9 | Frontend Mode | 3D 数字孪生可交付版 |
| P10 | QA Mode | 工业级测试与安全加固 |
| P11 | DevOps Mode | 部署与观测 |
| P12 | Product Mode | 验收与移交 |

完整排期和每阶段门禁见 [AI_Schedule.md](AI_Schedule.md)。

## 每次 AI 任务必须遵守

```text
1. 先读 README.md、AI_Schedule.md、PROGRESS.md 和 context/ 恢复包
2. 判断当前阶段
3. 选择一个主角色模式
4. 明确本次只交付什么、哪些不做
5. 实现或产出文档
6. 运行相关测试或记录测试缺口
7. 检查新增依赖、模型、素材是否免费且许可证清晰
8. 更新 context/ 恢复包
9. 更新 PROGRESS.md
```

## 下一步

下一步应执行 P0，不要直接开始写前端或后端。

建议给 AI 的 prompt：

```text
请使用 $mall-vision-ai-delivery。

你是本项目唯一使用的 AI。
本次进入 Product Mode。

任务：完成 P0 项目基线与上下文恢复。

只创建：
- docs/PRD_v1.md
- docs/USER_STORIES.md
- docs/ACCEPTANCE_CRITERIA.md
- docs/METRICS_DEFINITION.md
- docs/TEST_STRATEGY.md
- docs/QUALITY_GATE.md
- context/PROJECT_STATE.md
- context/REQUIREMENTS_CURRENT.md
- context/ARCHITECTURE_CURRENT.md
- context/TEST_STATE.md
- context/TODO_NEXT.md

不要写前端、后端、AI 视频服务。
完成后更新 PROGRESS.md。
```

## 当前测试方法

当前还没有业务代码，只能检查文档和 skill：

```bash
test -f README.md
test -f AI_Schedule.md
test -f PROGRESS.md
test -f skills/mall-vision-ai-delivery/SKILL.md
test -f skills/mall-vision-ai-delivery/agents/openai.yaml
rg -n "单 AI 工作流|P0|P12|测试与质量门禁|开源资源" AI_Schedule.md
```
