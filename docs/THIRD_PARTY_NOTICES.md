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
