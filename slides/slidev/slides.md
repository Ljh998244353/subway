---
theme: /home/ljh/slidev-theme-ustc
layout: cover
talkTitle: "商业综合体视觉 AI 数字孪生运营系统"
subtitle: "从客流感知到经营决策的智能运营驾驶舱"
presenter: "项目应用场景与系统方案汇报"
date: "2026 年 6 月"
sectionBar: true
sectionBarMode: minimal
figurePrefix: "图"
tablePrefix: "表"
---

<style src="./style.css"></style>

<div class="cover-shell">
  <div>
    <p class="eyebrow">Synthetic-first · Visual AI · Digital Twin OS</p>
    <h1>让商场运营从经验判断走向实时感知与智能决策</h1>
    <p>以合成、匿名、可审计数据为默认边界，融合 2D/3D 数字孪生、客流热力、店铺评分与经营建议。</p>
  </div>
  <div class="cover-orbit">
    <span></span><span></span><span></span>
    <b>AI<br/>Twin</b>
  </div>
</div>

<Takeaway>
把看不见的运营问题，变成可观察、可解释、可行动的决策信号。
</Takeaway>

---
layout: section
---

# 一、为什么值得用？

项目首先面向用户价值：管理者需要的不是更多屏幕，而是更快做出正确运营判断。

---
layout: split
---

# 传统商场运营的四个盲区

::left::

<div class="pain-stack">
  <div><b>客流看不清</b><span>只能看到总量，难以知道人群在哪聚集、在哪流失。</span></div>
  <div><b>空间效率难评估</b><span>楼层、通道、店铺之间缺乏统一对比指标。</span></div>
</div>

::right::

<div class="pain-stack">
  <div><b>异常响应慢</b><span>拥堵、低效区域、突发事件依赖人工巡查发现。</span></div>
  <div><b>建议不闭环</b><span>报表很多，但很难直接转化为具体运营动作。</span></div>
</div>

<Takeaway>
核心痛点不是“没有数据”，而是缺少能够指导行动的实时空间运营视角。
</Takeaway>

---
layout: content
---

# 价值主张：从监控大屏升级为运营智能体

<div class="value-ribbon">
  <div><b>实时看见</b><span>楼层、店铺、客流、热力、动线、告警统一呈现。</span></div>
  <div><b>智能诊断</b><span>识别拥堵、冷区、低效店铺与异常聚集。</span></div>
  <div><b>辅助决策</b><span>给出导视、活动、调度和店铺经营优化建议。</span></div>
  <div><b>安全演示</b><span>默认合成数据，不接真实监控、不展示个人轨迹。</span></div>
</div>

<ResultBox title="一句话价值">
系统不是“看视频”，而是把空间运营转化为可计算、可解释、可优化的决策过程。
</ResultBox>

---
layout: content
---

# 谁会使用：同一个商场，不同的决策视角

<div class="persona-grid four">
  <div><b>商场管理层</b><span>关注整体运营健康度、客流趋势、楼层效率和风险概览。</span><em>看全局</em></div>
  <div><b>运营人员</b><span>关注哪些区域需要现场处理、导视调整或活动干预。</span><em>管现场</em></div>
  <div><b>招商 / 店铺管理</b><span>关注店铺表现、业态效率、转化机会和调铺依据。</span><em>优店铺</em></div>
  <div><b>安防 / 物业</b><span>关注异常聚集、拥堵点位、处置线索和风险边界。</span><em>控风险</em></div>
</div>

<Callout type="info" title="面向用户的产品定位">
不同角色不需要学习复杂模型，只需要看到“当前最值得关注的问题”和“下一步建议动作”。
</Callout>

---
layout: section
---

# 二、怎么用起来？

围绕真实运营动作组织应用场景：看全局、定位问题、解释原因、给出建议。

---
layout: split
---

# 场景 1：管理层运营总览驾驶舱

::left::

<Block title="首屏回答的问题">

- 今天商场是否处于正常运营状态？
- 哪个楼层或区域最值得关注？
- 哪些店铺评分下滑或存在机会？
- 告警是否会影响用户体验和现场秩序？

</Block>

::right::

<div class="cockpit-card">
  <div><b>86.5</b><span>运营健康指数</span></div>
  <div><b>F2</b><span>当前热点楼层</span></div>
  <div><b>7</b><span>需关注店铺</span></div>
  <div class="wide"><b>AI 洞察</b><span>餐饮区热力上升，但通道拥堵正在压低部分店铺转化。</span></div>
</div>

<Takeaway>
管理者不需要切换多个报表，而是直接看到全场状态、核心风险和优先级。
</Takeaway>

---
layout: split
---

# 场景 2：2D/3D 数字孪生联动定位

::left::

<Block title="2D 平面视角">

- 快速定位店铺、通道、入口和扶梯
- 清楚展示热力、告警和区域分布
- 适合运营人员现场沟通与复盘

</Block>

::right::

<Block title="3D 空间视角">

- 呈现楼层关系、空间层级和跨区态势
- 适合管理汇报和沉浸式演示
- 与热力、动线、评分模式联动

</Block>

<div class="twin-toggle">
  <span class="active">2D floorplan</span>
  <i>⇄</i>
  <span>3D twin shell</span>
</div>

---
layout: content
---

# 场景 3：客流热力与动线分析

<div class="floor-heatmap">
  <div class="unit u1">零售</div>
  <div class="unit u2 hot">餐饮</div>
  <div class="unit u3">服务</div>
  <div class="unit u4 alert">拥堵</div>
  <div class="unit u5">休闲</div>
  <span class="heat h1"></span>
  <span class="heat h2"></span>
  <span class="flow f1"></span>
  <span class="flow f2"></span>
  <span class="flow f3"></span>
</div>

<div class="insight-row">
  <div><b>发现热点</b><span>识别人群聚集和高停留区域。</span></div>
  <div><b>判断动线</b><span>观察入口、扶梯、主通道的流向压力。</span></div>
  <div><b>解释冷区</b><span>辅助优化导视、活动点位和楼层组织。</span></div>
</div>

---
layout: split
---

# 场景 4：店铺经营评分与排名

::left::

<Block title="运营人员关心的问题">

- 哪些店铺当前表现最好？
- 哪些店铺拥有高客流但低转化？
- 哪些店铺受周边拥堵或冷区影响？
- 哪些店铺值得优先运营干预？

</Block>

::right::

<div class="rank-card">
  <div><b>01</b><span>轻食集合店</span><em>92.4</em></div>
  <div><b>02</b><span>生活方式店</span><em>88.1</em></div>
  <div class="warn"><b>17</b><span>潮流零售店</span><em>61.8</em></div>
  <div class="danger"><b>21</b><span>主题体验店</span><em>54.2</em></div>
</div>

<Takeaway>
评分不是给店铺贴标签，而是发现可优化的经营机会。
</Takeaway>

---
layout: split
---

# 场景 5：AI 经营建议变成具体动作

::left::

<Block title="系统观察到的信号">

- 店铺周边客流上升
- 店外停留热度不足
- 临近主通道出现拥堵
- 同业态评分排名下降

</Block>

::right::

<div class="advice-card">
  <b>建议动作</b>
  <span>调整入口陈列，提高路过客流捕获能力。</span>
  <span>在高峰时段增加外摆引导或促销触点。</span>
  <span>与邻近高热区联动活动，提升转化路径。</span>
</div>

<Callout type="tip" title="产品原则">
AI 建议只做辅助决策，真实运营动作仍由人工确认。
</Callout>

---
layout: section
---

# 三、为什么可信？

核心能力背后有可解释的理论框架、评分机制和 AI 策略链路。

---
layout: content
---

# 理论框架：数字孪生运营闭环

<div class="loop-diagram">
  <div><b>感知</b><span>热力、动线、告警、评分输入</span></div>
  <i>→</i>
  <div><b>建模</b><span>楼层、区域、店铺、通道、设施</span></div>
  <i>→</i>
  <div><b>评估</b><span>空间效率、风险等级、经营状态</span></div>
  <i>→</i>
  <div><b>决策</b><span>调度、导视、活动、店铺优化</span></div>
  <i>→</i>
  <div><b>反馈</b><span>观察策略效果并持续改进</span></div>
</div>

<Takeaway>
数字孪生的价值不只是“复刻一个商场”，而是让商场具备持续感知和持续优化能力。
</Takeaway>

---
layout: content
---

# 店铺打分原理：多因子加权评价

$$
Score_i =
w_1 T_i +
w_2 H_i +
w_3 F_i +
w_4 R_i -
w_5 A_i
$$

<div class="factor-grid">
  <div><b>$T_i$ 客流强度</b><span>店铺周边人流规模与入口曝光。</span></div>
  <div><b>$H_i$ 停留热度</b><span>顾客在店铺附近的兴趣与停留。</span></div>
  <div><b>$F_i$ 动线可达性</b><span>通道、入口、扶梯带来的可达程度。</span></div>
  <div><b>$R_i$ 趋势信号</b><span>近期增长、下滑或同业态变化。</span></div>
  <div><b>$A_i$ 风险惩罚</b><span>拥堵、异常、低效预警带来的扣分。</span></div>
</div>

<Callout type="info" title="解释方式">
每个店铺为什么高分或低分，都能追溯到客流、热力、动线、趋势和异常因素。
</Callout>

---
layout: content
---

# AI 策略原理：从感知到建议的链路

<div class="strategy-chain">
  <div><b>空间感知</b><span>收集合成热力、动线与告警信号</span></div>
  <div><b>聚合分析</b><span>按楼层、区域、店铺形成指标</span></div>
  <div><b>场景识别</b><span>判断高峰拥堵、冷区低效、异常聚集</span></div>
  <div><b>评分诊断</b><span>解释店铺或区域的关键影响因素</span></div>
  <div><b>策略建议</b><span>输出导视、活动、调度和经营建议</span></div>
</div>

<Callout type="tip" title="默认策略">
先用确定性规则保证可信；可选本地后端代理只作为增强路径，真实调用需要人工配置与确认。
</Callout>

---
layout: content
---

# 系统架构总览：展示、业务、服务、数据四层

<div class="arch-layers">
  <div><b>展示层</b><span>React · Next.js App Router · Tailwind · Three.js / R3F</span></div>
  <div><b>业务层</b><span>数字孪生工作台 · 店铺评分 · 经营建议 · 场景控制</span></div>
  <div><b>服务层</b><span>FastAPI · Pydantic · SQLAlchemy · 统一 API 契约</span></div>
  <div><b>数据与 AI 层</b><span>MySQL 规划 · 合成数据 · OpenCV 基线 · 可选本地智能代理</span></div>
</div>

<Callout type="info" title="架构重点">
前端负责交互与空间表达；后端负责契约、评分与建议接口；AI 服务负责合成视觉分析基线；MySQL 是未来真实事实数据源。
</Callout>

---
layout: content
---

# 数据流：从场景信号到运营决策

<div class="data-pipeline wide">
  <div><b>合成场景</b><span>客流密度、速度、事件、楼层状态</span></div>
  <i>→</i>
  <div><b>匿名聚合</b><span>不保留人脸、身份和个人轨迹</span></div>
  <i>→</i>
  <div><b>特征计算</b><span>热力、动线、停留、可达性、趋势</span></div>
  <i>→</i>
  <div><b>评分与告警</b><span>店铺分数、风险等级、原因标签</span></div>
  <i>→</i>
  <div><b>驾驶舱建议</b><span>可视化展示与经营动作建议</span></div>
</div>

<Takeaway>
数据不是直接堆到大屏上，而是经过聚合、评分和解释后服务决策。
</Takeaway>

---
layout: split
---

# 合规边界：演示可信，不越过真实数据红线

::left::

<Block title="当前坚持使用">

- 自绘几何与程序化 2D/3D 结构
- 虚构店铺与通用业态
- Mock / synthetic 默认数据
- 匿名聚合指标

</Block>

::right::

<Block title="当前明确不用">

- 真实监控视频、人脸和个人轨迹
- 未授权商场平面图、BIM/CAD 和地图
- 真实品牌、商户 Logo 和招牌
- 付费工具、外部素材服务和未知许可证资产

</Block>

<Callout type="warning" title="对外表达边界">
当前版本是安全演示与工程验证系统；真实上线前必须完成授权、隐私、安全、运维和合规评审。
</Callout>

---
layout: content
---

# 项目亮点：价值、视觉、工程、边界同时成立

<div class="highlight-grid">
  <div><b>高价值业务叙事</b><span>围绕管理层、运营、店铺和安防四类用户展开。</span></div>
  <div><b>高沉浸数字孪生</b><span>2D/3D 切换，热力、动线、评分和告警多模式展示。</span></div>
  <div><b>可解释 AI 原理</b><span>评分公式、因子解释和建议生成链路清楚可讲。</span></div>
  <div><b>工程架构清晰</b><span>前后端分层、API 契约、合成数据、未来 MySQL 路径明确。</span></div>
  <div><b>风险边界可审计</b><span>不接真实监控，不用真实品牌和平面图，不引入不清晰素材。</span></div>
  <div><b>可持续扩展</b><span>后续可扩展真实授权数据、预测预警和多商场协同。</span></div>
</div>

---
layout: end
---

# 未来愿景

<div class="roadmap-strip">
  <div><b>近期</b><span>完善店铺建议前端联动、评分解释和演示脚本。</span></div>
  <div><b>中期</b><span>增强 3D 回放、场景分享、拥堵预测和多楼层分析。</span></div>
  <div><b>远期</b><span>在授权前提下接入真实客流、设备和经营数据。</span></div>
</div>

<div class="final-statement">
  <b>让每一平方米空间都可感知、可评估、可优化</b>
  <span>让商业综合体运营从经验驱动，升级为数据与 AI 驱动。</span>
</div>
