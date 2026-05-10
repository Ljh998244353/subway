# AI 分阶段开发计划

这份文档是面向“单个 AI 分阶段开发”的详细交付规范。它把项目拆成可恢复、可测试、可验收的阶段，让一个 AI 在不同时刻扮演不同角色顺序推进，避免长周期开发中丢失上下文、重复造轮子或交付不可运行的代码。

核心策略：

1. 先做前端 Demo，尽快形成可演示价值。
2. 再补工程化、后端 API、数据库、测试和部署。
3. 再接入 AI 视频识别、经营评分、热力动线和 3D 数字孪生。
4. 每个阶段都更新 `/context` 恢复包。
5. 所有代码都必须经过自动化测试、许可证检查和交付门禁。

项目专用 AI skill 已放在：

```text
skills/mall-vision-ai-delivery/SKILL.md
```

后续让 AI 继续本项目时，建议显式要求使用该 skill。

---

## 一、交付原则

### 1.1 优先级

项目决策按以下优先级排序：

| 优先级 | 原则 | 说明 |
| --- | --- | --- |
| P0 | 可恢复 | 任意新 AI 会话必须能从 `/context` 继续 |
| P0 | 可测试 | 新增功能必须有自动化测试或明确测试缺口 |
| P0 | 可交付 | 每阶段必须能运行、能演示、能验收 |
| P0 | 免费合规 | 依赖、模型、图片、视频、字体必须有清晰许可 |
| P1 | 可维护 | 代码结构、接口、数据模型必须稳定 |
| P1 | 可扩展 | 在不牺牲交付质量的前提下支持后续扩展 |

### 1.2 不做什么

第一轮交付禁止把范围扩大到无法验收：

```text
不先做复杂招商推荐
不先做多租户商业化 SaaS
不先做完整高精 BIM 建模
不使用来源不明的视频、图片、字体、地图或商场平面图
不引入许可证义务不清晰的模型或代码
不跳过测试直接标记完成
```

### 1.3 阶段完成定义

每个阶段完成时必须同时满足：

```text
功能可运行
测试可运行
文档已更新
/context 恢复包已更新
新增依赖和素材许可证已记录
已知风险和未完成事项已写入 TODO_NEXT.md
```

---

## 二、细化 Schedule

总周期按可交付版本规划为约 23 周。若只做前端演示版，使用 2 到 3 周快速路径。

### 2.1 总排期

| 阶段 | 周期 | 名称 | 主要目标 | 阶段门禁 |
| --- | --- | --- | --- | --- |
| P0 | 2 天 | 项目基线与上下文恢复 | 固化需求、范围、架构草案、测试策略 | CP0 |
| P1 | 1 周 | 设计规范与信息架构 | 页面、组件、数据指标、设计 token | CP1 |
| P2 | 2 周 | 前端 Demo MVP | Mock 数据驱动 5 个核心页面 | CP2 |
| P3 | 1 周 | 工程化骨架 | Monorepo、CI、lint、格式化、基础测试 | CP3 |
| P4 | 2 周 | 后端 API 与数据模型 | FastAPI、PostgreSQL、核心接口 | CP4 |
| P5 | 1 周 | 前后端联调 | 用真实 API 替换 Mock，处理状态和错误 | CP5 |
| P6 | 3 周 | AI 视频识别 MVP | 视频接入、人体检测、ROI/进出计数 | CP6 |
| P7 | 2 周 | 店铺经营评分 MVP | 停留、转化、评分、评级、预警 | CP7 |
| P8 | 3 周 | 客群、热力、动线分析 | 聚合画像、热力图、路径和节点流量 | CP8 |
| P9 | 3 周 | 3D 数字孪生可交付版 | Three.js 场景、数据联动、历史回放 | CP9 |
| P10 | 3 周 | 工业级测试与安全加固 | 覆盖率、E2E、压测、安全、隐私 | CP10 |
| P11 | 1 周 | 部署与观测 | Docker Compose、监控、日志、备份恢复 | CP11 |
| P12 | 1 周 | 验收与移交 | 用户手册、测试报告、验收清单 | CP12 |

### 2.2 前端 Demo 快速路径

用于汇报或立项演示，目标是 2 到 3 周可见成果。

| 天数 | 任务 | 输出 |
| --- | --- | --- |
| D1 | 固化产品目标和页面范围 | PRD_v1.md、METRICS_DEFINITION.md |
| D2 | 设计 token、布局、组件规范 | UI_SPEC.md、DESIGN_TOKENS.md |
| D3-D4 | 初始化 React + TypeScript + Vite | frontend 工程、路由、Mock 数据 |
| D5-D7 | 完成运营总览、店铺分析、预警 | 3 个可演示页面 |
| D8-D10 | 完成数字孪生 Demo、客群画像 | 5 个页面闭环 |
| D11-D12 | Playwright E2E、响应式、修复 | 测试报告、演示说明 |
| D13-D15 | 打磨性能和上下文恢复包 | CP2，可继续接后端 |

### 2.3 检查点文件

所有 CP 都必须更新 `/context`，缺失文件要补齐。

```text
context/
  PROJECT_STATE.md
  REQUIREMENTS_CURRENT.md
  ARCHITECTURE_CURRENT.md
  DATA_MODEL_CURRENT.md
  API_CONTRACT_CURRENT.md
  FRONTEND_STATE.md
  BACKEND_STATE.md
  AI_ALGORITHM_STATE.md
  TEST_STATE.md
  DEPLOYMENT_STATE.md
  DECISIONS_LOG.md
  RISKS_AND_ASSUMPTIONS.md
  TODO_NEXT.md
```

最小必填规则：

| 文件 | 必须记录 |
| --- | --- |
| PROJECT_STATE.md | 当前阶段、完成模块、运行方式、关键风险、下一目标 |
| REQUIREMENTS_CURRENT.md | 当前范围、暂不实现范围、指标定义、验收标准 |
| ARCHITECTURE_CURRENT.md | 技术栈、模块边界、数据流、部署结构 |
| DATA_MODEL_CURRENT.md | 实体、表、字段、索引、事件和统计口径 |
| API_CONTRACT_CURRENT.md | 路径、参数、响应、错误码、鉴权、Mock 示例 |
| FRONTEND_STATE.md | 页面、组件、路由、状态、Mock、已知 UI 问题 |
| BACKEND_STATE.md | 服务、接口、迁移、任务、缓存、消息队列 |
| AI_ALGORITHM_STATE.md | 模型、输入输出、ROI、性能、准确率、限制 |
| TEST_STATE.md | 测试命令、覆盖率、失败项、阻塞项、测试缺口 |
| DEPLOYMENT_STATE.md | 环境变量、启动方式、镜像、监控、备份 |
| DECISIONS_LOG.md | 已确认决策、日期、原因、影响 |
| RISKS_AND_ASSUMPTIONS.md | 假设、风险、缓解措施、负责人或下一动作 |
| TODO_NEXT.md | 下一阶段 P0/P1/P2、禁止修改项、推荐恢复 prompt |

---

## 三、阶段执行细则

### P0 项目基线与上下文恢复

目标：让任何新 AI 会话都能理解项目边界。

任务：

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

门禁：

```text
核心指标已有定义
一期范围和暂不实现范围已写清
所有后续阶段能从 TODO_NEXT.md 继续
```

### P1 设计规范与信息架构

目标：先把产品体验、视觉规则、页面结构和组件边界定清楚。

任务：

```text
docs/design/UI_SPEC.md
docs/design/DESIGN_TOKENS.md
docs/design/COMPONENT_SPEC.md
docs/design/SCREEN_LAYOUTS.md
docs/design/INTERACTION_SPEC.md
docs/design/CHART_SPEC.md
```

页面范围：

```text
/dashboard               运营总览大屏
/digital-twin            2.5D/简易 3D 数字孪生
/store-analysis          店铺经营分析
/customer-profile        客群画像
/store-alerts            低效店铺预警
```

门禁：

```text
页面布局有 1920x1080、2560x1440、3840x2160 适配说明
所有图表有指标口径
所有状态有空态、加载、错误、权限不足设计
所有素材来源策略已写清
```

### P2 前端 Demo MVP

目标：用 Mock 数据完成可演示 Demo。

建议技术栈：

```text
React
TypeScript
Vite
React Router
ECharts
Three.js
Zustand 或 Redux Toolkit
Vitest
Playwright
ESLint
Prettier
```

目录：

```text
frontend/
  src/
    pages/
    components/
    mock/
    services/
    stores/
    types/
    charts/
    twin/
    tests/
  e2e/
```

Mock 数据：

```text
mockMall.ts
mockFloors.ts
mockStores.ts
mockCustomerFlow.ts
mockStoreScore.ts
mockHeatmap.ts
mockTrajectory.ts
mockCustomerProfile.ts
mockAlerts.ts
```

Mock 覆盖：

```text
至少 1 个商场
至少 5 个楼层
至少 100 家店铺
至少 8 种业态
至少 50 条顾客动线
至少 20 条预警数据
每家店铺包含评分、转化率、停留时长、客流趋势
```

测试门禁：

```text
Vitest 单元测试通过
核心组件覆盖率 >= 70%
5 个页面路由均可访问
Playwright 覆盖楼层切换、店铺点击、预警查看
无严重 a11y 问题
大屏首屏加载目标 < 5s
```

### P3 工程化骨架

目标：建立长期开发基础。

目录：

```text
mall-ai-platform/
  frontend/
  backend/
  ai-services/
  infra/
  docs/
  context/
  scripts/
```

必须提供：

```text
docker-compose.yml
.env.example
Makefile
package manager lockfile
.github/workflows/ci.yml 或等效 CI
```

CI 门禁：

```text
lint
format check
TypeScript typecheck
frontend unit tests
backend unit tests
API contract tests
dependency license scan
dependency vulnerability scan
Docker build
```

### P4 后端 API 与数据模型

目标：用真实 API 和数据库替代前端 Mock。

建议技术栈：

```text
Python 3.11+
FastAPI
Pydantic
SQLAlchemy
Alembic
PostgreSQL
Redis
Pytest
```

数据表：

```text
mall
floor
store
store_category
camera
camera_roi
camera_line
person_detection_event
store_enter_event
store_exit_event
store_visit_session
consume_event
trajectory_event
heatmap_event
store_flow_stat
store_dwell_stat
store_conversion_stat
customer_profile_stat
floor_flow_stat
node_flow_stat
store_score_stat
store_alert
user
role
permission
user_role
operation_log
```

核心 API：

```text
GET /api/v1/overview
GET /api/v1/malls
GET /api/v1/malls/{mallId}/floors
GET /api/v1/floors/{floorId}/stores
GET /api/v1/stores/{storeId}
GET /api/v1/stores/{storeId}/flow
GET /api/v1/stores/{storeId}/score
GET /api/v1/stores/ranking
GET /api/v1/alerts/stores
GET /api/v1/customer-profile
GET /api/v1/heatmap
GET /api/v1/trajectories
```

测试门禁：

```text
后端覆盖率 >= 80%
核心 API 覆盖率 >= 90%
Alembic 升降级可运行
OpenAPI 与实现一致
错误码覆盖 400/401/403/404/409/422/500
```

### P5 前后端联调

目标：前端从 Mock 切换到 API，保留 Mock 作为演示降级。

任务：

```text
统一 API client
统一 loading/error/empty 状态
统一鉴权失败处理
补齐接口契约测试
补齐前端 E2E 联调用例
```

门禁：

```text
Mock 模式和 API 模式均可启动
接口字段变化会导致测试失败
前端不直接依赖后端内部字段
```

### P6 AI 视频识别 MVP

目标：完成视频输入到事件输出的最小闭环。

模块：

```text
ai-services/
  video-ingestion/
  person-detection/
  tracking/
  roi-counter/
  event-publisher/
  tests/
```

输入：

```text
本地 MP4
RTSP 测试流
合成测试视频
```

输出 schema：

```json
{
  "cameraId": "cam_001",
  "timestamp": "2026-01-01T10:00:00Z",
  "detections": [
    {
      "trackId": "t_001",
      "bbox": [100, 200, 80, 180],
      "confidence": 0.92,
      "class": "person"
    }
  ]
}
```

测试门禁：

```text
视频断流自动重连
本地视频可重复回放
检测输出 schema 校验通过
ROI 计数测试集准确率 >= 95%
进出方向测试集准确率 >= 95%
单路视频处理 >= 15 FPS，目标 25 FPS
事件进入队列延迟 < 3s
```

### P7 店铺经营评分 MVP

目标：实现可解释的店铺经营判断。

评分模型：

```text
综合评分 =
客流得分 * 30%
+ 转化率得分 * 30%
+ 停留时长得分 * 15%
+ 趋势得分 * 10%
+ 客群匹配度得分 * 10%
+ 异常扣分项 * 5%
```

评级：

| 等级 | 分数 |
| --- | --- |
| S | 90-100 |
| A | 80-89 |
| B | 70-79 |
| C | 60-69 |
| D | < 60 |

预警类型：

```text
C/D 级店铺
高客流低转化
低客流低转化
高租金低人流
连续下滑
疑似数据异常
```

测试门禁：

```text
评分模型固定输入输出 100% 覆盖
预警规则 100% 覆盖
跨天和营业时间边界正确
缺失 exit 事件可处理
同一事件流重复计算结果一致
```

### P8 客群、热力、动线分析

目标：提供匿名聚合分析，不展示个人轨迹。

任务：

```text
性别统计
年龄段统计
同行状态
分楼层画像
分业态画像
热力图
节点流量
匿名路径聚合
工作日/周末/节假日对比
高租金低人流点位识别
```

隐私要求：

```text
不存储人脸原图
不存储身份证、手机号等身份信息
不展示个人轨迹
只展示匿名聚合数据
ReID 特征向量必须过期
日志不包含可识别个人的数据
```

测试门禁：

```text
聚合结果准确
热力坐标在楼层范围内
路径按时间顺序生成
敏感数据不落盘
数据保留策略可验证
```

### P9 3D 数字孪生可交付版

目标：把 Demo 级 2.5D 升级为可交付 3D 展示。

任务：

```text
Three.js 3D 场景
楼层切换
店铺模型绑定
店铺点击拾取
热力叠加
客流粒子动画
拥挤区域高亮
预警店铺闪烁
历史回放时间轴
大屏演示模式
```

测试门禁：

```text
3D 首屏 < 5s
主流机器 >= 30 FPS
连续运行 8 小时无明显内存增长
店铺点击准确
楼层切换无状态错乱
4K 显示正常
```

### P10 工业级测试与安全加固

目标：从能运行提升到可验收。

测试目录：

```text
tests/
  unit/
  integration/
  contract/
  e2e/
  performance/
  security/
  data-quality/
  ai-validation/
  chaos/
```

总门禁：

```text
后端整体覆盖率 >= 80%
核心业务覆盖率 >= 90%
前端组件覆盖率 >= 70%
API 自动化覆盖率 >= 90%
E2E 核心路径通过率 100%
高危依赖漏洞为 0
许可证风险为 0 个未处理项
关键接口 P95 < 300ms，历史查询 P95 < 2s
大屏连续运行 8 小时稳定
```

### P11 部署与观测

目标：形成可部署、可回滚、可观测版本。

输出：

```text
infra/docker-compose.prod.yml
infra/nginx.conf
docs/deployment-guide.md
docs/operation-manual.md
docs/backup-restore.md
docs/monitoring-guide.md
```

监控：

```text
CPU、内存、磁盘、网络
后端 QPS、错误率、P95、P99
数据库连接数、慢查询、锁等待
Redis 命中率、内存、连接数
AI FPS、推理耗时、队列积压
视频流在线状态、断流次数
业务客流、预警数、数据延迟
前端首屏加载、JS 错误、白屏率
```

### P12 验收与移交

目标：交付可以被客户、评审或运维接手的版本。

输出：

```text
docs/USER_MANUAL.md
docs/ADMIN_MANUAL.md
docs/DEPLOYMENT_MANUAL.md
docs/API_DOCUMENTATION.md
docs/TEST_REPORT_FINAL.md
docs/ACCEPTANCE_CHECKLIST.md
docs/TRAINING_SLIDES.md
context/*
```

门禁：

```text
验收清单逐项通过
所有阻塞缺陷关闭
剩余问题有明确风险说明和修复计划
上下文恢复包可独立恢复项目状态
```

---

## 四、设计规范

### 4.1 产品设计规范

核心用户：

```text
商场运营负责人
楼层经理
招商主管
物业安保或运维人员
项目演示和汇报人员
```

核心价值：

```text
看清当前客流
发现低效店铺
解释店铺评分
定位拥挤和冷区
用可视化支持招商、调铺、营销和运营决策
```

指标口径必须统一：

| 指标 | 口径 |
| --- | --- |
| 场内人数 | 当前时间窗口内未离场的匿名人数估计 |
| 累计客流 | 当日进入商场的匿名人数或人次，口径需注明 |
| 进店人数 | 进入店铺 ROI 或跨越进店线的人次 |
| 转化率 | 疑似消费人数或人次 / 进店人数或人次 |
| 停留时长 | 店铺 visit session 的 exit - enter |
| 店铺评分 | 配置化评分模型输出，必须可解释 |
| 热力值 | 匿名聚合空间停留或经过强度 |

### 4.2 UI/UX 规范

整体风格：深色、克制、运营工具感，不做营销落地页。

基础 token：

| Token | 建议值 |
| --- | --- |
| 背景 | `#08111f`、`#0d1726` |
| 面板 | `#111c2e` |
| 主色 | `#2f80ed` |
| 成功 | `#27ae60` |
| 警告 | `#f2c94c` |
| 危险 | `#eb5757` |
| 文本主色 | `#f2f6ff` |
| 文本次色 | `#9fb0c7` |
| 边框 | `rgba(160, 180, 210, 0.18)` |
| 圆角 | 4px 到 8px |

布局：

```text
大屏优先适配 1920x1080
同时验证 2560x1440 和 3840x2160
移动端只做管理查看，不做大屏等比例压缩
页面主体采用信息密度高的仪表盘布局
卡片只用于指标块、列表项、详情浮层和工具面板
```

交互：

```text
图表支持 hover tooltip
楼层、业态、时间范围使用明确筛选控件
店铺点击必须打开详情浮层
预警列表必须能定位到楼层和店铺
加载、空态、错误和权限不足状态必须完整
```

可访问性：

```text
文字和背景对比度必须可读
颜色不得作为唯一信息来源
关键操作可键盘访问
图表必须有文本摘要或 aria label
```

### 4.3 前端代码规范

```text
TypeScript strict mode
组件按业务域组织
页面组件只编排，不堆业务逻辑
图表配置封装为可测试函数
Mock 数据与 API DTO 类型保持一致
所有 API 响应先经过 schema 校验或类型守卫
禁止在组件中散落魔法数字和指标口径
```

### 4.4 后端 API 规范

基础规则：

```text
统一前缀 /api/v1
使用 OpenAPI 作为接口契约
请求和响应使用 Pydantic 模型
所有列表接口支持分页、排序和过滤
所有时间使用 ISO 8601，服务端内部统一 UTC
前端展示时按业务时区转换
```

响应格式：

```json
{
  "data": {},
  "requestId": "req_20260429163000_xxx",
  "timestamp": "2026-04-29T08:30:00Z"
}
```

错误格式：

```json
{
  "error": {
    "code": "STORE_NOT_FOUND",
    "message": "Store not found",
    "details": {}
  },
  "requestId": "req_20260429163000_xxx"
}
```

### 4.5 数据规范

```text
事件数据是事实来源，统计表可重算
所有事件必须有 eventId，用于幂等去重
所有业务实体使用稳定 ID，不使用名称做关联
统计口径必须能从原始事件追溯
批处理和实时处理结果必须可核对
跨天、营业时间和时区边界必须测试
```

### 4.6 AI 算法规格

```text
先用可复现测试视频验证，再接真实 RTSP
模型输入、输出、阈值和版本必须记录
ROI、进出线和方向规则必须可配置
所有输出事件必须带 cameraId、timestamp、confidence
检测、追踪、计数、发布事件分层实现
算法服务异常不能拖垮后端和前端
```

### 4.7 安全与隐私规范

```text
不存储人脸原图
不存储身份证、手机号等个人身份信息
不展示个人轨迹，只展示匿名聚合数据
日志脱敏
RBAC 权限控制
密码哈希存储
Token 过期和刷新策略明确
CORS 白名单
生产环境禁用调试接口
```

### 4.8 开源资源与版权规范

目标是免费、可审计、不侵权。AI 必须执行许可证检查，不能只写“使用开源资源”。

优先使用：

```text
MIT
Apache-2.0
BSD-2-Clause
BSD-3-Clause
ISC
PostgreSQL License
CC0
CC-BY，并保留署名
自行生成的合成数据、合成视频、几何楼层图
```

谨慎使用：

```text
GPL
LGPL
AGPL
带 Non-Commercial 限制的素材
来源不明的模型权重
来源不明的视频、图片、字体、地图、平面图
商场真实品牌 Logo 或商户 Logo
```

强制记录：

```text
docs/THIRD_PARTY_NOTICES.md
docs/LICENSE_AUDIT.md
```

每个依赖或素材至少记录：

```text
名称
用途
来源 URL 或包名
许可证
是否允许商业使用
是否需要署名
是否有 copyleft 义务
替代方案
结论：可用 / 暂缓 / 禁用
```

素材规则：

```text
演示视频优先使用自制或合成视频
楼层图优先使用自绘几何图
图标优先使用开源图标库并记录许可证
字体优先使用系统字体或明确免费商用字体
不要抓取网页图片充当项目素材
不要使用未授权商场平面图
```

---

## 五、单 AI 工作流（Single-AI Workflow）

### 5.1 基本方式

本项目只假设使用一个 AI，不要求多个 AI 并行。所谓“角色”不是多个独立 Agent，而是同一个 AI 在不同步骤切换视角。

每次任务只允许一个主角色负责交付，其他角色作为检查清单使用。这样可以减少上下文分裂、重复设计和接口冲突。

### 5.2 单 AI 角色模式

| 角色模式 | 什么时候启用 | 主要职责 | 必须更新 |
| --- | --- | --- | --- |
| Product Mode | 需求、范围、验收不清时 | PRD、用户故事、指标口径、验收标准 | `REQUIREMENTS_CURRENT.md`、`TODO_NEXT.md` |
| Architect Mode | 技术方案、模块边界、接口变化时 | 架构、数据流、服务边界、接口契约 | `ARCHITECTURE_CURRENT.md`、`API_CONTRACT_CURRENT.md` |
| Design Mode | 做页面、组件、图表、交互前 | 页面结构、设计 token、组件规范、空态错误态 | `FRONTEND_STATE.md`、设计文档 |
| Frontend Mode | 实现前端 Demo 或 3D 数字孪生时 | 页面、组件、图表、Mock、E2E | `FRONTEND_STATE.md`、`TEST_STATE.md` |
| Backend Mode | 实现 API、数据库、统计服务时 | API、迁移、业务服务、统计计算 | `BACKEND_STATE.md`、`DATA_MODEL_CURRENT.md` |
| AI Video Mode | 接入视频识别、追踪、ROI 计数时 | 视频输入、模型输出、事件发布、准确率验证 | `AI_ALGORITHM_STATE.md`、`TEST_STATE.md` |
| Data Mode | 指标、统计、质量规则变化时 | 事件口径、聚合逻辑、数据质量、回放验证 | `DATA_MODEL_CURRENT.md`、`TEST_STATE.md` |
| QA Mode | 每次交付前必须启用 | 单元、接口、E2E、性能、安全、AI 验证 | `TEST_STATE.md` |
| Security/License Mode | 新依赖、模型、素材、鉴权变化时 | 隐私、安全、许可证、第三方声明 | `LICENSE_AUDIT.md`、`THIRD_PARTY_NOTICES.md` |
| DevOps Mode | 部署、CI、监控、环境变量变化时 | Docker、CI/CD、监控、备份恢复 | `DEPLOYMENT_STATE.md` |

### 5.3 阶段与角色顺序

| 阶段 | 主角色 | 辅助检查角色 |
| --- | --- | --- |
| P0 项目基线 | Product Mode | Architect、QA、Security/License |
| P1 设计规范 | Design Mode | Product、Frontend、QA |
| P2 前端 Demo | Frontend Mode | Design、QA、Security/License |
| P3 工程化骨架 | DevOps Mode | Frontend、Backend、QA、Security/License |
| P4 后端 API | Backend Mode | Architect、Data、QA、Security/License |
| P5 前后端联调 | Frontend Mode | Backend、QA |
| P6 AI 视频 MVP | AI Video Mode | Data、Backend、QA、Security/License |
| P7 店铺评分 | Backend Mode | Data、Product、QA |
| P8 客群热力动线 | Data Mode | AI Video、Frontend、QA、Security/License |
| P9 3D 数字孪生 | Frontend Mode | Design、Data、QA |
| P10 测试与安全 | QA Mode | Security/License、DevOps |
| P11 部署观测 | DevOps Mode | Backend、Frontend、QA |
| P12 验收移交 | Product Mode | QA、DevOps、Security/License |

### 5.4 每个任务的固定流程

AI 执行任何任务都必须按顺序做：

```text
1. 恢复上下文
   阅读 README.md、AI_Schedule.md 和 /context/*.md
   重点阅读 PROGRESS.md、TODO_NEXT.md、TEST_STATE.md、DECISIONS_LOG.md

2. 检查冲突
   如果需求、接口、数据模型或测试状态冲突，先输出冲突清单

3. 选择本次角色模式
   只选一个主角色
   写明辅助检查角色

4. 明确本次交付
   写清本次要改哪些文件、完成哪些验收点、哪些不做

5. 实现
   优先沿用现有架构和工具链
   不擅自替换技术栈

6. 测试
   新增或更新单元、集成、契约、E2E 或算法验证测试
   运行相关测试命令

7. 许可证检查
   新依赖、新素材、新模型必须更新 LICENSE_AUDIT

8. 更新恢复包
   更新 /context 中受影响文件
   更新 PROGRESS.md 的人类进度

9. 交付总结
   列出修改文件、测试结果、风险、下一步
```

### 5.5 上下文恢复 Prompt 模板

新对话开始时使用：

```text
请使用 skills/mall-vision-ai-delivery/SKILL.md 作为本项目工作规范。

你现在继续开发“商业综合体视觉 AI 数字孪生运营系统”。

请先阅读：
1. README.md
2. AI_Schedule.md
3. PROGRESS.md
4. context/PROJECT_STATE.md
5. context/REQUIREMENTS_CURRENT.md
6. context/ARCHITECTURE_CURRENT.md
7. context/API_CONTRACT_CURRENT.md
8. context/DATA_MODEL_CURRENT.md
9. context/FRONTEND_STATE.md
10. context/BACKEND_STATE.md
11. context/AI_ALGORITHM_STATE.md
12. context/TEST_STATE.md
13. context/DECISIONS_LOG.md
14. context/RISKS_AND_ASSUMPTIONS.md
15. context/TODO_NEXT.md

你的任务：
[填写本次任务]

要求：
1. 先总结当前项目状态
2. 检查上下文冲突
3. 选择一个主角色模式，不要假设多个 AI 并行
4. 不重写已确认架构
5. 不擅自修改接口契约和数据模型
6. 所有新增代码必须有测试
7. 新依赖和素材必须免费、开源、许可证清晰
8. 阶段结束后更新 /context 恢复文件和 PROGRESS.md
9. 如果无法测试或无法确认许可证，必须明确标记为阻塞或风险
```

### 5.6 单任务 Prompt 模板

```text
你是本项目唯一使用的 AI。
本次请进入 [角色模式]，例如 Product Mode / Frontend Mode / QA Mode。

本次任务：
[具体任务]

输入上下文：
- README.md
- AI_Schedule.md
- PROGRESS.md
- context/TODO_NEXT.md
- context/TEST_STATE.md
- 与任务相关的 context 文件

约束：
1. 不破坏已有接口契约
2. 不修改已确认数据模型，除非先说明理由
3. 所有新增代码必须有测试
4. 所有测试必须可自动运行
5. 新增依赖、模型、图片、视频、字体必须更新许可证记录
6. 阶段结束必须更新 /context
7. 发现冲突先停止并输出冲突清单

输出：
1. 修改文件列表
2. 新增文件列表
3. 测试命令和结果
4. 许可证检查结果
5. 风险和未完成事项
6. 更新后的上下文恢复文件
7. 更新后的 PROGRESS.md 摘要
```

### 5.7 单 AI 接力规则

```text
不要依赖聊天记录作为唯一事实来源
重要决策必须写入 DECISIONS_LOG.md
下一步必须写入 TODO_NEXT.md
失败测试必须写入 TEST_STATE.md
风险和假设必须写入 RISKS_AND_ASSUMPTIONS.md
接口变化必须同步 API_CONTRACT_CURRENT.md
数据模型变化必须同步 DATA_MODEL_CURRENT.md
面向人的进度变化必须同步 PROGRESS.md
```

---

## 六、测试与质量门禁

### 6.1 覆盖率目标

| 类型 | 要求 |
| --- | --- |
| 后端整体 | >= 80% |
| 核心业务逻辑 | >= 90% |
| 评分模型 | 100% |
| 预警规则 | 100% |
| API 自动化 | >= 90% |
| 前端组件 | >= 70% |
| E2E 核心路径 | 100% 通过 |
| AI 工具函数 | >= 80% |

### 6.2 必测场景

```text
大屏打开
楼层切换
店铺点击
店铺详情
低效预警查看
客群画像查看
热力图查看
动线查看
历史回放
登录鉴权
RBAC 越权
数据边界和异常事件
视频断流恢复
```

### 6.3 性能目标

| 场景 | 目标 |
| --- | --- |
| 大屏首屏 | < 5s |
| 关键接口 P95 | < 300ms |
| 30 天历史查询 P95 | < 2s |
| 500 并发 API | 错误率 < 1% |
| 3D 场景 | >= 30 FPS |
| 单路视频处理 | >= 15 FPS，目标 25 FPS |
| 实时数据延迟 | < 60s |
| 容器重启恢复 | < 2 分钟 |

### 6.4 安全测试

```text
登录鉴权
RBAC 权限
SQL 注入
XSS
CSRF
接口越权
日志脱敏
密码哈希
Token 过期
CORS 限制
依赖漏洞扫描
许可证扫描
```

### 6.5 数据质量测试

```text
进店人数不能为负
出店人数不能大于合理累计值
店内人数不能长期为负
转化率在 0 到 100%
评分在 0 到 100
停留时长不能小于 0
热力坐标必须在楼层范围内
同一事件不能重复消费
跨天统计正确
营业时间边界正确
```

### 6.6 不允许交付的情况

```text
测试无法运行且没有说明
核心路径没有 E2E
新增依赖许可证未知
使用了来源不明素材
接口契约和实现不一致
上下文恢复包缺失
TODO_NEXT.md 没有下一步
```

---

## 七、首轮启动 Prompt

```text
请使用 skills/mall-vision-ai-delivery/SKILL.md 作为工作规范。

你是本项目唯一使用的 AI，需要按单 AI 角色模式开发“商业综合体视觉 AI 数字孪生运营系统”。

当前第一阶段任务：
进入 Product Mode，完成 P0 项目基线与上下文恢复。

请生成：
1. docs/PRD_v1.md
2. docs/USER_STORIES.md
3. docs/ACCEPTANCE_CRITERIA.md
4. docs/METRICS_DEFINITION.md
5. docs/TEST_STRATEGY.md
6. docs/QUALITY_GATE.md
7. context/PROJECT_STATE.md
8. context/REQUIREMENTS_CURRENT.md
9. context/ARCHITECTURE_CURRENT.md
10. context/TEST_STATE.md
11. context/TODO_NEXT.md

要求：
- 前端优先使用 React + TypeScript + Vite
- 后端优先使用 FastAPI + PostgreSQL
- AI 视频服务优先使用 Python + ONNXRuntime
- 优先使用 MIT、Apache-2.0、BSD、ISC、CC0、CC-BY 等清晰许可证资源
- 禁止使用来源不明或许可证不清晰的视频、图片、字体、模型和代码
- 所有后续任务都必须更新上下文恢复包和 PROGRESS.md
- 每次任务只选择一个主角色模式，其他角色只作为检查清单
- 输出必须结构化，能直接放入代码仓库
```

---

## 八、当前仓库状态

当前仓库还是规划阶段，主要交付物是：

```text
README.md
AI_Schedule.md
PROGRESS.md
skills/mall-vision-ai-delivery/SKILL.md
```

下一步建议执行 P0，先创建 `docs/` 和 `context/`，不要直接进入编码。
