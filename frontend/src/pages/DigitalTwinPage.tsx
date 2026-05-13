import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { FloorPlan } from '../components/FloorPlan';
import { MotionSurface } from '../components/MotionSurface';
import { StatusBadge } from '../components/StatusBadge';
import { TwinInspector } from '../components/TwinInspector';
import { mockAlerts, mockFloors, mockFlowEdges, mockHeatmapPoints, mockMall, mockStoresWithAlerts } from '../mock/index.ts';
import { buildDigitalTwinUrl, buildStoreAlertsUrl, buildStoreAnalysisUrl } from '../routes/demoFlow.ts';
import { buildRouteWithGlobalQuery } from '../routes/routeConfig';
import type { TwinMode } from '../types/index.ts';
import { buildDigitalTwinViewModel, twinModeLabel, type DigitalTwinFilters } from './digitalTwinModel.ts';

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

export function DigitalTwinPage() {
  const [params] = useSearchParams();
  const location = useLocation();
  const timeRange = params.get('timeRange') || 'today';
  const filters = parseFilters(params);
  const viewModel = buildDigitalTwinViewModel(
    mockFloors,
    mockStoresWithAlerts,
    mockAlerts,
    mockHeatmapPoints,
    mockFlowEdges,
    filters
  );

  const buildTwinUrl = (routeParams: { floorId?: string; mode?: TwinMode; storeId?: string; alertId?: string }) =>
    buildDigitalTwinUrl(routeParams, location.search);
  const buildStoreAnalysisRoute = (storeId: string) => buildStoreAnalysisUrl({ storeId }, location.search);
  const buildStoreAlertsRoute = (alertId?: string, storeId?: string) =>
    buildStoreAlertsUrl({ alertId, storeId, floorId: viewModel.floor.id }, location.search);

  return (
    <MotionSurface as="section" className="page digital-twin-page">
      <MotionSurface as="section" className="page-header dashboard-header" delay={0.02}>
        <div>
          <p className="page-kicker">数字孪生 / {formatTimeRange(timeRange)} / Mock 数据</p>
          <h1>数字孪生</h1>
          <p>
            使用 {mockMall.name} 的虚构楼层、店铺、热力、动线和告警 Mock 数据绘制空间联动视图，不包含真实平面图或 BIM。
          </p>
        </div>
        <div className="dashboard-header__actions">
          <StatusBadge label={`${viewModel.floor.code} · ${twinModeLabel[viewModel.mode]}`} tone="info" />
          <Link className="ghost-button link-button" to={buildRouteWithGlobalQuery('/digital-twin', location.search)}>
            重置视图
          </Link>
        </div>
      </MotionSurface>

      <MotionSurface className="filter-bar" aria-label="数字孪生筛选摘要" delay={0.04}>
        <span>商场：{mockMall.name}</span>
        <span>时间：{formatTimeRange(timeRange)}</span>
        <span>楼层：{viewModel.floor.name}</span>
        <span>模式：{twinModeLabel[viewModel.mode]}</span>
        <span>店铺：{viewModel.selectedStore?.name ?? '无'}</span>
        <span>告警：{viewModel.selectedAlert?.id ?? '无'}</span>
        <span>数据源：自绘 Mock geometry</span>
      </MotionSurface>

      <MotionSurface className="twin-control-row" aria-label="数字孪生控制" delay={0.06}>
        <div className="twin-control-copy">
          <span>空间模式</span>
          <strong>{viewModel.floor.name} · {twinModeLabel[viewModel.mode]}</strong>
        </div>
        <div className="twin-control-group" aria-label="楼层切换">
          {mockFloors.map((floor) => (
            <Link
              className={`ghost-button link-button${floor.id === viewModel.floor.id ? ' is-active' : ''}`}
              key={floor.id}
              to={buildTwinUrl({ floorId: floor.id, mode: viewModel.mode })}
            >
              {floor.code}
            </Link>
          ))}
        </div>
        <div className="twin-control-group" aria-label="模式切换">
          {twinModes.map((mode) => (
            <Link
              className={`ghost-button link-button${mode === viewModel.mode ? ' is-active' : ''}`}
              key={mode}
              to={buildTwinUrl({ floorId: viewModel.floor.id, mode })}
            >
              {twinModeLabel[mode]}
            </Link>
          ))}
        </div>
      </MotionSurface>

      <MotionSurface className="alert-summary-grid twin-metric-grid" aria-label="数字孪生指标" delay={0.08}>
        {viewModel.metrics.map((metric) => (
          <article className="alert-summary-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p>{metric.hint}</p>
          </article>
        ))}
      </MotionSurface>

      <div className="digital-twin-layout">
        <MotionSurface as="section" className="dashboard-panel digital-twin-map-panel" aria-labelledby="floor-plan-heading" delay={0.1}>
          <div className="panel-heading">
            <div>
              <h2 id="floor-plan-heading">自绘楼层平面</h2>
              <p>基于 Mock geometry 绘制店铺、热力、流向和告警，不使用真实商场图纸。</p>
            </div>
            <StatusBadge label={`${viewModel.stores.length} 店铺`} tone="neutral" />
          </div>
          <FloorPlan viewModel={viewModel} buildTwinUrl={buildTwinUrl} buildAlertUrl={(alertId) => buildStoreAlertsRoute(alertId)} />
        </MotionSurface>

        <MotionSurface as="section" className="dashboard-panel digital-twin-inspector-panel" aria-labelledby="twin-inspector-heading" delay={0.12}>
          <div className="panel-heading">
            <div>
              <h2 id="twin-inspector-heading">空间检查器</h2>
              <p>查看当前楼层、选中店铺和关联告警。</p>
            </div>
          </div>
          <TwinInspector
            viewModel={viewModel}
            buildStoreAnalysisUrl={buildStoreAnalysisRoute}
            buildStoreAlertsUrl={buildStoreAlertsRoute}
          />
        </MotionSurface>
      </div>
    </MotionSurface>
  );
}
