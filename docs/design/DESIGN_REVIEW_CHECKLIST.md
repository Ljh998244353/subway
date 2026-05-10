# 设计评审清单

更新时间：2026-05-10

## 1. 文档定位

本文是 `P1-I4 interaction, responsive, accessibility, and design review` 的设计输出之一，用于作为 P1 设计阶段收口门禁，以及 P2 前端工程初始化前的检查清单。

本文不创建工程代码，不引入依赖或素材。P2 开始后，若新增 React、Vite、图表库、3D 库、图标库、测试工具、字体文件或素材，必须同步更新 `docs/THIRD_PARTY_NOTICES.md` 与 `docs/LICENSE_AUDIT.md`。

## 2. P1 设计交付物

| 增量 | 文件 | 评审重点 |
| --- | --- | --- |
| P1-I1 | `docs/design/SCREEN_LAYOUTS.md` | 信息架构、核心页面、页面跳转、状态、权限和素材策略 |
| P1-I2 | `docs/design/DESIGN_TOKENS.md` | 浅色 token、状态色、图表色板、字体、间距、圆角和可访问性 token |
| P1-I2 | `docs/design/UI_SPEC.md` | App Shell、栅格、页面模板、卡片密度、响应式和状态布局 |
| P1-I3 | `docs/design/COMPONENT_SPEC.md` | 核心组件、领域组件、UI 状态、页面到组件映射和测试关注点 |
| P1-I3 | `docs/design/CHART_SPEC.md` | 图表口径、色彩映射、状态、交互、图表映射和测试关注点 |
| P1-I4 | `docs/design/INTERACTION_SPEC.md` | 路由、筛选恢复、页面交互、键盘、响应式和可访问性 |
| P1-I4 | `docs/design/DESIGN_REVIEW_CHECKLIST.md` | P1 设计评审门禁和 P2 前端接力 |

## 3. 评审角色

P1 以 Design Mode 为主角色，其他角色只作为检查清单。

| 检查角色 | 关注点 |
| --- | --- |
| Product | 页面是否覆盖一期核心场景，是否仍符合 P0 范围和非目标 |
| Frontend | P2 是否能按文档直接拆组件、路由、Mock 数据和测试 |
| QA | 状态、边界、响应式和可访问性是否可测试 |
| Security/License | 是否避免真实素材、隐私数据、付费服务和许可证不清资源 |

## 4. 信息架构检查

| 检查项 | 标准 | P1 状态 |
| --- | --- | --- |
| 核心路由 | `/dashboard`、`/digital-twin`、`/store-analysis`、`/customer-profile`、`/store-alerts` 已定义 | 通过设计文档检查 |
| 页面目标 | 每个页面有明确用户任务和核心指标 | 通过设计文档检查 |
| 跳转关系 | 总览、数字孪生、店铺分析、画像、预警之间有参数化跳转 | 通过设计文档检查 |
| 全局筛选 | `mallId`、`timeRange` 和数据模式规则明确 | 通过设计文档检查 |
| 页面状态 | Loading、Empty、Error、Permission Denied、PartialData、StaleData 有设计规则 | 通过设计文档检查 |
| 权限草案 | 角色和页面访问边界已有草案 | 通过设计文档检查 |

## 5. 视觉与布局检查

| 检查项 | 标准 | P1 状态 |
| --- | --- | --- |
| 浅色主题 | 页面使用浅色运营工作台风格，不做营销页或装饰大屏 | 通过设计文档检查 |
| Token | 颜色、字体、字号、间距、圆角、阴影、状态色和图表色板已定义 | 通过设计文档检查 |
| App Shell | Topbar、Sidebar、Content、PageHeader、FilterBar 已定义 | 通过设计文档检查 |
| 栅格 | 12 列桌面栅格和断点规则已定义 | 通过设计文档检查 |
| 卡片规则 | 卡片使用边界、最小高度和不嵌套规则已定义 | 通过设计文档检查 |
| 图表尺寸 | 核心图表最小高度和容器内容已定义 | 通过设计文档检查 |
| 数字孪生画布 | 自绘楼层图、覆盖层、图例和命中区域规则已定义 | 通过设计文档检查 |

## 6. 组件和图表检查

| 检查项 | 标准 | P1 状态 |
| --- | --- | --- |
| Shell 组件 | AppShell、Topbar、Sidebar 已定义 | 通过设计文档检查 |
| 页面脚手架 | PageHeader、FilterBar、SummaryStrip、ContentGrid 已定义 | 通过设计文档检查 |
| 数据组件 | MetricCard、DataTable、StatusBadge、ScoreBadge、TrendIndicator、DetailPanel 已定义 | 通过设计文档检查 |
| 领域组件 | StoreList、AlertList、TwinCanvasPanel、FloorModeControl 已定义 | 通过设计文档检查 |
| 状态组件 | StateView、LoadingSkeleton、EmptyState、ErrorState、PermissionDeniedState、PartialDataNotice、StaleDataNotice 已定义 | 通过设计文档检查 |
| 核心图表 | TrafficTrendChart、FloorComparisonChart、StoreScoreTrendChart、ScoreBreakdownChart、CategoryPreferenceChart、TimeDistributionChart、AlertStatsChart 已定义 | 通过设计文档检查 |
| 数字孪生覆盖层 | TwinHeatmapOverlay、TwinFlowOverlay、TwinScoreOverlay 和告警标记已定义 | 通过设计文档检查 |
| 图表可访问性 | 图表摘要、单位、图例、状态和表格 fallback 已定义 | 通过设计文档检查 |

## 7. 交互检查

| 检查项 | 标准 | P1 状态 |
| --- | --- | --- |
| 路由参数 | `mallId`、`timeRange`、`floorId`、`storeId`、`alertId`、`mode` 等规则已定义 | 通过设计文档检查 |
| 筛选恢复 | 页面刷新后恢复筛选、选中店铺、楼层、模式和告警详情 | 通过设计文档检查 |
| 运营总览 | 楼层、店铺、告警卡片能跳转到对应页面 | 通过设计文档检查 |
| 数字孪生 | 店铺 hover/focus/click、楼层切换、模式切换、告警点击已定义 | 通过设计文档检查 |
| 店铺分析 | 筛选、列表选中、评分筛选、低效原因和空间定位已定义 | 通过设计文档检查 |
| 客群画像 | 楼层偏好和业态偏好跳转已定义 | 通过设计文档检查 |
| 低效预警 | 告警行选择、对象跳转和处理 Mock 状态已定义 | 通过设计文档检查 |
| 键盘操作 | 导航、筛选、表格、数字孪生、弹层和详情面板键盘规则已定义 | 通过设计文档检查 |

## 8. 响应式检查

P2 前端实现必须至少在以下视口通过人工或 Playwright 截图检查：

| 视口 | 通过标准 |
| --- | --- |
| 1920x1080 | 完整 App Shell、KPI、图表、列表和详情面板可读，不重叠 |
| 1440x900 | Sidebar 常驻或折叠后内容可读，筛选栏不遮挡 |
| 2560x1440 | 内容最大宽度受控，图表和表格不被过度拉伸 |
| 390x844 或 414x896 | 单列布局，表格卡片化或可访问，按钮文字不溢出 |

不允许通过：

```text
文字互相覆盖
按钮或标签文本溢出
Tooltip 遮挡焦点对象且无法关闭
图例遮挡关键图表内容
Sidebar 或抽屉遮挡主内容且无法关闭
移动端出现不可控横向滚动
数字孪生画布空白、比例错误或不可交互
```

## 9. 可访问性检查

| 检查项 | 标准 |
| --- | --- |
| 焦点 | 所有交互控件有可见焦点环 |
| Tab 顺序 | 符合视觉顺序，能跳过导航进入主内容 |
| ARIA | 图标按钮有 `aria-label`，当前导航有 `aria-current` |
| 图表 | 有文本摘要、单位、图例和表格 fallback |
| 状态 | 告警、评分、错误、趋势和热力不只靠颜色表达 |
| 键盘 | 表格行、店铺块、告警标记和弹层可键盘操作 |
| Reduced motion | 尊重 `prefers-reduced-motion`，非必要动画可关闭 |
| 对比度 | 正文 >= 4.5:1，大号关键数字 >= 3:1 |

## 10. 合规与许可证检查

| 检查项 | 标准 | P1 状态 |
| --- | --- | --- |
| 真实商场图 | 不使用真实商场平面图、BIM、地图瓦片或测绘资料 | 通过，文档要求自绘几何 |
| 品牌和 Logo | 不使用真实品牌 Logo、商户 Logo、门店招牌 | 通过，文档要求虚构店铺 |
| 监控和人物 | 不使用真实监控画面、人脸或个人图像 | 通过，文档要求 Mock/合成数据 |
| 个人轨迹 | 不展示个人级轨迹或可反推身份的小样本明细 | 通过，文档要求匿名聚合 |
| 付费服务 | 不引入付费开发工具、付费 API、付费模型、付费素材 | 通过，P1 未新增 |
| 第三方依赖 | P1 文档未新增依赖；P2 新增依赖时必须审计 | 通过，P2 需继续执行 |
| 数据库 | 后续数据库统一使用 MySQL，不按 PostgreSQL 规划 | 通过，已写入约束 |
| Python 环境 | 后续 backend/ 或 ai-services/ 重新创建虚拟环境 | 通过，已写入约束 |
| sudo | 需要 sudo 或系统级提权命令时 AI 停下来让人类执行 | 通过，已写入约束 |

## 11. P2 前端实现门禁

P2-I1 可以开始前，需要满足：

```text
P1-I1 到 P1-I4 设计文档存在
5 个核心路由已确定
App Shell、布局、token、组件、图表、交互和状态规则已确定
响应式和可访问性验收项已确定
Mock 数据范围已确定
不使用真实素材和付费服务的约束已确定
后续新增前端依赖必须进行许可证审计
```

P2-I1 允许做：

```text
创建 frontend/
初始化 React + TypeScript + Vite 工程
建立 5 个核心路由的空页面或占位页面
建立基础 AppShell、样式 token、测试框架和 lint/format 脚本
记录新增依赖许可证
运行可用的前端检查命令
```

P2-I1 不应做：

```text
不创建 backend/
不创建 ai-services/
不创建 infra/
不接真实 API
不接真实视频
不接真实商场图或品牌素材
不实现完整业务页面
不执行 sudo
```

## 12. P2 建议测试入口

P2-I1 完成后至少应提供以下命令或等价命令：

```text
cd frontend
npm run lint
npm run test
npm run build
```

如果引入 Playwright：

```text
cd frontend
npm run e2e
```

说明：如果浏览器安装、系统依赖或 `sudo` 被要求，AI 必须暂停并让人类执行；AI 不直接运行 sudo。

## 13. P1 设计评审结论

```text
P1 设计规范已具备进入 P2-I1 的文档门禁条件
P2-I1 的主目标是前端工程初始化，不应直接扩大到完整业务实现
P2 新增依赖、图标库、图表库、3D 库、测试工具或字体文件时必须更新许可证记录
P2 仍只能使用 Mock、合成、自绘数据和虚构店铺，不使用真实商场素材
```

## 14. P1-I4 检查清单

```text
已列出 P1 设计交付物
已定义信息架构评审项
已定义视觉、布局、组件、图表评审项
已定义交互、响应式和可访问性评审项
已定义合规和许可证评审项
已定义 P2 前端实现门禁
已定义 P2-I1 允许范围和禁止范围
未创建 frontend/
未创建 backend/
未创建 ai-services/
未创建 infra/
未引入新第三方依赖或外部素材
```
