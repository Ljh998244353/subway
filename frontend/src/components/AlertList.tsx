import { Link } from 'react-router-dom';
import {
  getAlertLevelLabel,
  getAlertStatusLabel,
  getAlertStatusTone,
  getAlertTone,
  StatusBadge
} from './StatusBadge';
import type { StoreAlertRow } from '../pages/storeAlertsModel.ts';

type AlertListProps = {
  rows: StoreAlertRow[];
  selectedAlertId: string;
  buildAlertUrl: (alertId: string) => string;
};

export function AlertList({ rows, selectedAlertId, buildAlertUrl }: AlertListProps) {
  if (rows.length === 0) {
    return (
      <div className="state-panel" role="status">
        当前筛选没有匹配告警
      </div>
    );
  }

  return (
    <div className="store-alert-list" aria-label="低效预警列表">
      {rows.map((alert) => (
        <Link
          className={`store-alert-list__item${alert.id === selectedAlertId ? ' is-selected' : ''}`}
          key={alert.id}
          to={buildAlertUrl(alert.id)}
        >
          <div className="store-alert-list__topline">
            <strong>{alert.title}</strong>
            <span className="alert-item__badges">
              <StatusBadge label={`${getAlertLevelLabel(alert.level)}风险`} tone={getAlertTone(alert.level)} />
              <StatusBadge label={getAlertStatusLabel(alert.status)} tone={getAlertStatusTone(alert.status)} />
            </span>
          </div>
          <p>{alert.floorName} / {alert.storeName}</p>
          <div className="store-alert-list__meta">
            <span>{alert.triggerMetric}</span>
            <span>持续 {alert.durationMinutes} 分钟</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
