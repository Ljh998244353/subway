# 组件与 UI 状态规范

更新时间：2026-05-10

## 1. 文档定位

本文是 `P1-I3 charts, components, and UI states` 的设计输出之一，用于定义 P2 前端 Demo 的核心组件边界、状态表现、属性约束和测试关注点。视觉变量见 `docs/design/DESIGN_TOKENS.md`，页面布局见 `docs/design/UI_SPEC.md`，页面范围见 `docs/design/SCREEN_LAYOUTS.md`。

本文不创建 `frontend/` 工程，不选择图标库，不引入第三方依赖，不复制外部组件代码。P2 实现时若选定图标库、图表库或其他依赖，必须同步更新 `docs/THIRD_PARTY_NOTICES.md` 与 `docs/LICENSE_AUDIT.md`。

## 2. 组件设计原则

| 原则 | 规则 |
| --- | --- |
| 页面先行 | 组件只服务 5 个核心页面，不为远期 SaaS 抽象过度设计 |
| 状态显式 | loading、empty、error、permission、stale、partial 都必须可测试 |
| 数据可追踪 | 指标组件显示时间窗口、单位、来源或口径入口 |
| 操作可恢复 | 筛选、选中对象和跳转参数要能映射到 URL query 或可恢复状态 |
| 合规默认 | 不展示真实 Logo、真实商场图、人脸、个人轨迹或未授权素材 |
| 可访问 | 图标按钮有 `aria-label` 或 tooltip，告警和评分不只靠颜色 |

## 3. 组件分层

```text
Shell components
  AppShell
  Topbar
  Sidebar

Page scaffolding
  PageHeader
  FilterBar
  SummaryStrip
  ContentGrid

Data display
  MetricCard
  DataTable
  StatusBadge
  ScoreBadge
  TrendIndicator
  DetailPanel

Domain display
  StoreList
  AlertList
  TwinCanvasPanel
  FloorModeControl

State display
  StateView
  LoadingSkeleton
  EmptyState
  ErrorState
  PermissionDeniedState
  PartialDataNotice
  StaleDataNotice
```

## 4. Shell Components

### 4.1 AppShell

职责：提供全局布局、导航、顶部状态和内容插槽。

| 属性 | 类型建议 | 说明 |
| --- | --- | --- |
| `activeRoute` | string | 当前路由，用于 Sidebar 激活 |
| `mallName` | string | 当前商场，P2 使用虚构名称 |
| `timeRange` | object/string | 当前时间范围 |
| `dataMode` | `mock` / `api` / `replay` | P2 默认为 `mock` |
| `lastUpdatedAt` | ISO string | 最近更新时间 |
| `userRole` | string | 静态角色模拟 |
| `children` | ReactNode | 页面主体 |

状态：

```text
normal
stale data
collapsed sidebar
permission limited role
```

测试关注点：

```text
当前路由高亮正确
Mock 数据模式可见
数据延迟提示可见
窄屏不遮挡页面内容
```

### 4.2 Topbar

职责：显示全局上下文，不承载页面主操作。

| 区域 | 内容 | 规则 |
| --- | --- | --- |
| 左侧 | 系统名、商场名 | 文字标识，不放真实 Logo |
| 中部 | 时间范围、回放点占位 | 控件高度 32px |
| 右侧 | 数据模式、更新时间、角色 | 状态用文字 + 颜色/图标 |

交互：

```text
切换时间范围 -> 更新全局 query/state
点击刷新 -> 触发页面数据刷新
角色入口 -> P2 可只显示静态信息
```

### 4.3 Sidebar

职责：提供 5 个核心页面导航。

| 导航项 | 徽标 | 权限 |
| --- | --- | --- |
| 运营总览 | 高等级告警数量 | 所有角色可读 |
| 数字孪生 | 拥挤楼层数量 | 所有角色可读 |
| 店铺分析 | C/D 店铺数量 | security 可只读部分 |
| 客群画像 | 无 | security 可隐藏或只读摘要 |
| 低效预警 | 未处理告警数量 | operator/security 可处理部分 |

测试关注点：

```text
激活态不只依赖颜色
徽标数字可被文本读取
禁用导航不触发错误跳转
```

## 5. Page Scaffolding

### 5.1 PageHeader

职责：统一页面标题、筛选摘要和页面级操作。

| 属性 | 说明 |
| --- | --- |
| `title` | 页面名，如 `运营总览` |
| `summary` | 当前筛选摘要 |
| `actions` | 刷新、切换视图、导出占位 |
| `riskHint` | 可选的高危提示 |

规则：

```text
标题使用功能名，不使用营销口号
摘要保持一行，过长时省略
主操作不超过 3 个
```

### 5.2 FilterBar

职责：承载页面筛选，并输出可恢复筛选状态。

| 控件 | 适用页面 |
| --- | --- |
| 时间 Segmented control | 全部页面 |
| 楼层 Select | 总览、数字孪生、店铺分析、预警 |
| 业态 Select | 店铺分析、客群画像、预警 |
| 评分等级 Select | 店铺分析、预警 |
| 告警状态 Select | 预警 |
| 店铺搜索 | 店铺分析、预警 |

输出状态建议：

```text
mallId
timeRange
floorId
category
scoreLevel
alertStatus
keyword
```

测试关注点：

```text
筛选变化不会清空无关条件
重置按钮只在有筛选时出现
空态显示当前筛选摘要
```

### 5.3 SummaryStrip

职责：承载 3 到 5 个 `MetricCard`，保持一行或响应式换行。

规则：

```text
桌面首屏 KPI 不超过 5 个
每个 MetricCard 固定最小高度
单位和时间窗口必须可见
异常值用状态 + 文本说明
```

## 6. Data Display Components

### 6.1 MetricCard

职责：展示关键指标、单位、变化趋势和状态。

| 属性 | 类型建议 | 说明 |
| --- | --- | --- |
| `label` | string | 指标名称 |
| `value` | number/string | 主值 |
| `unit` | string | 单位 |
| `trend` | object | 增减值、方向、对比周期 |
| `status` | normal/warning/danger/info | 状态 |
| `timeWindow` | string | 时间窗口 |
| `source` | mock/api/replay | 数据来源 |
| `description` | string | 口径简述 |

状态：

```text
normal
warning
danger
loading
empty
stale
partial
```

视觉规则：

```text
主数字最多 32px
卡片内不放大段说明
status 必须显示文字或标识，不只靠颜色
```

### 6.2 StatusBadge

职责：统一展示状态、告警等级、处理状态和数据来源。

| 类型 | 示例 | 样式 |
| --- | --- | --- |
| `success` | 已处理、正常 | 绿色背景 + 文本 |
| `info` | Mock、低风险 | 蓝色背景 + 文本 |
| `warning` | 关注、处理中 | 琥珀背景 + 文本 |
| `danger` | 高危、D 级 | 红色背景 + 文本 |
| `neutral` | 未知、无数据 | 中性背景 + 文本 |

规则：

```text
badge 文案不能只有单字母，评分等级可显示 `A / 优`
告警等级要包含 `高 / 中 / 低`
```

### 6.3 ScoreBadge

职责：展示店铺评分等级和分数。

| 等级 | 显示 |
| --- | --- |
| A | `A / 优秀 / 92` |
| B | `B / 稳定 / 78` |
| C | `C / 关注 / 63` |
| D | `D / 预警 / 42` |

测试关注点：

```text
分数 0-100 边界显示正确
等级边界 54/55/69/70/84/85 正确
颜色之外有文本等级
```

### 6.4 TrendIndicator

职责：展示上升、下降、持平和异常波动。

| 状态 | 表现 |
| --- | --- |
| up-positive | 上升 + 正向文本 |
| down-negative | 下降 + 负向文本 |
| stable | 持平 |
| anomaly | 异常波动 |

注意：客流上升不一定是正向，拥挤指数上升可能是风险。组件需要接收 `semantic`，不要硬编码“上升就是好”。

### 6.5 DataTable

职责：展示店铺列表、告警列表、排行和明细。

| 属性 | 说明 |
| --- | --- |
| `columns` | 列定义、排序、对齐 |
| `rows` | 数据 |
| `rowKey` | 稳定 key |
| `selectedRowKey` | 当前选中 |
| `sortState` | 排序字段 |
| `emptyState` | 空态配置 |
| `loading` | 加载态 |
| `onRowClick` | 选中或跳转 |

规则：

```text
长文本省略且可查看完整内容
表头固定在卡片顶部或随页面滚动策略明确
排序状态必须可见
空表格保留表头和空态说明
```

### 6.6 DetailPanel

职责：展示选中店铺、告警或楼层的解释和动作。

| 用途 | 内容 |
| --- | --- |
| 店铺详情 | 指标、评分拆解、趋势入口、空间定位 |
| 告警详情 | 触发规则、阈值、对象、建议动作、状态 |
| 数字孪生选中对象 | 店铺/节点摘要、热力、转化、告警 |

规则：

```text
详情面板不再嵌套卡片
主要动作不超过 2 个
P2 处理状态只做前端 Mock
```

## 7. Domain Components

### 7.1 StoreList

基于 DataTable 或紧凑列表实现。

必须列：

```text
店铺名
楼层
业态
评分/等级
进店转化率
告警数
趋势
```

交互：

```text
点击行 -> 更新 DetailPanel
点击空间定位 -> 跳转 /digital-twin
点击告警数 -> 跳转 /store-alerts
```

### 7.2 AlertList

必须列：

```text
等级
对象
规则
触发指标
持续时间
状态
建议动作
```

排序默认：

```text
未处理高等级 > 未处理中等级 > 持续时间长 > 最新触发
```

### 7.3 TwinCanvasPanel

职责：承载自绘楼层图、覆盖层和选中交互。P2 可先用 SVG、HTML/CSS 或 Canvas 自绘，不使用真实商场图。

| 属性 | 说明 |
| --- | --- |
| `floorId` | 当前楼层 |
| `mode` | heatmap / flow / alert / score |
| `stores` | 虚构店铺几何 |
| `heatmapPoints` | 合成热力点 |
| `flowEdges` | 聚合流向 |
| `alerts` | 告警标记 |
| `selectedStoreId` | 当前选中 |

规则：

```text
店铺块最小可点击 32x32px
hover 和 focus 都能看到摘要
覆盖层一次突出一种模式
图例必须可见
不展示个人轨迹
```

### 7.4 FloorModeControl

职责：控制楼层和覆盖模式。

| 控件 | 规则 |
| --- | --- |
| 楼层 tabs | F1/F2/F3 等虚构楼层 |
| 模式 segmented control | 热力、客流、告警、评分 |
| 时间回放 | P2 可静态或简单切换 |

状态必须反映在 URL query 或可恢复状态。

## 8. UI State Components

### 8.1 StateView

统一状态组件，用于页面级和区域级状态。

| 属性 | 说明 |
| --- | --- |
| `type` | loading / empty / error / permission / partial / stale |
| `title` | 短标题 |
| `message` | 一句话说明 |
| `action` | 重试、重置筛选、返回总览 |
| `details` | 错误码、traceId、筛选摘要 |

### 8.2 LoadingSkeleton

规则：

```text
保持原组件尺寸
KPI、表格、图表、数字孪生分别有匹配 skeleton
不使用闪烁过强动画
尊重 prefers-reduced-motion
```

### 8.3 EmptyState

必须显示：

```text
当前筛选摘要
无数据原因
重置筛选按钮
```

禁止使用外部插画或图片。

### 8.4 ErrorState

必须显示：

```text
错误标题
简短原因
重试按钮
错误代码或 traceId 占位
```

错误信息不得暴露敏感路径、真实用户信息或原始视频来源。

### 8.5 PermissionDeniedState

必须显示：

```text
当前角色
缺少权限
返回总览按钮
```

不要渲染受限数据后再遮挡。

### 8.6 PartialDataNotice

用于部分指标缺失、延迟或质量不足。

显示：

```text
缺失指标名称
影响范围
是否使用最近可用数据
```

### 8.7 StaleDataNotice

用于数据超过刷新阈值。

显示：

```text
最近更新时间
延迟时长
刷新按钮
```

## 9. 页面到组件映射

| 页面 | 必需组件 |
| --- | --- |
| `/dashboard` | AppShell, PageHeader, SummaryStrip, MetricCard, TrafficTrendChart, FloorComparisonChart, AlertList, StoreList |
| `/digital-twin` | AppShell, PageHeader, FloorModeControl, TwinCanvasPanel, DetailPanel, StateView |
| `/store-analysis` | AppShell, PageHeader, FilterBar, StoreList, DetailPanel, ScoreBadge, StoreScoreTrendChart, ScoreBreakdownChart |
| `/customer-profile` | AppShell, PageHeader, FilterBar, MetricCard, TimeDistributionChart, CategoryPreferenceChart, FloorPreferenceChart |
| `/store-alerts` | AppShell, PageHeader, FilterBar, SummaryStrip, AlertList, DetailPanel, StatusBadge, AlertStatsChart |

## 10. Accessibility Requirements

```text
所有可点击组件可键盘访问
图标按钮必须有 aria-label 或 tooltip
图表必须有文本摘要或表格 fallback
告警、评分、数据质量状态不只靠颜色
TwinCanvasPanel 中店铺块支持 focus 和 Enter/Space 激活
弹层和抽屉支持 Esc 关闭
```

## 11. P2 测试关注点

| 组件 | 必测路径 |
| --- | --- |
| AppShell | 路由激活、数据模式、刷新状态、窄屏导航 |
| FilterBar | 筛选变化、重置、URL 状态保持 |
| MetricCard | loading、empty、stale、warning、danger |
| DataTable | 排序、空态、选中行、长文本省略 |
| DetailPanel | 选中对象变化、跳转入口、权限状态 |
| TwinCanvasPanel | 楼层切换、模式切换、店铺 hover/focus/click |
| StateView | loading、empty、error、permission 文案和动作 |
| StatusBadge / ScoreBadge | 状态文本、等级边界、非颜色表达 |

## 12. 非目标

```text
不定义完整组件库发布规范
不做多租户主题系统
不做真实权限后端
不做真实工单组件
不引入图标库或组件库依赖
不创建 frontend/
```

## 13. P1-I3 组件检查清单

```text
已定义核心 shell 组件
已定义页面脚手架组件
已定义数据展示组件
已定义数字孪生领域组件
已定义 Loading、Empty、Error、PermissionDenied、PartialData、StaleData 状态组件
已定义页面到组件映射
已定义 P2 测试关注点
未创建 frontend/
未创建 backend/
未创建 ai-services/
未创建 infra/
未引入新第三方依赖或外部素材
```
