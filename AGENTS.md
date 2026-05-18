# AGENTS.md

本文件是 AI coding 工具的标准入口。长路线图见 `AI_Schedule.md`，当前任务卡见 `context/TODO_NEXT.md`。

## 当前任务

- 当前增量：`P4-I1 backend API contract and data model baseline`
- 主角色：Backend Mode
- 辅助检查：Architect、QA、Security/License
- 本次只做后端 API 契约、MySQL 数据模型基线、健康检查约定、错误码/RBAC 占位和测试策略。
- 不直接创建 `ai-services/`、真实部署、真实 API、真实视频、真实商场素材或个人轨迹。

## 必读顺序

1. `AGENTS.md`
2. `context/TODO_NEXT.md`
3. `PROGRESS.md`
4. `IMPORTANT.md`
5. 当前增量点名的相关 `docs/`、`context/` 和源码文件

只有在任务卡要求时再读完整 `AI_Schedule.md`。不要把聊天记录当作唯一项目状态。

## 硬规则

1. 每次只完成一个清晰小增量；不要跳阶段或大爆炸开发。
2. 先恢复上下文，再改文件；若文档冲突，先列冲突，不要直接改契约、数据模型或阶段结论。
3. 数据库统一使用 MySQL；不要按 PostgreSQL 规划实现、迁移、连接串或容器服务。
4. 新增或修改业务代码、API 契约、数据模型时，必须同步补测试或可执行检查计划。
5. 新增依赖、镜像、字体、图标、图片、模型、数据集、外部服务或复制代码前，先审计许可证、成本、账号和数据边界。
6. 不使用来源不明的真实视频、图片、地图、商场平面图、品牌 Logo、商户 Logo、监控画面、模型权重或数据集。
7. 后续创建 Python `backend/` 或 `ai-services/` 时必须重新创建虚拟环境，不复用旧环境。
8. 需要 `sudo`、系统包安装、系统服务管理或提权修改时，停下来让人类执行。
9. GitHub Actions 只在 GitHub 端运行；同步到 Gitee 后 `.github/workflows/ci.yml` 不会自动运行。
10. 完成增量后必须更新 `PROGRESS.md`、受影响的 `context/*.md` 和 `context/TODO_NEXT.md`，保留下一次短指令接力。

## 用户工作流

- 常规续作：用户输入 `请进行下一步`，AI 按 `context/TODO_NEXT.md` 完成一个增量。
- 关键节点需人工确认：API 契约冻结、MySQL 核心表冻结、新增依赖/镜像/外部服务、接入真实数据或真实素材、进入真实后端/AI 服务/部署实现。
- 用户检查结果时优先看：`PROGRESS.md` 本次记录、`context/TODO_NEXT.md` 下一任务卡、质量门禁输出、风险/阻断点。

## 质量门禁

```bash
npm run quality
npm run quality:audit
```

`npm run quality` 覆盖文档结构、任务卡字段、合规关键词、工程边界和前端 lint/test/build。`npm run quality:audit` 运行高危依赖审计，可能需要网络。

