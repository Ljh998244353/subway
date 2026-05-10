import type { OverviewMetric } from '../types/index.ts';
import { MetricCard } from './MetricCard';

type SummaryStripProps = {
  metrics: OverviewMetric[];
};

export function SummaryStrip({ metrics }: SummaryStripProps) {
  return (
    <div className="summary-grid" aria-label="运营总览关键指标">
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}
