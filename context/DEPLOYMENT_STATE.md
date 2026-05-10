# Deployment State

更新时间：2026-05-10

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
postgres
redis
ai-services
worker or scheduler
```

## 下一步

P3 创建工程化骨架和部署草案；P11 完成部署与观测。
