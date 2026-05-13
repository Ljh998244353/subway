# Deployment State

更新时间：2026-05-13

## 当前状态

尚未创建部署工程、Docker Compose、CI 或环境变量模板。P3-I1 已新增工程质量门禁和 CI 计划文档，P3-I2 已新增根级本地质量门禁入口，但未创建 `infra/`、Docker Compose 文件、CI 配置或任何外部服务绑定。

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

P3-I3 做免费 CI 配置或本地到 CI 映射，仍不创建部署工程。P3-I4 再规划或创建 Docker Compose 草案。任何 CI 工具、Docker 镜像、扫描工具或外部服务都必须先审计许可证、成本和账号要求。P11 完成部署与观测。
