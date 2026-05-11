# Frontend Demo Handoff

更新时间：2026-05-11

## Increment

```text
P2-I9 CP2 frontend demo closure and handoff
Primary role mode: QA Mode
Auxiliary checklists: Product, Frontend, Security/License, DevOps
```

## Demo Scope

CP2 前端 Demo 已覆盖 5 个核心业务页面：

| Route | Page | Demo focus | Data boundary |
| --- | --- | --- | --- |
| `/dashboard` | 运营总览 | KPI、客流趋势、楼层状态、低效店铺榜、告警摘要 | 虚构商场、Mock 聚合指标 |
| `/digital-twin` | 数字孪生 | 自绘楼层、热力、动线、告警、评分、空间检查器 | 自绘几何和合成坐标，不使用真实平面图 |
| `/store-analysis` | 店铺分析 | 店铺列表、筛选摘要、详情、评分拆解、低效原因 | 100 家虚构店铺和通用业态 |
| `/store-alerts` | 低效预警 | 告警列表、详情、状态统计、处理建议、关联入口 | 20 条虚构告警，不写真实审计 |
| `/customer-profile` | 客群画像 | 匿名聚合摘要、时段分布、楼层偏好、业态偏好 | 匿名聚合，无会员 ID、人脸或个人轨迹 |

P2-I9 不创建 `backend/`、`ai-services/` 或 `infra/`，不接真实 API、真实视频、真实商场平面图、真实地图、真实 BIM、真实品牌、个人图像或个人轨迹。

## Recommended Demo Paths

主线演示路径：

```text
/dashboard?mallId=M_DEMO&timeRange=today
  -> /digital-twin?mallId=M_DEMO&timeRange=today&floorId=F2&mode=heatmap
  -> /store-analysis?mallId=M_DEMO&timeRange=today&storeId=S008
  -> /store-alerts?mallId=M_DEMO&timeRange=today&alertId=A0002&storeId=S008&floorId=F1
```

客群画像分支：

```text
/customer-profile?mallId=M_DEMO&timeRange=30d
  -> /digital-twin?mallId=M_DEMO&timeRange=30d&floorId=F2&mode=flow
  -> /store-analysis?mallId=M_DEMO&timeRange=30d&category=餐饮
```

演示时优先说明：

```text
所有数据均为 Mock 或自绘合成数据
路由跳转保留 mallId 和 timeRange
数字孪生只展示聚合热力、流向和店铺级指标
客群画像只展示匿名聚合，不展示身份、会员、人脸或个人轨迹
P2 仍无后端、AI 服务、真实 API、CI 和浏览器 E2E
```

## Page Checklist

| Page | Check items |
| --- | --- |
| 运营总览 | KPI 单位和时间窗口可见；楼层、店铺、告警入口能跳转；Mock 数据说明可见 |
| 数字孪生 | 楼层切换和模式切换可用；SVG 平面非空；图例和右侧检查器可解释；不使用真实地图或平面图 |
| 店铺分析 | 筛选、选中店铺、评分拆解、低效原因和空间/告警入口可用；评分范围 0-100 |
| 低效预警 | 告警等级、状态、持续时间、建议动作和关联对象可读；状态仅为 Mock 展示 |
| 客群画像 | 时段、楼层、业态偏好可读；小样本隐藏和匿名聚合边界明确 |

## Current Test Report

Recommended commands:

```bash
cd frontend
npm run lint
npm run test
npm run build
npm audit --audit-level=high
```

Current automated coverage includes:

```text
route query preservation
CP2 demo readiness for five core routes and presentation paths
mock data volume and boundary checks
dashboard view model checks
store analysis view model checks
store alerts view model checks
digital twin view model and geometry checks
customer profile privacy, drill-down, empty and partial states
responsive CSS rule checks
```

Known test gaps:

```text
no browser E2E yet
no component test runner yet
no coverage report yet
no backend API tests because backend/ does not exist
no AI validation tests because ai-services/ does not exist
no CI pipeline because infra/ and CI are not started
```

## License And Privacy Boundary

P2-I9 adds no dependency, model, media, font, icon set, dataset, copied code, external API, cloud service, or paid tool. Existing third-party records remain in:

```text
docs/THIRD_PARTY_NOTICES.md
docs/LICENSE_AUDIT.md
```

Blocked unless separately approved and recorded:

```text
real mall maps, floor plans, BIM files, tenant layouts, or survey data
brand logos, merchant logos, shop signs, or trademarked product imagery
surveillance footage, real customer photos, face images, or identifiable personal data
paid development tools, paid SaaS, paid APIs, paid model services, paid assets
GPL/LGPL/AGPL dependencies in distributed product code
```

## P3 Handoff

Recommended next increment:

```text
P3-I1 engineering skeleton planning and quality gate alignment
Primary role mode: DevOps Mode
```

P3-I1 should prepare the engineering skeleton without changing product contracts:

```text
define monorepo quality gates and root scripts
decide CI checks for frontend lint/test/build/audit
document Docker Compose plan without creating production deployment promises
keep backend/ and ai-services/ creation for later bounded increments unless P3-I1 explicitly scopes them
continue using MySQL as the database target
stop for human action if sudo or system-level setup is required
```
