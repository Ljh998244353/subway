import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { MotionSurface } from '../components/MotionSurface';
import { ScoreBreakdown } from '../components/ScoreBreakdown';
import { getWeightedScore } from '../components/scoreBreakdownUtils.ts';
import { StoreList } from '../components/StoreList';
import { getAlertStatusLabel, getAlertStatusTone, getScoreLevelLabel, getScoreTone, StatusBadge } from '../components/StatusBadge';
import { mockAlerts, mockFloors, mockMall, mockStoresWithAlerts } from '../mock/index.ts';
import { buildStoreAlertsUrl, buildStoreAnalysisUrl, buildStoreScoreTwinUrl } from '../routes/demoFlow.ts';
import { buildRouteWithGlobalQuery } from '../routes/routeConfig';
import type { ScoreLevel, StoreCategory } from '../types/index.ts';
import { buildStoreAnalysisViewModel, type StoreAnalysisFilters } from './storeAnalysisModel.ts';

function parseFilters(params: URLSearchParams): StoreAnalysisFilters {
  return {
    floorId: params.get('floorId') || 'all',
    category: (params.get('category') || undefined) as StoreCategory | undefined,
    scoreLevel: (params.get('scoreLevel') || undefined) as ScoreLevel | undefined,
    keyword: params.get('keyword') || undefined,
    storeId: params.get('storeId') || undefined
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

export function StoreAnalysisPage() {
  const [params] = useSearchParams();
  const location = useLocation();
  const timeRange = params.get('timeRange') || 'today';
  const filters = parseFilters(params);
  const viewModel = buildStoreAnalysisViewModel(mockStoresWithAlerts, mockAlerts, mockFloors, filters);
  const selectedStore = viewModel.selectedStore;

  const buildStoreUrl = (storeId: string) => buildStoreAnalysisUrl({ storeId }, location.search);
  const selectedScore = selectedStore?.score;

  return (
    <MotionSurface as="section" className="page store-analysis-page">
      <MotionSurface as="section" className="page-header dashboard-header" delay={0.02}>
        <div>
          <p className="page-kicker">店铺分析 / {formatTimeRange(timeRange)} / Mock 数据</p>
          <h1>店铺分析</h1>
          <p>
            解释 {mockMall.name} 的店铺表现、转化、停留和低效原因，所有店铺与指标均为虚构 Mock 数据。
          </p>
        </div>
        <div className="dashboard-header__actions">
          <StatusBadge label={viewModel.hasRows ? '可分析' : '暂无匹配'} tone={viewModel.hasRows ? 'info' : 'neutral'} />
          <Link className="ghost-button link-button" to={buildRouteWithGlobalQuery('/store-analysis', location.search)}>
            重置筛选
          </Link>
        </div>
      </MotionSurface>

      <MotionSurface className="filter-bar" aria-label="店铺分析筛选摘要" delay={0.04}>
        <span>商场：{mockMall.name}</span>
        <span>时间：{formatTimeRange(timeRange)}</span>
        <span>楼层：{filters.floorId === 'all' ? '全部楼层' : viewModel.selectedFloorName}</span>
        <span>业态：{filters.category ?? '全部业态'}</span>
        <span>评分：{filters.scoreLevel ? getScoreLevelLabel(filters.scoreLevel) : '全部等级'}</span>
        <span>关键词：{filters.keyword ?? '无'}</span>
        <span>选中：{selectedStore?.name ?? '无'}</span>
      </MotionSurface>

      <div className="store-analysis-layout">
        <MotionSurface as="section" className="dashboard-panel store-analysis-list-panel" aria-labelledby="store-list-title" delay={0.06}>
          <div className="panel-heading">
            <div>
              <h2 id="store-list-title">店铺列表</h2>
              <p>按评分从低到高排序，优先查看低效和告警店铺。</p>
            </div>
            <StatusBadge label={`${viewModel.rows.length} 家`} tone="neutral" />
          </div>
          <StoreList rows={viewModel.rows.slice(0, 18)} selectedStoreId={selectedStore?.id ?? ''} buildStoreUrl={buildStoreUrl} />
        </MotionSurface>

        <MotionSurface as="section" className="dashboard-panel store-analysis-detail-panel" aria-labelledby="store-detail-title" delay={0.08}>
          <div className="panel-heading">
            <div>
              <h2 id="store-detail-title">店铺详情</h2>
              <p>{selectedStore ? `${viewModel.selectedFloorName} / ${selectedStore.category}` : '当前筛选没有可分析店铺'}</p>
            </div>
            {selectedScore ? (
              <StatusBadge
                label={`${selectedScore.score} 分 · ${getScoreLevelLabel(selectedScore.level)}`}
                tone={getScoreTone(selectedScore.level)}
              />
            ) : null}
          </div>

          {selectedStore && selectedScore ? (
            <>
              <div className="store-detail-metrics">
                {viewModel.detailMetrics.map((metric) => (
                  <article className="store-detail-metric" key={metric.label}>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                    <p>{metric.hint}</p>
                  </article>
                ))}
              </div>

              <section className="store-detail-section" aria-labelledby="score-breakdown-title">
                <div className="section-title-row">
                  <h3 id="score-breakdown-title">评分拆解</h3>
                  <span>加权估算 {getWeightedScore(selectedScore.breakdown)} 分</span>
                </div>
                <ScoreBreakdown breakdown={selectedScore.breakdown} />
              </section>

              <section className="store-detail-section" aria-labelledby="inefficient-reasons-title">
                <div className="section-title-row">
                  <h3 id="inefficient-reasons-title">低效原因</h3>
                  <span>趋势 {selectedScore.trendDelta > 0 ? '+' : ''}{selectedScore.trendDelta}</span>
                </div>
                <ul className="reason-list">
                  {viewModel.inefficientReasonText.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
              </section>

              <section className="store-detail-section" aria-labelledby="store-actions-title">
                <div className="section-title-row">
                  <h3 id="store-actions-title">关联入口</h3>
                  <span>{viewModel.relatedAlerts.length} 条相关告警</span>
                </div>
                <div className="store-action-row">
                  <Link
                    className="ghost-button link-button"
                    to={buildStoreScoreTwinUrl({ floorId: selectedStore.floorId, storeId: selectedStore.id }, location.search)}
                  >
                    查看空间位置
                  </Link>
                  <Link
                    className="ghost-button link-button"
                    to={buildStoreAlertsUrl({ storeId: selectedStore.id }, location.search)}
                  >
                    查看相关告警
                  </Link>
                </div>

                <div className="related-alerts">
                  {viewModel.relatedAlerts.length === 0 ? (
                    <p>当前店铺没有关联告警。</p>
                  ) : (
                    viewModel.relatedAlerts.map((alert) => (
                      <Link
                        className="related-alert"
                        key={alert.id}
                        to={buildStoreAlertsUrl({ alertId: alert.id }, location.search)}
                      >
                        <span>{alert.title}</span>
                        <StatusBadge label={getAlertStatusLabel(alert.status)} tone={getAlertStatusTone(alert.status)} />
                        <span>{alert.durationMinutes} 分钟</span>
                      </Link>
                    ))
                  )}
                </div>
              </section>
            </>
          ) : (
            <div className="state-panel" role="status">
              当前筛选没有店铺数据，请调整楼层、业态、评分或关键词。
            </div>
          )}
        </MotionSurface>
      </div>
    </MotionSurface>
  );
}
