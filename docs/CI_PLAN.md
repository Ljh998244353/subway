# CI Plan

更新时间：2026-05-13

## 1. 增量定位

```text
Increment: P3-I1 engineering skeleton planning and quality gate alignment
Primary role mode: DevOps Mode
Auxiliary checklists: Product, QA, Security/License
```

本文定义 CI 的分阶段计划。P3-I1 不创建 CI 配置文件，不绑定 GitHub Actions、GitLab CI、云服务或付费能力；后续 P3-I3 再在许可证、成本和账号边界明确后落地具体 CI 配置。

## 2. 设计原则

```text
本地门禁先行，CI 只自动化本地可重复命令
默认免费和开源，不引入付费云服务或付费扫描服务
先阻断已存在风险，再逐步扩展 coverage/E2E/security
CI 结果必须能映射到 PROGRESS.md 和 context/TEST_STATE.md
任何需要账号、外网、镜像下载或付费额度的能力必须先审计
```

## 3. 计划触发条件

| 触发 | P3-I3 目标行为 | 说明 |
| --- | --- | --- |
| Pull request | 运行文档、合规、工程边界和 frontend 门禁 | 阻断明显破坏 |
| Push to main | 运行完整门禁，保存构建结果摘要 | 不发布生产环境 |
| Manual dispatch | 允许手动重跑审计或较慢任务 | 适合 npm audit、后续 E2E |
| Schedule | 暂缓 | 可能涉及外部网络和配额，P3-I3 前不启用 |

## 4. Job 拆分计划

| Job | 命令来源 | P3-I3 阻断 | 说明 |
| --- | --- | --- | --- |
| docs-check | shell + `rg` | 是 | 检查关键文档、context、合规关键词和接力信息 |
| boundary-check | shell `find` | 是 | P3-I3 前确认没有意外创建 `backend/`、`ai-services/`、`infra/` |
| frontend-lint | `frontend/package.json` | 是 | `npm run lint` |
| frontend-test | `frontend/package.json` | 是 | `npm run test` |
| frontend-build | `frontend/package.json` | 是 | `npm run build` |
| dependency-audit | npm | 是，但网络失败需记录 | `npm audit --audit-level=high` |
| license-record-check | docs scan | 是 | 新增依赖或素材时必须同步第三方记录 |

## 5. Node 与缓存策略

P3-I3 推荐使用当前 `package-lock.json` 固定依赖：

```text
Node: 使用项目可运行的当前 LTS/环境版本，CI 配置中显式记录
Install: npm ci
Cache: npm cache keyed by frontend/package-lock.json
Working directory: frontend for frontend jobs
```

P3-I1 不修改 Node 版本、不新增 `.nvmrc`、不新增 CI 配置。若 P3-I3 增加 Node 版本文件，需要同步 README 和测试状态。

## 6. 当前本地等价命令

CI 落地前，以下命令是本地等价门禁：

```bash
test -f docs/ENGINEERING_QUALITY_GATES.md
test -f docs/CI_PLAN.md
rg -n "P3-I1|P3-I2|质量门禁|CI|MySQL|sudo|虚拟环境|请进行下一步" PROGRESS.md context/TODO_NEXT.md AGENT.md README.md docs/ENGINEERING_QUALITY_GATES.md docs/CI_PLAN.md
rg -n "不使用真实监控画面|不存储人脸原图|不展示个人轨迹|不使用未授权商场平面图|不使用真实品牌|不引入付费" docs context IMPORTANT.md README.md
find /home/ljh/project/subway -maxdepth 1 -type d \( -name backend -o -name ai-services -o -name infra \)
cd frontend
npm run lint
npm run test
npm run build
npm audit --audit-level=high
```

## 7. 失败处理

| 失败类型 | 处理 |
| --- | --- |
| 文档缺失 | 补齐文档或恢复接力信息后重跑 |
| 合规关键词缺失 | 更新相关文档，确认隐私、真实素材、付费边界仍可检索 |
| 工程边界失败 | 若意外创建目录，说明原因；未进入对应增量时不得保留 |
| frontend lint/test/build 失败 | 修复后重跑，不允许标记完成 |
| npm audit 发现 high | 更新风险记录，升级或替换依赖；无法修复时标记阻塞 |
| 网络导致 audit 无法运行 | 按权限规则重试；仍失败时记录错误和剩余风险 |

## 8. 后续扩展点

| 阶段 | 扩展 |
| --- | --- |
| P3-I2 | 创建根级脚本，减少手工命令拼接 |
| P3-I3 | 创建 CI 配置，自动运行根级脚本 |
| P3-I4 | 增加 Docker Compose 配置检查或部署文档检查 |
| P4 | 增加 backend Pytest、OpenAPI contract、Alembic migration 检查 |
| P6 | 增加 AI synthetic fixture 验证和模型许可证检查 |
| P10 | 增加 Playwright、coverage、安全扫描和隐私回归 |

## 9. P3-I1 结论

P3-I1 的 CI 结论是“先规划，后落地”。当前 CI 不存在，不能宣称流水线已可用；当前可执行保障来自本地文档检查、工程边界检查和 frontend lint/test/build/audit。下一增量 P3-I2 应优先创建根级脚本或统一命令入口，为 P3-I3 CI 配置做准备。
