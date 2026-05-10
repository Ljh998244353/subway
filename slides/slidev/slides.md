---
theme: default
title: 商业综合体视觉 AI 数字孪生运营系统
info: |
  基于 Slidev 制作的功能介绍演示稿。内容来自当前 P0 需求分析、PRD 和系统设计文档。
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
    <p class="eyebrow">Feature Introduction</p>
    <h1>商业综合体视觉 AI<br />数字孪生运营系统</h1>
    <p class="lead">把客流、进出店、停留、热力、动线、店铺评分和低效预警统一到可解释的运营视图中，辅助招商、调铺、营销、安保和现场运营决策。</p>
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

# 为什么需要这套系统

<div class="problem-grid">
  <div v-click class="problem-card">
    <span class="index">01</span>
    <h3>现场状态分散</h3>
    <p>客流、楼层、店铺和告警常常分散在不同报表，难以及时形成全局判断。</p>
  </div>
  <div v-click class="problem-card">
    <span class="index">02</span>
    <h3>低效店铺识别滞后</h3>
    <p>只看销售或人工巡场，无法解释高客流低转化、停留不足和连续下滑。</p>
  </div>
  <div v-click class="problem-card">
    <span class="index">03</span>
    <h3>空间热力不可行动</h3>
    <p>缺少楼层、业态、店铺和时间窗口的统一空间视图，现场调度效率低。</p>
  </div>
  <div v-click class="problem-card">
    <span class="index">04</span>
    <h3>AI 输出难审计</h3>
    <p>模型、阈值、事件、指标和告警需要可追溯，否则难以复盘与验收。</p>
  </div>
</div>

<div v-click class="takeaway">系统定位：面向运营决策的“空间 + 指标 + 告警 + 解释”统一工作台。</div>

---

# 目标用户与核心工作

<div class="persona-grid">
  <div v-click><b>运营经理</b><span>快速理解全场客流、拥挤、异常和趋势</span><em>查看总览 / 切楼层 / 定位异常</em></div>
  <div v-click><b>招商负责人</b><span>判断店铺经营质量和调铺风险</span><em>看评分 / 业态对比 / 低效原因</em></div>
  <div v-click><b>楼层主管</b><span>发现楼层局部拥堵和低转化问题</span><em>看热力 / 查进出店 / 巡场调度</em></div>
  <div v-click><b>营销人员</b><span>评估活动时段客流和业态偏好</span><em>做时段对比 / 看匿名画像</em></div>
  <div v-click><b>安保人员</b><span>发现拥挤、异常停留和现场风险</span><em>处理告警 / 看状态 / 做交接</em></div>
  <div v-click><b>系统管理员</b><span>管理账号、权限、配置和审计记录</span><em>RBAC / 操作日志 / 配置审计</em></div>
</div>

---

# 核心能力地图

<div class="capability-map">
  <div v-click class="cap-center">
    <span>Vision AI</span>
    <b>数字孪生运营中枢</b>
  </div>
  <div v-click class="cap-item cap-a"><b>运营总览</b><span>客流、趋势、楼层状态、异常入口</span></div>
  <div v-click class="cap-item cap-b"><b>数字孪生</b><span>楼层、热力、告警、历史回放</span></div>
  <div v-click class="cap-item cap-c"><b>店铺分析</b><span>进店、停留、转化、评分、解释</span></div>
  <div v-click class="cap-item cap-d"><b>客群画像</b><span>匿名聚合、业态偏好、时段对比</span></div>
  <div v-click class="cap-item cap-e"><b>低效预警</b><span>C/D 级、下滑、数据异常、处理状态</span></div>
  <div v-click class="cap-item cap-f"><b>AI 事件</b><span>ROI、线段、热力、动线、审计字段</span></div>
</div>

---

# 运营总览：一屏掌握全场状态

<div class="feature-layout">
  <div v-click class="feature-copy">
    <p class="eyebrow">Dashboard</p>
    <h2>从“看数据”变成“看现场”</h2>
    <ul class="feature-list">
      <li>当前场内人数、今日累计客流、峰值客流</li>
      <li>楼层拥挤指数、异常区域、实时预警</li>
      <li>分时趋势、楼层对比、重点区域跳转</li>
      <li>空态、加载、错误、权限不足状态完整覆盖</li>
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

# 数字孪生：把指标放回空间

<div class="twin-layout">
  <div v-click class="twin-canvas">
    <div class="floor-label">B1 - F5 / synthetic floor plan</div>
    <div class="shop s-a">餐饮</div>
    <div class="shop s-b">零售</div>
    <div class="shop s-c">亲子</div>
    <div class="shop s-d">服务</div>
    <div class="shop s-e">娱乐</div>
    <div class="heat heat-a pulse"></div>
    <div class="heat heat-b pulse"></div>
    <div class="heat heat-c pulse"></div>
    <div class="flow-line line-a"></div>
    <div class="flow-line line-b"></div>
  </div>
  <div v-click class="side-panel">
    <h3>空间联动能力</h3>
    <p>楼层切换、店铺点击、热力查看、告警定位和历史回放全部围绕同一张运营地图展开。</p>
    <div class="panel-list">
      <span>自绘楼层图</span>
      <span>热力叠加</span>
      <span>告警标记</span>
      <span>历史时间轴</span>
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
    <h2>不仅排名，还要说明原因</h2>
    <p>通过进店、停留、转化、趋势四类指标，解释店铺为什么高效或低效，为招商、调铺和运营动作提供依据。</p>
    <div class="reason-tags"><span>高客流低转化</span><span>停留不足</span><span>连续下滑</span></div>
  </div>
</div>

---

# 低效预警：把问题变成可处理队列

<div class="alert-board">
  <div v-click class="alert-copy">
    <p class="eyebrow">Alert Center</p>
    <h2>规则透明、等级明确、状态可追踪</h2>
    <p>预警不只是红点，而是带有原因、指标证据、处理建议和状态流转的运营任务。</p>
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
    <h2>辅助营销，不触碰个人身份</h2>
    <div class="profile-grid">
      <div><b>时段偏好</b><span>午间 / 晚高峰 / 周末</span></div>
      <div><b>楼层偏好</b><span>F1 零售、F3 餐饮、F5 娱乐</span></div>
      <div><b>业态偏好</b><span>餐饮、亲子、潮流零售</span></div>
      <div><b>活动对比</b><span>活动前后客流变化</span></div>
    </div>
    <p class="privacy-note">系统默认展示匿名聚合统计，不存储人脸原图，不展示个人轨迹。</p>
  </div>
</div>

---

# AI 事件闭环：从视频到运营指标

<div class="pipeline">
  <div v-click><b>合成视频 / 摄像头</b><span>输入源标记</span></div>
  <i></i>
  <div v-click><b>检测与追踪</b><span>模型版本、阈值</span></div>
  <i></i>
  <div v-click><b>ROI / 线段</b><span>进出方向、停留</span></div>
  <i></i>
  <div v-click><b>事件输出</b><span>稳定 ID、幂等键</span></div>
  <i></i>
  <div v-click><b>统计聚合</b><span>客流、转化、评分</span></div>
  <i></i>
  <div v-click><b>运营视图</b><span>总览、孪生、告警</span></div>
</div>

<div v-click class="audit-panel">
  <b>AI 输出必须可审计</b>
  <span>模型名 · 版本 · 许可证 · 阈值 · 输入源 · 输出 schema · FPS · 准确率 · 限制说明</span>
</div>

---

# 指标体系：从事件事实到经营评分

<div class="metrics-grid">
  <div v-click class="metric-card"><b>当前场内人数</b><span>进入累计 - 离开累计</span></div>
  <div v-click class="metric-card"><b>进店转化率</b><span>进店人数 / 曝光客流</span></div>
  <div v-click class="metric-card"><b>平均停留时长</b><span>访问会话持续时间均值</span></div>
  <div v-click class="metric-card"><b>拥挤指数</b><span>当前人数 / 区域阈值</span></div>
  <div v-click class="metric-card accent"><b>店铺评分</b><span>客流 30% + 转化 30% + 停留 20% + 趋势 20%</span></div>
  <div v-click class="metric-card"><b>数据质量</b><span>负数、越界、重复、跨天边界</span></div>
</div>

---

# 数据质量：让指标可信

<div class="quality-board">
  <div v-click><b>幂等消费</b><span>所有事件必须有稳定事件 ID 或幂等键，重复事件不能改变统计结果。</span></div>
  <div v-click><b>边界保护</b><span>转化率必须在 0-100%，评分必须在 0-100，停留时长不能小于 0。</span></div>
  <div v-click><b>营业日口径</b><span>跨天统计按营业日边界处理，避免深夜客流被错误归档。</span></div>
  <div v-click><b>异常反馈</b><span>负人数、越界热力、长时间断流会进入数据异常预警。</span></div>
</div>

---

# 权限与审计：角色看到该看的内容

<div class="role-matrix">
  <div v-click class="role-card admin"><b>Admin</b><span>用户、权限、配置、审计</span></div>
  <div v-click class="role-card ops"><b>Operator</b><span>总览、楼层、告警处理</span></div>
  <div v-click class="role-card lease"><b>Leasing</b><span>店铺分析、评分、业态对比</span></div>
  <div v-click class="role-card security"><b>Security</b><span>拥挤、异常、现场状态</span></div>
  <div v-click class="role-card readonly"><b>Readonly</b><span>授权范围内只读查看</span></div>
</div>

<div class="audit-flow">
  <span>登录</span><span>配置变更</span><span>告警处理</span><span>权限调整</span><span>审计日志</span>
</div>

---

# 演示版与真实上线边界

<div class="boundary-table">
  <div class="th">事项</div><div class="th">演示版允许</div><div class="th">真实上线要求</div>
  <div>数据来源</div><div>Mock、合成、自绘数据</div><div>数据处理授权和留存策略</div>
  <div>视频素材</div><div>自制或合成视频</div><div>监控、肖像、隐私和安全评审</div>
  <div>楼层图</div><div>自绘几何平面</div><div>版权、物业授权和测绘限制确认</div>
  <div>店铺名称</div><div>虚构店铺和通用业态</div><div>商标、品牌和合同授权</div>
  <div>顾客分析</div><div>匿名聚合统计</div><div>不默认识别身份或展示个人轨迹</div>
</div>

<div v-click class="compliance-note">演示稿和后续 Demo 均使用自绘图形与合成数据，不使用真实商场资料、品牌资产或监控画面。</div>

---

# 产品页面一览

<div class="page-grid">
  <div v-click><b>/dashboard</b><span>运营总览大屏</span></div>
  <div v-click><b>/digital-twin</b><span>2.5D / 简易 3D 数字孪生</span></div>
  <div v-click><b>/store-analysis</b><span>店铺经营分析</span></div>
  <div v-click><b>/customer-profile</b><span>匿名客群画像</span></div>
  <div v-click><b>/store-alerts</b><span>低效店铺预警</span></div>
</div>

<div v-click class="state-strip">
  <span>加载态</span>
  <span>空态</span>
  <span>错误态</span>
  <span>权限不足</span>
  <span>Mock/API 双模式</span>
</div>

---

# 使用路径：从总览到行动

<div class="journey">
  <div v-click><b>1</b><span>打开运营总览</span><em>发现 F3 拥挤</em></div>
  <div v-click><b>2</b><span>进入数字孪生</span><em>定位餐饮区热力</em></div>
  <div v-click><b>3</b><span>查看店铺分析</span><em>确认高客流低转化</em></div>
  <div v-click><b>4</b><span>生成低效预警</span><em>分配运营动作</em></div>
  <div v-click><b>5</b><span>回看趋势</span><em>评估处理效果</em></div>
</div>

---

# 技术支撑：先演示，再工程化

<div class="tech-stack">
  <div v-click><b>Frontend</b><span>React + TypeScript + Vite<br />ECharts + Three.js</span></div>
  <div v-click><b>Backend</b><span>FastAPI + Pydantic<br />SQLAlchemy + Alembic</span></div>
  <div v-click><b>Data</b><span>PostgreSQL source of truth<br />Redis cache only</span></div>
  <div v-click><b>AI Services</b><span>Detection + Tracking<br />ROI / Line Counting</span></div>
  <div v-click><b>Quality</b><span>Vitest + Playwright + Pytest<br />License / Privacy gates</span></div>
</div>

---

# 交付路线

<div class="roadmap">
  <div v-click class="done"><b>P0</b><span>需求、设计、测试与上下文基线</span></div>
  <div v-click class="next"><b>P1</b><span>信息架构与页面范围</span></div>
  <div v-click><b>P2</b><span>前端 Demo MVP</span></div>
  <div v-click><b>P3</b><span>工程化骨架</span></div>
  <div v-click><b>P4</b><span>后端 API 与数据模型</span></div>
  <div v-click><b>P6+</b><span>AI 视频、评分、热力、数字孪生</span></div>
</div>

<div class="next-action">下一步：P1-I1 信息架构与页面范围，输出 docs/design/SCREEN_LAYOUTS.md。</div>

---

<section class="closing">
  <p class="eyebrow">Summary</p>
  <h1>面向运营行动的<br />视觉 AI 数字孪生系统</h1>
  <div class="closing-grid">
    <span>看全场状态</span>
    <span>解释店铺表现</span>
    <span>定位空间问题</span>
    <span>沉淀可审计事件</span>
  </div>
  <p>从演示版开始，使用合成数据和自绘空间，逐步走向可测试、可恢复、可合规的工程实现。</p>
</section>
