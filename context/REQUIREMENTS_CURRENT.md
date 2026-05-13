# Requirements Current

更新时间：2026-05-13

## 当前范围

一期目标是先完成可演示、可测试、可恢复的运营闭环：

```text
运营总览
数字孪生
店铺分析
客群画像
低效预警
AI 事件模型草案
权限与审计草案
```

## 当前非目标

```text
真实商场上线
真实监控流接入
人脸识别或身份识别
个人级轨迹展示
高精 BIM
复杂招商推荐
多租户商业 SaaS
付费云服务或付费 API
真实品牌 Logo、商户 Logo、真实商场平面图
```

## 合规红线

```text
不使用真实监控画面
不存储人脸原图
不展示个人轨迹
不使用未授权商场平面图
不使用真实品牌或商户 Logo
不使用来源不明模型、数据集、图片、视频、字体或代码
不引入付费开发工具或付费云服务
所有素材、模型、依赖必须可追溯并有许可证记录
```

## 需求来源

| 文档 | 作用 |
| --- | --- |
| `docs/PRD_v1.md` | 产品边界和一期范围 |
| `docs/REQUIREMENTS_ANALYSIS.md` | 需求分层、功能和非功能需求 |
| `docs/USER_STORIES.md` | 用户故事 |
| `docs/METRICS_DEFINITION.md` | 指标口径 |
| `docs/ACCEPTANCE_CRITERIA.md` | 验收标准 |
| `docs/design/SCREEN_LAYOUTS.md` | P1-I1 页面范围、导航、状态和素材策略 |
| `docs/design/DESIGN_TOKENS.md` | P1-I2 设计 token、状态色、图表色板和可访问性 token |
| `docs/design/UI_SPEC.md` | P1-I2 App Shell、布局模板、栅格、响应式和状态布局 |
| `docs/design/COMPONENT_SPEC.md` | P1-I3 核心组件、页面状态、领域组件和测试关注点 |
| `docs/design/CHART_SPEC.md` | P1-I3 图表口径、图例、状态、可访问性和页面图表映射 |
| `docs/design/INTERACTION_SPEC.md` | P1-I4 路由、筛选恢复、页面交互、键盘、响应式和可访问性 |
| `docs/design/DESIGN_REVIEW_CHECKLIST.md` | P1-I4 设计评审清单和 P2 前端实现门禁 |

## 下一步需求工作

P2-I9 已完成 CP2 前端 Demo 收口和交接，覆盖五个核心页面演示路径、测试报告摘要、已知缺口和 P3 接力。P3-I1 已完成工程化骨架规划与质量门禁对齐，新增 `docs/ENGINEERING_QUALITY_GATES.md` 和 `docs/CI_PLAN.md`。下一步 P3-I2 做根级质量门禁脚本或统一命令入口，应把文档结构检查、合规关键词检查、工程边界检查和 frontend lint/test/build 串成可重复本地命令；不要直接创建后端或 AI 服务，不接真实 API，不创建 CI 配置或 Docker Compose，不使用真实商场平面图、真实地图、真实 BIM、真实商场或真实品牌素材，不展示个人轨迹、会员身份、人脸或个人画像。
