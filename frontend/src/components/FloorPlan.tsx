import type { DigitalTwinRouteParams } from '../routes/demoFlow.ts';
import type { DigitalTwinViewModel, TwinAlertMarker, TwinStoreNode } from '../pages/digitalTwinModel.ts';

type FloorPlanProps = {
  viewModel: DigitalTwinViewModel;
  buildTwinUrl: (params: DigitalTwinRouteParams) => string;
  buildAlertUrl: (alertId: string) => string;
};

function getStoreClass(store: TwinStoreNode, selectedStoreId?: string) {
  return [
    'floor-plan__store',
    `floor-plan__store--${store.level.toLowerCase()}`,
    store.id === selectedStoreId ? 'is-selected' : ''
  ].filter(Boolean).join(' ');
}

function getAlertClass(alert: TwinAlertMarker, selectedAlertId?: string) {
  return [
    'floor-plan__alert-marker',
    `floor-plan__alert-marker--${alert.level}`,
    alert.id === selectedAlertId ? 'is-selected' : ''
  ].filter(Boolean).join(' ');
}

function getShortName(name: string) {
  return name.length > 5 ? `${name.slice(0, 5)}...` : name;
}

export function FloorPlan({ viewModel, buildTwinUrl, buildAlertUrl }: FloorPlanProps) {
  const { floor, stores, heatmapPoints, flowEdges, alertMarkers, mode, selectedStore, selectedAlert } = viewModel;
  const showHeatmap = mode === 'heatmap';
  const showFlow = mode === 'flow';
  const showAlerts = mode === 'alerts';
  const showScore = mode === 'score';

  if (!viewModel.hasSpatialData) {
    return (
      <div className="state-panel" role="status">
        当前楼层没有可展示的空间数据
      </div>
    );
  }

  return (
    <div className="floor-plan" aria-label={`${floor.name} 自绘数字孪生平面`}>
      <svg className="floor-plan__svg" viewBox={`0 0 ${floor.width} ${floor.height}`} role="img" aria-labelledby="floor-plan-title floor-plan-desc">
        <title id="floor-plan-title">{floor.name} 自绘楼层平面</title>
        <desc id="floor-plan-desc">使用虚构 Mock geometry 绘制店铺、热力点、流向线和告警标记，不含真实商场平面图。</desc>
        <defs>
          <marker id="flow-arrow" markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="3.5">
            <path d="M0,0 L7,3.5 L0,7 Z" className="floor-plan__arrow" />
          </marker>
        </defs>

        <rect className="floor-plan__boundary" x="12" y="12" width={floor.width - 24} height={floor.height - 24} rx="18" />
        <path className="floor-plan__corridor" d={`M${floor.width * 0.12},${floor.height * 0.5} H${floor.width * 0.88}`} />
        <path className="floor-plan__corridor" d={`M${floor.width * 0.5},${floor.height * 0.16} V${floor.height * 0.84}`} />

        {stores.map((store) => (
          <a href={buildTwinUrl({ floorId: floor.id, mode, storeId: store.id })} key={store.id} aria-label={`选择 ${store.name}`}>
            <rect
              className={getStoreClass(store, selectedStore?.id)}
              x={store.geometry.x}
              y={store.geometry.y}
              width={store.geometry.width}
              height={store.geometry.height}
              rx="8"
            />
            <text className="floor-plan__store-label" x={store.geometry.x + 10} y={store.geometry.y + 22}>
              {getShortName(store.name)}
            </text>
            {showScore ? (
              <text className="floor-plan__score-label" x={store.geometry.x + 10} y={store.geometry.y + store.geometry.height - 12}>
                {store.score} / {store.level}
              </text>
            ) : null}
          </a>
        ))}

        {showHeatmap ? (
          <g aria-label="热力点">
            {heatmapPoints.map((point) => (
              <circle
                className="floor-plan__heat-point"
                cx={point.x}
                cy={point.y}
                key={point.id}
                r={Math.round(22 + point.intensity * 34)}
                style={{ opacity: Math.min(0.72, 0.22 + point.intensity * 0.5) }}
              />
            ))}
          </g>
        ) : null}

        {showFlow ? (
          <g aria-label="流向线">
            {flowEdges.map((edge) => (
              <g key={edge.id}>
                <line
                  className={`floor-plan__flow-line floor-plan__flow-line--${edge.direction}`}
                  markerEnd="url(#flow-arrow)"
                  x1={edge.from.x}
                  y1={edge.from.y}
                  x2={edge.to.x}
                  y2={edge.to.y}
                />
                <text className="floor-plan__flow-label" x={(edge.from.x + edge.to.x) / 2} y={(edge.from.y + edge.to.y) / 2 - 8}>
                  {edge.traffic}
                </text>
              </g>
            ))}
          </g>
        ) : null}

        {showAlerts ? (
          <g aria-label="告警标记">
            {alertMarkers.map((alert) => (
              <a href={buildAlertUrl(alert.id)} key={alert.id} aria-label={`查看告警 ${alert.id}`}>
                <circle className={getAlertClass(alert, selectedAlert?.id)} cx={alert.x} cy={alert.y} r="17" />
                <text className="floor-plan__alert-label" x={alert.x} y={alert.y + 4}>
                  !
                </text>
              </a>
            ))}
          </g>
        ) : null}
      </svg>

      <div className="floor-plan__legend" aria-label="图例">
        <span><i className="legend-swatch legend-swatch--store" />店铺几何</span>
        <span><i className="legend-swatch legend-swatch--heat" />热力强度</span>
        <span><i className="legend-swatch legend-swatch--flow" />流向线</span>
        <span><i className="legend-swatch legend-swatch--alert" />告警点</span>
      </div>
    </div>
  );
}
