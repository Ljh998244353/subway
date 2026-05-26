import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { FloorPlan } from '../components/FloorPlan';
import { StatusBadge } from '../components/StatusBadge';
import { TwinInspector } from '../components/TwinInspector';
import { DigitalTwinScene } from '../twin/scene/DigitalTwinScene.tsx';
import type { SceneInteractionEvent } from '../twin/adapter/sceneAdapter.ts';
import { mockAlerts, mockFloors, mockMall, mockStoresWithAlerts } from '../mock/index.ts';
import { buildDigitalTwinUrl, buildStoreAlertsUrl, buildStoreAnalysisUrl } from '../routes/demoFlow.ts';
import { buildRouteWithGlobalQuery } from '../routes/routeConfig';
import type { TwinMode } from '../types/index.ts';
import { buildDigitalTwinViewModel, twinModeLabel, type DigitalTwinFilters, type TwinAlertMarker } from './digitalTwinModel.ts';
import { createInitialDigitalTwinDataState, resolveDigitalTwinDataState } from './digitalTwinState.ts';

const twinModes: TwinMode[] = ['heatmap', 'flow', 'alerts', 'score'];

function parseFilters(params: URLSearchParams): DigitalTwinFilters {
  return {
    floorId: params.get('floorId') || undefined,
    mode: (params.get('mode') || undefined) as TwinMode | undefined,
    storeId: params.get('storeId') || undefined,
    alertId: params.get('alertId') || undefined
  };
}

function formatTimeRange(timeRange: string) {
  if (timeRange === 'today') {
    return '今日';
  }

  if (timeRange === '7d') {
    return '近 7 日';
  }

  return timeRange;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('zh-CN').format(Math.round(value));
}

function getAlertTone(alert?: TwinAlertMarker) {
  if (!alert) return 'info';
  if (alert.level === 'high') return 'danger';
  if (alert.level === 'medium') return 'warning';
  return 'info';
}

export function DigitalTwinPage() {
  const [params] = useSearchParams();
  const location = useLocation();
  const mallId = params.get('mallId') || mockMall.id;
  const timeRange = params.get('timeRange') || 'today';
  const filters = parseFilters(params);
  const dataMode = params.get('dataMode') ?? undefined;
  const apiBaseUrl = params.get('apiBaseUrl') ?? undefined;
  const [twinDataState, setTwinDataState] = useState(() => createInitialDigitalTwinDataState());
  const [useGLBModel, setUseGLBModel] = useState(params.get('model') === 'glb');
  const viewModel = useMemo(
    () =>
      buildDigitalTwinViewModel(
        mockFloors,
        mockStoresWithAlerts,
        mockAlerts,
        twinDataState.result.heatmapPoints,
        twinDataState.result.flowEdges,
        filters
      ),
    [filters, twinDataState.result.flowEdges, twinDataState.result.heatmapPoints]
  );
  const dataSourceLabel = twinDataState.result.source === 'api' ? 'API' : 'Mock';
  const statusLabel =
    twinDataState.status === 'loading'
      ? 'API 加载中'
      : twinDataState.status === 'error'
        ? 'API 异常 / Mock 回退'
        : `${dataSourceLabel} 模式`;
  const totalOccupancy = mockFloors.reduce((sum, floor) => sum + floor.currentOccupancy, 0);
  const totalTraffic = viewModel.flowEdges.reduce((sum, edge) => sum + edge.traffic, 0);
  const selectedStore = viewModel.selectedStore;
  const selectedAlert = viewModel.selectedAlert ?? viewModel.alertMarkers[0];
  const riskAlerts = viewModel.alertMarkers.filter((alert) => alert.level !== 'low');
  const rankedStores = [...viewModel.stores].sort((a, b) => b.score - a.score);

  const buildTwinUrl = (routeParams: { floorId?: string; mode?: TwinMode; storeId?: string; alertId?: string }) =>
    buildDigitalTwinUrl(routeParams, location.search);
  const buildStoreAnalysisRoute = (storeId: string) => buildStoreAnalysisUrl({ storeId }, location.search);
  const buildStoreAlertsRoute = (alertId?: string, storeId?: string) =>
    buildStoreAlertsUrl({ alertId, storeId, floorId: viewModel.floor.id }, location.search);

  const handleSceneInteraction = (event: SceneInteractionEvent) => {
    if (event.type === 'store-click' && event.storeId) {
      window.location.href = buildTwinUrl({ floorId: event.floorId, mode: viewModel.mode, storeId: event.storeId });
    }
  };

  useEffect(() => {
    let active = true;

    if (dataMode === 'api') {
      setTwinDataState((current) => ({ ...current, status: 'loading', errorMessage: undefined }));
    }

    void resolveDigitalTwinDataState({
      mode: dataMode,
      apiBaseUrl,
      mallId
    }).then((nextState) => {
      if (active) {
        setTwinDataState(nextState);
      }
    });

    return () => {
      active = false;
    };
  }, [apiBaseUrl, dataMode, mallId]);

  return (
    <section className="premium-os digital-twin-cockpit" aria-labelledby="digital-twin-title">
      <header className="premium-os__header">
        <div className="premium-os__brand">
          <span className="premium-os__logo" aria-hidden="true">V</span>
          <div>
            <h1 id="digital-twin-title">商业综合体视觉 AI 数字孪生运营系统</h1>
            <p><i aria-hidden="true" /> {mockMall.name} · {statusLabel} · Synthetic Demo</p>
          </div>
        </div>

        <nav className="premium-os__tabs" aria-label="数字孪生模式切换">
          {twinModes.map((mode) => (
            <Link
              className={mode === viewModel.mode ? 'is-active' : ''}
              key={mode}
              to={buildTwinUrl({ floorId: viewModel.floor.id, mode })}
            >
              {twinModeLabel[mode]}
            </Link>
          ))}
        </nav>

        <div className="premium-os__status" aria-label="系统状态">
          <span>{formatTimeRange(timeRange)}</span>
          <strong>{viewModel.floor.code} · {twinModeLabel[viewModel.mode]}</strong>
          <b>{dataSourceLabel} spatial aggregate</b>
        </div>
      </header>

      <div className="premium-os__body">
        <aside className="premium-os__left" aria-label="客流与店铺资产面板">
          <section className="ops-card ops-card--hero">
            <div className="ops-card__title-row">
              <span>当前场内实时客流</span>
              <b className="delta-badge">Synthetic</b>
            </div>
            <strong className="hero-number">{formatNumber(totalOccupancy)}</strong>
            <div className="hero-subgrid">
              <span><b>{formatNumber(viewModel.floor.todayTraffic)}</b>{viewModel.floor.name} 今日客流</span>
              <span><b>{viewModel.floor.crowdingIndex.toFixed(2)}</b>楼层拥挤指数</span>
            </div>
            <div className="sparkline" aria-label="楼层趋势占位">
              {viewModel.metrics.map((metric, index) => <i key={metric.label} style={{ height: `${44 + index * 9}%` }} />)}
              {Array.from({ length: 7 }, (_, index) => <i key={`stub-${index}`} style={{ height: `${42 + ((index * 13) % 48)}%` }} />)}
            </div>
          </section>

          <section className="ops-card">
            <div className="ops-card__title-row">
              <span>层次化选中对象</span>
              <small>{viewModel.floor.code} / {selectedStore?.id ?? '无'}</small>
            </div>
            {selectedStore ? (
              <div className="selected-store-detail">
                <div>
                  <strong>{selectedStore.name}</strong>
                  <span>{selectedStore.category} · 综合资产评分 {selectedStore.score}</span>
                </div>
                <div className="selected-store-detail__grid">
                  <span><b>{formatNumber(selectedStore.currentOccupancy)}</b>店内人数</span>
                  <span><b>{selectedStore.conversionRate}%</b>进店转化</span>
                  <span><b>{selectedStore.level}</b>评分等级</span>
                  <span><b>{selectedStore.alertCount}</b>关联告警</span>
                </div>
                <ol className="drill-path" aria-label="层次化钻取路径">
                  <li>商场全局</li>
                  <li>{viewModel.floor.code} 楼层</li>
                  <li>{selectedStore.name}</li>
                </ol>
              </div>
            ) : (
              <div className="state-panel" role="status">当前楼层没有选中店铺</div>
            )}
          </section>

          <section className="ops-card">
            <div className="ops-card__title-row">
              <span>进出店转化漏斗</span>
              <small>Mock aggregate</small>
            </div>
            <div className="funnel-stack">
              {[
                ['楼层客流', '100%', 100],
                ['店前过客', '42%', 72],
                ['进店客流', selectedStore ? `${selectedStore.conversionRate}%` : '18%', 48],
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
              <small>{viewModel.floor.code} ranking</small>
            </div>
            <div className="merchant-table">
              {rankedStores.map((store, index) => (
                <Link
                  className={store.id === selectedStore?.id ? 'is-selected' : ''}
                  key={store.id}
                  to={buildTwinUrl({ floorId: viewModel.floor.id, mode: viewModel.mode, storeId: store.id })}
                >
                  <em>{index + 1}</em>
                  <span><b>{store.name}</b><small>{store.category}</small></span>
                  <strong className={`premium-grade premium-grade--${store.level === 'A' || store.level === 'B' ? 'a' : store.level === 'C' ? 'b' : 'c'}`}>{store.level}</strong>
                </Link>
              ))}
            </div>
          </section>
        </aside>

        <main className="premium-os__stage" aria-label="交互式数字孪生工作区">
          <div className="stage-toolbar">
            <div>
              <span>Interactive Digital Twin Workspace</span>
              <strong>{viewModel.floor.name} · {twinModeLabel[viewModel.mode]} · {useGLBModel ? 'GLB Model' : 'WebGL + SVG 参考'}</strong>
            </div>
            <div className="floor-switcher" aria-label="楼层切换">
              {mockFloors.map((floor) => (
                <Link className={floor.id === viewModel.floor.id ? 'is-active' : ''} key={floor.id} to={buildTwinUrl({ floorId: floor.id, mode: viewModel.mode })}>
                  {floor.code}
                </Link>
              ))}
              <button
                className={`model-toggle ${useGLBModel ? 'is-active' : ''}`}
                onClick={() => setUseGLBModel(!useGLBModel)}
                aria-label={useGLBModel ? '切换到程序化几何体' : '切换到 GLB 模型'}
              >
                {useGLBModel ? 'GLB' : 'Procedural'}
              </button>
            </div>
          </div>

          <section className="twin-viewport digital-twin-cockpit__viewport">
            <div className="viewport-grid" aria-hidden="true" />
            <div className="digital-twin-cockpit__scene-shell">
              <div className="panel-heading">
                <div>
                  <h2 id="webgl-scene-heading">WebGL 合成场景壳</h2>
                  <p>{useGLBModel ? 'BlenderMCP 生成的 GLB 模型：合成商场楼层几何体' : 'Three.js/R3F 最小基线：项目自绘店铺块、楼层底板和走廊，无模型、纹理或真实素材。'}</p>
                </div>
                <StatusBadge label={useGLBModel ? 'GLB Model' : 'WebGL P7-I4'} tone="info" />
              </div>
              <DigitalTwinScene viewModel={viewModel} buildTwinUrl={buildTwinUrl} onInteraction={handleSceneInteraction} useGLBModel={useGLBModel} />
            </div>
            <details className="digital-twin-cockpit__fallback-shell">
              <summary>SVG/2.5D 参考与回退视图</summary>
              <FloorPlan viewModel={viewModel} buildTwinUrl={buildTwinUrl} buildAlertUrl={(alertId) => buildStoreAlertsRoute(alertId)} />
            </details>
            <div className="viewport-legend">
              <span><i className="legend-dot legend-dot--flow" />WebGL 楼层块</span>
              <span><i className="legend-dot legend-dot--heat" />SVG 回退</span>
              <span><i className="legend-dot legend-dot--alert" />合成边界</span>
            </div>
          </section>

          <section className="time-scrubber" aria-label="24 小时回放时间轴占位">
            <div className="time-scrubber__badge">当前分析窗口：{formatTimeRange(timeRange)} · 合成数据 · WebGL 最小场景壳</div>
            <input aria-label="P7-I3 时间轴占位" max={780} min={0} readOnly type="range" value={330} />
            <div className="time-marks"><span>09:00</span><span>11:00</span><span>13:00</span><span>15:00</span><span>17:00</span><span>19:00</span><span>22:00</span></div>
          </section>
        </main>

        <aside className="premium-os__right" aria-label="热力统计与预警动态流">
          <section className="ops-card">
            <div className="ops-card__title-row">
              <span>Live Heatmap Metrics</span>
              <small>{formatNumber(totalTraffic)} Flow</small>
            </div>
            <div className="saturation-list">
              {viewModel.metrics.map((metric, index) => (
                <div className="saturation-row" key={metric.label}>
                  <span><b>{metric.label}</b><em>{metric.value}</em></span>
                  <i className={index <= 1 ? 'is-hot' : ''}><b style={{ width: `${Math.min(94, 42 + index * 11)}%` }} /></i>
                </div>
              ))}
            </div>
          </section>

          <section className="ops-card ops-card--decision">
            <div className="decision-score">
              <span>运营健康指数</span>
              <strong>{Math.max(60, Math.round(100 - viewModel.floor.crowdingIndex * 18))}</strong>
              <small>{selectedAlert ? `${selectedAlert.title} 需要关注` : '当前空间状态平稳'}</small>
            </div>
            <div className="decision-grid">
              <span><b>{riskAlerts.length}</b>中高风险</span>
              <span><b>{viewModel.alertMarkers.length}</b>空间告警</span>
              <span><b>{dataSourceLabel}</b>数据模式</span>
              <span><b>WebGL</b>当前渲染</span>
            </div>
          </section>

          <section className="ops-card ops-card--alerts">
            <div className="ops-card__title-row">
              <span>低效预警动态流</span>
              <small>Actionable</small>
            </div>
            <div className="alert-feed">
              {viewModel.alertMarkers.map((alert) => (
                <article className={`alert-card alert-card--${getAlertTone(alert)}`} key={alert.id}>
                  <div>
                    <span>{alert.id}</span>
                    <strong>{alert.title}</strong>
                    <small>{alert.storeName}</small>
                    <p>持续 {alert.durationMinutes} 分钟 · {alert.status} · 由合成 Mock 告警驱动。</p>
                  </div>
                  <Link to={buildStoreAlertsRoute(alert.id, alert.storeId)}>查看处置</Link>
                </article>
              ))}
            </div>
          </section>

          <section className="ops-card digital-twin-cockpit__inspector">
            <div className="ops-card__title-row">
              <span>空间检查器</span>
              <small>Context</small>
            </div>
            <TwinInspector
              viewModel={viewModel}
              buildStoreAnalysisUrl={buildStoreAnalysisRoute}
              buildStoreAlertsUrl={buildStoreAlertsRoute}
            />
          </section>

          {twinDataState.errorMessage ? (
            <section className="ops-card" aria-label="API 回退状态">
              <div className="ops-card__title-row">
                <span>API 回退</span>
                <small>{statusLabel}</small>
              </div>
              <p className="digital-twin-cockpit__note">{twinDataState.errorMessage}</p>
            </section>
          ) : null}
        </aside>
      </div>

      <Link className="ops-toast digital-twin-cockpit__reset" to={buildRouteWithGlobalQuery('/digital-twin', location.search)}>
        重置视图
      </Link>
    </section>
  );
}
