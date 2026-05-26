---
theme: /home/ljh/slidev-theme-ustc
layout: cover
talkTitle: "商业综合体视觉 AI 数字孪生运营系统"
subtitle: "Synthetic-first Visual AI Digital Twin for Mall Operations"
presenter: "工程项目汇报"
date: "2026 年 5 月"
sectionBar: true
sectionBarMode: minimal
figurePrefix: "图"
tablePrefix: "表"
---

<style src="./style.css"></style>

本项目以合成、匿名、可审计数据为起点，把客流、进出店、停留、热力、动线、店铺评分和低效预警统一到可解释的运营视图中。

<Takeaway>
面向商业综合体运营的核心价值：从“看见空间状态”走向“解释经营问题”。
</Takeaway>

---
layout: toc
columns: 2
highlight: 0
---

# 目录

---
layout: section
---

# 一、背景与目标

为什么商业综合体运营需要数字孪生工作台？

---
layout: split
---

# 项目问题：运营决策缺少空间证据

::left::

<div class="number-list">
  <div><b>01</b><span><strong>信息分散</strong><br/>客流、店铺、楼层和告警散落在不同视图。</span></div>
  <div><b>02</b><span><strong>空间价值不可见</strong><br/>高价值区域、冷区、拥挤点难以被连续观察。</span></div>
</div>

::right::

<div class="number-list">
  <div><b>03</b><span><strong>低效店铺发现滞后</strong><br/>高客流低转化、停留不足等问题常在复盘后才暴露。</span></div>
  <div><b>04</b><span><strong>告警缺少证据链</strong><br/>问题从哪里来、影响谁、如何处理，缺少闭环解释。</span></div>
</div>

<Takeaway>
系统要解决的不是“再做一个看板”，而是把空间、指标和处置串成可追踪的运营判断。
</Takeaway>

---
layout: content
---

# 系统目标：从视觉事件到运营决策

<Grid cols="2" gap="lg" alignY="top">
<div>

<Block title="功能目标">

- 全场状态一屏判断
- 楼层、店铺、热力、动线统一查看
- 低效店铺可诊断、可定位、可跟踪
- 匿名聚合画像支持时段与业态分析

</Block>

</div>
<div>

<Block title="工程目标">

- synthetic-first，先保证演示和测试可重复
- Mock/API mode 共存，逐步接入后端契约
- 关键边界可审计，真实数据接入后置
- 免费、可恢复、可维护优先

</Block>

</div>
</Grid>

<Takeaway>
一期目标是形成“可演示、可测试、可审计”的运营闭环，而不是直接承诺真实商场上线。
</Takeaway>

---
layout: content
---

# 用户与使用场景

<div class="persona-grid">
  <div><b>运营经理</b><span>巡检全场客流、拥挤和异常入口</span></div>
  <div><b>招商 / 调铺负责人</b><span>评估店铺效率、业态表现和调铺机会</span></div>
  <div><b>楼层主管</b><span>定位局部拥堵、冷区和异常店铺</span></div>
  <div><b>安保人员</b><span>关注拥挤、异常停留和现场处置状态</span></div>
  <div><b>数据分析人员</b><span>复盘时段、楼层、业态和评分变化</span></div>
</div>

<Callout type="info" title="设计原则">
界面应像专业运营控制台：克制、可信、清晰；保持信息密度，但不做装饰性大屏或营销页。
</Callout>

---
layout: toc
columns: 2
highlight: 2
---

# 目录

---
layout: section
---

# 二、功能闭环

五个页面共同完成从总览、定位、诊断到处置的业务路径。

---
layout: content
---

# 功能总览：五个核心页面

<div class="function-map">
  <div class="function-core">数字孪生<br/><span>运营中枢</span></div>
  <div><b>/dashboard</b><span>运营总览</span><small>KPI、趋势、楼层状态、告警摘要</small></div>
  <div><b>/digital-twin</b><span>数字孪生</span><small>3D 空间、热力、动线、告警、评分</small></div>
  <div><b>/store-analysis</b><span>店铺分析</span><small>进店、停留、转化、评分、原因解释</small></div>
  <div><b>/store-alerts</b><span>低效预警</span><small>C/D 店铺、连续下滑、处理建议</small></div>
  <div><b>/customer-profile</b><span>匿名客群</span><small>时段、楼层、业态偏好聚合</small></div>
</div>

<Takeaway>
每个页面不是孤立模块，而是服务同一条运营决策链。
</Takeaway>

---
layout: content
---

# 演示主线：上下文连续的业务流

<div class="flow-line">
  <div><b>Dashboard</b><span>发现全场风险</span></div>
  <i>→</i>
  <div><b>Digital Twin</b><span>定位楼层与店铺</span></div>
  <i>→</i>
  <div><b>Store Analysis</b><span>解释低效原因</span></div>
  <i>→</i>
  <div><b>Store Alerts</b><span>跟踪处置状态</span></div>
</div>

<div class="route-box">

```text
/dashboard?mallId=M_DEMO&timeRange=today
  -> /digital-twin?mallId=M_DEMO&timeRange=today&floorId=F2&mode=heatmap
  -> /store-analysis?mallId=M_DEMO&timeRange=today&storeId=S008
  -> /store-alerts?mallId=M_DEMO&timeRange=today&alertId=A0002
```

</div>

<Callout type="tip" title="演示重点">
路由跳转保留 mallId、timeRange、floorId、storeId 等上下文，让“发现问题 → 空间定位 → 店铺诊断 → 告警处置”保持连续。
</Callout>

---
layout: split
---

# 运营总览：一屏判断全场状态

::left::

<Block title="首屏回答的问题">

- 今天场内人数和累计客流是否异常？
- 哪个楼层拥挤或转化变差？
- 哪些店铺已进入低效风险？
- 告警是否需要现场处置？

</Block>

::right::

<div class="mini-dashboard">
  <div><b>18,420</b><span>今日客流</span></div>
  <div><b>3,286</b><span>场内人数</span></div>
  <div><b>86.5</b><span>运营指数</span></div>
  <div class="wide"><b>F2 餐饮区</b><span>热力上升，转化低于同业态均值</span></div>
</div>

<Takeaway>
运营总览负责“发现问题”，不是展示所有细节。
</Takeaway>

---
layout: content
---

# 3D 数字孪生：空间、热力、告警统一视图

<Grid cols="2" gap="lg" alignY="top">
<div>

<Block title="当前能力">

- Three / React Three Fiber 场景
- F2 本地 GLB 模型加载
- heatmap / flow / alerts / score 四种模式
- 店铺 hover、click、相机聚焦与联动入口

</Block>

</div>
<div>

<div class="twin-sketch">
  <div class="store s1">S021</div>
  <div class="store s2 hot">S028</div>
  <div class="store s3">S033</div>
  <div class="store s4 alert">S040</div>
  <span class="heat h1"></span>
  <span class="heat h2"></span>
  <span class="path p1"></span>
  <span class="path p2"></span>
</div>

</div>
</Grid>

<Takeaway>
数字孪生页是项目当前最强演示锚点：把空间位置、经营状态和告警证据放在同一张图上。
</Takeaway>

---
layout: split
---

# 数字孪生工程设计：模型与 fallback

::left::

<Block title="模型路径">

- `/models/mall_floor_f2.glb` 作为 F2 主模型
- Store 节点保留可映射命名
- URL-preserved GLB mode，默认可复现演示
- 加载中、错误状态和降级信息可见

</Block>

::right::

<Block title="降级路径">

- 非 F2 楼层明确走 procedural geometry
- 保留 SVG / 2.5D reference view
- 不依赖真实平面图、BIM、品牌素材
- 演示失败时仍能解释数据结构与交互关系

</Block>

<Takeaway>
fallback 不是临时补丁，而是 synthetic-first 工程策略的一部分：先保证演示可恢复，再逐步增强真实接入能力。
</Takeaway>

---
layout: content
---

# 店铺分析：把客流转化为经营解释

<div class="analysis-grid">
  <div><b>进店</b><span>入口流量与捕获能力</span></div>
  <div><b>停留</b><span>顾客兴趣和空间吸引力</span></div>
  <div><b>转化</b><span>高客流是否真正进入店铺</span></div>
  <div><b>评分</b><span>0–100 综合经营质量</span></div>
  <div><b>趋势</b><span>短期波动与连续下滑</span></div>
  <div><b>原因</b><span>低效标签与改进建议</span></div>
</div>

<Callout type="important" title="功能定位">
店铺分析不是简单排行，而是把“哪里低效”解释为“为什么低效、影响什么、下一步看哪里”。
</Callout>

---
layout: content
---

# 低效预警：从异常发现到处理建议

<Grid cols="2" gap="lg" alignY="top">
<div>

<Block title="预警类型">

- C/D 级店铺
- 高客流低转化
- 连续下滑
- 异常数据提示

</Block>

</div>
<div>

<Block title="处置闭环">

- 告警等级与持续时间
- 关联楼层、店铺和时段
- 处理建议与状态统计
- 回跳数字孪生和店铺分析

</Block>

</div>
</Grid>

<Takeaway>
告警页负责把“异常信号”变成“可处理任务”。
</Takeaway>

---
layout: content
---

# 匿名客群画像：只做聚合，不做识别

<div class="profile-cards">
  <div><b>时段分布</b><span>早晚高峰、午间、周末差异</span></div>
  <div><b>楼层偏好</b><span>不同楼层吸引力和停留结构</span></div>
  <div><b>业态偏好</b><span>餐饮、零售、服务等聚合倾向</span></div>
</div>

<Callout type="warning" title="隐私边界">
系统默认只展示匿名聚合指标；不做人脸识别，不展示个人级轨迹，不使用真实会员身份、手机号或顾客照片。
</Callout>

---
layout: toc
columns: 2
highlight: 3
---

# 目录

---
layout: section
---

# 三、架构与数据流

功能背后是可替换、可测试、可审计的工程链路。

---
layout: content
---

# 系统架构：四层协同

<div class="arch-grid">
  <div><b>Frontend Demo</b><span>React + TypeScript + Vite<br/>Dashboard / Twin / Store / Alerts / Profile</span></div>
  <div><b>Backend API</b><span>FastAPI / Pydantic / SQLAlchemy<br/>统一 `/api/v1` 契约</span></div>
  <div><b>AI Services</b><span>Synthetic video fixture<br/>OpenCV HOG baseline event output</span></div>
  <div><b>Data Layer</b><span>MySQL-oriented schema<br/>events / aggregates / scores / alerts / audit</span></div>
</div>

<Takeaway>
架构重点不是“堆栈复杂”，而是让前端演示、后端契约、AI 事件和数据模型能够逐步对齐。
</Takeaway>

---
layout: content
---

# 数据流：视觉事件如何形成运营指标

<div class="data-pipeline">
  <div><b>camera or synthetic video</b><span>真实接入前使用合成 fixture</span></div>
  <i>→</i>
  <div><b>AI event service</b><span>person / enter / exit / heatmap event</span></div>
  <i>→</i>
  <div><b>aggregation jobs</b><span>flow / dwell / conversion / score / alert</span></div>
  <i>→</i>
  <div><b>FastAPI /api/v1</b><span>标准响应与 OpenAPI 契约</span></div>
  <i>→</i>
  <div><b>React views</b><span>Dashboard 与 Digital Twin</span></div>
</div>

<Callout type="info" title="Mock/API mode 共存">
前端默认仍可使用 Mock / synthetic 数据；API mode 是显式路径，便于演示降级和契约验证。
</Callout>

---
layout: toc
columns: 2
highlight: 4
---

# 目录

---
layout: section
---

# 四、工程质量与边界

先保证可信演示，再讨论真实数据接入。

---
layout: split
---

# Synthetic-first 策略与合规边界

::left::

<Block title="为什么先做合成演示">

- 降低授权和隐私风险
- 测试可重复、问题可复现
- 便于打磨 3D 交互和业务流
- 为真实接入保留契约边界

</Block>

::right::

<Block title="当前明确不做">

- 不接真实商场数据
- 不接真实监控视频
- 不使用真实品牌或店铺标识
- 不展示个人轨迹或身份信息
- 不引入付费素材、服务或密钥依赖

</Block>

<Takeaway>
项目可信度来自边界清晰：哪些已经完成，哪些必须等授权、隐私和回滚方案确认后再做。
</Takeaway>

---
layout: content
---

# 当前进度与工程质量

<div class="milestone-line">
  <div><b>P0–P5</b><span>产品边界、前端 MVP、工程骨架、后端 API、Mock/API mode 联调</span></div>
  <div><b>P6</b><span>AI event schema 与 synthetic AI service baseline</span></div>
  <div><b>P7</b><span>premium light 3D digital twin、GLB 模型、交互与视觉打磨</span></div>
  <div><b>P8</b><span>production preparation 与 store score formula contract</span></div>
</div>

<ResultBox title="当前状态">
`/digital-twin` 已形成可演示的 3D 合成数字孪生主线；项目仍保持 Mock / synthetic 默认边界，真实数据接入后置。
</ResultBox>

---
layout: toc
columns: 2
highlight: 5
---

# 目录

---
layout: section
---

# 五、总结与下一步

从演示闭环走向可部署、可授权、可审计的工程系统。

---
layout: end
---

# 总结

以合成可审计数据为起点，项目已经形成商业综合体运营的可解释数字孪生决策闭环：

<div class="closing-grid">
  <div><b>功能闭环</b><span>总览 → 孪生 → 分析 → 预警 → 复盘</span></div>
  <div><b>工程闭环</b><span>前端演示 → API 契约 → AI 事件 → 数据模型</span></div>
  <div><b>风险闭环</b><span>Mock 默认、合成优先、真实接入前置审批</span></div>
</div>

<Takeaway>
下一步重点：深化评分与告警闭环、增强 3D 回放交互、推进后端契约与真实数据准入准备。
</Takeaway>
