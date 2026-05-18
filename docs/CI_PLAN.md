# CI Plan

更新时间：2026-05-13

## 1. 增量定位

```text
Increment: P3-I4 Docker Compose draft or deployment documentation
Primary role mode: DevOps Mode
Auxiliary checklists: Product, QA, Security/License
```

本文定义 CI 的分阶段计划和当前落地配置。P3-I2 已创建根级本地质量门禁入口；P3-I3 已新增 GitHub Actions 配置 `.github/workflows/ci.yml`，将 `npm run quality` 和 `npm run quality:audit` 映射到 GitHub 端免费 CI；P3-I4 已新增 `docs/DEPLOYMENT_PLAN.md` 并把部署文档检查纳入 `npm run quality:docs`。当前 CI 不发布生产环境，不上传构建产物，不使用 secrets，不接真实 API 或真实数据。

## 2. 设计原则

```text
本地门禁先行，CI 只自动化本地可重复命令
默认免费和开源，不引入付费云服务或付费扫描服务
先阻断已存在风险，再逐步扩展 coverage/E2E/security
CI 结果必须能映射到 PROGRESS.md 和 context/TEST_STATE.md
任何需要账号、外网、镜像下载或付费额度的能力必须先审计
GitHub Actions 只作为 GitHub 仓库侧 CI；Gitee 镜像不自动运行该 workflow
```

## 3. 计划触发条件

| 触发 | P3-I3 目标行为 | 说明 |
| --- | --- | --- |
| Pull request | 运行文档、合规、工程边界和 frontend 门禁 | 阻断明显破坏 |
| Push to main | 运行完整门禁，保存构建结果摘要 | 不发布生产环境 |
| Manual dispatch | 允许手动重跑审计或较慢任务 | 适合 npm audit、后续 E2E |
| Schedule | 暂缓 | 可能涉及外部网络和配额，P3-I3 不启用 |

## 4. Job 拆分计划

| Job | 命令来源 | P3-I3 阻断 | 说明 |
| --- | --- | --- | --- |
| quality-gate | `npm run quality` | 是 | 串联文档结构、部署文档、合规关键词、工程边界和 frontend lint/test/build |
| dependency-audit | `npm ci --prefix frontend` + `npm run quality:audit` | 是 | 安装 lockfile 依赖后运行 `frontend` 高危 npm audit；需要 GitHub runner 外网访问 npm registry |
| license-record-check | `npm run quality:compliance` 内的关键词扫描 | 是 | 新增依赖或素材时必须同步第三方记录 |

说明：P3-I3 将 docs/compliance/boundary/frontend 合并进一个 `quality-gate` job，避免 GitHub Actions 中重复安装依赖和重复构建。P3-I4 在 docs 检查中增加 `docs/DEPLOYMENT_PLAN.md` 的服务边界、健康检查和合规边界校验。需要本地细分排查时仍可运行 `npm run quality:docs`、`npm run quality:compliance`、`npm run quality:boundary` 和 `npm run quality:frontend`。

## 5. Node 与缓存策略

P3-I3 推荐使用当前 `package-lock.json` 固定依赖：

```text
Node: 24
Install: npm ci --prefix frontend
Cache: npm cache keyed by frontend/package-lock.json
Working directory: repository root for root scripts; frontend install uses --prefix frontend
```

P3-I3 不新增 `.nvmrc`，只在 GitHub Actions `setup-node` 中显式记录 Node 24。后续如统一本地 Node 版本文件，需要同步 README 和测试状态。

## 6. 当前 CI 配置

当前 CI 文件：

```text
.github/workflows/ci.yml
```

GitHub Actions 使用：

```text
actions/checkout@v6.0.2
actions/setup-node@v6.4.0
ubuntu-24.04 runner
Node 24
```

CI 等价本地命令：

```bash
npm run quality
npm run quality:audit
```

`npm run quality` 覆盖文档结构、部署计划文档、合规关键词、工程边界和 frontend lint/test/build；`npm run quality:audit` 单独运行高危依赖审计，便于处理网络审批或 DNS 失败记录。

Gitee 同步边界：如果仓库同步到 Gitee，`.github/workflows/ci.yml` 只作为普通文件存在，Gitee Go 不会按 GitHub Actions 语法自动执行。后续如启用 Gitee Go，需要单独创建 `/.workflow/` 相关配置，并重新审计 Gitee 服务条款、免费额度、账号要求、网络数据边界和日志可见性。

## 7. 失败处理

| 失败类型 | 处理 |
| --- | --- |
| 文档缺失 | 补齐文档或恢复接力信息后重跑 |
| 合规关键词缺失 | 更新相关文档，确认隐私、真实素材、付费边界仍可检索 |
| 工程边界失败 | 若意外创建目录，说明原因；未进入对应增量时不得保留 |
| frontend lint/test/build 失败 | 修复后重跑，不允许标记完成 |
| npm audit 发现 high | 更新风险记录，升级或替换依赖；无法修复时标记阻塞 |
| 网络导致 audit 无法运行 | 本地按权限规则重试；CI 中保留失败并在 `PROGRESS.md` / `context/TEST_STATE.md` 记录错误和剩余风险 |
| Gitee 镜像未运行 GitHub Actions | 不视为 GitHub CI 失败；如需要 Gitee CI，另开增量配置 Gitee Go |

## 8. 后续扩展点

| 阶段 | 扩展 |
| --- | --- |
| P3-I2 | 已创建根级脚本，减少手工命令拼接 |
| P3-I3 | 已完成：创建 GitHub Actions CI 配置，自动运行根级脚本 |
| P3-I4 | 已完成：增加 `docs/DEPLOYMENT_PLAN.md` 和部署文档检查 |
| P4-I1 | 增加后端 API 契约、MySQL 数据模型和健康检查基线文档检查 |
| P4 | 增加 backend Pytest、OpenAPI contract、Alembic migration 检查 |
| P6 | 增加 AI synthetic fixture 验证和模型许可证检查 |
| P10 | 增加 Playwright、coverage、安全扫描和隐私回归 |

## 9. P3-I4 结论

P3-I4 结论是“本地门禁、GitHub 端免费 CI 和部署计划检查已落地”。当前 CI 覆盖文档结构、部署计划文档、合规关键词、工程边界、frontend lint/test/build 和 frontend high-severity npm audit；不覆盖后端、AI 服务、浏览器 E2E、覆盖率统计、Docker Compose 启动、生产部署和 Gitee Go。下一增量 P4-I1 应做后端 API 契约和 MySQL 数据模型基线，仍需先确认 Python 依赖、MySQL 连接方式、许可证、成本、账号和数据边界。
