import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';

type ViewMode = '全局动线' | '热力分布' | '招商调铺' | '安全预警';
type FloorLevel = 'L1' | 'L2' | 'L3';
type StoreGrade = 'A+' | 'A' | 'B+' | 'B' | 'C-' | 'D';

type StoreNode = {
  id: string;
  name: string;
  shortName: string;
  category: string;
  floor: FloorLevel;
  grade: StoreGrade;
  score: number;
  occupancy: number;
  conversion: number;
  dwell: number;
  flow: number;
  payment: number;
  risk: 'normal' | 'warning' | 'critical';
  x: number;
  y: number;
  w: number;
  h: number;
};

type AlertItem = {
  id: string;
  title: string;
  target: string;
  level: 'critical' | 'warning' | 'info';
  summary: string;
  time: string;
  action: string;
};

const viewModes: ViewMode[] = ['全局动线', '热力分布', '招商调铺', '安全预警'];
const floorLevels: FloorLevel[] = ['L1', 'L2', 'L3'];

const stores: StoreNode[] = [
  { id: 's101', name: 'Blue Harbor 旗舰店', shortName: 'Blue Harbor', category: '国际时装', floor: 'L1', grade: 'A+', score: 96, occupancy: 182, conversion: 21.8, dwell: 64, flow: 1680, payment: 8.4, risk: 'normal', x: 8, y: 19, w: 18, h: 15 },
  { id: 's102', name: 'Sephora Beauty Lab', shortName: 'Sephora', category: '美妆集合', floor: 'L1', grade: 'A+', score: 94, occupancy: 156, conversion: 19.6, dwell: 58, flow: 1460, payment: 7.9, risk: 'normal', x: 30, y: 15, w: 16, h: 14 },
  { id: 's103', name: 'Apple Experience', shortName: 'Apple', category: '数码体验', floor: 'L1', grade: 'A', score: 91, occupancy: 211, conversion: 18.9, dwell: 72, flow: 1720, payment: 6.8, risk: 'normal', x: 55, y: 16, w: 18, h: 15 },
  { id: 's104', name: '基础铺位 #104', shortName: '#104', category: '生活方式', floor: 'L1', grade: 'C-', score: 54, occupancy: 38, conversion: 5.4, dwell: 19, flow: 910, payment: 1.7, risk: 'critical', x: 78, y: 22, w: 13, h: 18 },
  { id: 's201', name: 'Crown Atrium Café', shortName: 'Crown Café', category: '餐饮轻食', floor: 'L2', grade: 'B+', score: 82, occupancy: 124, conversion: 15.2, dwell: 46, flow: 1190, payment: 5.1, risk: 'warning', x: 20, y: 57, w: 18, h: 15 },
  { id: 's202', name: 'ZARA Urban', shortName: 'ZARA', category: '快时尚', floor: 'L2', grade: 'A', score: 89, occupancy: 176, conversion: 17.8, dwell: 51, flow: 1510, payment: 6.2, risk: 'normal', x: 43, y: 61, w: 20, h: 15 },
  { id: 's203', name: 'MUJI Home Select', shortName: 'MUJI', category: '家居生活', floor: 'L2', grade: 'B', score: 76, occupancy: 92, conversion: 12.6, dwell: 43, flow: 1020, payment: 4.3, risk: 'normal', x: 68, y: 58, w: 18, h: 15 },
  { id: 's301', name: 'Kids Planet', shortName: 'Kids', category: '亲子体验', floor: 'L3', grade: 'B+', score: 80, occupancy: 118, conversion: 14.2, dwell: 67, flow: 860, payment: 4.8, risk: 'warning', x: 16, y: 35, w: 18, h: 16 },
  { id: 's302', name: 'Cinema Plus', shortName: 'Cinema', category: '影院娱乐', floor: 'L3', grade: 'A', score: 88, occupancy: 248, conversion: 16.4, dwell: 91, flow: 1120, payment: 7.2, risk: 'normal', x: 42, y: 33, w: 24, h: 18 },
  { id: 's303', name: 'Pop-up #317', shortName: '#317', category: '临展快闪', floor: 'L3', grade: 'D', score: 49, occupancy: 24, conversion: 4.8, dwell: 16, flow: 620, payment: 1.2, risk: 'critical', x: 74, y: 37, w: 14, h: 14 }
];

const alerts: AlertItem[] = [
  { id: 'a1', title: '区域过载预警', target: 'B区中庭 · L2 环廊', level: 'critical', summary: '客流密度连续 8 分钟高于舒适阈值，建议加强安保疏导并打开北侧分流屏。', time: '14:28:10', action: '现场调度' },
  { id: 'a2', title: '店铺低效预警', target: '基础铺位 #104', level: 'critical', summary: '连续 3 天进店率低于极值 5.4%，触发调铺指派与陈列复盘任务。', time: '14:25:42', action: '一键指派' },
  { id: 'a3', title: '动线绕行异常', target: '东入口 → 主中庭', level: 'warning', summary: '主通道回流率较昨日提升 12.6%，疑似导视遮挡或临时展台占道。', time: '14:21:09', action: '巡检核验' },
  { id: 'a4', title: '热区机会提示', target: 'Crown Atrium Café', level: 'info', summary: '午后停留时间升高但付款转化偏低，建议推送 15:00 组合券。', time: '14:18:37', action: '运营编排' }
];

const saturationRows = [
  { name: 'B区中庭', value: 92 },
  { name: '东入口', value: 86 },
  { name: 'L2 环廊', value: 74 },
  { name: '餐饮连廊', value: 63 },
  { name: '西侧扶梯', value: 48 }
];

const trendBars = [38, 46, 42, 55, 71, 66, 92, 84, 61, 58, 74, 86];

function cssVars(values: Record<string, string | number>) {
  return values as CSSProperties;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(Math.round(value));
}

function getJitter(timeValue: number, index = 1) {
  const angle = (timeValue + index * 37) * 0.017;
  return Math.sin(angle) * 0.08 + Math.cos(angle * 0.7) * 0.04;
}

function getTimeLabel(timeValue: number) {
  const minutes = 9 * 60 + timeValue;
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;
}

function getGradeClass(grade: StoreGrade) {
  if (grade === 'A+' || grade === 'A') return 'premium-grade premium-grade--a';
  if (grade === 'C-' || grade === 'D') return 'premium-grade premium-grade--c';
  return 'premium-grade premium-grade--b';
}

export function PremiumStylePreviewPage() {
  const [activeView, setActiveView] = useState<ViewMode>('全局动线');
  const [activeFloor, setActiveFloor] = useState<FloorLevel>('L1');
  const [selectedStoreId, setSelectedStoreId] = useState('s104');
  const [timeValue, setTimeValue] = useState(330);
  const [isLoadingStore, setIsLoadingStore] = useState(false);
  const [toast, setToast] = useState('');

  const selectedStore = stores.find((store) => store.id === selectedStoreId) ?? stores[0];
  const floorStores = stores.filter((store) => store.floor === activeFloor);
  const timeLabel = getTimeLabel(timeValue);
  const heatIntensity = Math.max(0.72, Math.min(1.28, 1 + getJitter(timeValue, 5)));
  const occupancyTotal = stores.reduce((sum, store, index) => sum + store.occupancy * (1 + getJitter(timeValue, index)), 0);
  const inMallFlow = 14205 * (1 + getJitter(timeValue, 2));

  const rankedStores = useMemo(() => {
    const sorted = [...stores].sort((a, b) => b.score - a.score);
    return [...sorted.slice(0, 5), ...sorted.slice(-5)];
  }, []);

  useEffect(() => {
    if (!isLoadingStore) return undefined;
    const timer = window.setTimeout(() => setIsLoadingStore(false), 420);
    return () => window.clearTimeout(timer);
  }, [isLoadingStore, selectedStoreId]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function selectStore(store: StoreNode) {
    setActiveFloor(store.floor);
    setSelectedStoreId(store.id);
    setIsLoadingStore(true);
  }

  function dispatchAlert(alert: AlertItem) {
    setToast(`已成功向 ${alert.target} 巡检人员发送「${alert.action}」调度指令`);
  }

  return (
    <section className="premium-os" aria-labelledby="premium-os-title">
      <header className="premium-os__header">
        <div className="premium-os__brand">
          <span className="premium-os__logo" aria-hidden="true">V</span>
          <div>
            <h1 id="premium-os-title">商业综合体视觉 AI 数字孪生运营系统</h1>
            <p><i aria-hidden="true" /> AI Camera Network · 99.4% Online · Synthetic Demo</p>
          </div>
        </div>

        <nav className="premium-os__tabs" aria-label="全局视图切换">
          {viewModes.map((mode) => (
            <button
              className={mode === activeView ? 'is-active' : ''}
              key={mode}
              type="button"
              onClick={() => setActiveView(mode)}
            >
              {mode}
            </button>
          ))}
        </nav>

        <div className="premium-os__status" aria-label="系统状态">
          <span>{timeLabel}</span>
          <strong>2026-05-25</strong>
          <b>视觉引擎正常</b>
        </div>
      </header>

      <div className="premium-os__body">
        <aside className="premium-os__left" aria-label="客流与店铺资产面板">
          <section className="ops-card ops-card--hero">
            <div className="ops-card__title-row">
              <span>当前场内实时客流</span>
              <b className="delta-badge">+4.2%</b>
            </div>
            <strong className="hero-number">{formatNumber(inMallFlow)}</strong>
            <div className="hero-subgrid">
              <span><b>{formatNumber(72860)}</b>今日累计进店</span>
              <span><b>54 Mins</b>平均停留时长</span>
            </div>
            <div className="sparkline" aria-label="实时趋势">
              {trendBars.map((height, index) => <i key={index} style={{ height: `${height * (1 + getJitter(timeValue, index))}%` }} />)}
            </div>
          </section>

          <section className="ops-card">
            <div className="ops-card__title-row">
              <span>层次化选中对象</span>
              <small>{selectedStore.floor} / {selectedStore.id.toUpperCase()}</small>
            </div>
            {isLoadingStore ? (
              <div className="store-skeleton" aria-label="加载选中店铺数据">
                <i /><i /><i /><i />
              </div>
            ) : (
              <div className="selected-store-detail">
                <div>
                  <strong>{selectedStore.name}</strong>
                  <span>{selectedStore.category} · 综合资产评分 {selectedStore.score}</span>
                </div>
                <div className="selected-store-detail__grid">
                  <span><b>{formatNumber(selectedStore.flow)}</b>店前过客</span>
                  <span><b>{selectedStore.conversion}%</b>进店率</span>
                  <span><b>{selectedStore.dwell}m</b>停留时长</span>
                  <span><b>{selectedStore.payment}%</b>付款率</span>
                </div>
                <ol className="drill-path" aria-label="层次化钻取路径">
                  <li>商场全局</li>
                  <li>{selectedStore.floor} 楼层</li>
                  <li>{selectedStore.shortName} 铺位</li>
                </ol>
              </div>
            )}
          </section>

          <section className="ops-card">
            <div className="ops-card__title-row">
              <span>进出店转化漏斗</span>
              <small>Real-time</small>
            </div>
            <div className="funnel-stack">
              {[
                ['场内客流', '100%', 100],
                ['店前过客', '42%', 72],
                ['进店客流', '18%', 48],
                ['最终付款', '4.5%', 26]
              ].map(([label, value, width]) => (
                <div className="funnel-row" key={label}>
                  <span>{label}</span>
                  <i style={{ width: `${width}%` }}><b>{value}</b></i>
                </div>
              ))}
            </div>
          </section>

          <section className="ops-card ops-card--leaderboard">
            <div className="ops-card__title-row">
              <span>店铺综合资产评分</span>
              <small>Top / Bottom 5</small>
            </div>
            <div className="merchant-table">
              {rankedStores.map((store, index) => (
                <button
                  className={store.id === selectedStore.id ? 'is-selected' : ''}
                  key={store.id}
                  type="button"
                  onClick={() => selectStore(store)}
                >
                  <em>{index < 5 ? index + 1 : 10 - (rankedStores.length - index - 1)}</em>
                  <span><b>{store.shortName}</b><small>{store.category}</small></span>
                  <strong className={getGradeClass(store.grade)}>{store.grade}</strong>
                </button>
              ))}
            </div>
          </section>
        </aside>

        <main className="premium-os__stage" aria-label="交互式数字孪生工作区">
          <div className="stage-toolbar">
            <div>
              <span>Interactive Digital Twin Workspace</span>
              <strong>{activeView} · {activeFloor} 可点击分层模型</strong>
            </div>
            <div className="floor-switcher" aria-label="楼层切换">
              {floorLevels.map((floor) => (
                <button className={floor === activeFloor ? 'is-active' : ''} key={floor} type="button" onClick={() => setActiveFloor(floor)}>{floor}</button>
              ))}
            </div>
          </div>

          <section className="twin-viewport" style={cssVars({ '--heat-scale': heatIntensity })}>
            <div className="viewport-grid" aria-hidden="true" />
            <svg className="flow-svg" viewBox="0 0 1000 620" role="img" aria-label="客流轨迹覆盖层">
              <defs>
                <marker id="arrow-blue" markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#14b8a6" />
                </marker>
                <linearGradient id="flowGradient" x1="0" x2="1" y1="0" y2="0">
                  <stop stopColor="#22d3ee" stopOpacity="0.25" />
                  <stop offset="1" stopColor="#2F54EB" stopOpacity="0.85" />
                </linearGradient>
              </defs>
              <path className="flow-svg__route" d="M92 430 C230 248, 384 268, 496 330 S746 436, 916 232" markerEnd="url(#arrow-blue)" />
              <path className="flow-svg__route flow-svg__route--secondary" d="M118 210 C282 348, 420 178, 590 226 S792 350, 894 392" markerEnd="url(#arrow-blue)" />
              <path className="flow-svg__route flow-svg__route--soft" d="M210 504 C342 436, 456 470, 626 404 S774 290, 878 296" markerEnd="url(#arrow-blue)" />
            </svg>

            <div className="iso-mall" aria-label={`${activeFloor} 店铺平面模型`}>
              <div className="iso-mall__base" />
              <div className="iso-mall__corridor iso-mall__corridor--main" />
              <div className="iso-mall__corridor iso-mall__corridor--loop" />
              <div className="iso-mall__atrium">Crown<br />Atrium</div>
              <div className="heat-blob heat-blob--one" />
              <div className="heat-blob heat-blob--two" />
              <div className="heat-blob heat-blob--three" />
              {floorStores.map((store) => (
                <button
                  aria-label={`查看 ${store.name} 细节`}
                  className={`mall-store mall-store--${store.risk}${store.id === selectedStore.id ? ' is-selected' : ''}`}
                  key={store.id}
                  style={cssVars({ left: `${store.x}%`, top: `${store.y}%`, width: `${store.w}%`, height: `${store.h}%` })}
                  type="button"
                  onClick={() => selectStore(store)}
                >
                  <span>{store.shortName}</span>
                  <b>{formatNumber(store.occupancy * (1 + getJitter(timeValue, store.score)))}人</b>
                </button>
              ))}
              <div className="floating-billboard floating-billboard--one"><b>{selectedStore.shortName}</b><span>{selectedStore.occupancy} Live</span></div>
              <div className="floating-billboard floating-billboard--two"><b>B区中庭</b><span>密度 92%</span></div>
              <div className="floating-billboard floating-billboard--three"><b>东入口</b><span>入场 +8.1%</span></div>
            </div>

            <div className="viewport-legend">
              <span><i className="legend-dot legend-dot--flow" />客流轨迹</span>
              <span><i className="legend-dot legend-dot--heat" />空间热力</span>
              <span><i className="legend-dot legend-dot--alert" />低效告警</span>
            </div>
          </section>

          <section className="time-scrubber" aria-label="24 小时回放时间轴">
            <div className={`time-scrubber__badge${timeValue > 300 && timeValue < 480 ? ' is-peak' : ''}`}>当前回放时段：{timeLabel} {timeValue > 300 && timeValue < 480 ? '（高峰期）' : '（平峰）'}</div>
            <input
              aria-label="拖动时间轴更新模拟数据"
              max={780}
              min={0}
              step={15}
              type="range"
              value={timeValue}
              onChange={(event) => setTimeValue(Number(event.target.value))}
            />
            <div className="time-marks"><span>09:00</span><span>11:00</span><span>13:00</span><span>15:00</span><span>17:00</span><span>19:00</span><span>22:00</span></div>
          </section>
        </main>

        <aside className="premium-os__right" aria-label="热力统计与预警动态流">
          <section className="ops-card">
            <div className="ops-card__title-row">
              <span>Live Heatmap Metrics</span>
              <small>{formatNumber(occupancyTotal)} Live Occupancy</small>
            </div>
            <div className="saturation-list">
              {saturationRows.map((row) => (
                <div className="saturation-row" key={row.name}>
                  <span><b>{row.name}</b><em>{row.value}%</em></span>
                  <i className={row.value >= 85 ? 'is-hot' : ''}><b style={{ width: `${row.value}%` }} /></i>
                </div>
              ))}
            </div>
          </section>

          <section className="ops-card ops-card--decision">
            <div className="decision-score">
              <span>运营健康指数</span>
              <strong>87.6</strong>
              <small>动线健康，但 B区热力接近饱和</small>
            </div>
            <div className="decision-grid">
              <span><b>12</b>待处理</span>
              <span><b>3</b>高优先级</span>
              <span><b>94%</b>模型置信</span>
            </div>
          </section>

          <section className="ops-card ops-card--alerts">
            <div className="ops-card__title-row">
              <span>低效预警动态流</span>
              <small>Actionable</small>
            </div>
            <div className="alert-feed">
              {alerts.map((alert) => (
                <article className={`alert-card alert-card--${alert.level}`} key={alert.id}>
                  <div>
                    <span>{alert.time}</span>
                    <strong>{alert.title}</strong>
                    <small>{alert.target}</small>
                    <p>{alert.summary}</p>
                  </div>
                  <button type="button" onClick={() => dispatchAlert(alert)}>{alert.action}</button>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {toast ? <div className="ops-toast" role="status">{toast}</div> : null}
    </section>
  );
}
