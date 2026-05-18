# Deployment State

更新时间：2026-05-13

## 当前状态

尚未创建部署工程、Docker Compose 文件或环境变量模板。P3-I1 已新增工程质量门禁和 CI 计划文档，P3-I2 已新增根级本地质量门禁入口，P3-I3 已新增 GitHub Actions CI 配置 `.github/workflows/ci.yml`。P3-I4 已新增 `docs/DEPLOYMENT_PLAN.md`，明确未来 Compose 服务边界、端口、环境变量、secrets、健康检查、启动顺序、数据卷、日志、备份和许可证审计点。当前仍未创建 `infra/`、`docker-compose.yml` 或任何生产部署绑定。

P3-I3 CI 边界：

```text
GitHub Actions 只作为 GitHub 仓库侧免费 CI
运行 quality-gate 和 dependency-audit 两个 job
复用 npm run quality 和 npm run quality:audit
不发布生产环境
不上传构建产物
不配置 secrets
不接真实 API、真实视频或真实商场数据
Gitee 镜像不会自动运行 .github/workflows/ci.yml
```

补充：`slides/slidev/` 已生成静态演示稿构建产物 `slides/slidev/dist/`，这只属于演示材料，不代表系统部署工程。

P3-I4 部署文档边界：

```text
docs/DEPLOYMENT_PLAN.md 是部署计划，不是可运行 Compose
当前不新增 Docker 镜像、MySQL 服务、Redis 服务、云服务、扫描工具或外部账号
未来 Compose 服务草案包含 frontend、backend、mysql、redis、ai-services、worker
后端必须提供 /api/v1/health 后才能做真实服务健康检查
不得提交 .env、真实凭据、真实视频流、真实商场数据或个人信息
创建 Docker、MySQL、Redis、Python 镜像或 Gitee Go 前必须先审计许可证、成本、账号和 sudo 边界
```

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

P4-I1 做后端 API 契约和 MySQL 数据模型基线，优先补 `/api/v1/health` 契约，为后续真实 Docker Compose 健康检查打基础。任何 Docker 镜像、数据库服务、扫描工具、Gitee Go 配置或外部服务都必须先审计许可证、成本和账号要求。P11 完成部署与观测。
