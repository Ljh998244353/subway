# 项目进度一览

更新时间：2026-05-10

## 当前结论

项目仍处于“开发前准备完成，P0 尚未开始”的状态。

本次已将项目工作方式调整为“单 AI 增量迭代开发”：`P0` 到 `P12` 仍作为路线图，但实际执行按 `P0-I1`、`P0-I2` 这类小增量推进。`skills/mall-vision-ai-delivery/SKILL.md` 已要求 AI 自动识别当前增量、自动选择一个主角色，并在过程中动态更新非工程、法律侵权、隐私、许可证和经济成本风险。

当前仍没有前端、后端、AI 视频服务、部署工程或自动化测试代码。

## 当前状态

| 项目 | 状态 | 说明 |
| --- | --- | --- |
| README 项目入口 | 已更新 | 面向人类介绍项目、文档入口、开发模式、合规原则和免责声明 |
| AGENT AI 必读入口 | 已完成 | 记录每次 AI 必读顺序、执行规则、文档职责边界和下一步 prompt |
| IMPORTANT 重点风险 | 已完成 | 集中标注付费工具、侵权、许可证、隐私和授权风险 |
| AI_Schedule 详细规划 | 已更新 | P0-P12 保留为路线图，新增增量拆分、自动角色选择、动态风险更新和下一步 prompt 要求 |
| 单 AI 增量工作流 | 已完成 | 明确只使用一个 AI，通过小增量推进，并由 AI 自动选择 Product、Architect、Frontend、Backend、QA 等角色模式 |
| Codex 项目 skill | 已更新 | `skills/mall-vision-ai-delivery/SKILL.md` 已改为自动化增量迭代工作流 |
| 第三方声明 | 已有基础记录 | 已记录 Touying、Noto Sans CJK、Inter、Roboto；后续新增依赖和素材必须继续更新 |
| 项目介绍 Slide | 已完成 | 已创建 `slides/project-intro.typ`，并已有 `slides/slide.pdf` |
| P0 项目基线 | 未开始 | 下一步应执行 `P0-I1`，还没有创建 `docs/PRD_v1.md` 等 P0 文档和 `context/` 恢复包 |
| 前端 Demo | 未开始 | 还没有 `frontend/` 工程 |
| 后端 API | 未开始 | 还没有 `backend/` 工程 |
| AI 视频识别 | 未开始 | 还没有 `ai-services/` 工程 |
| 自动化测试 | 未开始 | 目前没有源码，因此还没有单元测试、E2E、接口测试 |
| 部署 | 未开始 | 还没有 Docker、CI、部署配置 |

## 已完成文件

```text
AGENT.md
AI_Schedule.md
IMPORTANT.md
PROGRESS.md
README.md
docs/THIRD_PARTY_NOTICES.md
slides/project-intro.typ
slides/slide.pdf
skills/mall-vision-ai-delivery/SKILL.md
skills/mall-vision-ai-delivery/agents/openai.yaml
```

## 下一步应该做什么

优先做 `P0-I1`，不要直接开始写页面或后端代码。

P0 总体需要创建：

```text
docs/PRD_v1.md
docs/USER_STORIES.md
docs/ACCEPTANCE_CRITERIA.md
docs/METRICS_DEFINITION.md
docs/TEST_STRATEGY.md
docs/QUALITY_GATE.md
context/PROJECT_STATE.md
context/REQUIREMENTS_CURRENT.md
context/ARCHITECTURE_CURRENT.md
context/TEST_STATE.md
context/TODO_NEXT.md
```

但下一次只做 `P0-I1`，范围是：

```text
项目边界
目标用户
非目标范围
演示版与真实上线边界
非工程、法律侵权、隐私、许可证、经济成本红线
```

P0 全程必须同时写清：

```text
不使用付费开发工具或付费云服务
不使用真实监控画面
不存储人脸原图
不展示个人轨迹
不使用未授权商场平面图
不使用真实品牌或商户 Logo
不使用来源不明模型、数据集、图片、视频、字体或代码
所有素材、模型、依赖必须可追溯并有许可证记录
```

P0 完成后再进入：

```text
P1：设计规范与信息架构
P2：前端 Demo MVP
P3：工程化骨架
```

## 推荐给人类使用的下一步 AI Prompt

人类下一次可以直接复制下面这段给 AI：

```text
请使用 $mall-vision-ai-delivery。

你是本项目唯一使用的 AI，请按单 AI 增量迭代模型继续开发。

先阅读：
- AGENT.md
- README.md
- PROGRESS.md
- AI_Schedule.md
- IMPORTANT.md
- docs/THIRD_PARTY_NOTICES.md
- 已存在的 context/*.md

本次任务：自动识别当前增量。如果没有 context 恢复包，请进入 Product Mode，执行 P0-I1：项目边界与合规基线。

本次只创建或更新：
- docs/PRD_v1.md
- context/PROJECT_STATE.md
- context/RISKS_AND_ASSUMPTIONS.md
- context/TODO_NEXT.md
- PROGRESS.md
- IMPORTANT.md，如果发现新的非工程、法律侵权、隐私、许可证或经济成本风险

不要创建 frontend、backend、ai-services、infra。
不要引入付费开发工具、付费 SaaS、付费 API、付费模型或付费素材。
不要使用真实商场平面图、品牌 Logo、商户 Logo、监控视频、人物图像、来源不明素材、来源不明模型或复制代码。

请自动选择一个主角色模式，写明辅助检查角色。
先做风险预检；发现非工程、法律侵权、隐私、许可证或经济成本风险时，先更新 IMPORTANT.md。
完成后运行文档/结构检查，更新 PROGRESS.md，并在 PROGRESS.md 写入下一次推荐给人类复制使用的 AI prompt。
```

## 当前最大风险

```text
还没有 context/ 恢复包，新 AI 会话只能依赖 AGENT、README、AI_Schedule、PROGRESS、IMPORTANT、THIRD_PARTY_NOTICES 和 skill 继续
还没有源码，无法验证真实功能
还没有测试框架，无法验证工程质量
还没有 docs/LICENSE_AUDIT.md，后续依赖和素材必须补许可证审计记录
后续最容易侵权的位置是：真实商场平面图、品牌 Logo、商户 Logo、监控视频、人物图像、网页素材、模型权重和第三方代码片段
```

## 当前测试方法

当前阶段没有业务代码，所以没有单元测试、接口测试或 E2E 测试。现在只能做文档和 skill 配置检查。

### 1. 检查关键文件是否存在

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
```

### 2. 检查 AI_Schedule 是否包含关键章节

```bash
rg -n "增量|P0-I1|P0-I2|自动选择|测试与质量门禁|开源资源|版权规范|P12" AI_Schedule.md
```

### 3. 检查风险与许可证记录

```bash
rg -n "非工程|付费|经济成本|侵权|许可证|隐私|Logo|监控|平面图|模型权重|Non-Commercial|GPL|AGPL" IMPORTANT.md docs/THIRD_PARTY_NOTICES.md AI_Schedule.md AGENT.md skills/mall-vision-ai-delivery/SKILL.md
```

### 4. 检查 skill 基本结构

```bash
python /home/ljh/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/mall-vision-ai-delivery
```

注意：如果提示 `ModuleNotFoundError: No module named 'yaml'`，说明当前 Python 环境缺少 PyYAML，不代表 skill 文件本身一定有问题。

## 给下一个 AI 的一句话

```text
请使用 $mall-vision-ai-delivery，先阅读 AGENT.md、README.md、PROGRESS.md、AI_Schedule.md 和 IMPORTANT.md，然后按单 AI 增量迭代模型自动选择角色；如果没有 context，请执行 P0-I1：项目边界与合规基线，不要直接开始写前端或后端代码，并把非工程、法律侵权、隐私、许可证和经济成本风险动态写入 IMPORTANT.md。
```
