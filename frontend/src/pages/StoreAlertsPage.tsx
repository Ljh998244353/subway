import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { AlertDetail } from '../components/AlertDetail';
import { AlertList } from '../components/AlertList';
import { MotionSurface } from '../components/MotionSurface';
import {
  getAlertLevelLabel,
  getAlertStatusLabel,
  getAlertStatusTone,
  getAlertTone,
  StatusBadge
} from '../components/StatusBadge';
import { mockAlerts, mockFloors, mockMall, mockStoresWithAlerts } from '../mock/index.ts';
import {
  buildAlertTwinUrl,
  buildStoreAlertsUrl as buildStoreAlertsRouteUrl,
  buildStoreAnalysisUrl as buildStoreAnalysisRouteUrl
} from '../routes/demoFlow.ts';
import { buildRouteWithGlobalQuery } from '../routes/routeConfig';
import type { AlertLevel, AlertStatus } from '../types/index.ts';
import { buildStoreAlertsViewModel, type StoreAlertsFilters } from './storeAlertsModel.ts';

function parseFilters(params: URLSearchParams): StoreAlertsFilters {
  return {
    level: (params.get('level') || undefined) as AlertLevel | undefined,
    status: (params.get('status') || undefined) as AlertStatus | undefined,
    floorId: params.get('floorId') || 'all',
    storeId: params.get('storeId') || undefined,
    keyword: params.get('keyword') || undefined,
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

function getSelectedFloorName(floorId: string | undefined, fallback: string) {
  if (!floorId || floorId === 'all') {
    return '全部楼层';
  }

  return fallback;
}

export function StoreAlertsPage() {
  const [params] = useSearchParams();
  const location = useLocation();
  const timeRange = params.get('timeRange') || 'today';
  const filters = parseFilters(params);
  const viewModel = buildStoreAlertsViewModel(mockAlerts, mockFloors, mockStoresWithAlerts, filters);
  const selectedAlert = viewModel.selectedAlert;

  const buildAlertUrl = (alertId: string) => buildStoreAlertsRouteUrl({ alertId }, location.search);
  const buildStoreAnalysisUrl = (storeId?: string, alertId?: string) =>
    buildStoreAnalysisRouteUrl({ storeId, alertId }, location.search);
  const buildDigitalTwinUrl = (floorId: string, storeId?: string, alertId?: string) =>
    buildAlertTwinUrl({ floorId, storeId, alertId }, location.search);

  return (
    <MotionSurface as="section" className="page store-alerts-page">
      <MotionSurface as="section" className="page-header dashboard-header" delay={0.02}>
        <div>
          <p className="page-kicker">低效预警 / {formatTimeRange(timeRange)} / Mock 数据</p>
          <h1>低效预警</h1>
          <p>
            聚合 {mockMall.name} 的低评分、低转化、拥挤和数据异常预警，所有告警与处理建议均为虚构 Mock 数据。
          </p>
        </div>
        <div className="dashboard-header__actions">
          <StatusBadge label={viewModel.hasRows ? '可处理' : '暂无匹配'} tone={viewModel.hasRows ? 'info' : 'neutral'} />
          <Link className="ghost-button link-button" to={buildRouteWithGlobalQuery('/store-alerts', location.search)}>
            重置筛选
          </Link>
        </div>
      </MotionSurface>

      <MotionSurface className="filter-bar" aria-label="低效预警筛选摘要" delay={0.04}>
        <span>商场：{mockMall.name}</span>
        <span>时间：{formatTimeRange(timeRange)}</span>
        <span>等级：{filters.level ? `${getAlertLevelLabel(filters.level)}风险` : '全部等级'}</span>
        <span>状态：{filters.status ? getAlertStatusLabel(filters.status) : '全部状态'}</span>
        <span>楼层：{getSelectedFloorName(filters.floorId, viewModel.selectedFloorName)}</span>
        <span>店铺：{filters.storeId ? viewModel.selectedStoreName : '全部店铺'}</span>
        <span>关键词：{filters.keyword ?? '无'}</span>
        <span>选中：{selectedAlert?.id ?? '无'}</span>
      </MotionSurface>

      <MotionSurface className="alert-summary-grid" aria-label="低效预警统计" delay={0.06}>
        <article className="alert-summary-card">
          <span>匹配告警</span>
          <strong>{viewModel.summary.total}</strong>
          <p>当前筛选条件下的告警数量</p>
        </article>
        <article className="alert-summary-card">
          <span>未处理</span>
          <strong>{viewModel.summary.open}</strong>
          <p>需要运营优先确认</p>
        </article>
        <article className="alert-summary-card">
          <span>处理中</span>
          <strong>{viewModel.summary.inProgress}</strong>
          <p>已有巡检或复核动作</p>
        </article>
        <article className="alert-summary-card">
          <span>高风险</span>
          <strong>{viewModel.summary.high}</strong>
          <p>高等级且尚未处理完成</p>
        </article>
      </MotionSurface>

      <div className="store-alerts-layout">
        <MotionSurface as="section" className="dashboard-panel store-alerts-list-panel" aria-labelledby="alert-list-title" delay={0.08}>
          <div className="panel-heading">
            <div>
              <h2 id="alert-list-title">告警列表</h2>
              <p>按处理状态、等级和持续时间排序，优先处理高风险未闭环告警。</p>
            </div>
            <StatusBadge label={`${viewModel.rows.length} 条`} tone="neutral" />
          </div>
          <AlertList rows={viewModel.rows} selectedAlertId={selectedAlert?.id ?? ''} buildAlertUrl={buildAlertUrl} />
        </MotionSurface>

        <MotionSurface as="section" className="dashboard-panel store-alerts-detail-panel" aria-labelledby="alert-detail-title" delay={0.1}>
          <div className="panel-heading">
            <div>
              <h2 id="alert-detail-title">告警详情</h2>
              <p>{selectedAlert ? `${selectedAlert.floorName} / ${selectedAlert.storeName}` : '当前筛选没有可处理告警'}</p>
            </div>
            {selectedAlert ? (
              <span className="alert-item__badges">
                <StatusBadge label={`${getAlertLevelLabel(selectedAlert.level)}风险`} tone={getAlertTone(selectedAlert.level)} />
                <StatusBadge label={getAlertStatusLabel(selectedAlert.status)} tone={getAlertStatusTone(selectedAlert.status)} />
              </span>
            ) : null}
          </div>

          <AlertDetail
            alert={selectedAlert}
            detailMetrics={viewModel.detailMetrics}
            actionItems={viewModel.actionItems}
            buildStoreAnalysisUrl={buildStoreAnalysisUrl}
            buildDigitalTwinUrl={buildDigitalTwinUrl}
          />
        </MotionSurface>
      </div>
    </MotionSurface>
  );
}
