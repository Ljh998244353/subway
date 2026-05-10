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

P2-I3 只实现前端 `/dashboard` 页面，不创建 `infra/` 或 Docker Compose。P3 创建工程化骨架和部署草案；P11 完成部署与观测。
