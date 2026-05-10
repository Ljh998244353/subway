# Test State

更新时间：2026-05-10

## 当前状态

P0 与 P1 使用文档和结构检查。P2-I1 已创建前端工程基础测试，P2-I2 已补充 Mock 数据边界测试。当前没有后端、AI 服务、CI、E2E 或覆盖率统计。

## 当前前端测试命令

```bash
cd frontend
npm run lint
npm run test
npm run build
npm audit --audit-level=high
```

当前结果：

| 命令 | 结果 |
| --- | --- |
| `npm run lint` | 通过，执行 `tsc -b --pretty false` |
| `npm run test` | 通过，执行 `src/routes/routeConfig.test.ts` 和 `src/mock/mockData.test.ts` |
| `npm run build` | 通过，输出 `frontend/dist/` |
| `npm audit --audit-level=high` | 通过，联网重试后返回 `found 0 vulnerabilities` |

说明：`npm audit --audit-level=high` 在沙箱内首次因 DNS `EAI_AGAIN` 失败，随后按权限规则联网重试并通过。

## 已有测试

```text
frontend/src/routes/routeConfig.test.ts
frontend/src/mock/mockData.test.ts
```

覆盖内容：

```text
路由切换保留 mallId 和 timeRange
缺失 query 时回退到 demo 默认值
Mock 数据规模：1 个商场、5 个楼层、100 家店铺、8 种业态、20 条预警
店铺指标边界：曝光、进店、转化率、停留、评分、评分分项
空间数据边界：店铺几何坐标、热力点坐标和强度
告警引用与枚举：楼层、店铺、等级、状态、持续时间
运营总览和匿名聚合画像基础可用性
```

## 文档和结构检查命令

```bash
test -f AGENT.md
test -f README.md
test -f AI_Schedule.md
test -f PROGRESS.md
test -f IMPORTANT.md
test -f docs/THIRD_PARTY_NOTICES.md
test -f docs/LICENSE_AUDIT.md
test -f docs/PRD_v1.md
test -f docs/REQUIREMENTS_ANALYSIS.md
test -f docs/SYSTEM_DESIGN.md
test -f docs/design/SCREEN_LAYOUTS.md
test -f docs/design/DESIGN_TOKENS.md
test -f docs/design/UI_SPEC.md
test -f docs/design/COMPONENT_SPEC.md
test -f docs/design/CHART_SPEC.md
test -f docs/design/INTERACTION_SPEC.md
test -f docs/design/DESIGN_REVIEW_CHECKLIST.md
test -f frontend/package.json
test -f frontend/package-lock.json
test -f frontend/src/App.tsx
test -f frontend/src/components/AppShell.tsx
test -f frontend/src/types/domain.ts
test -f frontend/src/mock/mockOverview.ts
test -f frontend/src/mock/mockData.test.ts
test -f context/TODO_NEXT.md
rg -n "不使用真实监控画面|不存储人脸原图|不展示个人轨迹|不使用未授权商场平面图|不使用真实品牌|不引入付费" docs context IMPORTANT.md
rg -n "P2-I3|operations overview dashboard|运营总览|/dashboard|MetricCard|SummaryStrip" PROGRESS.md context/TODO_NEXT.md AGENT.md README.md
python /home/ljh/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/mall-vision-ai-delivery
```

## 覆盖率目标

```text
backend overall coverage >= 80%
core business coverage >= 90%
store scoring and alert rules coverage = 100%
API automation coverage >= 90%
frontend component coverage >= 70%
E2E core user paths pass 100%
AI validation tests include deterministic videos or synthetic fixtures
```

## 测试缺口

```text
当前前端没有组件测试框架和覆盖率统计，P2 后续可按需要引入 Vitest 或 Playwright
当前业务页面仍是占位页，P2-I3 需要补 /dashboard 页面测试
尚无 backend/ 工程，无法运行后端测试
尚无 ai-services/ 工程，无法运行 AI 验证测试
尚无 CI，无法运行流水线
```

## 下一步测试关注点

P2-I3 实现 `/dashboard` 时至少测试：

```text
KPI 数量和关键指标显示
低效店铺榜只展示 C/D 或明确关注店铺
告警摘要引用有效告警
空态或错误/权限占位可触达
路由仍保持全局 query
npm run lint/test/build 通过
```
