# Deployment State

更新时间：2026-05-11

## 当前状态

尚未创建部署工程、Docker Compose、CI 或环境变量模板。

补充：`slides/slidev/` 已生成静态演示稿构建产物 `slides/slidev/dist/`，这只属于演示材料，不代表系统部署工程。

## 部署原则

```text
Docker Compose first
no paid cloud by default
local development first
health checks required
logs and backup docs required before production-like delivery
```

## 计划服务

```text
frontend
backend
mysql
redis
ai-services
worker or scheduler
```

## 环境执行约束

```text
数据库服务使用 MySQL
后续 Python backend/ 和 ai-services/ 需要重新创建虚拟环境
涉及 sudo、系统包安装、系统服务管理或提权修改时，AI 必须暂停并让人类执行
```

## 下一步

P3-I1 做工程化骨架规划与质量门禁对齐，优先定义根级质量门禁、CI 检查计划、Docker Compose 规划边界和 P3 拆分；是否创建 `infra/` 需由 P3-I1 的小增量边界明确。P11 完成部署与观测。
