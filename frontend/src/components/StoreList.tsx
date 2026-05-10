import { Link } from 'react-router-dom';
import { getScoreLevelLabel, getScoreTone, StatusBadge } from './StatusBadge';
import type { StoreAnalysisRow } from '../pages/storeAnalysisModel.ts';

type StoreListProps = {
  rows: StoreAnalysisRow[];
  selectedStoreId: string;
  buildStoreUrl: (storeId: string) => string;
};

export function StoreList({ rows, selectedStoreId, buildStoreUrl }: StoreListProps) {
  if (rows.length === 0) {
    return (
      <div className="state-panel" role="status">
        当前筛选没有匹配店铺
      </div>
    );
  }

  return (
    <div className="store-list" aria-label="店铺列表">
      {rows.map((store) => (
        <Link
          className={`store-list__item${store.id === selectedStoreId ? ' is-selected' : ''}`}
          key={store.id}
          to={buildStoreUrl(store.id)}
        >
          <div>
            <strong>{store.name}</strong>
            <span>{store.floorName} / {store.category}</span>
          </div>
          <div className="store-list__metrics">
            <StatusBadge label={`${store.score} 分 · ${getScoreLevelLabel(store.level)}`} tone={getScoreTone(store.level)} />
            <span>转化 {store.conversionRate}%</span>
            <span>告警 {store.alertCount}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
