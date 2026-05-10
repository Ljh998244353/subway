import { useSearchParams } from 'react-router-dom';

type Metric = {
  label: string;
  value: string;
  detail: string;
  status: 'normal' | 'warning' | 'danger' | 'info';
};

type PageScaffoldProps = {
  title: string;
  description: string;
  primaryAction: string;
  metrics: Metric[];
  sections: string[];
};

const statusLabel: Record<Metric['status'], string> = {
  normal: '正常',
  warning: '关注',
  danger: '高危',
  info: '信息'
};

export function PageScaffold({ title, description, primaryAction, metrics, sections }: PageScaffoldProps) {
  const [params] = useSearchParams();
  const timeRange = params.get('timeRange') || 'today';
  const mallId = params.get('mallId') || 'M_DEMO';

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="page-kicker">今日 / 全部楼层 / Mock 数据</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <button className="primary-button" type="button">
          {primaryAction}
        </button>
      </header>

      <div className="filter-bar" aria-label={`${title}筛选摘要`}>
        <span>商场：{mallId}</span>
        <span>时间：{timeRange}</span>
        <span>数据源：Mock</span>
      </div>

      <div className="summary-grid" aria-label={`${title}关键指标`}>
        {metrics.map((metric) => (
          <article className={`metric-card metric-card--${metric.status}`} key={metric.label}>
            <span className="metric-card__label">{metric.label}</span>
            <strong>{metric.value}</strong>
            <span className="metric-card__detail">{metric.detail}</span>
            <span className="metric-card__status">{statusLabel[metric.status]}</span>
          </article>
        ))}
      </div>

      <div className="placeholder-grid">
        {sections.map((section) => (
          <section className="placeholder-panel" key={section} aria-label={section}>
            <h2>{section}</h2>
            <p>此处将在后续增量接入 Mock 数据、图表或数字孪生组件。</p>
          </section>
        ))}
      </div>
    </section>
  );
}
