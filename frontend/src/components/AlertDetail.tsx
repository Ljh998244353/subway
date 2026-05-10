import { Link } from 'react-router-dom';
import {
  getAlertLevelLabel,
  getAlertStatusLabel,
  getAlertStatusTone,
  getAlertTone,
  StatusBadge
} from './StatusBadge';
import type { StoreAlertRow, AlertActionItem, AlertDetailMetric } from '../pages/storeAlertsModel.ts';

type AlertDetailProps = {
  alert?: StoreAlertRow;
  detailMetrics: AlertDetailMetric[];
  actionItems: AlertActionItem[];
  buildStoreAnalysisUrl: (storeId?: string, alertId?: string) => string;
  buildDigitalTwinUrl: (floorId: string, storeId?: string, alertId?: string) => string;
};

export function AlertDetail({
  alert,
  detailMetrics,
  actionItems,
  buildStoreAnalysisUrl,
  buildDigitalTwinUrl
}: AlertDetailProps) {
  if (!alert) {
    return (
      <div className="state-panel" role="status">
        当前筛选没有告警数据，请调整等级、状态、楼层、店铺或关键词。
      </div>
    );
  }

  return (
    <div className="alert-detail">
      <section className="alert-detail__summary" aria-labelledby="alert-detail-summary-title">
        <div>
          <h3 id="alert-detail-summary-title">{alert.title}</h3>
          <p>{alert.floorName} / {alert.storeName} / {alert.triggerMetric}</p>
        </div>
        <div className="alert-item__badges">
          <StatusBadge label={`${getAlertLevelLabel(alert.level)}风险`} tone={getAlertTone(alert.level)} />
          <StatusBadge label={getAlertStatusLabel(alert.status)} tone={getAlertStatusTone(alert.status)} />
        </div>
      </section>

      <div className="alert-detail-metrics">
        {detailMetrics.map((metric) => (
          <article className="store-detail-metric" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p>{metric.hint}</p>
          </article>
        ))}
      </div>

      <section className="store-detail-section" aria-labelledby="alert-actions-title">
        <div className="section-title-row">
          <h3 id="alert-actions-title">处理建议</h3>
          <span>{actionItems.length} 项</span>
        </div>
        <ol className="action-list">
          {actionItems.map((item) => (
            <li key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.detail}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="store-detail-section" aria-labelledby="alert-drilldown-title">
        <div className="section-title-row">
          <h3 id="alert-drilldown-title">关联入口</h3>
          <span>{alert.id}</span>
        </div>
        <div className="store-action-row">
          {alert.storeId ? (
            <Link className="ghost-button link-button" to={buildStoreAnalysisUrl(alert.storeId, alert.id)}>
              查看店铺分析
            </Link>
          ) : null}
          <Link className="ghost-button link-button" to={buildDigitalTwinUrl(alert.floorId, alert.storeId, alert.id)}>
            查看空间位置
          </Link>
        </div>
      </section>
    </div>
  );
}
