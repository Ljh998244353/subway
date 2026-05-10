# 图表规范

更新时间：2026-05-10

## 1. 文档定位

本文是 `P1-I3 charts, components, and UI states` 的设计输出之一，用于定义 P2 前端 Demo 所需图表的指标口径、视觉规则、状态、交互和测试关注点。组件规范见 `docs/design/COMPONENT_SPEC.md`，设计 token 见 `docs/design/DESIGN_TOKENS.md`，指标口径源头见 `docs/METRICS_DEFINITION.md`。

本文不引入图表库依赖。P2 若使用 ECharts 或其他图表库，必须在依赖引入时更新 `docs/THIRD_PARTY_NOTICES.md` 和 `docs/LICENSE_AUDIT.md`。

## 2. 图表通用规则

| 项目 | 规则 |
| --- | --- |
| 时间 | 后端内部 UTC，前端展示按配置时区；P2 Mock 需标记本地展示时间 |
| 粒度 | 默认 5 分钟、小时、日；图表标题或说明中必须体现 |
| 单位 | 每个轴、tooltip 和摘要都必须有单位 |
| 来源 | Mock / API / Replay 数据来源必须可见或可追踪 |
| 图例 | 多序列图必须有图例，颜色含义不能只藏在 tooltip |
| 异常点 | 异常必须用形状、文本或标记线表达，不只靠红色 |
| 空态 | 无数据时保留图表容器尺寸并显示筛选摘要 |
| 可访问性 | 图表必须提供文本摘要或数据表入口 |
| 隐私 | 不展示个人级轨迹、人脸、身份标签或可反推个人的小样本明细 |

## 3. 图表容器

每个图表卡应包含：

```text
标题
口径短说明或口径入口
当前筛选摘要
图例
图表主体
状态提示：loading / empty / error / partial / stale
```

最小尺寸沿用 `docs/design/UI_SPEC.md`：

| 图表类型 | 最小高度 |
| --- | --- |
| 趋势折线 | 280px |
| 柱状对比 | 260px |
| 评分趋势 | 260px |
| 画像分布 | 260px |
| 告警统计 | 220px |
| 数字孪生热力画布 | 16:9 或 4:3 |

## 4. 图表色彩映射

| 指标 | Token | 用途 |
| --- | --- | --- |
| 客流 | `--chart-traffic` | 客流趋势、楼层流量 |
| 停留 | `--chart-dwell` | 停留时长、画像偏好 |
| 转化 | `--chart-conversion` | 转化率、经营效率 |
| 评分 | `--chart-score` | 店铺评分、健康度 |
| 告警 | `--chart-alert` | 告警数量、异常点 |
| 基准 | `--chart-baseline` | 同比、阈值、均值 |

评分等级色沿用 `DESIGN_TOKENS.md` 的 A/B/C/D 色彩，但图表必须同时显示等级文字或区间说明。

## 5. 核心图表清单

| 图表 | 页面 | 优先级 |
| --- | --- | --- |
| TrafficTrendChart | `/dashboard` | L1 |
| FloorComparisonChart | `/dashboard`、`/customer-profile` | L1 |
| StoreScoreTrendChart | `/store-analysis` | L1 |
| ScoreBreakdownChart | `/store-analysis` | L1 |
| CategoryPreferenceChart | `/customer-profile`、`/store-analysis` | L2 |
| TimeDistributionChart | `/customer-profile` | L2 |
| AlertStatsChart | `/store-alerts`、`/dashboard` | L1 |
| TwinHeatmapOverlay | `/digital-twin` | L2 |
| TwinFlowOverlay | `/digital-twin` | L2 |
| TwinScoreOverlay | `/digital-twin` | L2 |

## 6. TrafficTrendChart

用途：展示当前时间范围内客流变化，帮助识别峰值和异常波动。

| 项目 | 规则 |
| --- | --- |
| 数据 | 时间序列：`timestamp`、`currentOccupancy`、`todayTrafficDelta` 可选 |
| 默认粒度 | 今日按 5 分钟或小时；近 7 日按日或小时聚合 |
| 主图形 | 折线或面积折线 |
| 必须标记 | 峰值客流、当前时间点、拥挤阈值可选 |
| 单位 | 人数 / 人次 |
| 颜色 | 客流 `--chart-traffic`，阈值 `--chart-baseline`，异常 `--chart-alert` |

Tooltip 内容：

```text
时间
当前场内人数
当前时间段新增客流
拥挤指数或阈值状态
数据来源：Mock/API
```

状态：

```text
empty: 当前时间范围无客流数据
partial: 部分时间段缺失，图线断开并显示缺口说明
stale: 最近更新时间超过阈值
```

测试关注点：

```text
峰值标记正确
单位可见
空态保留容器尺寸
异常点有非颜色标识
```

## 7. FloorComparisonChart

用途：比较楼层客流、拥挤指数或停留占比。

| 项目 | 规则 |
| --- | --- |
| 数据 | `floorId`、`floorName`、`traffic`、`crowdingIndex`、`alertCount` |
| 主图形 | 横向或纵向柱状图 |
| 默认排序 | 拥挤指数或客流从高到低 |
| 单位 | 人次、拥挤指数、告警数 |
| 颜色 | 客流 `--chart-traffic`，拥挤或告警使用状态色 |

交互：

```text
点击楼层 -> /digital-twin?floorId=...
hover -> 显示客流、拥挤指数、告警数
```

可访问性摘要：

```text
当前最拥挤楼层为 F2，拥挤指数 1.12，有 3 个未处理告警。
```

## 8. StoreScoreTrendChart

用途：展示店铺评分随时间变化，解释连续下滑或恢复趋势。

| 项目 | 规则 |
| --- | --- |
| 数据 | `timestamp`、`score`、`level` |
| 主图形 | 折线图 |
| 辅助线 | A/B/C/D 分数区间或 C/D 阈值线 |
| 单位 | 分，范围 0-100 |
| 颜色 | 评分 `--chart-score`，D 阈值 `--chart-alert` |

Tooltip 内容：

```text
时间
评分
等级
同比/环比变化
触发告警时显示规则
```

测试关注点：

```text
分数不超过 0-100
阈值线 55/70/85 显示正确
连续下滑标记不只靠颜色
```

## 9. ScoreBreakdownChart

用途：解释店铺评分由哪些分项构成。

评分公式来自 `docs/METRICS_DEFINITION.md`：

```text
店铺评分 = 客流得分 * 0.30 + 转化得分 * 0.30 + 停留得分 * 0.20 + 趋势得分 * 0.20
```

| 分项 | 权重 | 建议图形 |
| --- | --- | --- |
| 客流得分 | 30% | 水平条 |
| 转化得分 | 30% | 水平条 |
| 停留得分 | 20% | 水平条 |
| 趋势得分 | 20% | 水平条 |

规则：

```text
显示分项得分、权重和贡献
总分必须等于分项加权后的结果或显示四舍五入说明
低分项需要有文字解释入口
```

## 10. CategoryPreferenceChart

用途：展示匿名聚合的业态偏好或业态客流占比。

| 项目 | 规则 |
| --- | --- |
| 数据 | `category`、`trafficShare`、`dwellShare`、`conversionRate` 可选 |
| 主图形 | 条形图优先；少量分类可用环图 |
| 单位 | 百分比、人次 |
| 颜色 | 分类色板，单图不超过 5 个主色 |

隐私规则：

```text
不展示个人身份标签
不展示小样本明细
样本不足时显示聚合不足提示
```

交互：

```text
点击业态 -> /store-analysis?category=...
```

## 11. TimeDistributionChart

用途：展示客流或画像在一天中的分布。

| 项目 | 规则 |
| --- | --- |
| 数据 | `hour` 或 `timeBucket`、`traffic`、`share` |
| 主图形 | 柱状图或热力矩阵 |
| 单位 | 人次、百分比 |
| 标记 | 高峰时段、低谷时段 |

规则：

```text
时间轴按本地展示时间排序
营业时间外数据用中性色弱化或隐藏
高峰时段必须有文字摘要
```

## 12. AlertStatsChart

用途：展示告警等级、状态和趋势。

| 项目 | 规则 |
| --- | --- |
| 数据 | `level`、`status`、`count`、`duration` |
| 主图形 | 堆叠柱、分组条或小型趋势图 |
| 单位 | 条、分钟/小时 |
| 颜色 | 高危 danger，中 warning，低 info/neutral |

必须显示：

```text
未处理数量
高等级数量
平均持续时间
今日新增
```

状态表达必须含等级文字，如 `高危 5 条`。

## 13. TwinHeatmapOverlay

用途：数字孪生空间热力覆盖层，展示聚合热度，不展示个人轨迹。

| 项目 | 规则 |
| --- | --- |
| 数据 | `x`、`y`、`intensity`、`floorId` |
| 图形 | 半透明热力点或网格 |
| 色板 | Low / Medium / High / Critical |
| 坐标 | 自绘楼层坐标，不是真实地图坐标 |

规则：

```text
热力点必须限定在楼层图范围内
图例固定显示
不得展示单人路径或可识别轨迹
```

## 14. TwinFlowOverlay

用途：展示聚合动线和节点流量。

| 项目 | 规则 |
| --- | --- |
| 数据 | `fromNode`、`toNode`、`count`、`direction` |
| 图形 | 聚合流向线或箭头 |
| 单位 | 人次 |
| 隐私 | 只展示聚合边，不展示个人轨迹 |

规则：

```text
流向线宽度映射聚合人次
方向用箭头和文字图例表达
低样本流向可隐藏或合并
```

## 15. TwinScoreOverlay

用途：在楼层图中显示店铺评分状态。

| 项目 | 规则 |
| --- | --- |
| 数据 | `storeId`、`score`、`level` |
| 图形 | 店铺块边框、角标或轻量填充 |
| 颜色 | A/B/C/D 等级色 |
| 文本 | hover/focus 显示店铺名、评分、等级 |

规则：

```text
评分状态不能只靠填充色，必须有等级角标或详情面板文本
点击店铺进入或更新店铺详情
```

## 16. 图表状态规范

| 状态 | 表现 |
| --- | --- |
| Loading | 保留坐标区、标题和图例位置，显示 skeleton |
| Empty | 显示当前筛选摘要、无数据原因和重置筛选 |
| Error | 显示错误标题、重试按钮和错误代码占位 |
| PermissionDenied | 不渲染数据点，显示权限说明 |
| PartialData | 图线断开或淡化缺失区间，并有缺失说明 |
| StaleData | 标题区显示最近更新时间和刷新按钮 |

## 17. 页面图表映射

| 页面 | 必需图表 |
| --- | --- |
| `/dashboard` | TrafficTrendChart, FloorComparisonChart, AlertStatsChart, low-efficiency ranking table |
| `/digital-twin` | TwinHeatmapOverlay, TwinFlowOverlay, TwinScoreOverlay, alert markers |
| `/store-analysis` | StoreScoreTrendChart, ScoreBreakdownChart, store flow/conversion trend |
| `/customer-profile` | TimeDistributionChart, CategoryPreferenceChart, FloorComparisonChart |
| `/store-alerts` | AlertStatsChart, alert list table, alert trigger trend |

## 18. ECharts 实现提示

P2 若使用 ECharts：

```text
主题色从 DESIGN_TOKENS.md 映射
每个 chart option 由纯函数根据数据生成，便于单元测试
tooltip formatter 不拼接未转义 HTML
空态不初始化复杂图表实例或显式 clear
resize 由容器尺寸驱动，避免窗口变化后重叠
```

说明：本文不新增 ECharts 依赖；依赖引入留到 P2，并在当轮审计许可证。

## 19. P2 测试关注点

| 图表 | 必测路径 |
| --- | --- |
| TrafficTrendChart | 峰值、阈值、空态、partial data、单位 |
| FloorComparisonChart | 排序、点击楼层跳转、拥挤状态文本 |
| StoreScoreTrendChart | 评分边界、等级阈值、连续下滑标记 |
| ScoreBreakdownChart | 分项权重、总分一致性、低分说明 |
| CategoryPreferenceChart | 匿名聚合、小样本提示、点击业态跳转 |
| AlertStatsChart | 高/中/低等级、未处理状态、持续时间 |
| TwinHeatmapOverlay | 坐标范围、图例、无个人轨迹 |
| TwinFlowOverlay | 聚合流向、方向标识、低样本隐藏 |
| TwinScoreOverlay | 等级角标、店铺点击、非颜色表达 |

## 20. 非目标

```text
不定义真实后端聚合 SQL
不引入 ECharts 或其他图表库依赖
不展示真实地图、BIM、商户 Logo 或监控图像
不展示个人轨迹或身份画像
不创建 frontend/
```

## 21. P1-I3 图表检查清单

```text
已定义核心图表清单
已定义通用图表规则和色彩映射
已定义客流、楼层、评分、画像、告警、热力、动线图表规范
已定义 loading、empty、error、permission、partial、stale 状态
已定义页面到图表映射
已定义 P2 测试关注点
未创建 frontend/
未创建 backend/
未创建 ai-services/
未创建 infra/
未引入新第三方依赖或外部素材
```
