# Third Party Notices

This file records third-party resources currently referenced by project deliverables. Add every new dependency, model, font, icon set, image, video, template, dataset, copied code snippet, or external service before marking a task complete.

## Current Records

| Name | Source | Version | License | Use | Commercial-use status | Attribution / obligation | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Touying | https://typst.app/universe/package/touying/ | 0.7.3 | MIT | Typst slide framework and Metropolis theme for `slides/project-intro.typ` | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| Noto Sans CJK | https://github.com/notofonts/noto-cjk | System font | SIL Open Font License 1.1 | Recommended Chinese font for slide compilation | OFL generally permits use, modification, and redistribution under its terms | Preserve font license; do not sell font by itself | Allowed |
| Inter | https://github.com/rsms/inter | System font | SIL Open Font License 1.1 | Recommended Latin UI font fallback for slide compilation | OFL generally permits use, modification, and redistribution under its terms | Preserve font license; do not sell font by itself | Allowed |
| Roboto | https://github.com/googlefonts/roboto-2 | System font | Apache License 2.0 | Latin font fallback for slide compilation | Apache-2.0 generally permits commercial use with notice requirements | Preserve license and notice if distributing font files | Allowed |
| Slidev | https://github.com/slidevjs/slidev | 52.15.1 | MIT | Markdown-based presentation framework for `slides/slidev` | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| @slidev/theme-default | https://www.npmjs.com/package/@slidev/theme-default | 0.25.0 | MIT | Default Slidev theme used by `slides/slidev/slides.md` | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| React | https://github.com/facebook/react | 19.2.6 | MIT | Frontend UI runtime for `frontend/` | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| React DOM | https://github.com/facebook/react | 19.2.6 | MIT | React DOM renderer for `frontend/` | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| React Router DOM | https://github.com/remix-run/react-router | 7.15.0 | MIT | Client-side route placeholders and navigation for `frontend/` | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| Motion | https://motion.dev/ and https://www.npmjs.com/package/motion | 12.38.0 | MIT | Lightweight React animation primitives for restrained page, panel, and state transitions in `frontend/` | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| Framer Motion | https://github.com/motiondivision/motion | 12.38.0 | MIT | Transitive runtime dependency of Motion for React animations | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| Motion DOM | https://github.com/motiondivision/motion | 12.38.0 | MIT | Transitive runtime dependency of Motion for DOM animation primitives | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| Motion Utils | https://github.com/motiondivision/motion | 12.36.0 | MIT | Transitive runtime dependency of Motion utility helpers | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| tslib | https://github.com/microsoft/tslib | 2.8.1 | 0BSD | Transitive runtime helper dependency of Motion | 0BSD generally permits commercial use with minimal obligations | Preserve package license notice when distributing dependencies | Allowed |
| Vite | https://github.com/vitejs/vite | 7.3.3 | MIT | Frontend dev server and production build tool for `frontend/` | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| TypeScript | https://github.com/microsoft/TypeScript | 5.9.3 | Apache-2.0 | Type checking and frontend build gate for `frontend/` | Apache-2.0 generally permits commercial use with notice requirements | Preserve license and notice | Allowed |
| @types/react | https://github.com/DefinitelyTyped/DefinitelyTyped | 19.2.14 | MIT | TypeScript type definitions for React | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| @types/react-dom | https://github.com/DefinitelyTyped/DefinitelyTyped | 19.2.3 | MIT | TypeScript type definitions for React DOM | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| @types/node | https://github.com/DefinitelyTyped/DefinitelyTyped | 24.12.3 | MIT | TypeScript type definitions for Node APIs used by tests/config | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| ripgrep | https://github.com/BurntSushi/ripgrep | 15.1.0 | Unlicense OR MIT | Local developer quality gate keyword scanning via `scripts/quality-gate.mjs`; not bundled into frontend runtime | Unlicense/MIT generally permit commercial use | Preserve license notice if redistributed; CI installation source must be reviewed before use | Allowed for local checks |
| GitHub Actions | https://docs.github.com/actions | Hosted CI service | GitHub service terms | GitHub-side CI runner for `.github/workflows/ci.yml`; runs root quality gate and npm audit | Public repositories generally have free hosted-runner use; private repositories or overage may require account/billing review | Requires GitHub account and service terms; do not put secrets or personal data into logs | Allowed for GitHub-side CI |
| actions/checkout | https://github.com/actions/checkout | 6.0.2 | MIT | Official GitHub Action for repository checkout in CI | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| actions/setup-node | https://github.com/actions/setup-node | 6.4.0 | MIT | Official GitHub Action for Node 24 setup and npm cache in CI | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| actions/setup-python | https://github.com/actions/setup-python | 6.2.0 | MIT | Official GitHub Action for Python 3.13 setup and pip cache in CI | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| FastAPI | https://github.com/fastapi/fastapi | 0.136.1 | MIT | Backend API framework for `backend/` health endpoint and future `/api/v1` implementation | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| Starlette | https://github.com/Kludex/starlette | 1.0.0 | BSD-3-Clause | ASGI toolkit used by FastAPI | BSD-3-Clause generally permits commercial use with license notice | Preserve copyright and license notice | Allowed |
| Pydantic | https://github.com/pydantic/pydantic | 2.13.4 | MIT | Backend response schema validation and settings model | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| Uvicorn | https://github.com/encode/uvicorn | 0.47.0 | BSD-3-Clause | Local ASGI server for backend development | BSD-3-Clause generally permits commercial use with license notice | Preserve copyright and license notice | Allowed |
| Pytest | https://github.com/pytest-dev/pytest | 9.0.3 | MIT | Backend test runner for P4-I2 health and contract tests | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| HTTPX | https://github.com/encode/httpx | 0.28.1 | BSD-3-Clause | Test client dependency used by FastAPI/Starlette tests | BSD-3-Clause generally permits commercial use with license notice | Preserve copyright and license notice | Allowed |
| SQLAlchemy | https://www.sqlalchemy.org/ and https://github.com/sqlalchemy/sqlalchemy | 2.0.49 | MIT | SQL table metadata baseline for P4-I3 MySQL migration planning | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| Alembic | https://alembic.sqlalchemy.org/ and https://github.com/sqlalchemy/alembic | 1.18.4 | MIT | Offline-first migration runner for P4-I3 MySQL schema baseline | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| PyMySQL | https://github.com/PyMySQL/PyMySQL | 1.1.3 | MIT | Pure Python MySQL driver reserved for future MySQL connection; not used against a real DB in P4-I3 | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| Greenlet | https://greenlet.readthedocs.io/ | 3.5.0 | MIT AND PSF-2.0 | SQLAlchemy runtime dependency | MIT/PSF generally permit commercial use with license notice | Preserve license notice | Allowed |
| Mako | https://www.makotemplates.org/ | 1.3.12 | MIT | Alembic template dependency | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| MarkupSafe | https://github.com/pallets/markupsafe | 3.0.3 | BSD-3-Clause | Mako transitive dependency | BSD-3-Clause generally permits commercial use with license notice | Preserve copyright and license notice | Allowed |

P3-I4 note: `docs/DEPLOYMENT_PLAN.md` is a project-authored deployment planning document. P3-I4 does not add Docker images, database services, cloud services, scanners, npm packages, fonts, images, videos, models, datasets, or external accounts, so no new third-party runtime record is added for this increment.

P4-I2 note: `backend/requirements.txt` adds direct Python dependencies for the minimal FastAPI health service and tests only. No MySQL driver, Docker image, AI model, video fixture, external API, paid service, real mall material, or personal data source is added in this increment.

P4-I3 note: SQLAlchemy, Alembic, and PyMySQL are added for MySQL migration baseline work. P4-I3 still does not connect to a real MySQL server, create Docker images, add AI models, use video fixtures, call external APIs, or process real mall/personal data.

P4-I12 note: store alerts API/client work reuses existing dependencies and adds only project-authored synthetic fixture values. No new third-party package, model, media asset, external service, paid account, real mall material, personal profile, or real MySQL access is added.

P4-I13 note: customer profile API/client work reuses existing dependencies and adds only project-authored anonymous synthetic aggregate fixture values. No new third-party package, model, media asset, external service, paid account, real mall material, personal profile, or real MySQL access is added.

P4-I14 note: heatmap API/client work reuses existing dependencies and adds only project-authored synthetic aggregate fixture values. No new third-party package, model, media asset, map, floor plan, external service, paid account, real mall material, personal trajectory, or real MySQL access is added.

P4-I15 note: trajectories API/client work reuses existing dependencies and adds only project-authored anonymous synthetic aggregate fixture values. No new third-party package, model, media asset, map, floor plan, external service, paid account, real mall material, personal trajectory, or real MySQL access is added.

P4-I16 note: CP4 closure review and MySQL readiness planning add project-authored documentation only. No new third-party package, model, media asset, Docker image, database service, external service, paid account, real mall material, personal trajectory, credential, or real MySQL access is added.

## Blocked Until Reviewed

Do not use the following unless the source, permission, and license have been reviewed and recorded:

```text
paid development tools, paid SaaS, paid APIs, paid model services, paid assets
real mall maps, floor plans, BIM files, tenant layouts, or survey data
brand logos, merchant logos, shop signs, or trademarked product imagery
surveillance footage, real customer photos, face images, or identifiable personal data
scraped web images, videos, icons, templates, or copied code snippets
unknown model weights, unclear datasets, or Non-Commercial media
GPL/LGPL/AGPL dependencies in distributed product code
```
