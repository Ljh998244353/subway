# UI 布局规则

更新时间：2026-05-10

## 1. 文档定位

本文是 `P1-I2 design tokens and layout rules` 的设计输出之一，用于规定 App Shell、页面栅格、卡片密度、响应式断点、共享页面结构和可访问性基础。视觉变量见 `docs/design/DESIGN_TOKENS.md`，页面范围见 `docs/design/SCREEN_LAYOUTS.md`。

本文不创建前端工程，不定义具体 React 组件 API。P1-I3 会继续细化组件和图表规范，P2 才进入前端实现。

## 2. 总体界面性格

本系统是商业综合体运营工作台，第一屏必须直接可用。

```text
不是 landing page
不是营销页
不是装饰性大屏
不是真实商场复刻图
```

界面应满足：

| 方向 | 规则 |
| --- | --- |
| 密度 | 信息密度高但分区清晰，适合日常巡检和反复使用 |
| 视觉 | 浅色背景、明确边界、少量强调色，不使用大面积渐变或装饰图形 |
| 结构 | 顶部栏 + 侧边导航 + 内容栅格 + 详情侧栏 |
| 操作 | 关键筛选固定位置，页面跳转保留上下文 |
| 状态 | 加载、空态、错误、权限不足、数据延迟都有固定表现 |

## 3. App Shell

### 3.1 桌面结构

默认面向 1920x1080 设计，同时兼容 1440px、2560px 和 3840px 宽屏。

```text
┌──────────────────────────────────────────────────────────────┐
│ Topbar 56px                                                   │
├──────────────┬───────────────────────────────────────────────┤
│ Sidebar 216  │ Content                                        │
│              │ Page header                                    │
│              │ Filter bar                                     │
│              │ Main grid                                      │
│              │ Optional detail panel                          │
└──────────────┴───────────────────────────────────────────────┘
```

| 区域 | 尺寸 | 规则 |
| --- | --- | --- |
| Topbar | 56px 高 | 固定在顶部，显示商场、时间、数据模式、刷新状态、用户角色 |
| Sidebar | 216px 宽 | 桌面常驻；宽度不足时可折叠为 64px |
| Content | 剩余宽度 | `max-width: 1920px`，宽屏居中或保持左对齐工作台 |
| Page header | 40-56px 高 | 页面名、筛选摘要、关键操作 |
| Filter bar | 40-48px 高 | 横向排列筛选控件，复杂筛选进入抽屉或弹层 |
| Main grid | 自适应 | 12 列栅格，卡片按页面模板布局 |

### 3.2 Topbar 内容

| 区域 | 内容 | 布局规则 |
| --- | --- | --- |
| 左侧 | 系统名、当前商场 | 文字标识，不使用真实 Logo |
| 中部 | 时间范围、回放时间点、楼层快捷筛选占位 | 控件高度 32px，间距 8px |
| 右侧 | Mock/API 模式、更新时间、数据延迟、用户角色 | 状态必须有文字标签 |

Topbar 只放全局上下文，不放页面主要操作。页面级操作放到 Page header 或 Filter bar。

### 3.3 Sidebar 内容

| 导航项 | 路由 | 徽标规则 |
| --- | --- | --- |
| 运营总览 | `/dashboard` | 未处理高等级告警数 |
| 数字孪生 | `/digital-twin` | 拥挤楼层数 |
| 店铺分析 | `/store-analysis` | C/D 店铺数 |
| 客群画像 | `/customer-profile` | 无徽标 |
| 低效预警 | `/store-alerts` | 未处理告警总数 |

规则：

```text
激活态使用左侧 3px 色条 + 浅色背景 + 加粗文字
徽标使用数字和颜色，不只靠颜色表达
折叠态只显示图标和 tooltip
系统管理在 P2 Demo 可隐藏或禁用显示
```

## 4. 栅格与响应式

### 4.1 断点

| 名称 | 宽度 | 布局 |
| --- | --- | --- |
| `sm` | `< 768px` | 单列，Sidebar 收进抽屉 |
| `md` | `768-1199px` | 单列或 2 列，Topbar 简化 |
| `lg` | `1200-1599px` | 12 列，Sidebar 可折叠 |
| `xl` | `1600-2559px` | 12 列，默认桌面布局 |
| `xxl` | `>= 2560px` | 16 列可选，内容最大宽度限制 |

P2 优先保证 `lg` 和 `xl`，但不能让移动端出现文字重叠或不可访问。

### 4.2 12 列栅格

| 属性 | 值 |
| --- | --- |
| Column count | 12 |
| Gutter | 16px |
| Page padding | 20px at lg/xl, 12px at sm/md |
| Card gap | 16px |
| Section gap | 20px |

常用跨度：

| 组件 | lg/xl 跨度 | md 跨度 | sm 跨度 |
| --- | --- | --- | --- |
| KPI 卡 | 3 columns | 6 columns | 12 columns |
| 大趋势图 | 8 columns | 12 columns | 12 columns |
| 侧栏摘要 | 4 columns | 12 columns | 12 columns |
| 主表格 | 8-9 columns | 12 columns | 12 columns |
| 详情面板 | 3-4 columns | 12 columns | 12 columns |
| 数字孪生画布 | 8-9 columns | 12 columns | 12 columns |

## 5. 卡片和面板规则

### 5.1 卡片使用边界

允许使用卡片的场景：

```text
指标卡
图表容器
列表项
详情面板
工具面板
弹窗和抽屉
```

不允许：

```text
页面 section 作为大浮动卡片
卡片内再套卡片
用装饰卡片堆砌说明文字
为了视觉效果使用大量渐变卡片
```

### 5.2 卡片规格

| 类型 | 内边距 | 最小高度 | 圆角 | 主要内容 |
| --- | --- | --- | --- | --- |
| KPI 卡 | 16px | 108px | 8px | 数字、单位、趋势、状态 |
| 图表卡 | 16px | 280px | 8px | 标题、口径、图表、图例 |
| 表格卡 | 0 或 12px | 320px | 8px | 筛选结果、分页占位 |
| 详情面板 | 16px | 100% | 8px | 选中对象、解释、动作 |
| 告警卡 | 12px | 72px | 8px | 等级、对象、规则、状态 |

卡片标题字号不超过 16px；卡片内部不能使用页面级大标题。

## 6. 页面共享结构

每个核心页面应按以下顺序组织：

```text
Page header
Filter bar or quick tabs
KPI / Summary strip
Primary analysis area
Secondary list or explanation panel
State and permission boundary
```

### 6.1 Page Header

| 元素 | 规则 |
| --- | --- |
| 页面标题 | 使用功能名，如 `运营总览`、`店铺分析` |
| 筛选摘要 | 简短显示 `今日 / 全部楼层 / Mock 数据` |
| 主操作 | 刷新、切换视图、导出占位；P2 不做真实导出 |
| 高危提示 | 可显示 1 条全局高危告警摘要 |

### 6.2 Filter Bar

| 控件 | 使用规则 |
| --- | --- |
| Segmented control | 今日、近 7 日、近 30 日、回放 |
| Select | 楼层、业态、评分等级、告警状态 |
| Search input | 店铺关键词，宽度固定 220-280px |
| Toggle | Mock/API 模式只用于显示或后续开发调试，不作为用户主要功能 |
| Reset | 筛选不为空时显示重置按钮 |

筛选变化应保留在 URL query 或可恢复状态中。

## 7. 页面布局模板

### 7.1 运营总览 `/dashboard`

```text
Header
KPI strip: 5 cards
Main row:
  traffic trend chart 8 cols
  alert summary / floor status 4 cols
Bottom row:
  floor comparison 6 cols
  low-efficiency store ranking 6 cols
```

规则：

```text
首屏必须看到 KPI、趋势和至少一个风险摘要
KPI 卡固定高度，数值变化不能撑开布局
告警摘要必须提供跳转到 /store-alerts
楼层状态必须提供跳转到 /digital-twin
```

### 7.2 数字孪生 `/digital-twin`

```text
Header + floor tabs + mode segmented control
Main:
  floor canvas 8/9 cols
  selected object panel 3/4 cols
Bottom:
  timeline or replay control full width
```

规则：

```text
画布保持 16:9 或 4:3 aspect-ratio
自绘楼层图不放在装饰卡片里，但可以有工具边界和轻量背景
hover tooltip 不遮挡当前店铺核心信息
颜色覆盖层必须有图例和文字解释
```

### 7.3 店铺分析 `/store-analysis`

```text
Header + filter bar
Main:
  store table/list 5 cols
  store detail and trend 7 cols
Bottom:
  score breakdown 6 cols
  low-efficiency reasons 6 cols
```

规则：

```text
左侧列表支持排序和筛选，右侧详情随选中店铺变化
评分必须显示总分、等级和分项贡献
低效原因必须对应告警规则或指标阈值
空间定位入口跳转 /digital-twin
```

### 7.4 客群画像 `/customer-profile`

```text
Header + time filter
KPI strip: 4 cards
Main:
  time distribution 6 cols
  category preference 6 cols
Bottom:
  floor preference 6 cols
  campaign comparison 6 cols
```

规则：

```text
只展示匿名聚合统计
不出现人脸、年龄性别识别、身份标签或个人轨迹
小样本数据必须显示聚合不足提示
```

### 7.5 低效预警 `/store-alerts`

```text
Header + filter bar
KPI strip: 4 cards
Main:
  alert list/table 7 cols
  alert detail / handling panel 5 cols
```

规则：

```text
列表按等级、持续时间和未处理状态综合排序
告警等级必须有文字、图标或形状，不只靠颜色
处理面板 P2 只做前端 Mock，不写真实审计日志
对象入口跳转 /store-analysis 或 /digital-twin
```

## 8. 状态布局

### 8.1 Loading

| 区域 | 表现 |
| --- | --- |
| KPI | 保留卡片尺寸，显示 skeleton 数字条 |
| 图表 | 保留坐标区和图例占位 |
| 表格 | 显示 5 到 8 行 skeleton |
| 数字孪生 | 保留画布尺寸，显示加载提示和浅色网格 |

Loading 不应让页面高度抖动。

### 8.2 Empty

空态必须显示：

```text
当前筛选摘要
无数据原因的短句
重置筛选按钮
可选的返回总览入口
```

空态不使用插画或外部图片。

### 8.3 Error

错误态必须显示：

```text
错误标题
简短原因
重试按钮
错误代码或 traceId 占位
可降级说明
```

P2 Mock 阶段可用固定错误对象模拟。

### 8.4 Permission Denied

权限不足态必须显示：

```text
当前角色
缺少的权限或页面范围
返回总览按钮
```

不要展示受限数据的局部内容。

## 9. 表格和列表规则

| 项目 | 规则 |
| --- | --- |
| 行高 | 默认 44px，紧凑模式 40px |
| 表头 | 13px medium，背景 `--color-bg-subtle` |
| 排序 | 列标题显示排序图标和文字提示 |
| 状态列 | 使用徽标 + 文本 |
| 操作列 | 图标按钮优先，必须有 tooltip 或 aria-label |
| 空表格 | 保留表头，表体显示空态 |

长店铺名、告警标题和业态名必须省略并可通过 tooltip 查看完整内容，不能撑破列宽。

## 10. 图表布局规则

| 图表 | 最小高度 | 必须包含 |
| --- | --- | --- |
| 客流趋势折线 | 280px | 单位、时间粒度、峰值标记 |
| 楼层对比柱状 | 260px | 楼层标签、当前筛选摘要 |
| 店铺评分趋势 | 260px | 等级线或分数区间说明 |
| 画像分布 | 260px | 聚合口径和隐私说明 |
| 告警统计 | 220px | 等级说明和状态说明 |

图表标题旁必须提供口径入口或短说明。颜色含义必须有图例，异常点要有文本或形状标识。

## 11. 数字孪生画布规则

| 项目 | 规则 |
| --- | --- |
| 画布比例 | 默认 16:9，窄屏可改 4:3 |
| 楼层图形 | 自绘几何店铺、通道、入口、节点 |
| 店铺块 | 最小可点击区域 32x32px |
| 覆盖层 | 热力、客流、告警、评分一次只突出一种主模式 |
| 图例 | 固定在画布角落，不遮挡热点 |
| Tooltip | 鼠标 hover 出现，键盘 focus 也可访问 |
| 详情 | 点击后右侧详情面板固定显示 |

禁止使用真实商场平面图、地图瓦片、BIM 截图、商户 Logo 或监控画面。

## 12. 响应式规则

### 12.1 桌面优先

P2 Demo 优先保证 1920x1080：

```text
左侧导航常驻
Topbar 完整显示
KPI 一行展示
主图表和详情面板并排
```

### 12.2 中等宽度

`768-1199px`：

```text
Sidebar 折叠或进入抽屉
KPI 每行 2 个
主图表和详情面板上下堆叠
筛选栏可换行
```

### 12.3 移动宽度

`< 768px`：

```text
单列布局
Topbar 简化为商场、时间、菜单
表格优先切换为列表
数字孪生画布横向滚动或简化为楼层卡片
所有按钮文字不能溢出
```

移动端不是核心演示环境，但必须避免内容重叠、横向不可控溢出和无法点击。

## 13. 可访问性基础

| 项目 | 规则 |
| --- | --- |
| 焦点 | 所有按钮、链接、筛选、画布店铺块有可见焦点环 |
| 键盘 | Tab 顺序按页面视觉顺序；Esc 关闭弹层 |
| 对比度 | 正文 >= 4.5:1，大号数字 >= 3:1 |
| 图标 | 单独图标按钮必须有 `aria-label` 或 tooltip |
| 图表 | 提供文本摘要或数据表入口 |
| 状态 | 告警、错误、评分等级不只靠颜色 |
| 动画 | 尊重 `prefers-reduced-motion` |

## 14. P1-I2 UI 检查清单

```text
已定义 App Shell
已定义 Topbar 和 Sidebar 布局
已定义 12 列栅格和响应式断点
已定义卡片、表格、图表、数字孪生画布规则
已定义 5 个核心页面的布局模板
已定义 Loading、Empty、Error、Permission Denied 状态布局
已定义可访问性基础
未创建 frontend/
未创建 backend/
未创建 ai-services/
未创建 infra/
未引入新第三方依赖或外部素材
```
