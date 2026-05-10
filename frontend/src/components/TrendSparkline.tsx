import type { TrafficTrendPoint } from '../types/index.ts';

type TrendSparklineProps = {
  points: TrafficTrendPoint[];
};

function getPolylinePoints(points: TrafficTrendPoint[]) {
  if (points.length === 0) {
    return '';
  }

  const values = points.map((point) => point.currentOccupancy);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const spread = Math.max(max - min, 1);

  return points
    .map((point, index) => {
      const x = points.length === 1 ? 50 : (index / (points.length - 1)) * 100;
      const y = 84 - ((point.currentOccupancy - min) / spread) * 68;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
}

function formatHour(timestamp: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Shanghai'
  }).format(new Date(timestamp));
}

export function TrendSparkline({ points }: TrendSparklineProps) {
  const polylinePoints = getPolylinePoints(points);
  const peak = points.reduce<TrafficTrendPoint | undefined>((currentPeak, point) => {
    if (!currentPeak || point.currentOccupancy > currentPeak.currentOccupancy) {
      return point;
    }

    return currentPeak;
  }, undefined);

  if (points.length === 0) {
    return (
      <div className="chart-empty" role="status">
        当前筛选无客流趋势数据
      </div>
    );
  }

  return (
    <div className="trend-chart">
      <svg className="trend-chart__svg" role="img" viewBox="0 0 100 100" aria-label="今日小时客流趋势折线图">
        <line className="trend-chart__baseline" x1="0" x2="100" y1="84" y2="84" />
        <polyline className="trend-chart__line" points={polylinePoints} fill="none" />
        {points.map((point, index) => (
          <circle
            className="trend-chart__point"
            cx={points.length === 1 ? 50 : (index / (points.length - 1)) * 100}
            cy={84 - ((point.currentOccupancy - Math.min(...points.map((item) => item.currentOccupancy))) / Math.max(Math.max(...points.map((item) => item.currentOccupancy)) - Math.min(...points.map((item) => item.currentOccupancy)), 1)) * 68}
            key={point.timestamp}
            r={point === peak ? 2.6 : 1.8}
          >
            <title>{`${formatHour(point.timestamp)} 场内人数 ${point.currentOccupancy} 人，新增客流 ${point.todayTrafficDelta} 人次`}</title>
          </circle>
        ))}
      </svg>
      <div className="trend-chart__summary">
        <span>峰值：{peak?.currentOccupancy.toLocaleString('zh-CN')} 人</span>
        <span>粒度：小时</span>
        <span>来源：Mock</span>
      </div>
    </div>
  );
}
