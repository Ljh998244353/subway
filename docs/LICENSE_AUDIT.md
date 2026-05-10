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

## 3. P0 结论

P0 创建 Markdown 文档和 context 文件，未新增第三方依赖、模型、媒体、字体、图标、数据集或外部服务。后续新增的 Slidev 演示稿已在本文件和 `docs/THIRD_PARTY_NOTICES.md` 记录。

## 4. 后续动作

| 阶段 | 审计重点 |
| --- | --- |
| P1 | 设计图标、字体、颜色来源；禁止未授权真实素材 |
| P2 | 前端依赖、图表库、3D 库、图标库、Mock 数据来源 |
| P3 | 工程化工具、CI、Docker 镜像和扫描工具许可证 |
| P4 | Python 后端依赖、数据库、缓存、迁移工具许可证 |
| P6 | AI 模型、视频 fixture、检测/追踪库、数据集许可证 |
| P11 | 部署平台、监控组件、日志组件和外部服务条款 |
