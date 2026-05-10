# Data Model Current

更新时间：2026-05-10

## 当前状态

P0 定义了数据实体草案。P2-I2 在前端创建了 TypeScript 共享类型和虚构 Mock 数据，尚未创建数据库、迁移或 ORM 模型。

## 实体草案

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

## 数据质量规则

```text
进店人数不能为负
出店人数不能大于合理累计值
店内人数不能长期为负
转化率必须在 0 到 100%
评分必须在 0 到 100
停留时长不能小于 0
热力坐标必须在楼层范围内
同一事件不能重复消费
跨天统计必须正确
营业时间边界必须可配置
```

## 下一步

P2-I9 只做前端 Demo 收口和交接，不创建数据库、迁移或 ORM 模型。P4 进入后端 API 与数据模型阶段时，再创建正式 ERD、Alembic 迁移和 SQLAlchemy 模型；数据库统一使用 MySQL。
