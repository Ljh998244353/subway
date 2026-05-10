# 商业综合体视觉 AI 数字孪生运营系统

本项目是面向商业综合体运营场景的视觉 AI 数字孪生系统规划。目标是把客流、进出店、停留、热力、动线、店铺评分和低效预警统一到可解释的运营视图中，辅助招商、调铺、营销、安保和现场运营决策。

当前仓库处于开发前准备阶段：已有规划文档、项目 skill、第三方声明和汇报稿，尚未开始前端、后端、AI 视频服务或部署工程编码。

## 文档入口

| 文件 | 读者 | 用途 |
| --- | --- | --- |
| [AGENT.md](AGENT.md) | AI | 每次 AI 开发必读入口：当前状态、必读顺序、执行规则、文档职责边界 |
| [AI_Schedule.md](AI_Schedule.md) | AI | P0-P12 路线图、增量拆分、角色模式、技术栈、测试门禁和许可证规则 |
| [PROGRESS.md](PROGRESS.md) | 人类 | 当前进度、已完成事项、下一步、当前风险和检查命令 |
| [IMPORTANT.md](IMPORTANT.md) | AI / 人类 | 非工程问题、付费工具、经济成本、版权、许可证、隐私和潜在侵权风险重点批注 |
| [docs/THIRD_PARTY_NOTICES.md](docs/THIRD_PARTY_NOTICES.md) | AI / 人类 | 当前已引用第三方工具、字体、素材或包的许可证记录 |
| [skills/mall-vision-ai-delivery/SKILL.md](skills/mall-vision-ai-delivery/SKILL.md) | Codex | 本项目专用单 AI 增量迭代开发工作流 |
| [slides/project-intro.typ](slides/project-intro.typ) | 人类 | 课程或汇报用 Typst 演示稿源码 |
| [slides/slide.pdf](slides/slide.pdf) | 人类 | 已生成的项目介绍 PDF |

P0 完成后，会新增 `context/` 恢复包。之后每次继续开发都应先读 `AGENT.md` 和 `context/TODO_NEXT.md`。

## 项目范围

一期目标是先做可演示、可测试、可恢复的系统闭环：

- 运营总览：场内人数、累计客流、楼层状态、趋势和拥挤预警。
- 数字孪生：楼层、店铺、热力、预警和历史回放联动展示。
- 店铺分析：进店、停留、转化、评分、趋势和低效原因解释。
- 客群画像：匿名聚合的时间段、楼层、业态偏好和画像统计。
- 低效预警：C/D 级店铺、高客流低转化、连续下滑和异常数据提示。

暂不在第一轮扩大到多租户商业 SaaS、复杂招商推荐、完整 BIM 建模或真实监控系统上线。

## 开发模式

本项目采用单 AI 增量迭代开发模式。`P0` 到 `P12` 是长期路线图，实际执行必须拆成 `P0-I1`、`P0-I2` 这类小增量；每个增量由 AI 自动选择一个主角色模式，其他角色仅作为检查清单使用，避免并行拆分造成上下文分裂和接口冲突。

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

完整路线图、默认增量拆分和门禁见 [AI_Schedule.md](AI_Schedule.md)。

## 免费与合规原则

本项目当前不会用于商业化使用，但仍按可审计和低侵权风险标准执行：

- 不引入付费开发工具、付费云服务、付费 API、付费模型或付费素材，除非用户明确批准。
- 不使用来源不明的视频、图片、字体、地图、商场平面图、品牌 Logo、商户 Logo、监控画面、模型权重、数据集或复制代码。
- 优先使用 MIT、Apache-2.0、BSD、ISC、PostgreSQL License、CC0、CC-BY 等许可证清晰的资源。
- 真实商场资料、监控数据、人脸图像、品牌资产和对外发布内容必须经过授权或合规确认。
- 新增第三方内容必须记录到 [docs/THIRD_PARTY_NOTICES.md](docs/THIRD_PARTY_NOTICES.md)，重点风险同步记录到 [IMPORTANT.md](IMPORTANT.md)。

## 当前下一步

下一步应执行 `P0-I1`，不要直接开始写前端或后端。

建议给 AI 的 prompt：

```text
请使用 $mall-vision-ai-delivery。

先阅读 AGENT.md、README.md、PROGRESS.md、AI_Schedule.md、IMPORTANT.md。
本次按单 AI 增量迭代模型继续。请自动识别当前增量；如果没有 context，则进入 Product Mode，执行 P0-I1 项目边界与合规基线。

只创建或更新：
- docs/PRD_v1.md
- context/PROJECT_STATE.md
- context/RISKS_AND_ASSUMPTIONS.md
- context/TODO_NEXT.md
- PROGRESS.md
- IMPORTANT.md，如果发现新的非工程、法律侵权、隐私、许可证或经济成本风险

不要写前端、后端、AI 视频服务或部署工程。
完成后运行文档/结构检查，更新 PROGRESS.md，并在 PROGRESS.md 写入推荐给人类复制使用的下一步 AI prompt。
```

## 当前检查方法

当前没有业务代码，只能检查文档、第三方声明、skill 和演示稿文件：

```bash
test -f AGENT.md
test -f README.md
test -f AI_Schedule.md
test -f PROGRESS.md
test -f IMPORTANT.md
test -f docs/THIRD_PARTY_NOTICES.md
test -f skills/mall-vision-ai-delivery/SKILL.md
test -f skills/mall-vision-ai-delivery/agents/openai.yaml
test -f slides/project-intro.typ
test -f slides/slide.pdf
rg -n "增量|P0-I1|自动选择|测试与质量门禁|开源资源|版权规范" AI_Schedule.md
```

## 免责声明

本项目文档和演示内容用于课程设计、学习和项目规划，不构成法律、合规、隐私或商业咨询意见。若后续使用真实商场数据、监控视频、地图、平面图、品牌资产、第三方模型或对外发布成果，必须由权利人、课程负责人或具备资质的法律/合规人员确认授权和使用边界。
