---
theme: default
title: 商业综合体视觉 AI 数字孪生运营系统
info: |
  面向管理层的功能介绍演示稿，内容来自需求分析、PRD 和系统设计文档。
class: mall-deck
transition: fade
canvasWidth: 1280
drawings:
  persist: false
mdc: true
---

<style src="./style.css"></style>

<section class="cover-shell">
  <div class="cover-copy">
    <p class="eyebrow">Management Briefing</p>
    <h1>商业综合体视觉 AI<br />数字孪生运营系统</h1>
    <p class="lead">让每一平方米的经营表现都看得见、说得清、可改进——客流、转化、评分、预警统一为实时运营决策工作台。</p>
    <div class="cover-tags">
      <span>运营总览</span>
      <span>数字孪生</span>
      <span>店铺评分</span>
      <span>低效预警</span>
      <span>匿名客群</span>
    </div>
  </div>
  <div class="hero-dashboard">
    <div class="dash-top">
      <span>Live Operation Twin</span>
      <b>08:00 - 22:00</b>
    </div>
    <div class="metric-row">
      <div><b>18,420</b><span>今日客流</span></div>
      <div><b>3,286</b><span>场内人数</span></div>
      <div><b>86.5</b><span>运营指数</span></div>
    </div>
    <div class="mini-floor">
      <i class="zone z1"></i>
      <i class="zone z2"></i>
      <i class="zone z3"></i>
      <i class="zone z4"></i>
      <i class="hotspot h1"></i>
      <i class="hotspot h2"></i>
      <i class="route r1"></i>
      <i class="route r2"></i>
    </div>
    <div class="alert-strip">
      <span>F3 轻度拥挤</span>
      <span>餐饮区转化下降</span>
      <span>D 级店铺 6 家</span>
    </div>
  </div>
</section>

---

# 业务痛点：为什么需要这套系统

<div class="problem-grid">
  <div v-click class="problem-card">
    <span class="index">01</span>
    <h3>信息分散，决策靠经验</h3>
    <p>客流、楼层、店铺、告警散落在不同报表和系统，管理层需要 30 分钟以上才能拼出全场状况。</p>
  </div>
  <div v-click class="problem-card">
    <span class="index">02</span>
    <h3>低效店铺发现太晚</h3>
    <p>等到月度结算才发现问题店铺，错过调铺窗口。高客流低转化、停留不足等深层原因无法及时诊断。</p>
  </div>
  <div v-click class="problem-card">
    <span class="index">03</span>
    <h3>空间价值看不清</h3>
    <p>哪个楼层最值钱？哪个角落是死角？缺少按楼层、业态、时段的空间数据，招商调铺全凭直觉。</p>
  </div>
  <div v-click class="problem-card">
    <span class="index">04</span>
    <h3>问题难追溯，结果难复盘</h3>
    <p>指标怎么算的？为什么触发预警？处理效果如何？缺乏从数据到决策的完整证据链。</p>
  </div>
</div>

<div v-click class="takeaway">系统定位：面向管理层的"空间 + 指标 + 告警 + 解释"统一运营决策工作台。</div>

---

# 目标用户：谁在用、为什么用

<div class="persona-grid">
  <div v-click><b>运营经理</b><span>掌握全场客流、拥挤和异常，快速定位问题区域</span><em>看总览 / 切楼层 / 定异常</em></div>
  <div v-click><b>招商负责人</b><span>评估店铺经营质量，发现调铺机会和风险</span><em>看评分 / 业态对比 / 低效原因</em></div>
  <div v-click><b>楼层主管</b><span>发现楼层局部拥堵和低转化问题</span><em>看热力 / 查进出店 / 现场调度</em></div>
  <div v-click><b>营销人员</b><span>评估活动时段客流和客群偏好</span><em>时段对比 / 匿名画像</em></div>
  <div v-click><b>安保人员</b><span>发现拥挤、异常停留和现场风险</span><em>处理告警 / 看状态 / 交接班</em></div>
  <div v-click><b>管理层</b><span>掌控全局运营态势，支撑经营决策</span><em>看趋势 / 审异常 / 定策略</em></div>
</div>

---

# 核心能力一览

<div class="capability-map">
  <div v-click class="cap-center">
    <span>Vision AI</span>
    <b>数字孪生运营中枢</b>
  </div>
  <div v-click class="cap-item cap-a"><b>运营总览</b><span>客流趋势、楼层状态、异常入口</span></div>
  <div v-click class="cap-item cap-b"><b>数字孪生</b><span>楼层热力、告警定位、历史回放</span></div>
  <div v-click class="cap-item cap-c"><b>店铺分析</b><span>进店、停留、转化、评分与经营解释</span></div>
  <div v-click class="cap-item cap-d"><b>客群画像</b><span>匿名聚合、业态偏好、时段对比</span></div>
  <div v-click class="cap-item cap-e"><b>低效预警</b><span>C/D 级店铺、下滑趋势、处理跟踪</span></div>
  <div v-click class="cap-item cap-f"><b>AI 事件追溯</b><span>指标来源可查、计算结果可审</span></div>
</div>

---

# 运营总览：一屏掌握全场状态

<div class="feature-layout">
  <div v-click class="feature-copy">
    <p class="eyebrow">Dashboard</p>
    <h2>从"翻报表"到"看现场"</h2>
    <ul class="feature-list">
      <li>场内人数、累计客流、拥挤指数一目了然，支持分时趋势与楼层对比</li>
      <li>异常区域和实时预警自动标记，一键跳转问题楼层或店铺</li>
      <li>覆盖加载、空数据、异常和权限不足等全部状态</li>
    </ul>
  </div>
  <div v-click class="screen-mock overview">
    <div class="screen-head"><b>运营总览</b><span>今日 14:35</span></div>
    <div class="kpis">
      <div><b>3,286</b><span>场内人数</span></div>
      <div><b>18,420</b><span>累计客流</span></div>
      <div><b>1.08</b><span>拥挤指数</span></div>
    </div>
    <div class="bar-chart animated-bars">
      <i style="--h: 42%"></i><i style="--h: 55%"></i><i style="--h: 38%"></i><i style="--h: 76%"></i><i style="--h: 68%"></i><i style="--h: 88%"></i><i style="--h: 61%"></i>
    </div>
    <div class="floor-pills"><span>F1 稳定</span><span>F2 上升</span><span class="warn">F3 拥挤</span><span>F4 稳定</span></div>
  </div>
</div>

---

# 数字孪生：把数据放回空间

<div class="twin-layout">
  <div v-click class="twin-canvas">
    <div class="floor-label">B1 - F5 / 自绘楼层平面</div>
    <div class="shop s-a">餐饮</div>
    <div class="shop s-b">零售</div>
    <div class="shop s-c">亲子</div>
    <div class="shop s-d">服务</div>
    <div class="shop s-e">娱乐</div>
    <div class="heat heat-a pulse"></div>
    <div class="heat heat-b pulse"></div>
    <div class="flow-line line-a"></div>
    <div class="flow-line line-b"></div>
  </div>
  <div v-click class="side-panel">
    <h3>空间联动能力</h3>
    <p>在运营地图上直接看到人流热力、动线走向和告警位置，一目了然地定位"哪里人多、哪里出问题"。</p>
    <div class="panel-list">
      <span>自绘楼层图</span>
      <span>热力叠加</span>
      <span>告警标记</span>
      <span>历史回放</span>
      <span>店铺详情联动</span>
      <span>运营动作入口</span>
    </div>
  </div>
</div>

---

# 店铺分析：解释经营表现

<div class="store-slide">
  <div v-click class="score-card">
    <span>Store Score</span>
    <b>76.4</b>
    <em>B 级 · 稳定</em>
  </div>
  <div v-click class="factor-grid">
    <div><b>客流得分</b><span>82 / 100</span><i style="--w:82%"></i></div>
    <div><b>转化得分</b><span>63 / 100</span><i style="--w:63%"></i></div>
    <div><b>停留得分</b><span>74 / 100</span><i style="--w:74%"></i></div>
    <div><b>趋势得分</b><span>86 / 100</span><i style="--w:86%"></i></div>
  </div>
  <div v-click class="analysis-copy">
    <h2>不仅排名，还说明原因</h2>
    <p>从进店、停留、转化、趋势四个维度解释经营表现，招商调铺和运营调整都有数据依据。</p>
    <div class="reason-tags"><span>高客流低转化</span><span>停留不足</span><span>连续下滑</span></div>
  </div>
</div>

---

# 低效预警：把问题变成可处理的任务

<div class="alert-board">
  <div v-click class="alert-copy">
    <p class="eyebrow">Alert Center</p>
    <h2>规则透明、等级明确、状态可追踪</h2>
    <p>每一条预警都带着原因说明、指标证据和处理建议，从"看到红点"到"完成处理"全流程闭环。</p>
  </div>
  <div class="alert-list">
    <div v-click class="alert-item high"><b>D 级店铺</b><span>评分 52.1，连续 3 日低于阈值</span><em>高</em></div>
    <div v-click class="alert-item mid"><b>高客流低转化</b><span>曝光高于 P75，转化低于 P25</span><em>中</em></div>
    <div v-click class="alert-item mid"><b>连续下滑</b><span>评分连续 3 个周期下降</span><em>中</em></div>
    <div v-click class="alert-item high"><b>数据异常</b><span>店内人数出现长期负值</span><em>高</em></div>
  </div>
</div>

---

# 客群画像：只做匿名聚合

<div class="profile-layout">
  <div v-click class="donut">
    <span>业态偏好</span>
  </div>
  <div v-click class="profile-copy">
    <h2>辅助营销决策，严格保护隐私</h2>
    <div class="profile-grid">
      <div><b>时段偏好</b><span>午间 / 晚高峰 / 周末</span></div>
      <div><b>楼层偏好</b><span>F1 零售、F3 餐饮、F5 娱乐</span></div>
      <div><b>业态偏好</b><span>餐饮、亲子、潮流零售</span></div>
      <div><b>活动对比</b><span>活动前后客流变化</span></div>
    </div>
    <p class="privacy-note">系统只展示匿名聚合统计，不存储人脸原图，不展示个人轨迹。</p>
  </div>
</div>

---

# 工作原理：从视频到决策

<div class="journey">
  <div v-click><b>1</b><span>视觉采集</span><em>摄像头覆盖全场，无死角监控关键区域</em></div>
  <div v-click><b>2</b><span>AI 分析</span><em>自动检测、追踪人员，判定进出店和停留</em></div>
  <div v-click><b>3</b><span>指标生成</span><em>客流、转化、评分等运营指标自动计算汇总</em></div>
  <div v-click><b>4</b><span>运营视图</span><em>总览、孪生、预警等多视图呈现，支撑决策</em></div>
  <div v-click><b>5</b><span>经营闭环</span><em>从发现问题到处理验证，全流程可追踪</em></div>
</div>

<div v-click class="audit-panel">
  <b>AI 输出全程可追溯</b>
  <span>每一步从原始视频到最终指标都有记录：模型版本、计算阈值、输入来源、输出结果都可审计——经营决策有据可查。</span>
</div>

---

# 核心指标：用数据衡量经营

<div class="metrics-grid">
  <div v-click class="metric-card"><b>场内实时人数</b><span>进入累计减去离开累计，反映当前承载状态</span></div>
  <div v-click class="metric-card"><b>进店转化率</b><span>进店人数占店铺曝光客流的比例</span></div>
  <div v-click class="metric-card"><b>平均停留时长</b><span>顾客在店内的平均驻留时间，衡量吸引力</span></div>
  <div v-click class="metric-card accent"><b>店铺综合评分</b><span>客流 30% + 转化 30% + 停留 20% + 趋势 20%</span></div>
  <div v-click class="metric-card"><b>拥挤指数</b><span>当前人数除以区域安全阈值，指导现场调度</span></div>
  <div v-click class="metric-card"><b>数据质量监控</b><span>自动检测负数、越界、重复等数据异常</span></div>
</div>

---

# 使用路径：从发现问题到解决问题

<div class="journey">
  <div v-click><b>1</b><span>打开运营总览</span><em>发现 F3 拥挤</em></div>
  <div v-click><b>2</b><span>进入数字孪生</span><em>定位餐饮区热力</em></div>
  <div v-click><b>3</b><span>查看店铺分析</span><em>确认高客流低转化</em></div>
  <div v-click><b>4</b><span>生成低效预警</span><em>分配运营动作</em></div>
  <div v-click><b>5</b><span>回看趋势</span><em>评估处理效果</em></div>
</div>

---

# 项目进展：当前阶段与下一步

<div class="role-matrix">
  <div v-click><b>P0 · 已完成</b><span>需求定义、产品边界、架构设计、合规基线</span></div>
  <div v-click><b>P1 · 已完成</b><span>设计规范、页面布局、组件和交互定义</span></div>
  <div v-click><b>P2 · 已完成</b><span>前端 Demo：5 个核心页面、Mock 数据、演示闭环</span></div>
  <div v-click><b>P3 · 进行中</b><span>后端骨架、CI 门禁、工程化质量基础</span></div>
  <div v-click><b>P4-P5 · 规划中</b><span>AI 视频服务、真实接入、生产部署</span></div>
</div>

<div v-click class="takeaway">当前阶段：前端 Demo 已交付，可完整演示五大功能模块。下一步进入后端工程化和质量门禁建设。</div>

---

# 演示版与真实上线边界

<div class="boundary-table">
  <div class="th">事项</div><div class="th">演示版方案</div><div class="th">真实上线要求</div>
  <div>数据来源</div><div>自制模拟数据</div><div>取得数据处理授权和留存策略</div>
  <div>视频素材</div><div>自制或合成视频</div><div>通过监控、肖像、隐私和安全评审</div>
  <div>楼层图</div><div>自绘几何平面</div><div>取得版权和物业授权</div>
  <div>店铺信息</div><div>虚构店铺和通用业态</div><div>取得商标和品牌授权</div>
  <div>顾客分析</div><div>匿名聚合统计</div><div>不默认识别身份或展示个人轨迹</div>
</div>

<div v-click class="compliance-note">合规红线：不使用真实监控画面、不存储人脸原图、不展示个人轨迹、不使用未授权素材、不引入付费服务。所有素材和依赖可追溯且有许可证记录。</div>

---

<section class="closing">
  <p class="eyebrow">Summary</p>
  <h1>面向运营决策的<br />视觉 AI 数字孪生系统</h1>
  <div class="closing-grid">
    <span>全局状态一屏掌握</span>
    <span>店铺表现可解释</span>
    <span>空间问题可定位</span>
    <span>决策依据可追溯</span>
  </div>
  <p>从演示版出发，使用合成数据与自绘空间，逐步走向可验证、可恢复、可合规的工程落地。</p>
</section>
