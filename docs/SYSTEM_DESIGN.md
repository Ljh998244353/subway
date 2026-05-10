# 系统设计文档

更新时间：2026-05-10

## 1. 设计目标

本系统面向商业综合体运营场景，目标是在可审计、可测试、可演示的前提下，逐步形成视觉 AI 事件、运营指标、告警和数字孪生展示的闭环。

设计优先级：

```text
可恢复 > 可测试 > 可演示 > 免费合规 > 可维护 > 可扩展
```

## 2. 总体架构

```text
Frontend Demo
  React + TypeScript + Vite
  ECharts / Three.js
  Mock mode and API mode

Backend API
  FastAPI / Pydantic / SQLAlchemy
  PostgreSQL as source of truth
  Redis for cache or transient queues only

AI Services
  video ingestion
  detection and tracking
  ROI and line-crossing event generation
  audited event output

Data Layer
  raw events
  aggregated statistics
  store scoring
  alert rules

Infra
  Docker Compose first
  CI gates
  logs, health checks, backup docs
```

## 3. 模块划分

| 模块 | 职责 | 阶段 |
| --- | --- | --- |
| Web Frontend | 运营总览、数字孪生、店铺分析、客群画像、低效预警 | P2/P5/P9 |
| API Gateway / Backend | REST API、鉴权、权限、统计查询、告警管理 | P4/P5 |
| Metric Service | 客流、停留、转化、评分和告警聚合 | P4/P7/P8 |
| AI Event Service | 视频接入、检测、追踪、ROI/线段计数、事件发布 | P6 |
| Data Store | 事件、统计、配置、用户、审计日志 | P4 |
| Admin & Audit | RBAC、操作日志、配置审计 | P4/P10 |
| Infra & Observability | 容器、健康检查、日志、备份、监控 | P3/P11 |

## 4. 数据流

```text
camera or synthetic video
  -> AI event service
  -> person_detection_event / store_enter_event / store_exit_event / heatmap_event
  -> aggregation jobs
  -> flow, dwell, conversion, score, alert statistics
  -> FastAPI /api/v1
  -> React dashboard and digital twin
```

P2 前端 Demo 阶段使用 Mock 数据替代 API；P5 后保留 Mock 模式作为演示降级。

## 5. 核心数据实体草案

| 实体 | 用途 |
| --- | --- |
| mall | 商场基础信息 |
| floor | 楼层信息和拥挤阈值 |
| store | 店铺、业态、位置和面积 |
| camera | 摄像头配置 |
| camera_roi | ROI 区域配置 |
| camera_line | 进出方向线段配置 |
| person_detection_event | AI 检测事实 |
| store_enter_event | 进店事件 |
| store_exit_event | 出店事件 |
| store_visit_session | 店铺访问会话 |
| heatmap_event | 热力事件 |
| trajectory_event | 匿名轨迹片段事件，默认不展示个人级轨迹 |
| store_flow_stat | 店铺客流统计 |
| store_dwell_stat | 店铺停留统计 |
| store_conversion_stat | 店铺转化统计 |
| store_score_stat | 店铺评分统计 |
| store_alert | 店铺和区域告警 |
| user / role / permission | RBAC 权限 |
| operation_log | 操作审计 |

## 6. API 草案

统一使用 `/api/v1`，响应由 Pydantic/OpenAPI 作为契约。

| API | 用途 |
| --- | --- |
| `GET /api/v1/overview` | 运营总览 |
| `GET /api/v1/malls` | 商场列表 |
| `GET /api/v1/malls/{mallId}/floors` | 楼层列表 |
| `GET /api/v1/floors/{floorId}/stores` | 楼层店铺 |
| `GET /api/v1/stores/{storeId}` | 店铺详情 |
| `GET /api/v1/stores/{storeId}/flow` | 店铺客流 |
| `GET /api/v1/stores/{storeId}/score` | 店铺评分 |
| `GET /api/v1/stores/ranking` | 店铺排行 |
| `GET /api/v1/alerts/stores` | 店铺告警 |
| `GET /api/v1/customer-profile` | 匿名客群画像 |
| `GET /api/v1/heatmap` | 热力数据 |
| `GET /api/v1/trajectories` | 匿名聚合动线，不返回个人级轨迹 |

## 7. 权限草案

| 角色 | 权限 |
| --- | --- |
| admin | 用户、权限、配置、全部数据和审计 |
| operator | 运营总览、楼层、告警处理 |
| leasing | 店铺分析、评分、业态对比 |
| security | 拥挤和异常告警、楼层状态 |
| readonly | 只读查看授权范围内数据 |

## 8. 隐私与安全设计

```text
不存储人脸原图
不做人脸识别或身份识别
不展示个人轨迹
默认只展示匿名聚合指标
日志不得记录敏感原始图像或个人身份信息
真实上线前必须补充授权、告知、留存和删除策略
RBAC 控制页面、API 和数据范围
关键操作写入 operation_log
```

## 9. 部署设计草案

第一轮采用 Docker Compose 优先：

```text
frontend
backend
postgres
redis
ai-services
worker or scheduler
```

P0 不创建部署文件；P3 再创建工程化骨架和容器配置。

## 10. 关键设计决策

| 决策 | 结论 | 原因 |
| --- | --- | --- |
| 数据源 | 第一轮使用 Mock、合成、自绘数据 | 避免真实数据和授权风险 |
| 前端 | React + TypeScript + Vite | 适合快速 Demo 和组件测试 |
| 后端 | FastAPI + Pydantic + SQLAlchemy | 契约清晰，测试方便 |
| 数据库 | PostgreSQL 作为事实源 | 适合事务、查询和审计 |
| 缓存 | Redis 仅用于缓存或临时队列 | 不作为交易事实源 |
| 数字孪生 | 先 2.5D 或简化 3D | 避免高精 BIM 依赖 |
| AI 输出 | 事件化、可审计、可复放 | 便于数据质量和测试 |

## 11. 风险与缓解

| 风险 | 缓解 |
| --- | --- |
| 真实素材侵权 | 使用自绘楼层、虚构店铺、合成数据 |
| 隐私风险 | 匿名聚合，不存储人脸原图，不展示个人轨迹 |
| 指标不可解释 | 指标定义和评分公式文档化，后续测试覆盖 |
| AI 误检影响指标 | 记录模型版本、阈值和置信度，支持离线验证 |
| 范围膨胀 | 按 P0-P12 和小增量推进，P0 不写业务代码 |
