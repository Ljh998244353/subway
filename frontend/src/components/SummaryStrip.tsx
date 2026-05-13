import type { OverviewMetric } from '../types/index.ts';
import { MetricCard } from './MetricCard';
import { MotionSurface } from './MotionSurface';

type SummaryStripProps = {
  metrics: OverviewMetric[];
};

export function SummaryStrip({ metrics }: SummaryStripProps) {
  return (
    <div className="summary-grid" aria-label="运营总览关键指标">
      {metrics.map((metric) => (
        <MotionSurface as="article" className="motion-card-shell" delay={0.08} key={metric.id}>
          <MetricCard metric={metric} />
        </MotionSurface>
      ))}
    </div>
  );
}
