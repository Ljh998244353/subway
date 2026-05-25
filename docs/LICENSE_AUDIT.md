# License Audit

更新时间：2026-05-25

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
| Blender | https://www.blender.org/ | 工具决策，不随项目打包 | GPL-3.0-or-later | P7 当前主线 3D 建模工具，用于自建合成商场模型并可导出 GLB/GLTF | Blender 可用于商业创作；仅用 Blender 生成的项目自有资产不自动变成 GPL | 若重新分发 Blender 二进制需遵守 GPL；任何插件、模型、纹理或外部资产必须另行审计 | 免费开源工具；不需要付费账号 | 允许作为当前免费建模工具 |
| BlenderMCP / blender-mcp | https://github.com/ahujasid/blender-mcp | README label 1.5.5, candidate only | MIT License per GitHub metadata | P7 候选本地 Blender 自动化 MCP：连接 Claude 与 Blender add-on，用于生成自绘合成商场几何、材质、相机、灯光和 GLB/GLTF 导出辅助 | MIT 通常允许商用，但该工具能在 Blender 中运行 Python，需要按代码执行工具管理 | 保留 MIT 许可证声明；安装/使用前禁用 telemetry；不使用 Sketchfab、Poly Haven、Hyper3D、Hunyuan3D、Rodin、Fal 或下载资产，除非另行审计 | 工具本身无已知付费要求；需要本地 Blender 3.0+、Python 3.10+、uv/uvx；外部资产/API 可能需要账号或付费，默认禁用 | 候选，未安装；需要用户明确批准后才可使用 |
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

## P5-I1 overview data loader audit

P5-I1 added project-authored frontend TypeScript only: `frontend/src/api/overviewDataLoader.ts` and `frontend/src/api/overviewDataLoader.test.ts`. It reused existing dependencies and Node built-in tests. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real maps, real floor plans, face images, member identifiers, phone numbers, personal trajectories, personal profiles, credentials, or real MySQL access.

## P5-I2 dashboard state wiring audit

P5-I2 added project-authored frontend TypeScript only: `frontend/src/pages/dashboardOverviewState.ts`, DashboardPage wiring, and DashboardPage tests. It reused existing dependencies and Node built-in tests. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real maps, real floor plans, face images, member identifiers, phone numbers, personal trajectories, personal profiles, credentials, or real MySQL access.

## P5-I3 Store Analysis loader audit

P5-I3 added project-authored frontend TypeScript only: `frontend/src/api/storeAnalysisDataLoader.ts` and `frontend/src/api/storeAnalysisDataLoader.test.ts`. It reused existing dependencies and Node built-in tests. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real maps, real floor plans, face images, member identifiers, phone numbers, personal trajectories, personal profiles, credentials, or real MySQL access.

## P5-I4 StoreAnalysisPage state wiring audit

P5-I4 added project-authored frontend TypeScript only: `frontend/src/pages/storeAnalysisState.ts`, StoreAnalysisPage wiring, and StoreAnalysisPage tests. It reused existing dependencies and Node built-in tests. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real maps, real floor plans, face images, member identifiers, phone numbers, personal trajectories, personal profiles, credentials, or real MySQL access.

## P5-I5 Store Alerts loader audit

P5-I5 added project-authored frontend TypeScript only: `frontend/src/api/storeAlertsDataLoader.ts` and `frontend/src/api/storeAlertsDataLoader.test.ts`. It reused existing dependencies and Node built-in tests. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real maps, real floor plans, face images, member identifiers, phone numbers, personal trajectories, personal profiles, credentials, or real MySQL access.

## P5-I6 StoreAlertsPage state wiring audit

P5-I6 added project-authored frontend TypeScript only: `frontend/src/pages/storeAlertsState.ts`, StoreAlertsPage wiring, and StoreAlertsPage tests. It reused existing dependencies and Node built-in tests. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real maps, real floor plans, face images, member identifiers, phone numbers, personal trajectories, personal profiles, credentials, or real MySQL access.

## P5-I7 Customer Profile loader audit

P5-I7 added project-authored frontend TypeScript only: `frontend/src/api/customerProfileDataLoader.ts` and `frontend/src/api/customerProfileDataLoader.test.ts`. It reused existing dependencies and Node built-in tests. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real maps, real floor plans, face images, member identifiers, phone numbers, personal trajectories, personal profiles, credentials, or real MySQL access.

## P5-I8 CustomerProfilePage state wiring audit

P5-I8 added project-authored frontend TypeScript only: `frontend/src/pages/customerProfileState.ts`, CustomerProfilePage wiring, and CustomerProfilePage tests. It reused existing dependencies and Node built-in tests. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real maps, real floor plans, face images, member identifiers, phone numbers, personal trajectories, personal profiles, credentials, or real MySQL access.

## P5-I9 Digital Twin loader audit

P5-I9 added project-authored frontend TypeScript only: `frontend/src/api/digitalTwinDataLoader.ts` and `frontend/src/api/digitalTwinDataLoader.test.ts`. It reused existing dependencies, existing synthetic API contracts, and Node built-in tests. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real maps, real floor plans, face images, member identifiers, phone numbers, personal trajectories, personal profiles, credentials, or real MySQL access.

## P5-I10 DigitalTwinPage state wiring audit

P5-I10 added project-authored frontend TypeScript only: `frontend/src/pages/digitalTwinState.ts`, DigitalTwinPage wiring, and DigitalTwinPage tests. It reused existing dependencies, existing synthetic API contracts, and Node built-in tests. It did not add npm packages, Python packages, Docker images, external services, paid tools, real video, real mall material, real maps, real floor plans, face images, member identifiers, phone numbers, personal trajectories, personal profiles, credentials, or real MySQL access.

## P5-I11 CP5 closure review audit

P5-I11 added project-authored documentation only: `docs/CP5_CLOSURE_REVIEW.md` and handoff updates. It reused existing dependencies and did not add npm packages, Python packages, Docker images, external services, paid tools, model weights, datasets, real video, real mall material, real maps, real floor plans, face images, member identifiers, phone numbers, personal trajectories, personal profiles, credentials, or real MySQL access.

## P6-I2 AI service implementation audit

P6-I2 added Python dependencies for AI services implementation:

| Name | Source | Version | License | Use | Cost/account | Decision |
| --- | --- | --- | --- | --- | --- | --- |
| FastAPI | https://github.com/fastapi/fastapi | 0.136.3 | MIT | AI services API framework | No known paid account requirement | Allowed |
| Uvicorn | https://github.com/encode/uvicorn | 0.48.0 | BSD-3-Clause | ASGI server for AI services | No known paid account requirement | Allowed |
| Pydantic | https://github.com/pydantic/pydantic | 2.13.4 | MIT | Data validation for AI services | No known paid account requirement | Allowed |
| opencv-python-headless | https://github.com/opencv/opencv-python | 4.13.0.92 | Apache-2.0 | Person detection using HOG descriptor | No known paid account requirement | Allowed |
| NumPy | https://github.com/numpy/numpy | 2.4.6 | BSD-3-Clause | Numerical computing for AI services | No known paid account requirement | Allowed |
| HTTPX | https://github.com/encode/httpx | 0.28.1 | BSD-3-Clause | HTTP client for backend communication | No known paid account requirement | Allowed |
| Pytest | https://github.com/pytest-dev/pytest | 9.0.3 | MIT | AI services test runner | No known paid account requirement | Allowed |
| pytest-asyncio | https://github.com/pytest-dev/pytest-asyncio | 1.3.0 | Apache-2.0 | Async test support | No known paid account requirement | Allowed |
| python-multipart | https://github.com/andrew-d/python-multipart | 0.0.29 | Apache-2.0 | File upload support | No known paid account requirement | Allowed |

P6-I2 also uses OpenCV's built-in HOG person detector (Apache 2.0 license, no external model weights required) and project-authored synthetic video generator (MIT license). No real video, monitoring footage, face images, personal data, paid services, or external accounts are added.

## P7-I1 3D stack and Blender MCP audit

P7-I1 added documentation only in `docs/P7_3D_STACK_AUDIT.md`. It did not install BlenderMCP, `three`, `@react-three/fiber`, `@react-three/drei`, model files, texture files, fonts, icons, datasets, external services, or paid APIs.

BlenderMCP / `ahujasid/blender-mcp` is recorded as a candidate local automation bridge, not an adopted runtime dependency. GitHub metadata checked on 2026-05-25 reports MIT License. The README describes a Blender add-on socket server plus MCP server and explicitly includes arbitrary Blender Python execution, telemetry controls, and optional external asset/generation integrations. Therefore the project decision is: candidate accepted for controlled local use only after explicit user approval; telemetry must be disabled; external asset APIs and downloaded models remain blocked until separate audit.

Web 3D candidates remain `three`, `@react-three/fiber`, and optional `@react-three/drei`, but they are not installed in P7-I1. Exact npm versions, license fields, transitive dependency risk, bundle impact, and quality-gate behavior must be verified before adoption.
