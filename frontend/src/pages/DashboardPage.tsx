import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { MotionSurface } from '../components/MotionSurface';
import { SummaryStrip } from '../components/SummaryStrip';
import {
  getAlertLevelLabel,
  getAlertStatusLabel,
  getAlertStatusTone,
  getAlertTone,
  getScoreLevelLabel,
  getScoreTone,
  StatusBadge
} from '../components/StatusBadge';
import { TrendSparkline } from '../components/TrendSparkline';
import { mockAlerts, mockFloors, mockMall, mockOverview, mockStoresWithAlerts } from '../mock/index.ts';
import { buildDashboardFloorTwinUrl, buildStoreAnalysisUrl, buildStoreAlertsUrl } from '../routes/demoFlow.ts';
import { buildDashboardViewModel, getDashboardState } from './dashboardModel.ts';
import { createInitialDashboardOverviewState, resolveDashboardOverviewState } from './dashboardOverviewState.ts';

const dashboardStateCopy = {
  normal: '运行正常',
  warning: '需要关注',
  danger: '高危告警',
  empty: '暂无数据'
} as const;

function formatTimeRange(timeRange: string) {
  if (timeRange === 'today') {
    return '今日';
  }

  if (timeRange === '7d') {
    return '近 7 日';
  }

  return timeRange;
}

export function DashboardPage() {
  const [params] = useSearchParams();
  const location = useLocation();
  const mallId = params.get('mallId') || mockOverview.mallId;
  const timeRange = params.get('timeRange') || 'today';
  const floorId = params.get('floorId') || 'all';
  const dataMode = params.get('dataMode') ?? undefined;
  const apiBaseUrl = params.get('apiBaseUrl') ?? undefined;
  const [overviewState, setOverviewState] = useState(createInitialDashboardOverviewState);
  const dashboard = useMemo(
    () => buildDashboardViewModel(overviewState.result.overview, mockStoresWithAlerts, mockAlerts, mockFloors),
    [overviewState.result.overview]
  );
  const dashboardState = getDashboardState(dashboard);
  const dataSourceLabel = overviewState.result.source === 'api' ? 'API' : 'Mock';
  const statusLabel =
    overviewState.status === 'loading'
      ? 'API 加载中'
      : overviewState.status === 'error'
        ? 'API 异常 / Mock 回退'
        : `${dataSourceLabel} 模式`;
  const selectedFloor = floorId === 'all' ? undefined : mockFloors.find((floor) => floor.id === floorId);
  const openHighAlertCount = dashboard.alerts.filter((alert) => alert.level === 'high' && alert.status !== 'resolved').length;

  useEffect(() => {
    let active = true;

    if (dataMode === 'api') {
      setOverviewState((current) => ({ ...current, status: 'loading', errorMessage: undefined }));
    }

    void resolveDashboardOverviewState({
      mode: dataMode,
      apiBaseUrl,
      mallId
    }).then((nextState) => {
      if (active) {
        setOverviewState(nextState);
      }
    });

    return () => {
      active = false;
    };
  }, [apiBaseUrl, dataMode, mallId]);

  return (
    <MotionSurface as="section" className="page dashboard-page">
      <MotionSurface as="section" className="page-header dashboard-header" delay={0.02}>
        <div>
          <p className="page-kicker">运营总览 / {formatTimeRange(timeRange)} / {dataSourceLabel} 数据</p>
          <h1>运营总览</h1>
          <p>
            聚合 {mockMall.name} 的客流、拥挤、低效店铺和告警状态，所有数据均为虚构 Mock 数据。
          </p>
        </div>
        <div className="dashboard-header__actions">
          <StatusBadge label={statusLabel} tone={overviewState.status === 'error' ? 'warning' : 'info'} />
          <StatusBadge label={dashboardStateCopy[dashboardState]} tone={dashboardState === 'empty' ? 'neutral' : dashboardState} />
          <button className="primary-button" type="button">
            刷新总览
          </button>
        </div>
      </MotionSurface>

      <MotionSurface className="filter-bar" aria-label="运营总览筛选摘要" delay={0.04}>
        <span>商场：{mockMall.name}</span>
        <span>时间：{formatTimeRange(timeRange)}</span>
        <span>楼层：{selectedFloor?.name ?? '全部楼层'}</span>
        <span>数据源：{dataSourceLabel}</span>
        <span>最近更新：{new Date(overviewState.result.overview.generatedAt).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</span>
        {overviewState.errorMessage ? <span>API 回退：{overviewState.errorMessage}</span> : null}
      </MotionSurface>

      <MotionSurface as="section" className="operations-ribbon" aria-label="运营巡检摘要" delay={0.06}>
        <div>
          <span>今日巡检重点</span>
          <strong>{openHighAlertCount} 条高风险未闭环</strong>
        </div>
        <p>
          优先查看 {dashboard.busiestFloor?.floorName ?? '拥挤楼层'} 的空间拥挤和低效店铺，演示数据仅用于课程 Demo。
        </p>
        <Link className="ghost-button link-button" to={buildStoreAlertsUrl({}, location.search)}>
          进入预警队列
        </Link>
      </MotionSurface>

      <SummaryStrip metrics={dashboard.metrics} />

      <div className="dashboard-grid">
        <MotionSurface as="section" className="dashboard-panel dashboard-panel--wide" aria-labelledby="traffic-trend-title" delay={0.08}>
          <div className="panel-heading">
            <div>
              <h2 id="traffic-trend-title">客流趋势</h2>
              <p>小时粒度，展示当前场内人数与新增客流趋势。</p>
            </div>
            <StatusBadge label={`${dataSourceLabel} / 小时`} tone="info" />
          </div>
          <TrendSparkline points={dashboard.trafficTrend} />
          <p className="chart-readable-summary">
            当前趋势峰值来自 {dashboard.busiestFloor?.floorName ?? '暂无楼层'}，最高拥挤指数 {dashboard.busiestFloor?.crowdingIndex.toFixed(2) ?? '-'}。
          </p>
        </MotionSurface>

        <MotionSurface as="section" className="dashboard-panel" aria-labelledby="floor-status-title" delay={0.1}>
          <div className="panel-heading">
            <div>
              <h2 id="floor-status-title">楼层状态</h2>
              <p>按拥挤指数排序，点击进入数字孪生。</p>
            </div>
          </div>
          <div className="floor-list">
            {dashboard.floorSummaries.map((floor) => (
              <Link
                className="floor-row"
                key={floor.floorId}
                to={buildDashboardFloorTwinUrl(floor.floorId, location.search)}
              >
                <span className="floor-row__name">{floor.floorName}</span>
                <span className="floor-row__meta">{floor.traffic.toLocaleString('zh-CN')} 人次</span>
                <span className="floor-row__bar" aria-hidden="true">
                  <span style={{ width: `${Math.min(floor.crowdingIndex * 82, 100)}%` }} />
                </span>
                <span className="floor-row__status">
                  拥挤 {floor.crowdingIndex.toFixed(2)} · 告警 {floor.alertCount}
                </span>
              </Link>
            ))}
          </div>
        </MotionSurface>

        <MotionSurface as="section" className="dashboard-panel dashboard-panel--wide" aria-labelledby="inefficient-stores-title" delay={0.12}>
          <div className="panel-heading">
            <div>
              <h2 id="inefficient-stores-title">低效店铺榜</h2>
              <p>仅展示 C/D 级或明确关注店铺，作为招商和运营巡检入口。</p>
            </div>
          </div>
          <div className="data-table" role="table" aria-label="低效店铺榜">
            <div className="data-table__row data-table__row--head" role="row">
              <span role="columnheader">店铺</span>
              <span role="columnheader">楼层 / 业态</span>
              <span role="columnheader">评分</span>
              <span role="columnheader">转化</span>
              <span role="columnheader">原因</span>
            </div>
            {dashboard.inefficientStores.map((store) => (
              <Link
                className="data-table__row"
                key={store.id}
                role="row"
                to={buildStoreAnalysisUrl({ storeId: store.id }, location.search)}
              >
                <span role="cell">{store.name}</span>
                <span role="cell">{store.floorName} / {store.category}</span>
                <span role="cell">
                  <StatusBadge label={`${store.score} 分 · ${getScoreLevelLabel(store.level)}`} tone={getScoreTone(store.level)} />
                </span>
                <span role="cell">{store.conversionRate}%</span>
                <span role="cell">{store.reason}</span>
              </Link>
            ))}
          </div>
        </MotionSurface>

        <MotionSurface as="section" className="dashboard-panel" aria-labelledby="alerts-title" delay={0.14}>
          <div className="panel-heading">
            <div>
              <h2 id="alerts-title">告警摘要</h2>
              <p>高等级和未处理告警优先处理。</p>
            </div>
          </div>
          <div className="alert-list">
            {dashboard.alerts.map((alert) => (
              <Link
                className="alert-item"
                key={alert.id}
                to={buildStoreAlertsUrl({ alertId: alert.id }, location.search)}
              >
                <div className="alert-item__topline">
                  <strong>{alert.title}</strong>
                  <span className="alert-item__badges">
                    <StatusBadge label={`${getAlertLevelLabel(alert.level)}风险`} tone={getAlertTone(alert.level)} />
                    <StatusBadge label={getAlertStatusLabel(alert.status)} tone={getAlertStatusTone(alert.status)} />
                  </span>
                </div>
                <p>{alert.floorName} · {alert.storeName} · 已持续 {alert.durationMinutes} 分钟</p>
                <span>{alert.suggestedAction}</span>
              </Link>
            ))}
          </div>
        </MotionSurface>
      </div>
    </MotionSurface>
  );
}
