# License Audit

更新时间：2026-05-10

## 1. 审计原则

新增依赖、模型、字体、图标、图片、视频、模板、数据集、复制代码或外部服务前，必须记录来源、版本、许可证、用途、商业使用状态、署名义务、成本或账号要求，以及最终决策。

默认允许：

```text
MIT
Apache-2.0
BSD-2-Clause
BSD-3-Clause
ISC
PostgreSQL License
CC0
CC-BY with attribution
SIL Open Font License 1.1
自绘或自生成合成数据、楼层图、视频和 Mock 资产
```

说明：`PostgreSQL License` 只表示一种 permissive license 名称，不代表本项目数据库选型；本项目数据库已确认使用 MySQL。后续引入 MySQL 服务、Docker 镜像或 Python driver 时，必须单独审计对应版本、许可证和分发方式。

默认暂缓或禁用：

```text
付费工具、付费 SaaS、付费 API、付费模型服务、付费素材
GPL/LGPL/AGPL 或其他 copyleft 依赖进入分发产品代码
Non-Commercial 素材
未知模型权重
抓取图片或视频
未授权真实商场地图、平面图、BIM、品牌 Logo、商户 Logo、监控视频
许可证不清晰字体
```

## 2. 当前审计记录

| 名称 | 来源 | 版本 | 许可证 | 用途 | 商业使用状态 | 义务 | 成本/账号 | 决策 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Touying | https://typst.app/universe/package/touying/ | 0.7.3 | MIT | `slides/project-intro.typ` 演示稿框架和主题 | MIT 通常允许商用 | 保留许可证声明 | 无已知付费要求 | 允许 |
| Noto Sans CJK | https://github.com/notofonts/noto-cjk | System font | SIL Open Font License 1.1 | 中文字体建议 | OFL 通常允许使用和再分发 | 保留字体许可证，不单独售卖字体 | 无已知付费要求 | 允许 |
| Inter | https://github.com/rsms/inter | System font | SIL Open Font License 1.1 | 拉丁 UI 字体备选 | OFL 通常允许使用和再分发 | 保留字体许可证，不单独售卖字体 | 无已知付费要求 | 允许 |
| Roboto | https://github.com/googlefonts/roboto-2 | System font | Apache License 2.0 | 拉丁字体备选 | Apache-2.0 通常允许商用 | 分发字体时保留许可证和 notice | 无已知付费要求 | 允许 |
| Slidev | https://github.com/slidevjs/slidev | 52.15.1 | MIT | `slides/slidev` 功能介绍演示稿框架 | MIT 通常允许商用 | 保留许可证声明 | 无已知付费要求 | 允许 |
| @slidev/theme-default | https://www.npmjs.com/package/@slidev/theme-default | 0.25.0 | MIT | `slides/slidev/slides.md` 默认主题 | MIT 通常允许商用 | 保留许可证声明 | 无已知付费要求 | 允许 |
| React | https://github.com/facebook/react | 19.2.6 | MIT | `frontend/` UI runtime | MIT 通常允许商用 | 保留许可证声明 | 无已知付费要求 | 允许 |
| React DOM | https://github.com/facebook/react | 19.2.6 | MIT | `frontend/` DOM renderer | MIT 通常允许商用 | 保留许可证声明 | 无已知付费要求 | 允许 |
| React Router DOM | https://github.com/remix-run/react-router | 7.15.0 | MIT | `frontend/` 5 个核心路由占位和导航 | MIT 通常允许商用 | 保留许可证声明 | 无已知付费要求 | 允许 |
| Motion | https://motion.dev/ and https://www.npmjs.com/package/motion | 12.38.0 | MIT | `frontend/` 页面、面板和状态变化的克制动画 | MIT 通常允许商用 | 保留许可证声明 | 无已知付费要求；不需要账号 | 允许 |
| Framer Motion | https://github.com/motiondivision/motion | 12.38.0 | MIT | Motion 的 React 动画传递运行依赖 | MIT 通常允许商用 | 保留许可证声明 | 无已知付费要求；不需要账号 | 允许 |
| Motion DOM | https://github.com/motiondivision/motion | 12.38.0 | MIT | Motion 的 DOM 动画传递运行依赖 | MIT 通常允许商用 | 保留许可证声明 | 无已知付费要求；不需要账号 | 允许 |
| Motion Utils | https://github.com/motiondivision/motion | 12.36.0 | MIT | Motion 的工具函数传递运行依赖 | MIT 通常允许商用 | 保留许可证声明 | 无已知付费要求；不需要账号 | 允许 |
| tslib | https://github.com/microsoft/tslib | 2.8.1 | 0BSD | Motion 的运行时辅助传递依赖 | 0BSD 通常允许商用 | 保留依赖包许可证记录 | 无已知付费要求；不需要账号 | 允许 |
| Vite | https://github.com/vitejs/vite | 7.3.3 | MIT | `frontend/` 开发服务器和生产构建 | MIT 通常允许商用 | 保留许可证声明 | 无已知付费要求 | 允许 |
| TypeScript | https://github.com/microsoft/TypeScript | 5.9.3 | Apache-2.0 | `frontend/` 类型检查和构建门禁 | Apache-2.0 通常允许商用 | 保留许可证和 notice | 无已知付费要求 | 允许 |
| @types/react | https://github.com/DefinitelyTyped/DefinitelyTyped | 19.2.14 | MIT | React TypeScript 类型定义 | MIT 通常允许商用 | 保留许可证声明 | 无已知付费要求 | 允许 |
| @types/react-dom | https://github.com/DefinitelyTyped/DefinitelyTyped | 19.2.3 | MIT | React DOM TypeScript 类型定义 | MIT 通常允许商用 | 保留许可证声明 | 无已知付费要求 | 允许 |
| @types/node | https://github.com/DefinitelyTyped/DefinitelyTyped | 24.12.3 | MIT | Node API TypeScript 类型定义，用于测试和配置 | MIT 通常允许商用 | 保留许可证声明 | 无已知付费要求 | 允许 |
| ripgrep | https://github.com/BurntSushi/ripgrep | 15.1.0 | Unlicense OR MIT | P3-I2 根级质量门禁中的本地关键词扫描工具，不进入前端运行包 | Unlicense/MIT 通常允许商用 | 如重新分发需保留许可证记录；CI 安装来源需在 P3-I3 复核 | 当前本机已有；无项目新增付费或账号要求 | 允许用于本地检查 |
| GitHub Actions | https://docs.github.com/actions | Hosted CI service | GitHub service terms | P3-I3 GitHub 端 CI runner，运行根级质量门禁和高危 npm audit | 公开仓库通常有免费 hosted runner 使用；私有仓库或超额使用可能受账号和计费规则限制 | 遵守 GitHub 服务条款；不在日志写入 secrets、个人数据或真实监控数据 | 需要 GitHub 账号；当前不使用付费部署或 secrets | 允许用于 GitHub 端 CI |
| actions/checkout | https://github.com/actions/checkout | 6.0.2 | MIT | CI 中检出仓库代码 | MIT 通常允许商用 | 保留许可证声明 | GitHub Actions 运行环境中使用；无项目新增 npm 依赖 | 允许 |
| actions/setup-node | https://github.com/actions/setup-node | 6.4.0 | MIT | CI 中安装 Node 24 并配置 npm cache | MIT 通常允许商用 | 保留许可证声明 | GitHub Actions 运行环境中使用；无项目新增 npm 依赖 | 允许 |

P3-I4 说明：`docs/DEPLOYMENT_PLAN.md` 是项目自写部署计划文档。本增量没有新增 Docker 镜像、数据库服务、云服务、扫描工具、npm 包、字体、图片、视频、模型、数据集或外部账号能力，因此不新增第三方运行时审计条目。

## 3. P0 结论

P0 创建 Markdown 文档和 context 文件，未新增第三方依赖、模型、媒体、字体、图标、数据集或外部服务。后续新增的 Slidev 演示稿和 P2-I1 前端工程依赖已在本文件和 `docs/THIRD_PARTY_NOTICES.md` 记录。

## 4. 后续动作

| 阶段 | 审计重点 |
| --- | --- |
| P1 | 设计图标、字体、颜色来源；禁止未授权真实素材 |
| P2 | 前端依赖、图表库、3D 库、图标库、Mock 数据来源 |
| P3 | 工程化工具、CI、Docker 镜像和扫描工具许可证 |
| P4 | Python 后端依赖、MySQL 服务或镜像、MySQL driver、缓存、迁移工具许可证 |
| P6 | AI 模型、视频 fixture、检测/追踪库、数据集许可证 |
| P11 | 部署平台、监控组件、日志组件和外部服务条款 |

## P4-I2 backend dependency audit

| Name | Source | Version | License | Use | Cost/account | Decision |
| --- | --- | --- | --- | --- | --- | --- |
| actions/setup-python | https://github.com/actions/setup-python | 6.2.0 | MIT | GitHub Actions Python 3.13 setup and pip cache | GitHub Actions account context only; no secrets or production data | Allowed |
| FastAPI | https://github.com/fastapi/fastapi | 0.136.1 | MIT | Backend API framework for `/api/v1/health` and future `/api/v1` | No known paid account requirement | Allowed |
| Starlette | https://github.com/Kludex/starlette | 1.0.0 | BSD-3-Clause | ASGI toolkit used by FastAPI | No known paid account requirement | Allowed |
| Pydantic | https://github.com/pydantic/pydantic | 2.13.4 | MIT | Response schemas and settings model | No known paid account requirement | Allowed |
| Uvicorn | https://github.com/encode/uvicorn | 0.47.0 | BSD-3-Clause | Local ASGI server for development | No known paid account requirement | Allowed |
| Pytest | https://github.com/pytest-dev/pytest | 9.0.3 | MIT | Backend test runner | No known paid account requirement | Allowed |
| HTTPX | https://github.com/encode/httpx | 0.28.1 | BSD-3-Clause | Test client dependency used by FastAPI/Starlette tests | No known paid account requirement | Allowed |

P4-I2 does not add a MySQL driver, Docker image, AI model, video fixture, external API, paid service, real mall material, or personal data source. Transitive Python packages are locked in `backend/requirements.lock.txt` for review continuity.

## P4-I3 migration dependency audit

| Name | Source | Version | License | Use | Cost/account | Decision |
| --- | --- | --- | --- | --- | --- | --- |
| SQLAlchemy | https://www.sqlalchemy.org/ and https://github.com/sqlalchemy/sqlalchemy | 2.0.49 | MIT | SQL table metadata baseline for P4-I3 MySQL migration planning | No known paid account requirement | Allowed |
| Alembic | https://alembic.sqlalchemy.org/ and https://github.com/sqlalchemy/alembic | 1.18.4 | MIT | Offline-first migration runner for P4-I3 MySQL schema baseline | No known paid account requirement | Allowed |
| PyMySQL | https://github.com/PyMySQL/PyMySQL | 1.1.3 | MIT | Pure Python MySQL driver reserved for future MySQL connection; no real DB connection in P4-I3 | No known paid account requirement | Allowed |
| Greenlet | https://greenlet.readthedocs.io/ | 3.5.0 | MIT AND PSF-2.0 | SQLAlchemy runtime dependency | No known paid account requirement | Allowed |
| Mako | https://www.makotemplates.org/ | 1.3.12 | MIT | Alembic template dependency | No known paid account requirement | Allowed |
| MarkupSafe | https://github.com/pallets/markupsafe | 3.0.3 | BSD-3-Clause | Mako transitive dependency | No known paid account requirement | Allowed |

P4-I3 does not connect to a real MySQL server, create Docker images, add AI models, use video fixtures, call external APIs, or process real mall/personal data. Offline migration SQL is generated from project-authored SQLAlchemy metadata.

## P4-I7 overview client audit

P4-I7 added TypeScript DTOs, `getOverview(mallId)`, and mocked fetch tests only. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real brands, face images, personal trajectories, or real MySQL access.

## P4-I8 store detail contract audit

P4-I8 reused existing synthetic fixture data and existing backend/frontend dependencies. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real brands, face images, personal trajectories, or real MySQL access.

## P4-I9 store score contract audit

P4-I9 reused existing backend/frontend dependencies and added only project-authored synthetic score fixture values. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real brands, face images, personal trajectories, or real MySQL access.

## P4-I10 store flow contract audit

P4-I10 reused existing backend/frontend dependencies and added only project-authored synthetic flow fixture values. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real brands, face images, personal trajectories, or real MySQL access.

## P4-I11 store ranking contract audit

P4-I11 reused existing backend/frontend dependencies and derived ranking fixture values from existing project-authored synthetic store and score fixtures. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real brands, face images, personal trajectories, or real MySQL access.

## P4-I12 store alerts contract audit

P4-I12 reused existing backend/frontend dependencies and added only project-authored synthetic store alert fixture values. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real brands, face images, personal trajectories, personal profiles, or real MySQL access.

## P4-I13 customer profile contract audit

P4-I13 reused existing backend/frontend dependencies and added only project-authored anonymous synthetic aggregate customer-profile fixture values. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real brands, face images, member identifiers, phone numbers, personal trajectories, personal profiles, or real MySQL access.

## P4-I14 heatmap contract audit

P4-I14 reused existing backend/frontend dependencies and added only project-authored synthetic aggregate heatmap fixture values. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real maps, real floor plans, face images, member identifiers, phone numbers, personal trajectories, personal profiles, or real MySQL access.

## P4-I15 trajectories contract audit

P4-I15 reused existing backend/frontend dependencies and added only project-authored anonymous synthetic aggregate trajectory-flow fixture values. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real maps, real floor plans, face images, member identifiers, phone numbers, personal trajectories, personal profiles, or real MySQL access.

## P4-I16 CP4 closure and MySQL readiness audit

P4-I16 added project-authored documentation only: `docs/CP4_CLOSURE_REVIEW.md` and `docs/MYSQL_READINESS_PLAN.md`. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real maps, real floor plans, face images, member identifiers, phone numbers, personal trajectories, personal profiles, credentials, or real MySQL access.
