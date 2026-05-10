import { Link } from 'react-router-dom';
import { getAlertLevelLabel, getAlertTone, getScoreLevelLabel, getScoreTone, StatusBadge } from './StatusBadge';
import { twinModeLabel, type DigitalTwinViewModel } from '../pages/digitalTwinModel.ts';

type TwinInspectorProps = {
  viewModel: DigitalTwinViewModel;
  buildStoreAnalysisUrl: (storeId: string) => string;
  buildStoreAlertsUrl: (alertId?: string, storeId?: string) => string;
};

export function TwinInspector({ viewModel, buildStoreAnalysisUrl, buildStoreAlertsUrl }: TwinInspectorProps) {
  const { floor, mode, selectedStore, selectedAlert, selectedStoreAlerts } = viewModel;

  return (
    <div className="twin-inspector">
      <section className="twin-inspector__section" aria-labelledby="twin-floor-title">
        <div className="section-title-row">
          <h3 id="twin-floor-title">楼层状态</h3>
          <StatusBadge label={twinModeLabel[mode]} tone="info" />
        </div>
        <div className="twin-kv">
          <span>楼层</span>
          <strong>{floor.name}</strong>
          <span>当前人数</span>
          <strong>{floor.currentOccupancy.toLocaleString('zh-CN')} 人</strong>
          <span>拥挤指数</span>
          <strong>{floor.crowdingIndex.toFixed(2)}</strong>
          <span>今日客流</span>
          <strong>{floor.todayTraffic.toLocaleString('zh-CN')} 人次</strong>
        </div>
      </section>

      <section className="twin-inspector__section" aria-labelledby="twin-store-title">
        <div className="section-title-row">
          <h3 id="twin-store-title">选中店铺</h3>
          {selectedStore ? (
            <StatusBadge label={`${selectedStore.score} 分 · ${getScoreLevelLabel(selectedStore.level)}`} tone={getScoreTone(selectedStore.level)} />
          ) : null}
        </div>
        {selectedStore ? (
          <>
            <div className="twin-store-card">
              <strong>{selectedStore.name}</strong>
              <span>{selectedStore.category} / 转化 {selectedStore.conversionRate}% / 店内 {selectedStore.currentOccupancy} 人</span>
              <span>关联告警 {selectedStore.alertCount} 条</span>
            </div>
            <div className="store-action-row">
              <Link className="ghost-button link-button" to={buildStoreAnalysisUrl(selectedStore.id)}>
                查看店铺分析
              </Link>
              <Link className="ghost-button link-button" to={buildStoreAlertsUrl(undefined, selectedStore.id)}>
                查看店铺告警
              </Link>
            </div>
          </>
        ) : (
          <div className="state-panel" role="status">当前楼层没有选中店铺</div>
        )}
      </section>

      <section className="twin-inspector__section" aria-labelledby="twin-alert-title">
        <div className="section-title-row">
          <h3 id="twin-alert-title">空间告警</h3>
          <span>{viewModel.alertMarkers.length} 条</span>
        </div>
        {selectedAlert ? (
          <Link className="twin-alert-card is-selected" to={buildStoreAlertsUrl(selectedAlert.id, selectedAlert.storeId)}>
            <strong>{selectedAlert.title}</strong>
            <span>{selectedAlert.storeName} / 持续 {selectedAlert.durationMinutes} 分钟</span>
            <StatusBadge label={`${getAlertLevelLabel(selectedAlert.level)}风险`} tone={getAlertTone(selectedAlert.level)} />
          </Link>
        ) : null}
        <div className="twin-alert-list">
          {selectedStoreAlerts.length === 0 ? (
            <p>当前店铺没有空间告警。</p>
          ) : (
            selectedStoreAlerts.map((alert) => (
              <Link className="twin-alert-card" key={alert.id} to={buildStoreAlertsUrl(alert.id, alert.storeId)}>
                <strong>{alert.title}</strong>
                <span>{alert.storeName} / {alert.durationMinutes} 分钟</span>
                <StatusBadge label={`${getAlertLevelLabel(alert.level)}风险`} tone={getAlertTone(alert.level)} />
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
