# 设计 Token

更新时间：2026-05-10

## 1. 文档定位

本文是 `P1-I2 design tokens and layout rules` 的设计输出之一，用于固定前端 Demo 的基础视觉变量。P2 实现 React + TypeScript + Vite 前端时，应优先把本文 token 转成 CSS variables 或 TypeScript token 对象。

本文不引入新字体文件、图标库、图片、视频或外部素材。字体优先使用系统字体和已记录的 Noto / Inter / Roboto 备选；后续若新增字体、图标库或素材，必须更新 `docs/THIRD_PARTY_NOTICES.md` 和 `docs/LICENSE_AUDIT.md`。

## 2. 设计原则

| 原则 | 规则 |
| --- | --- |
| 运营优先 | 页面应像高密度工作台，不做营销式大标题和装饰性首屏 |
| 浅色基调 | 默认浅色背景，减少深色大面积压迫感，适合长期巡检 |
| 多色但克制 | 中性色为主体，青绿、蓝、琥珀、红、紫只用于分类和状态 |
| 状态可读 | 告警、异常和权限不能只靠颜色表达，必须配合图标、文字或形状 |
| 图表一致 | 同类指标跨页面使用同一色板，避免用户重新学习 |
| 稳定布局 | 字号不随 viewport 缩放；关键卡片、工具栏、图表容器有稳定尺寸约束 |

## 3. 命名规则

Token 命名采用语义优先，避免直接在组件中使用裸色值。

```text
--color-bg-page
--color-bg-surface
--color-text-primary
--space-4
--radius-card
--shadow-popover
--chart-traffic
--status-danger-bg
```

组件可以使用派生 token，但不得直接复制第三方设计系统变量名。

## 4. 颜色 Token

### 4.1 中性色

| Token | 值 | 用途 |
| --- | --- | --- |
| `--color-bg-page` | `#F6F8FB` | 页面背景 |
| `--color-bg-surface` | `#FFFFFF` | 卡片、面板、表格背景 |
| `--color-bg-subtle` | `#EEF3F7` | 次级块、筛选条、空态背景 |
| `--color-bg-elevated` | `#FFFFFF` | 弹层、菜单、详情浮层 |
| `--color-border-soft` | `#DDE5ED` | 卡片和列表分隔 |
| `--color-border-strong` | `#B8C6D4` | 输入、激活边框 |
| `--color-text-primary` | `#1B2733` | 主要文字 |
| `--color-text-secondary` | `#536272` | 次要文字 |
| `--color-text-muted` | `#7B8A9A` | 说明、单位、空态辅助文字 |
| `--color-text-inverse` | `#FFFFFF` | 深色按钮或标签文字 |

### 4.2 品牌与强调色

| Token | 值 | 用途 |
| --- | --- | --- |
| `--color-brand` | `#147D8F` | 主按钮、导航激活、关键链接 |
| `--color-brand-hover` | `#0E6B79` | 主按钮 hover |
| `--color-brand-soft` | `#E4F5F7` | 主色浅背景 |
| `--color-accent-blue` | `#2868C7` | 客流、趋势、可点击指标 |
| `--color-accent-green` | `#2E8B57` | 正向趋势、正常状态 |
| `--color-accent-amber` | `#C77A12` | 关注、延迟、处理中 |
| `--color-accent-red` | `#C94343` | 高危告警、错误 |
| `--color-accent-purple` | `#6B5BBE` | 画像、业态聚合、辅助分类 |

### 4.3 状态色

状态色必须配合文字、图标、边框样式或标识点使用。

| 状态 | 背景 | 边框 | 文本 | 适用场景 |
| --- | --- | --- | --- | --- |
| Success | `#E6F4EC` | `#A8D9BC` | `#1F6B3D` | 正常、已处理、指标改善 |
| Info | `#E8F1FC` | `#B8D3F3` | `#235A9E` | 信息提示、Mock/API 模式 |
| Warning | `#FFF3D9` | `#E8C16D` | `#8A5600` | 关注、延迟、C 级店铺 |
| Danger | `#FCE7E7` | `#E7A4A4` | `#9E2B2B` | 高危告警、D 级店铺、数据异常 |
| Neutral | `#EEF3F7` | `#CAD6E2` | `#536272` | 空态、禁用、未知 |

### 4.4 评分等级色

| 等级 | 范围 | 主色 | 背景 | 辅助标识 |
| --- | --- | --- | --- | --- |
| A | 85-100 | `#2E8B57` | `#E6F4EC` | `A / 优` |
| B | 70-84 | `#2868C7` | `#E8F1FC` | `B / 稳` |
| C | 55-69 | `#C77A12` | `#FFF3D9` | `C / 关` |
| D | 0-54 | `#C94343` | `#FCE7E7` | `D / 警` |

## 5. 图表色板

### 5.1 指标语义色

| Token | 值 | 指标 |
| --- | --- | --- |
| `--chart-traffic` | `#2868C7` | 客流、进入人数、楼层流量 |
| `--chart-dwell` | `#6B5BBE` | 停留、画像、偏好 |
| `--chart-conversion` | `#147D8F` | 转化率、经营效率 |
| `--chart-score` | `#2E8B57` | 评分、健康度 |
| `--chart-alert` | `#C94343` | 告警、异常 |
| `--chart-baseline` | `#8FA1B3` | 基准线、历史对比 |

### 5.2 分类色板

用于业态、楼层或来源分类。单张图优先使用 5 色以内。

```text
#2868C7
#147D8F
#2E8B57
#C77A12
#6B5BBE
#C94343
#64748B
```

### 5.3 热力色板

热力图用于自绘楼层，不表达个人轨迹。

| 强度 | 颜色 | 透明度建议 |
| --- | --- | --- |
| Low | `#8ECFDB` | 0.22 |
| Medium | `#F0C85A` | 0.34 |
| High | `#E76F51` | 0.46 |
| Critical | `#C94343` | 0.58 |

## 6. 字体 Token

### 6.1 字体栈

不随项目分发字体文件时，使用系统字体栈：

```css
font-family:
  Inter,
  "Noto Sans CJK SC",
  "Noto Sans SC",
  Roboto,
  "PingFang SC",
  "Microsoft YaHei",
  Arial,
  sans-serif;
```

说明：Inter、Noto Sans CJK、Roboto 已在第三方声明和许可证审计中记录为推荐或系统字体备选；P2 若打包字体文件，必须重新审计实际文件来源和许可证。

### 6.2 字号与行高

字号不使用 viewport width 缩放。

| Token | 字号 | 行高 | 用途 |
| --- | --- | --- | --- |
| `--font-size-11` | 11px | 16px | 小标签、图表轴 |
| `--font-size-12` | 12px | 18px | 辅助说明、表格次要信息 |
| `--font-size-13` | 13px | 20px | 表格、列表、筛选控件 |
| `--font-size-14` | 14px | 22px | 默认正文 |
| `--font-size-16` | 16px | 24px | 小标题、重点数值单位 |
| `--font-size-20` | 20px | 28px | 页面标题、卡片主数值 |
| `--font-size-24` | 24px | 32px | 总览关键数字 |
| `--font-size-32` | 32px | 40px | 大屏主 KPI 数字 |

### 6.3 字重

| Token | 值 | 用途 |
| --- | --- | --- |
| `--font-weight-regular` | 400 | 正文 |
| `--font-weight-medium` | 500 | 标签、按钮、表格表头 |
| `--font-weight-semibold` | 600 | 标题、关键指标 |
| `--font-weight-bold` | 700 | 少量主 KPI |

字距固定为 `0`，不要使用负字距。

## 7. 间距 Token

使用 4px 基准栅格。

| Token | 值 | 用途 |
| --- | --- | --- |
| `--space-2` | 2px | 细微间隔 |
| `--space-4` | 4px | 图标与文字 |
| `--space-6` | 6px | 紧凑列表 |
| `--space-8` | 8px | 小控件内边距 |
| `--space-12` | 12px | 卡片内容间隔 |
| `--space-16` | 16px | 常规卡片内边距 |
| `--space-20` | 20px | 页面区块间距 |
| `--space-24` | 24px | 大区块间距 |
| `--space-32` | 32px | 页面顶部和主要分区 |

## 8. 圆角、边框和阴影

| Token | 值 | 用途 |
| --- | --- | --- |
| `--radius-2` | 2px | 小标签、状态点 |
| `--radius-4` | 4px | 输入、按钮、表格行 hover |
| `--radius-card` | 8px | 卡片、面板、弹窗 |
| `--radius-pill` | 999px | 徽标、segmented control |
| `--border-width` | 1px | 默认边框 |
| `--shadow-card` | `0 1px 2px rgba(27, 39, 51, 0.06)` | 卡片轻阴影 |
| `--shadow-popover` | `0 12px 28px rgba(27, 39, 51, 0.14)` | 弹层 |
| `--shadow-focus` | `0 0 0 3px rgba(20, 125, 143, 0.22)` | 焦点环 |

卡片圆角不得超过 8px，除非是徽标或 pill 控件。

## 9. 尺寸 Token

| Token | 值 | 用途 |
| --- | --- | --- |
| `--topbar-height` | 56px | 顶部栏 |
| `--sidebar-width` | 216px | 桌面侧边导航 |
| `--sidebar-collapsed-width` | 64px | 折叠导航 |
| `--content-max-width` | 1920px | 常规内容宽度 |
| `--metric-card-min-height` | 108px | KPI 卡 |
| `--chart-card-min-height` | 280px | 普通图表卡 |
| `--table-row-height` | 44px | 表格行 |
| `--control-height` | 32px | 默认控件 |
| `--control-height-sm` | 28px | 紧凑控件 |
| `--icon-size` | 18px | 常规图标 |

固定格式 UI 元素必须设置 `min-height`、`aspect-ratio` 或栅格约束，避免动态内容导致布局跳动。

## 10. 交互 Token

| Token | 值 | 用途 |
| --- | --- | --- |
| `--duration-fast` | 120ms | hover、focus |
| `--duration-normal` | 180ms | 面板切换、筛选反馈 |
| `--duration-slow` | 260ms | 弹层进入、页面局部过渡 |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | 常规动画 |
| `--ease-emphasis` | `cubic-bezier(0.2, 0, 0, 1.2)` | 少量强调 |

动画只用于状态变化、筛选反馈、图表进入和空间视图高亮，不做无意义循环装饰。尊重 `prefers-reduced-motion`。

## 11. 可访问性 Token

| Token | 值 | 用途 |
| --- | --- | --- |
| `--focus-ring` | `0 0 0 3px rgba(20, 125, 143, 0.22)` | 键盘焦点 |
| `--focus-border` | `#147D8F` | 输入和可点击容器 |
| `--disabled-opacity` | 0.46 | 禁用状态 |
| `--overlay-scrim` | `rgba(27, 39, 51, 0.36)` | 模态遮罩 |

最低要求：

```text
正文与背景对比度 >= 4.5:1
大号关键数字与背景对比度 >= 3:1
状态不能只依赖颜色
所有可交互控件有可见焦点
```

## 12. CSS 变量草案

P2 可以把以下片段作为起点，但实现时仍需按实际组件拆分。

```css
:root {
  --color-bg-page: #f6f8fb;
  --color-bg-surface: #ffffff;
  --color-bg-subtle: #eef3f7;
  --color-border-soft: #dde5ed;
  --color-border-strong: #b8c6d4;
  --color-text-primary: #1b2733;
  --color-text-secondary: #536272;
  --color-text-muted: #7b8a9a;
  --color-brand: #147d8f;
  --color-brand-hover: #0e6b79;
  --color-brand-soft: #e4f5f7;
  --color-accent-blue: #2868c7;
  --color-accent-green: #2e8b57;
  --color-accent-amber: #c77a12;
  --color-accent-red: #c94343;
  --color-accent-purple: #6b5bbe;
  --radius-card: 8px;
  --topbar-height: 56px;
  --sidebar-width: 216px;
  --control-height: 32px;
}
```

## 13. P1-I2 Token 检查清单

```text
已定义浅色调基础色
已定义多色但克制的状态和图表色板
已定义字体栈、字号、行高和字重
已定义间距、圆角、边框、阴影和尺寸
已定义交互、焦点和可访问性 token
未引入新字体文件、图标库、图片、视频或外部素材
未创建 frontend/
未创建 backend/
未创建 ai-services/
未创建 infra/
```
