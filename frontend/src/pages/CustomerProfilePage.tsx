import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import { mockCustomerProfile, mockFloors, mockMall } from '../mock/index.ts';
import {
  buildCustomerProfileCategoryUrl,
  buildCustomerProfileFloorTwinUrl
} from '../routes/demoFlow.ts';
import type { StoreCategory } from '../types/index.ts';
import {
  buildCustomerProfileViewModel,
  getCustomerProfileState,
  type CategoryPreferenceRow,
  type CustomerProfileFilters,
  type FloorPreferenceRow,
  type TimeDistributionRow
} from './customerProfileModel.ts';

function parseFilters(params: URLSearchParams): CustomerProfileFilters {
  return {
    floorId: params.get('floorId') || 'all',
    category: (params.get('category') || 'all') as StoreCategory | 'all'
  };
}

function formatTimeRange(timeRange: string) {
  if (timeRange === 'today') {
    return '今日';
  }

  if (timeRange === '7d') {
    return '近 7 日';
  }

  if (timeRange === '30d') {
    return '近 30 日';
  }

  return timeRange;
}

function formatGeneratedAt(value: string) {
  return new Date(value).toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai'
  });
}

const profileStateCopy = {
  normal: { label: '聚合充足', tone: 'normal' },
  partial: { label: '小样本隐藏', tone: 'info' },
  empty: { label: '暂无匹配', tone: 'neutral' }
} as const satisfies Record<string, { label: string; tone: 'normal' | 'info' | 'neutral' }>;

function SummaryCards({ metrics }: { metrics: ReturnType<typeof buildCustomerProfileViewModel>['summaryMetrics'] }) {
  return (
    <div className="customer-summary-grid" aria-label="客群画像概览指标">
      {metrics.map((metric) => (
        <article className={`customer-summary-card customer-summary-card--${metric.status}`} key={metric.id}>
          <div className="metric-card__topline">
            <span className="metric-card__label">{metric.label}</span>
            <StatusBadge label={metric.status === 'warning' ? '关注' : metric.status === 'info' ? '信息' : '正常'} tone={metric.status} />
          </div>
          <strong>{metric.displayValue}</strong>
          <span className="metric-card__detail">{metric.timeWindow}</span>
          <p>{metric.description}</p>
        </article>
      ))}
    </div>
  );
}

function TimeDistributionChart({ rows }: { rows: TimeDistributionRow[] }) {
  const maxTraffic = Math.max(1, ...rows.map((row) => row.traffic));

  if (rows.length === 0) {
    return <div className="state-panel" role="status">当前筛选没有时段聚合数据。</div>;
  }

  return (
    <div className="time-distribution" aria-label="时段分布图">
      {rows.map((row) => (
        <article className={`time-bar${row.isPeak ? ' is-peak' : ''}`} key={row.hour}>
          <span className="time-bar__value">{row.traffic.toLocaleString('zh-CN')}</span>
          <span className="time-bar__track" aria-hidden="true">
            <span style={{ height: `${Math.max(8, (row.traffic / maxTraffic) * 100)}%` }} />
          </span>
          <span className="time-bar__label">{row.label}</span>
          <span className="time-bar__share">{row.sharePercent}%</span>
        </article>
      ))}
    </div>
  );
}

function FloorPreferenceList({
  rows,
  buildFloorUrl
}: {
  rows: FloorPreferenceRow[];
  buildFloorUrl: (floorId: string) => string;
}) {
  if (rows.length === 0) {
    return <div className="state-panel" role="status">当前筛选没有楼层偏好数据。</div>;
  }

  return (
    <div className="profile-preference-list" aria-label="楼层偏好列表">
      {rows.map((row) => (
        <Link className="profile-preference-row" key={row.floorId} to={buildFloorUrl(row.floorId)}>
          <span className="profile-preference-row__label">
            <strong>{row.floorCode}</strong>
            <span>{row.floorName}</span>
          </span>
          <span className="profile-preference-row__bar" aria-hidden="true">
            <span style={{ width: `${Math.max(row.trafficPercent, 4)}%` }} />
          </span>
          <span className="profile-preference-row__meta">
            客流 {row.trafficPercent}% · 停留 {row.dwellPercent}%
          </span>
          {row.isPrimary ? <StatusBadge label="主要楼层" tone="warning" /> : null}
        </Link>
      ))}
    </div>
  );
}

function CategoryPreferenceList({
  rows,
  buildCategoryUrl
}: {
  rows: CategoryPreferenceRow[];
  buildCategoryUrl: (category: StoreCategory) => string;
}) {
  if (rows.length === 0) {
    return <div className="state-panel" role="status">当前筛选没有业态偏好数据。</div>;
  }

  return (
    <div className="profile-preference-list" aria-label="业态偏好列表">
      {rows.map((row) => (
        <Link className="profile-preference-row" key={row.category} to={buildCategoryUrl(row.category)}>
          <span className="profile-preference-row__label">
            <strong>{row.category}</strong>
            <span>转化 {row.conversionRate}%</span>
          </span>
          <span className="profile-preference-row__bar profile-preference-row__bar--category" aria-hidden="true">
            <span style={{ width: `${Math.max(row.trafficPercent, 4)}%` }} />
          </span>
          <span className="profile-preference-row__meta">
            客流 {row.trafficPercent}% · 停留 {row.dwellPercent}%
          </span>
          {row.isTopCategory ? <StatusBadge label="Top 业态" tone="info" /> : null}
        </Link>
      ))}
    </div>
  );
}

export function CustomerProfilePage() {
  const [params] = useSearchParams();
  const location = useLocation();
  const timeRange = params.get('timeRange') || 'today';
  const filters = parseFilters(params);
  const viewModel = buildCustomerProfileViewModel(mockCustomerProfile, mockFloors, filters);
  const profileState = getCustomerProfileState(viewModel);
  const stateCopy = profileStateCopy[profileState];

  return (
    <section className="page customer-profile-page">
      <header className="page-header dashboard-header">
        <div>
          <p className="page-kicker">客群画像 / {formatTimeRange(timeRange)} / Mock 数据</p>
          <h1>客群画像</h1>
          <p>
            展示 {mockMall.name} 的匿名聚合时段、楼层和业态偏好，用于活动评估和运营分析，不包含个人轨迹、会员身份或人脸数据。
          </p>
        </div>
        <div className="dashboard-header__actions">
          <StatusBadge label={stateCopy.label} tone={stateCopy.tone} />
          <a className="ghost-button link-button" href="#privacy-boundary-title">
            查看口径
          </a>
        </div>
      </header>

      <div className="filter-bar" aria-label="客群画像筛选摘要">
        <span>商场：{mockMall.name}</span>
        <span>时间：{formatTimeRange(timeRange)}</span>
        {viewModel.filterSummary.map((item) => (
          <span key={item}>{item}</span>
        ))}
        <span>最近生成：{formatGeneratedAt(mockCustomerProfile.generatedAt)}</span>
      </div>

      <SummaryCards metrics={viewModel.summaryMetrics} />

      {viewModel.smallSampleHidden ? (
        <div className="customer-privacy-notice" role="status">
          样本不足时已隐藏明细，只保留匿名聚合口径，避免反推个人身份或单人行为。
        </div>
      ) : null}

      <div className="customer-profile-grid">
        <section className="dashboard-panel dashboard-panel--wide" aria-labelledby="time-distribution-title">
          <div className="panel-heading">
            <div>
              <h2 id="time-distribution-title">时段分布</h2>
              <p>小时粒度的匿名聚合客流，峰值时段以文字和高度同时标识。</p>
            </div>
            <StatusBadge label={viewModel.peakTime ? `峰值 ${viewModel.peakTime.label}` : '暂无峰值'} tone="info" />
          </div>
          <TimeDistributionChart rows={viewModel.timeDistribution} />
          <p className="chart-readable-summary">
            活跃时段为 {mockCustomerProfile.activeTimeRange}；当前峰值为 {viewModel.peakTime?.label ?? '暂无'}，
            不提供个人路径回放。
          </p>
        </section>

        <section className="dashboard-panel" aria-labelledby="privacy-boundary-title">
          <div className="panel-heading">
            <div>
              <h2 id="privacy-boundary-title">隐私口径</h2>
              <p>本页只展示匿名聚合 Mock 数据。</p>
            </div>
          </div>
          <div className="privacy-boundary-list">
            {viewModel.privacyBoundaries.map((boundary) => (
              <article className="privacy-boundary-item" key={boundary.label}>
                <strong>{boundary.label}</strong>
                <p>{boundary.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-panel" aria-labelledby="floor-preference-title">
          <div className="panel-heading">
            <div>
              <h2 id="floor-preference-title">楼层偏好</h2>
              <p>按客流占比排序，点击进入数字孪生动线模式。</p>
            </div>
            <StatusBadge label={viewModel.primaryFloor?.floorCode ?? '暂无'} tone="warning" />
          </div>
          <FloorPreferenceList
            rows={viewModel.floorPreferences}
            buildFloorUrl={(floorId) => buildCustomerProfileFloorTwinUrl(floorId, location.search)}
          />
        </section>

        <section className="dashboard-panel" aria-labelledby="category-preference-title">
          <div className="panel-heading">
            <div>
              <h2 id="category-preference-title">业态偏好</h2>
              <p>按客流占比排序，点击进入店铺分析业态筛选。</p>
            </div>
            <StatusBadge label={viewModel.topCategory?.category ?? '暂无'} tone="info" />
          </div>
          <CategoryPreferenceList
            rows={viewModel.categoryPreferences}
            buildCategoryUrl={(category) => buildCustomerProfileCategoryUrl(category, location.search)}
          />
        </section>
      </div>
    </section>
  );
}
