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
| Motion | https://motion.dev/ and https://www.npmjs.com/package/motion | 12.38.0 | MIT | Lightweight React animation primitives for restrained page, panel, and state transitions in `frontend/` | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| Framer Motion | https://github.com/motiondivision/motion | 12.40.0 | MIT | Direct P7-R7 animation runtime for the Next.js Digital Twin OS panels, tabs, feeds, and transitions | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| Motion DOM | https://github.com/motiondivision/motion | 12.38.0 | MIT | Transitive runtime dependency of Motion for DOM animation primitives | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| Motion Utils | https://github.com/motiondivision/motion | 12.36.0 | MIT | Transitive runtime dependency of Motion utility helpers | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| tslib | https://github.com/microsoft/tslib | 2.8.1 | 0BSD | Transitive runtime helper dependency of Motion | 0BSD generally permits commercial use with minimal obligations | Preserve package license notice when distributing dependencies | Allowed |
| Next.js | https://github.com/vercel/next.js | 16.2.6 | MIT | P7-R7 active frontend framework, App Router, dev server, and production build for `frontend/` | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| Tailwind CSS | https://github.com/tailwindlabs/tailwindcss | 4.3.0 | MIT | P7-R7 utility styling system for the Next.js Digital Twin OS | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| @tailwindcss/postcss | https://github.com/tailwindlabs/tailwindcss | 4.3.0 | MIT | Tailwind CSS v4 PostCSS integration for Next.js global styles | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| PostCSS | https://github.com/postcss/postcss | 8.5.15 | MIT | CSS transform pipeline used by Tailwind CSS and Next.js | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| TypeScript | https://github.com/microsoft/TypeScript | 5.9.3 | Apache-2.0 | Type checking and frontend build gate for `frontend/` | Apache-2.0 generally permits commercial use with notice requirements | Preserve license and notice | Allowed |
| @types/react | https://github.com/DefinitelyTyped/DefinitelyTyped | 19.2.14 | MIT | TypeScript type definitions for React | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| @types/react-dom | https://github.com/DefinitelyTyped/DefinitelyTyped | 19.2.3 | MIT | TypeScript type definitions for React DOM | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| @types/node | https://github.com/DefinitelyTyped/DefinitelyTyped | 24.12.3 | MIT | TypeScript type definitions for Node APIs used by tests/config | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| ripgrep | https://github.com/BurntSushi/ripgrep | 15.1.0 | Unlicense OR MIT | Local developer quality gate keyword scanning via `scripts/quality-gate.mjs`; not bundled into frontend runtime | Unlicense/MIT generally permit commercial use | Preserve license notice if redistributed; CI installation source must be reviewed before use | Allowed for local checks |
| Blender | https://www.blender.org/ | Tool decision only; not bundled | GPL-3.0-or-later | Free 3D modeling tool for self-authored synthetic mall assets and possible GLB/GLTF export | Blender may be used commercially; project-authored output assets are not automatically GPL solely because Blender created them | Do not redistribute Blender binaries without preserving GPL obligations; record any add-ons/assets separately | Allowed as current free modeling tool |
| BlenderMCP / blender-mcp | Local copy at `L:\\Software\\blender-mcp`; upstream https://github.com/ahujasid/blender-mcp | README label 1.5.5 | MIT License per project metadata | Local MCP bridge for controlled Blender automation of self-authored synthetic mall geometry and GLB export helpers | MIT generally permits commercial use, but the tool can run Blender Python and includes telemetry/external asset tool paths | Preserve MIT license notice if redistributed; disable telemetry; localhost-only; do not use Sketchfab, Poly Haven, Hyper3D, Hunyuan3D, Rodin, Fal, downloaded models, or external texture/model APIs without separate audit | Allowed for controlled local use after user approval; dependency setup incomplete in WSL |
| GitHub Actions | https://docs.github.com/actions | Hosted CI service | GitHub service terms | GitHub-side CI runner for `.github/workflows/ci.yml`; runs root quality gate and npm audit | Public repositories generally have free hosted-runner use; private repositories or overage may require account/billing review | Requires GitHub account and service terms; do not put secrets or personal data into logs | Allowed for GitHub-side CI |
| actions/checkout | https://github.com/actions/checkout | 6.0.2 | MIT | Official GitHub Action for repository checkout in CI | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| actions/setup-node | https://github.com/actions/setup-node | 6.4.0 | MIT | Official GitHub Action for Node 24 setup and npm cache in CI | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| actions/setup-python | https://github.com/actions/setup-python | 6.2.0 | MIT | Official GitHub Action for Python 3.13 setup and pip cache in CI | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| three | https://github.com/mrdoob/three.js | 0.184.0 | MIT | P7-I3 minimal WebGL renderer baseline for `/digital-twin` synthetic scene shell | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| @react-three/fiber | https://github.com/pmndrs/react-three-fiber | 9.6.1 | MIT | P7-I3 React renderer binding for Three.js scene shell | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| @types/three | https://github.com/DefinitelyTyped/DefinitelyTyped | 0.184.1 | MIT | TypeScript declarations required for Three.js/R3F build | MIT generally permits commercial use with license notice | Preserve license notice | Allowed as dev dependency |
| @react-three/drei | https://github.com/pmndrs/drei | 10.7.7 | MIT | GLB loading helpers, HTML labels, and OrbitControls support in `/digital-twin` | MIT generally permits commercial use with license notice | Preserve license notice | Allowed for audited self-authored GLB loading |
| Self-authored synthetic F2 mall GLB | `frontend/public/models/mall_floor_f2.glb`; source `assets/blender/mall_floor_f2.blend`; script `scripts/blender/export_mall_floor_f2.py` | P7-R2 generated asset | Project-authored asset | Synthetic F2 mall floor model with `Store_S021` through `Store_S040`, atrium, escalators, kiosks, lights, signage, and generic materials | Commercial-use status depends on project ownership; no external models/textures/real brands used | Keep source/export script for provenance; do not replace with real mall or external assets without audit | Allowed |
| @babel/runtime | https://github.com/babel/babel | 7.29.7 | MIT | Transitive runtime dependency of R3F | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| @types/webxr | https://github.com/DefinitelyTyped/DefinitelyTyped | 0.5.24 | MIT | Transitive type dependency for WebXR/Three.js typings | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| base64-js | https://github.com/beatgammit/base64-js | 1.5.1 | MIT | Transitive dependency of R3F buffer support | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| buffer | https://github.com/feross/buffer | 6.0.3 | MIT | Transitive dependency of R3F/browser buffer support | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| ieee754 | https://github.com/feross/ieee754 | 1.2.1 | BSD-3-Clause | Transitive dependency of buffer | BSD-3-Clause generally permits commercial use with notice | Preserve copyright and license notice | Allowed |
| its-fine | https://github.com/pmndrs/its-fine | 2.0.0 | MIT | Transitive React utility dependency of R3F | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| @types/react-reconciler | https://github.com/DefinitelyTyped/DefinitelyTyped | 0.28.9 | MIT | Transitive type dependency of its-fine/R3F | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| react-use-measure | https://github.com/pmndrs/react-use-measure | 2.1.7 | MIT | Transitive measurement hook dependency of R3F | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| scheduler | https://github.com/facebook/react | 0.27.0 | MIT | Transitive React scheduling dependency of R3F | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| suspend-react | https://github.com/pmndrs/suspend-react | 0.1.3 | MIT | Transitive async/suspense utility dependency of R3F | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| use-sync-external-store | https://github.com/facebook/react | 1.6.0 | MIT | Transitive React external-store compatibility dependency of R3F | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| zustand | https://github.com/pmndrs/zustand | 5.0.13 | MIT | Direct P7-R7 lightweight client coordination store plus R3F ecosystem dependency | MIT generally permits commercial use with license notice | Preserve license notice | Allowed |
| @dimforge/rapier3d-compat | https://github.com/dimforge/rapier.js | 0.12.0 | Apache-2.0 | Transitive dev/type dependency of @types/three; not used as a runtime physics feature in P7-I3 | Apache-2.0 generally permits commercial use with notice | Preserve license and notice | Allowed as transitive dev dependency |
| @tweenjs/tween.js | https://github.com/tweenjs/tween.js | 23.1.3 | MIT | Transitive type dependency of @types/three examples typings | MIT generally permits commercial use with license notice | Preserve license notice | Allowed as transitive dev dependency |
| @types/stats.js | https://github.com/DefinitelyTyped/DefinitelyTyped | 0.17.4 | MIT | Transitive type dependency of @types/three | MIT generally permits commercial use with license notice | Preserve license notice | Allowed as transitive dev dependency |
| fflate | https://github.com/101arrowz/fflate | 0.8.3 | MIT | Transitive dependency of @types/three example typings | MIT generally permits commercial use with license notice | Preserve license notice | Allowed as transitive dev dependency |
| meshoptimizer | https://github.com/zeux/meshoptimizer | 1.1.1 | MIT | Transitive dependency of @types/three example typings; no model optimization feature used in P7-I3 | MIT generally permits commercial use with license notice | Preserve license notice | Allowed as transitive dev dependency |
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

P5-I1 note: overview data loader work adds project-authored frontend TypeScript and Node built-in tests only. It reuses existing dependencies and does not add third-party packages, models, media assets, Docker images, database services, external services, paid accounts, real mall material, personal trajectories, credentials, or real MySQL access.

P5-I2 note: dashboard API-mode state wiring adds project-authored frontend TypeScript and Node built-in tests only. It reuses existing dependencies and does not add third-party packages, models, media assets, Docker images, database services, external services, paid accounts, real mall material, personal trajectories, credentials, or real MySQL access.

P5-I3 note: Store Analysis data loader work adds project-authored frontend TypeScript and Node built-in tests only. It reuses existing dependencies and does not add third-party packages, models, media assets, Docker images, database services, external services, paid accounts, real mall material, personal trajectories, credentials, or real MySQL access.

P5-I4 note: StoreAnalysisPage API-mode state wiring adds project-authored frontend TypeScript and Node built-in tests only. It reuses existing dependencies and does not add third-party packages, models, media assets, Docker images, database services, external services, paid accounts, real mall material, personal trajectories, credentials, or real MySQL access.

P5-I5 note: Store Alerts API-mode loader contract adds project-authored frontend TypeScript and Node built-in tests only. It reuses existing dependencies and does not add third-party packages, models, media assets, Docker images, database services, external services, paid accounts, real mall material, personal trajectories, credentials, or real MySQL access.

P5-I6 note: StoreAlertsPage API-mode state wiring adds project-authored frontend TypeScript and Node built-in tests only. It reuses existing dependencies and does not add third-party packages, models, media assets, Docker images, database services, external services, paid accounts, real mall material, personal trajectories, credentials, or real MySQL access.

P5-I7 note: Customer Profile API-mode loader contract adds project-authored frontend TypeScript and Node built-in tests only. It reuses existing dependencies and does not add third-party packages, models, media assets, Docker images, database services, external services, paid accounts, real mall material, personal trajectories, credentials, or real MySQL access.

P5-I8 note: CustomerProfilePage API-mode state wiring adds project-authored frontend TypeScript and Node built-in tests only. It reuses existing dependencies and does not add third-party packages, models, media assets, Docker images, database services, external services, paid accounts, real mall material, personal trajectories, credentials, or real MySQL access.

P5-I9 note: Digital Twin API-mode loader contract adds project-authored frontend TypeScript and Node built-in tests only. It reuses existing dependencies and existing synthetic heatmap/trajectory contracts. It does not add third-party packages, models, media assets, maps, floor plans, Docker images, database services, external services, paid accounts, real mall material, personal trajectories, credentials, or real MySQL access.

P5-I10 note: DigitalTwinPage API-mode state wiring adds project-authored frontend TypeScript and Node built-in tests only. It reuses existing dependencies and existing synthetic heatmap/trajectory contracts. It does not add third-party packages, models, media assets, maps, floor plans, Docker images, database services, external services, paid accounts, real mall material, personal trajectories, credentials, or real MySQL access.

P5-I11 note: CP5 closure review adds project-authored documentation only. It reuses existing dependencies and does not add third-party packages, models, datasets, media assets, maps, floor plans, Docker images, database services, external services, paid accounts, real mall material, personal trajectories, credentials, or real MySQL access.

P6-I2 note: AI service implementation adds Python dependencies for FastAPI, OpenCV, NumPy, and testing. All dependencies have permissive licenses (MIT, Apache-2.0, BSD). OpenCV HOG person detector uses built-in descriptor (Apache 2.0 license, no external model weights). Synthetic video generator is project-authored (MIT license). No real video, monitoring footage, face images, personal data, paid services, or external accounts are added.

P7-I1 note: `docs/P7_3D_STACK_AUDIT.md` records BlenderMCP / `ahujasid/blender-mcp` as a candidate only. It is not installed, not bundled, and not used yet. The project blocks Sketchfab, Poly Haven, Hyper3D, Hunyuan3D, Rodin, Fal, downloaded models, real mall material, brand assets, and reference images unless a later audit approves them.

P7-I3 note: the frontend adopted only `three@0.184.0`, `@react-three/fiber@9.6.1`, and build-required `@types/three@0.184.1` for a minimal local synthetic WebGL scene shell. No `@react-three/drei`, BlenderMCP, GLB/GLTF files, textures, fonts, icons, external asset APIs, paid services, real mall material, real video, or personal data were added.

P7-R7 note: the active frontend is now a Next.js App Router implementation. `next@16.2.6`, `tailwindcss@4.3.0`, `@tailwindcss/postcss@4.3.0`, `postcss@8.5.15`, `framer-motion@12.40.0`, and direct `zustand@5.0.13` are MIT-licensed and allowed for the synthetic Digital Twin OS. No icon pack, font file, image, downloaded model, external texture, HDRI, paid service, real mall material, real brand asset, real video, personal data, or real MySQL access is added in P7-R7.

P7-R8-V2 note: the temporary BlenderKit Mall Interior preview, rejected five-floor GLB, local Draco decoder copy, and related export/inspection scripts were removed from the active workspace after visual review. The active `/digital-twin` viewport is again a project-authored procedural Three/R3F scene and does not ship the external BlenderKit model.

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
