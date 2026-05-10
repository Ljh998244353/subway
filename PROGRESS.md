# 项目进度一览

更新时间：2026-04-29

## 当前结论

项目目前处于“开发前准备完成，P0 尚未开始”的状态。

已经完成的是项目排期、交付规范、单 AI 分阶段工作流和 Codex 专用 skill。还没有开始写前端、后端、AI 视频服务或测试代码。

## 当前状态

| 项目 | 状态 | 说明 |
| --- | --- | --- |
| README 项目入口 | 已完成 | 简述项目、文档入口、单 AI 开发流程和下一步 |
| AI_Schedule 详细规划 | 已完成 | 已细化到 P0-P12，包含 schedule、设计规范、单 AI 工作流、测试门禁、开源资源和版权要求 |
| 单 AI 工作流 | 已完成 | 明确只使用一个 AI，通过 Product、Architect、Frontend、Backend、QA 等角色模式顺序推进 |
| Codex 项目 skill | 已完成 | 仓库内已有 `skills/mall-vision-ai-delivery/SKILL.md`，已按单 AI 角色模式更新 |
| Codex 全局配置 | 已完成 | 已复制到 `/home/ljh/.codex/skills/mall-vision-ai-delivery`，重启 Codex 后可用 |
| 项目介绍 Slide | 已完成 | 已创建 `slides/project-intro.typ`，用于课程/老师汇报；当前环境未安装 Typst，未编译 PDF |
| P0 项目基线 | 未开始 | 还没有创建 `docs/` 和 `context/` |
| 前端 Demo | 未开始 | 还没有 `frontend/` 工程 |
| 后端 API | 未开始 | 还没有 `backend/` 工程 |
| AI 视频识别 | 未开始 | 还没有 `ai-services/` 工程 |
| 自动化测试 | 未开始 | 目前没有源码，因此还没有单元测试、E2E、接口测试 |
| 部署 | 未开始 | 还没有 Docker、CI、部署配置 |

## 已完成文件

```text
README.md
AI_Schedule.md
PROGRESS.md
slides/project-intro.typ
skills/mall-vision-ai-delivery/SKILL.md
skills/mall-vision-ai-delivery/agents/openai.yaml
```

## 下一步应该做什么

优先做 P0，不要直接开始写页面或后端代码。

P0 需要创建：

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

P0 完成后再进入：

```text
P1：设计规范与信息架构
P2：前端 Demo MVP
P3：工程化骨架
```

执行任何阶段时，只使用一个 AI。它需要先选择一个主角色模式，再用其他角色做检查清单，不按多个 AI 并行开发。

## 还差什么

### 必须补齐

```text
docs/        项目需求、指标、测试策略、质量门禁
context/     AI 上下文恢复包
frontend/    React + TypeScript + Vite 前端 Demo
backend/     FastAPI + PostgreSQL 后端 API
ai-services/ AI 视频识别和 ROI 计数服务
infra/       Docker、CI、监控和部署配置
tests/       单元、接口、E2E、性能、安全、AI 验证测试
```

### 当前最大风险

```text
还没有 /context 恢复包，新 AI 会话只能依赖 README、AI_Schedule、PROGRESS 和 skill 继续
还没有源码，无法验证真实功能
还没有测试框架，无法验证工程质量
还没有 LICENSE_AUDIT，后续依赖和素材必须补许可证记录
```

## 当前测试方法

当前阶段没有业务代码，所以没有单元测试、接口测试或 E2E 测试。现在只能做文档和 skill 配置检查。

### 1. 检查关键文件是否存在

```bash
test -f README.md
test -f AI_Schedule.md
test -f PROGRESS.md
test -f skills/mall-vision-ai-delivery/SKILL.md
test -f skills/mall-vision-ai-delivery/agents/openai.yaml
```

### 2. 检查 AI_Schedule 是否包含关键章节

```bash
rg -n "细化 Schedule|设计规范|单 AI 工作流|测试与质量门禁|开源资源|P12" AI_Schedule.md
```

### 3. 检查 Codex 全局 skill 是否已安装

```bash
test -f /home/ljh/.codex/skills/mall-vision-ai-delivery/SKILL.md
test -f /home/ljh/.codex/skills/mall-vision-ai-delivery/agents/openai.yaml
```

### 4. 检查 skill 基本结构

```bash
python /home/ljh/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/mall-vision-ai-delivery
```

注意：如果提示 `ModuleNotFoundError: No module named 'yaml'`，说明当前 Python 环境缺少 PyYAML，不代表 skill 文件本身一定有问题。当前已做过无依赖结构检查。

## 给下一个 AI 的一句话

```text
请使用 $mall-vision-ai-delivery，先阅读 README.md、AI_Schedule.md 和 PROGRESS.md，然后以单 AI 的 Product Mode 执行 P0：创建 docs/ 和 context/ 的项目基线文件，不要直接开始写前端或后端代码。
```
