# 交互、响应式与可访问性规范

更新时间：2026-05-10

## 1. 文档定位

本文是 `P1-I4 interaction, responsive, accessibility, and design review` 的设计输出之一，用于把 P1-I1 到 P1-I3 的页面、token、布局、组件和图表规范收束成可实现的交互规则。

本文不创建 `frontend/`、`backend/`、`ai-services/` 或 `infra/` 工程，不引入新依赖、图标、字体、图片、视频或外部素材。P2 前端实现若新增依赖或素材，必须同步更新 `docs/THIRD_PARTY_NOTICES.md` 和 `docs/LICENSE_AUDIT.md`。

## 2. 交互设计原则

| 原则 | 规则 |
| --- | --- |
| 上下文连续 | 页面跳转保留 `mallId`、`timeRange` 和当前筛选，不让用户重新筛选 |
| 操作可恢复 | 筛选、排序、选中店铺、楼层、模式和告警详情映射到 URL query 或可恢复状态 |
| 结果可解释 | 点击指标、店铺、楼层或告警后，目标页面必须说明数据口径和触发原因 |
| 状态可见 | loading、empty、error、permission、partial、stale 都要有明确文案和动作 |
| 键盘可用 | 核心跳转、筛选、表格行、告警处理和数字孪生店铺块都能用键盘完成 |
| 合规默认 | 不展示真实商场图、真实品牌、监控画面、人脸、个人轨迹或未授权素材 |

## 3. 路由与 Query 状态

### 3.1 核心路由

```text
/dashboard
/digital-twin
/store-analysis
/customer-profile
/store-alerts
```

P2 不实现 `/admin`，可以隐藏或禁用管理入口。

### 3.2 Query 参数

| 参数 | 类型 | 适用页面 | 说明 |
| --- | --- | --- | --- |
| `mallId` | string | 全部 | P2 默认为单个虚构商场 |
| `timeRange` | today / 7d / 30d / replay | 全部 | 全局时间窗口 |
| `floorId` | string | 总览、数字孪生、店铺分析、预警、画像 | 当前楼层或跳转目标楼层 |
| `storeId` | string | 数字孪生、店铺分析、预警 | 当前选中店铺 |
| `category` | string | 店铺分析、画像、预警 | 业态筛选 |
| `scoreLevel` | A / B / C / D | 店铺分析、预警 | 评分等级筛选 |
| `alertId` | string | 数字孪生、预警、总览跳转 | 当前选中告警 |
| `alertStatus` | open / handling / resolved | 预警 | 告警处理状态 |
| `mode` | heatmap / flow / alert / score | 数字孪生 | 覆盖层模式 |
| `keyword` | string | 店铺分析、预警 | 店铺或告警搜索词 |
| `from` | route alias | 跳转链路 | 可选，用于返回入口或解释来源 |

### 3.3 参数保留规则

```text
页面跳转必须保留 mallId 和 timeRange
楼层相关跳转优先保留 floorId
店铺相关跳转优先携带 storeId，并尝试补齐 floorId
告警相关跳转优先携带 alertId，并保留 alertStatus 或 storeId
不相关筛选不应强行带到目标页面，例如 category 不影响数字孪生时可省略
URL 中无效参数要降级为默认值，并显示轻量提示或在控制台测试中可追踪
```

### 3.4 Query 示例

```text
/dashboard?mallId=M_DEMO&timeRange=today
/digital-twin?mallId=M_DEMO&timeRange=today&floorId=F2&mode=heatmap
/store-analysis?mallId=M_DEMO&timeRange=7d&floorId=F2&category=餐饮&storeId=S102
/customer-profile?mallId=M_DEMO&timeRange=30d&floorId=F3
/store-alerts?mallId=M_DEMO&timeRange=today&alertStatus=open&alertId=A9001
```

## 4. 筛选恢复

### 4.1 全局筛选

全局筛选包括：

```text
mallId
timeRange
dataMode
lastUpdatedAt
userRole
```

规则：

```text
mallId 和 timeRange 必须体现在 URL query 或全局 store 中
dataMode 在 P2 固定为 Mock，可作为状态徽标展示
刷新后应恢复当前路由、时间范围、楼层、店铺和告警详情
重置筛选只重置页面级条件，不重置 mallId 和 userRole
```

### 4.2 页面级筛选

| 页面 | 页面级筛选 | 恢复规则 |
| --- | --- | --- |
| `/dashboard` | `floorId` 可选 | 返回总览时保留时间范围；楼层卡点击带 `floorId` 去数字孪生 |
| `/digital-twin` | `floorId`、`mode`、`storeId`、`alertId` | 刷新后恢复楼层、模式和选中对象 |
| `/store-analysis` | `floorId`、`category`、`scoreLevel`、`keyword`、`storeId` | 刷新后恢复列表筛选和详情店铺 |
| `/customer-profile` | `floorId`、`category` | 刷新后恢复聚合维度 |
| `/store-alerts` | `floorId`、`category`、`scoreLevel`、`alertStatus`、`keyword`、`alertId` | 刷新后恢复告警列表和处理面板 |

### 4.3 默认值

```text
mallId = M_DEMO
timeRange = today
floorId = all
mode = heatmap
alertStatus = open
scoreLevel = all
category = all
keyword = empty
```

## 5. 页面跳转交互

### 5.1 运营总览 `/dashboard`

| 操作 | 目标 | 参数 |
| --- | --- | --- |
| 点击拥挤楼层 | `/digital-twin` | `floorId`、`mode=heatmap`、保留 `mallId/timeRange` |
| 点击楼层状态柱 | `/digital-twin` | `floorId`、`mode=flow` |
| 点击低效店铺榜行 | `/store-analysis` | `storeId`、可选 `floorId` |
| 点击告警摘要 | `/store-alerts` | `alertId`、`alertStatus=open` |
| 切换时间范围 | 当前页 | 更新 `timeRange`，刷新 KPI、趋势和榜单 |

页面必须保持首屏可读：KPI、趋势和至少一个风险摘要在 1920x1080 下不需要滚动即可看到。

### 5.2 数字孪生 `/digital-twin`

| 操作 | 结果 |
| --- | --- |
| 楼层切换 | 保留 `mode`，更新 `floorId`，重置不存在于新楼层的 `storeId/alertId` |
| 模式切换 | 保留 `floorId`，更新 `mode`，保留当前店铺详情 |
| 鼠标 hover 店铺 | 显示轻量 tooltip：店铺名、业态、评分、告警数 |
| 键盘 focus 店铺 | 显示同等摘要，不依赖鼠标 |
| 点击店铺 | 固定右侧详情面板，更新 `storeId` |
| Enter/Space 激活店铺 | 与点击店铺相同 |
| 双击或详情动作 | 跳转 `/store-analysis?storeId=...&from=twin` |
| 点击告警标记 | 打开告警摘要，更新 `alertId` |
| 点击处理入口 | 跳转 `/store-alerts?alertId=...&floorId=...` |

数字孪生画布必须使用自绘几何和合成数据。热力、流向、评分和告警一次只突出一种主模式，图例固定可见。

### 5.3 店铺分析 `/store-analysis`

| 操作 | 结果 |
| --- | --- |
| 修改筛选 | 更新 URL query，列表和详情同步刷新 |
| 点击店铺行 | 更新 `storeId` 并刷新右侧详情 |
| 键盘选择店铺行 | 上下方向键可选中，Enter 打开详情 |
| 点击评分等级 | 更新 `scoreLevel` 筛选 |
| 点击低效原因 | 跳转 `/store-alerts?storeId=...` |
| 点击空间定位 | 跳转 `/digital-twin?storeId=...&floorId=...&mode=score` |
| 清空筛选 | 保留 `mallId/timeRange`，重置页面级筛选 |

列表和详情联动时不能让页面整体跳动；详情面板保持稳定宽度和最小高度。

### 5.4 客群画像 `/customer-profile`

| 操作 | 结果 |
| --- | --- |
| 点击楼层偏好 | 跳转 `/digital-twin?floorId=...&mode=flow` |
| 点击业态偏好 | 跳转 `/store-analysis?category=...` |
| 切换时间范围 | 重新计算时段、楼层和业态聚合 |
| 样本不足 | 显示聚合不足提示，不展示小样本明细 |

画像页面只展示匿名聚合，不出现身份、人脸、年龄性别识别、手机号、会员 ID 或个人轨迹。

### 5.5 低效预警 `/store-alerts`

| 操作 | 结果 |
| --- | --- |
| 点击告警行 | 更新 `alertId`，打开右侧处理面板 |
| 点击对象入口 | 店铺告警跳 `/store-analysis`，楼层告警跳 `/digital-twin` |
| 修改处理状态 | P2 只更新前端 Mock 状态，不写真实审计日志 |
| 点击处理建议 | 在面板内显示建议说明，不触发真实工单 |
| 筛选等级或状态 | 更新 URL query，并保持当前可用的 `alertId` |
| Esc | 关闭告警详情面板或弹层 |

P2 告警处理 Mock 状态流：

```text
open -> handling -> resolved
resolved -> open     仅用于演示撤销，不代表真实审计规则
```

真实后端阶段必须由 RBAC 和 `operation_log` 记录告警处理人、时间、前后状态和备注；P2 不伪造真实审计。

## 6. 键盘交互规则

| 区域 | 键盘规则 |
| --- | --- |
| 全局导航 | Tab 进入 Sidebar；方向键可在导航项间移动；Enter 激活 |
| Topbar 筛选 | Tab 顺序按视觉从左到右；Enter/Space 打开控件 |
| Segmented control | 左右方向键切换，Enter/Space 确认 |
| Select / Menu | 上下方向键移动，Enter 选择，Esc 关闭 |
| DataTable | Tab 进入表格；方向键移动行；Enter 选中；可排序表头有键盘焦点 |
| TwinCanvasPanel | 店铺块参与 Tab 顺序；Enter/Space 选中；Esc 清除 tooltip 或关闭详情 |
| DetailPanel | 首个可操作按钮可聚焦；Esc 关闭可关闭面板 |
| Modal / Drawer | 焦点限制在弹层内；Esc 关闭；关闭后焦点回到触发元素 |

跳过导航：

```text
P2 应提供隐藏的 Skip to content 链接
Skip to content 聚焦后跳到主内容区 PageHeader 或主分析区
```

## 7. 鼠标与指针交互

| 组件 | 规则 |
| --- | --- |
| 按钮和图标按钮 | hover 有轻量背景或边框反馈；禁用态不响应点击 |
| KPI 卡 | 只有可跳转卡片显示 pointer cursor；不可点击卡片保持默认 |
| 图表点位 | hover 显示 tooltip；点击可跳转时必须有文本或图标提示 |
| 表格行 | hover 高亮，选中态有边框或左侧标识，不只靠背景色 |
| 店铺块 | hover 显示摘要；点击固定详情；最小命中区域 32x32px |
| 告警标记 | hover 显示等级和对象；点击打开详情或跳转预警页 |

## 8. 响应式验证

### 8.1 验证视口

P2 实现时至少验证：

| 视口 | 目标 |
| --- | --- |
| 1920x1080 | 主演示视口，完整 App Shell、KPI、图表和详情并排 |
| 1440x900 | 常见笔记本视口，Sidebar 可常驻或折叠，内容不重叠 |
| 2560x1440 | 宽屏视口，内容最大宽度受控，不无限拉伸 |
| 390x844 或 414x896 | 移动窄屏，单列布局，无文字重叠，主要操作可达 |

### 8.2 页面级响应式要求

| 页面 | 桌面 | 中等宽度 | 移动窄屏 |
| --- | --- | --- | --- |
| `/dashboard` | KPI 一行，趋势和风险摘要并排 | KPI 两列，图表上下堆叠 | KPI 单列，图表高度固定，风险摘要转列表 |
| `/digital-twin` | 画布与详情并排 | 画布在上，详情在下 | 画布可横向滚动或简化为楼层卡片 |
| `/store-analysis` | 列表与详情并排 | 列表在上，详情在下 | 表格转卡片列表，筛选折叠 |
| `/customer-profile` | 图表两列 | 图表单列或两列混合 | 单列，图表摘要优先 |
| `/store-alerts` | 告警列表与处理面板并排 | 处理面板下移或抽屉 | 列表卡片化，详情用抽屉或页面内区域 |

### 8.3 不允许出现的问题

```text
按钮文字溢出容器
表格列撑破页面导致不可控横向滚动
Topbar 状态和筛选互相遮挡
Sidebar 遮挡主内容且无法关闭
图例遮挡图表关键点或数字孪生告警
Tooltip 遮挡当前焦点对象且无法关闭
移动端操作目标小于 32x32px
页面级标题或 KPI 因长文案导致布局跳动
```

## 9. 可访问性要求

### 9.1 焦点

```text
所有按钮、链接、筛选、表格行、店铺块、告警标记有可见焦点
焦点样式使用 DESIGN_TOKENS.md 的 focus ring
焦点顺序符合视觉顺序
关闭弹层后焦点回到触发控件
```

### 9.2 ARIA 与语义

| 场景 | 要求 |
| --- | --- |
| 图标按钮 | 必须有 `aria-label` 或可访问名称 |
| Sidebar | 使用导航语义，当前页面标记 `aria-current="page"` |
| 状态徽标 | 文本说明完整，如 `高危 3 条`、`D / 预警 / 42` |
| Loading | 可用 `aria-busy` 标记区域，避免频繁打断读屏 |
| Error | 错误区域可被读屏感知，但不暴露敏感路径 |
| Modal / Drawer | 使用对话框语义，标题和关闭按钮可访问 |
| TwinCanvasPanel | 店铺块需要可聚焦名称：店铺、业态、评分、告警数 |

### 9.3 图表摘要和表格 fallback

每个核心图表必须提供：

```text
图表标题
当前筛选摘要
指标单位
文本摘要
查看数据表或可访问表格 fallback
```

示例摘要：

```text
今日 F2 为最拥挤楼层，拥挤指数 1.12，有 3 条未处理告警。
餐饮业态客流占比 34%，较上一时段上升 6 个百分点。
```

### 9.4 非颜色状态表达

以下状态不能只依赖颜色：

```text
告警等级：必须显示 高 / 中 / 低 或图标/形状
评分等级：必须显示 A/B/C/D 和分数
数据质量：必须显示 partial / stale / error 文案
趋势方向：必须显示 上升 / 下降 / 持平 / 异常
热力强度：必须显示 Low / Medium / High / Critical 图例
```

### 9.5 Reduced Motion

```text
尊重 prefers-reduced-motion
关闭或弱化非必要动画
保留状态变化，不依赖动画传递唯一信息
数字孪生热力、流向和告警脉冲在 reduced motion 下改为静态高亮
Skeleton 动画在 reduced motion 下改为静态占位
```

## 10. 数据状态与错误交互

| 状态 | 用户可见行为 |
| --- | --- |
| Loading | 保留区域尺寸，显示 skeleton 和加载文案 |
| Empty | 显示筛选摘要、无数据原因和重置筛选 |
| Error | 显示错误标题、重试按钮、错误码或 traceId 占位 |
| PermissionDenied | 显示当前角色、缺少权限和返回总览 |
| PartialData | 显示缺失范围，图表断点或淡化缺失区间 |
| StaleData | 显示最近更新时间、延迟时长和刷新按钮 |

P2 Mock 阶段应准备固定状态数据，便于组件测试和演示切换。

## 11. P2 实现测试关注点

| 测试类型 | 必测内容 |
| --- | --- |
| 路由测试 | 跳转保留 `mallId/timeRange`，目标页面读取 `floorId/storeId/alertId` |
| 筛选测试 | 修改筛选后 URL 或 store 状态更新，刷新后恢复 |
| 表格测试 | 排序、选中、键盘移动、空态和长文本省略 |
| 数字孪生测试 | 楼层切换、模式切换、店铺 hover/focus/click、告警点击 |
| 告警 Mock 测试 | `open -> handling -> resolved` 状态切换和文案 |
| 响应式测试 | 1920、1440、2560、移动窄屏无重叠 |
| 可访问性测试 | aria-label、焦点顺序、图表摘要、非颜色状态、reduced motion |

## 12. 非目标

```text
不实现真实后端状态保存
不实现真实告警审计日志
不实现真实导出和报表配置
不实现真实权限系统
不展示真实商场图、品牌 Logo、监控画面、人脸或个人轨迹
不创建 frontend/
不创建 backend/
不创建 ai-services/
不创建 infra/
```

## 13. P1-I4 交互检查清单

```text
已定义路由跳转和 query 参数保留规则
已定义筛选恢复和默认值
已定义 5 个核心页面交互
已定义数字孪生店铺点击、楼层切换、模式切换和告警点击
已定义告警处理 Mock 状态
已定义键盘交互规则
已定义 1920x1080、1440、2560 和移动窄屏响应式验证要求
已定义焦点、aria-label、图表摘要、表格 fallback、非颜色状态和 reduced motion
未创建 frontend/
未创建 backend/
未创建 ai-services/
未创建 infra/
未引入新第三方依赖或外部素材
```
