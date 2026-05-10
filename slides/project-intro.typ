// Compile:
//   typst compile slides/project-intro.typ slides/slide.pdf
//
// Dependencies:
//   - Touying is fetched by Typst from @preview/touying.
//   - Recommended fonts: Noto Sans CJK SC for Chinese, Inter for Latin text.
//     Debian/Ubuntu: sudo apt install fonts-noto-cjk fonts-inter

#import "@preview/touying:0.7.3": *
#import themes.metropolis: *

#show: metropolis-theme.with(
  aspect-ratio: "16-9",
  config-info(
    title: [商业综合体视觉 AI 数字孪生运营系统],
    subtitle: [用视觉 AI 和数字孪生支撑商场运营决策],
    author: [课程设计汇报],
    date: datetime.today().display("[year]-[month]-[day]"),
  ),
)

#set text(font: ("Noto Sans CJK SC", "Inter", "Roboto"), lang: "zh")
#set par(justify: false, leading: 0.72em)

#let primary = rgb("#2f80ed")
#let success = rgb("#27ae60")
#let warning = rgb("#f2c94c")
#let danger = rgb("#eb5757")
#let ink = rgb("#1f2937")
#let muted = rgb("#64748b")
#let panel = rgb("#f8fafc")
#let border = rgb("#d7dee8")

#let chip(body, fill: primary) = box(
  inset: (x: 7pt, y: 3pt),
  radius: 99pt,
  fill: fill.lighten(82%),
  stroke: 0.6pt + fill.lighten(24%),
)[#text(size: 8.5pt, fill: fill.darken(18%), weight: "medium")[#body]]

#let card(title, body, fill: panel, accent: primary, height: auto) = block(
  width: 100%,
  height: height,
  inset: 12pt,
  radius: 4pt,
  fill: fill,
  stroke: (left: 3pt + accent, rest: 0.7pt + border),
)[
  #text(size: 14pt, weight: "bold", fill: ink)[#title]
  #v(0.10in)
  #text(size: 10.5pt, fill: muted)[#body]
]

#let metric(name, desc, accent: primary) = block(
  width: 100%,
  height: 0.76in,
  inset: 9pt,
  radius: 4pt,
  fill: accent.lighten(88%),
  stroke: 0.6pt + accent.lighten(32%),
)[
  #text(size: 13pt, weight: "bold", fill: accent.darken(18%))[#name]
  #v(0.04in)
  #text(size: 8.7pt, fill: ink)[#desc]
]

#let mini_map() = box(width: 4.25in, height: 3.25in)[
  #place(center)[
    #rect(width: 3.95in, height: 3.0in, radius: 5pt, fill: rgb("#f8fafc"), stroke: 0.8pt + border)
  ]
  #place(center, dx: -0.96in, dy: -0.64in)[#rect(width: 1.18in, height: 0.52in, radius: 3pt, fill: primary.lighten(64%), stroke: 0.6pt + primary)]
  #place(center, dx: 0.42in, dy: -0.64in)[#rect(width: 1.50in, height: 0.52in, radius: 3pt, fill: panel, stroke: 0.6pt + border)]
  #place(center, dx: -0.88in, dy: 0.08in)[#rect(width: 1.32in, height: 0.70in, radius: 3pt, fill: panel, stroke: 0.6pt + border)]
  #place(center, dx: 0.62in, dy: 0.11in)[#rect(width: 1.52in, height: 0.70in, radius: 3pt, fill: warning.lighten(72%), stroke: 0.6pt + warning)]
  #place(center, dx: -0.12in, dy: 0.88in)[#rect(width: 2.20in, height: 0.48in, radius: 3pt, fill: success.lighten(72%), stroke: 0.6pt + success)]
  #place(center, dx: -1.45in, dy: 1.22in)[#circle(radius: 5pt, fill: primary)]
  #place(center, dx: -0.78in, dy: 0.92in)[#circle(radius: 4pt, fill: primary.lighten(15%))]
  #place(center, dx: 0.08in, dy: 0.55in)[#circle(radius: 5pt, fill: warning)]
  #place(center, dx: 0.88in, dy: 0.14in)[#circle(radius: 4pt, fill: danger)]
  #place(center, dx: 1.40in, dy: -0.32in)[#circle(radius: 4pt, fill: primary.lighten(10%))]
]

#let flow_step(title, desc, accent: primary) = block(
  width: 1.78in,
  height: 0.92in,
  inset: 9pt,
  radius: 4pt,
  fill: accent.lighten(86%),
  stroke: 0.7pt + accent.lighten(26%),
)[
  #text(size: 12.2pt, weight: "bold", fill: accent.darken(18%))[#title]
  #v(0.05in)
  #text(size: 8.4pt, fill: ink)[#desc]
]

#title-slide[
  #align(horizon)[
    #grid(
      columns: (1.25fr, 0.75fr),
      gutter: 0.40in,
      [
        #text(size: 33pt, weight: "bold")[商业综合体视觉 AI\ 数字孪生运营系统]
        #v(0.24in)
        #text(size: 15pt, fill: muted)[用匿名视觉事件和空间孪生，把商场运营从经验判断推进到数据证据。]
        #v(0.26in)
        #stack(dir: ltr, spacing: 6pt)[
          #chip[课程设计汇报]
          #chip(fill: warning)[P0 尚未开始]
          #chip(fill: success)[单 AI 分阶段交付]
        ]
      ],
      [
        #mini_map()
      ],
    )
  ]
]

#slide(title: [项目价值：从报表到现场态势])[
  #grid(
    columns: (1.05fr, 0.95fr),
    gutter: 0.40in,
    [
      #text(size: 25pt, weight: "bold")[让商场从“事后看报表”变成“现场看状态”。]
      #v(0.30in)
      #text(size: 14pt)[项目不只是做一个大屏，而是把视觉 AI 产生的匿名事件转成运营人员能解释、能追溯、能行动的指标体系。]
    ],
    [
      #stack(spacing: 0.13in)[
        #card([空间价值可见], [识别楼层冷热点、拥挤区域、节点流量和动线效率。], accent: primary)
        #card([店铺表现可解释], [把进店、停留、转化、趋势和业态匹配放到统一口径下。], accent: success)
        #card([运营动作可闭环], [为招商、调铺、营销、安保和现场运营提供连续证据。], accent: warning)
      ]
    ],
  )
]

#slide(title: [业务痛点：运营决策缺少空间证据])[
  #grid(
    columns: (1fr, 1fr, 1fr),
    gutter: 0.22in,
    [
      #card([看不清], [客流集中在哪里、冷区在哪里、拥挤点在哪里，现场通常依赖巡场和经验。], accent: primary, height: 1.55in)
    ],
    [
      #card([说不清], [店铺低效到底来自客流、转化、停留还是业态匹配，缺少统一指标口径。], accent: warning, height: 1.55in)
    ],
    [
      #card([改不动], [招商、调铺、营销需要空间证据和连续数据，否则很难形成决策闭环。], accent: danger, height: 1.55in)
    ],
  )
  #v(0.34in)
  #block(width: 100%, inset: 15pt, radius: 4pt, fill: rgb("#f8fafc"), stroke: 0.7pt + border)[
    #text(size: 17pt, weight: "bold")[项目切入点]
    #v(0.12in)
    #text(size: 13pt)[把商场运营中最常见的“人、店、空间、时间”四类问题，统一到可视化、可追溯、可验收的数据系统里。]
  ]
]

#slide(title: [目标用户与使用场景])[
  #grid(
    columns: (1fr, 1fr),
    gutter: 0.22in,
    [
      #card([商场运营负责人], [查看整体客流、拥挤趋势、楼层状态和经营目标达成。], accent: primary)
    ],
    [
      #card([楼层经理], [定位本楼层冷热点、异常店铺和现场处理优先级。], accent: success)
    ],
    [
      #card([招商主管], [分析业态匹配、低效点位和租金人流关系，支撑调铺招商。], accent: warning)
    ],
    [
      #card([物业安保 / 运维], [关注拥挤区域、异常客流、设备状态和系统可用性。], accent: danger)
    ],
  )
  #v(0.24in)
  #text(size: 14pt, fill: muted)[共同诉求：少凭感觉，多看证据；少等报表，多看实时态势。]
]

#slide(title: [产品能力地图])[
  #grid(
    columns: (1fr, 1fr, 1fr),
    gutter: 0.18in,
    [#card([运营总览], [场内人数、累计客流、楼层趋势、拥挤状态。], accent: primary, height: 1.20in)],
    [#card([店铺分析], [进店、停留、转化、评分、趋势解释。], accent: success, height: 1.20in)],
    [#card([低效预警], [C/D 级店铺、高客流低转化、连续下滑。], accent: warning, height: 1.20in)],
    [#card([客群画像], [匿名聚合的时间段、业态、楼层偏好。], accent: primary, height: 1.20in)],
    [#card([热力动线], [冷区、热点、节点流量、匿名路径聚合。], accent: danger, height: 1.20in)],
    [#card([数字孪生], [楼层、店铺、热力、预警和历史回放联动。], accent: success, height: 1.20in)],
  )
]

#slide(title: [核心指标口径])[
  #grid(
    columns: (1fr, 1fr, 1fr),
    gutter: 0.14in,
    [#metric([场内人数], [当前窗口内未离场的匿名人数估计])],
    [#metric([累计客流], [当日进入商场的匿名人数或人次])],
    [#metric([进店人数], [进入店铺 ROI 或跨越进店线的人次], accent: success)],
    [#metric([转化率], [疑似消费人数或人次 / 进店人数或人次], accent: success)],
    [#metric([停留时长], [visit session 的 exit - enter], accent: warning)],
    [#metric([店铺评分], [配置化评分模型输出，必须可解释], accent: warning)],
    [#metric([热力值], [匿名聚合空间停留或经过强度], accent: danger)],
    [#metric([节点流量], [关键通道、扶梯、中庭等节点通过量])],
    [#metric([预警数], [按规则生成的低效和异常店铺数量], accent: danger)],
  )
]

#slide(title: [数据闭环：从视频到运营动作])[
  #grid(
    columns: (1fr, 0.18in, 1fr, 0.18in, 1fr, 0.18in, 1fr, 0.18in, 1fr),
    gutter: 0.04in,
    [#flow_step([视频输入], [本地 MP4 / RTSP / 合成测试])],
    [#align(center + horizon)[#text(size: 20pt, fill: muted)[→]]],
    [#flow_step([AI 识别], [检测、追踪、ROI 进出计数], accent: success)],
    [#align(center + horizon)[#text(size: 20pt, fill: muted)[→]]],
    [#flow_step([事件沉淀], [进店、离店、轨迹、热力事件], accent: warning)],
    [#align(center + horizon)[#text(size: 20pt, fill: muted)[→]]],
    [#flow_step([指标聚合], [客流、转化、停留、评分])],
    [#align(center + horizon)[#text(size: 20pt, fill: muted)[→]]],
    [#flow_step([运营决策], [预警、调铺、营销、招商], accent: danger)],
  )
  #v(0.42in)
  #grid(
    columns: (1fr, 1fr, 1fr),
    gutter: 0.20in,
    [#card([事实来源], [事件是事实来源，统计结果必须可复现。], accent: primary)],
    [#card([隐私边界], [只展示匿名聚合，不展示个人轨迹。], accent: success)],
    [#card([审计要求], [模型、阈值、准确率和限制必须可审计。], accent: warning)],
  )
]

#slide(title: [技术架构：演示价值先行，真实闭环接入])[
  #grid(
    columns: (1fr, 1fr, 1fr, 1fr),
    gutter: 0.16in,
    [#card([前端], [React / TypeScript / Vite\ ECharts / Three.js\ Vitest / Playwright], accent: primary, height: 1.45in)],
    [#card([后端], [FastAPI / Pydantic\ SQLAlchemy / Alembic\ PostgreSQL / Redis], accent: success, height: 1.45in)],
    [#card([AI 视频], [视频接入\ 人体检测与追踪\ ROI / 进出计数], accent: warning, height: 1.45in)],
    [#card([工程化], [Docker Compose\ CI 质量门禁\ 监控 / 备份 / 部署], accent: danger, height: 1.45in)],
  )
  #v(0.34in)
  #block(width: 100%, inset: 15pt, radius: 4pt, fill: rgb("#f8fafc"), stroke: 0.7pt + border)[
    #text(size: 16pt, weight: "bold")[实施策略]
    #v(0.12in)
    #text(size: 12.5pt)[P2 先用 Mock 数据形成 5 个核心页面，P4-P5 用真实 API 和数据库替换 Mock，P6 之后接入 AI 视频事件，P9 做可交付 3D 数字孪生。]
  ]
]

#slide(title: [数字孪生展示：空间状态与运营动作联动])[
  #grid(
    columns: (0.88fr, 1.12fr),
    gutter: 0.40in,
    [
      #mini_map()
    ],
    [
      #text(size: 19pt, weight: "bold")[从平面指标到空间运营视图]
      #v(0.22in)
      #grid(
        columns: (1fr, 1fr),
        gutter: 0.16in,
        [#card([楼层切换], [按楼层查看客流、热力和店铺状态。], accent: primary)],
        [#card([店铺拾取], [点击店铺查看进店、停留、评分和预警。], accent: success)],
        [#card([热力叠加], [冷区、热点、拥挤区域在空间中直接呈现。], accent: warning)],
        [#card([历史回放], [按时间轴回放运营状态变化和预警演化。], accent: danger)],
      )
    ],
  )
]

#slide(title: [当前状态与后续路线])[
  #grid(
    columns: (1fr, 1fr),
    gutter: 0.28in,
    [
      #card([当前状态], [已完成 README、AI_Schedule、PROGRESS、项目 skill 和项目介绍 slide；尚未创建 docs/ 与 context/，尚未开始前端、后端和 AI 视频服务。], accent: warning, height: 2.05in)
    ],
    [
      #card([下一步重点], [执行 P0，固化 PRD、用户故事、验收标准、指标定义、测试策略和 context 恢复包。], accent: success, height: 2.05in)
    ],
  )
  #v(0.28in)
  #grid(
    columns: (1fr, 1fr, 1fr),
    gutter: 0.18in,
    [#metric([P0-P2], [先完成项目基线、设计规范和可演示前端 Demo], accent: primary)],
    [#metric([P4-P6], [补真实 API、数据库和 AI 视频事件接入], accent: warning)],
    [#metric([P7-P9], [完善评分、热力动线和 3D 数字孪生], accent: success)],
  )
]
