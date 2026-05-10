import type { OverviewMetric } from '../types/index.ts';
import { StatusBadge } from './StatusBadge';

type MetricCardProps = {
  metric: OverviewMetric;
};

function formatMetricValue(metric: OverviewMetric) {
  const value = metric.value.toLocaleString('zh-CN', {
    maximumFractionDigits: Number.isInteger(metric.value) ? 0 : 2
  });

  return `${value}${metric.unit}`;
}

function formatTrend(delta: number) {
  if (delta === 0) {
    return '较上周期持平';
  }

  const direction = delta > 0 ? '+' : '';
  return `较上周期 ${direction}${delta}%`;
}

const metricStatusLabel: Record<OverviewMetric['status'], string> = {
  normal: '正常',
  info: '信息',
  warning: '关注',
  danger: '高危'
};

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <article className={`metric-card metric-card--${metric.status}`} aria-label={`${metric.label} ${formatMetricValue(metric)}`}>
      <div className="metric-card__topline">
        <span className="metric-card__label">{metric.label}</span>
        <StatusBadge label={metricStatusLabel[metric.status]} tone={metric.status} />
      </div>
      <strong>{formatMetricValue(metric)}</strong>
      <span className="metric-card__detail">{formatTrend(metric.trendDelta)} · {metric.timeWindow}</span>
      <p className="metric-card__description">{metric.description}</p>
    </article>
  );
}
