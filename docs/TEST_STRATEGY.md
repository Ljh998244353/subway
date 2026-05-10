# 测试策略

更新时间：2026-05-10

## 1. 目标

建立从 P0 文档检查到 P12 验收交付的测试策略，保证需求、前端、后端、AI、数据、安全、许可证和部署变更都有可执行检查。

## 2. 测试层级

| 层级 | 目标 | 工具建议 | 适用阶段 |
| --- | --- | --- | --- |
| 文档结构检查 | 确认关键文档和 context 存在 | shell、rg | P0 起 |
| 前端单元/组件测试 | 验证组件、状态和图表渲染 | Vitest、Testing Library | P2 起 |
| 前端 E2E | 验证核心页面和交互路径 | Playwright | P2 起 |
| API 测试 | 验证接口响应、错误码和契约 | Pytest、FastAPI TestClient | P4 起 |
| 数据逻辑测试 | 验证聚合、评分、告警和边界 | Pytest | P4/P7/P8 |
| AI 验证测试 | 验证检测、追踪、ROI、线段计数 | Pytest、合成视频 fixture | P6 起 |
| 安全测试 | 验证鉴权、RBAC、注入、日志脱敏 | Pytest、静态检查 | P4 起 |
| 部署检查 | 验证容器启动、健康检查、配置 | Docker Compose、CI | P3/P11 |
| 许可证检查 | 验证新增依赖和素材记录 | 人工审查、脚本扫描 | 全阶段 |

## 3. 覆盖率目标

```text
backend overall coverage >= 80%
core business coverage >= 90%
store scoring and alert rules coverage = 100%
API automation coverage >= 90%
frontend component coverage >= 70%
E2E core user paths pass 100%
AI validation tests include deterministic videos or synthetic fixtures
```

## 4. 核心测试路径

| 领域 | 必测路径 |
| --- | --- |
| 前端 | 路由、加载/错误/空态、图表渲染、楼层切换、店铺点击、预警查看 |
| 后端 | OpenAPI、schema、迁移、错误码、幂等、鉴权、权限 |
| 数据 | 跨天、营业时间、重复事件、负数、评分边界、转化率边界 |
| AI | 视频断流、输出 schema、ROI 计数、线段方向、延迟、可重复性 |
| 安全 | RBAC、注入、XSS、CORS、日志脱敏、依赖漏洞 |
| 部署 | 环境变量、容器启动、健康检查、重启恢复 |
| 文档 | 文件存在、阶段一致、接力信息、风险规则、许可证记录 |

## 5. P0 当前可执行检查

P0 没有业务代码，因此只运行文档和结构检查：

```bash
test -f docs/PRD_v1.md
test -f docs/REQUIREMENTS_ANALYSIS.md
test -f docs/SYSTEM_DESIGN.md
test -f docs/USER_STORIES.md
test -f docs/ACCEPTANCE_CRITERIA.md
test -f docs/METRICS_DEFINITION.md
test -f docs/TEST_STRATEGY.md
test -f docs/QUALITY_GATE.md
test -f docs/LICENSE_AUDIT.md
test -f context/PROJECT_STATE.md
test -f context/REQUIREMENTS_CURRENT.md
test -f context/ARCHITECTURE_CURRENT.md
test -f context/TEST_STATE.md
test -f context/TODO_NEXT.md
rg -n "不使用真实监控画面|不存储人脸原图|不展示个人轨迹|不使用未授权商场平面图" docs context IMPORTANT.md
```

## 6. 缺陷处理

| 类型 | 处理 |
| --- | --- |
| 测试无法运行 | 在 `PROGRESS.md` 和 `context/TEST_STATE.md` 记录命令、原因和风险 |
| 覆盖率不足 | 不允许标记阶段完成，除非当前阶段无代码且已说明 |
| 许可证不清 | 标记阻塞或暂缓，不继续使用 |
| 隐私风险 | 默认移除个人数据路径，改为匿名聚合或合成数据 |
| 文档冲突 | 暂停实现，先更新决策和上下文 |
