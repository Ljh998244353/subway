import { PageScaffold } from './PageScaffold';

export function StoreAnalysisPage() {
  return (
    <PageScaffold
      title="店铺分析"
      description="解释店铺表现、评分、转化和低效原因，服务招商与运营决策。"
      primaryAction="重置筛选"
      metrics={[
        { label: 'C/D 店铺', value: '18', detail: '按评分规则统计', status: 'warning' },
        { label: '平均转化率', value: '23.6%', detail: '0-100% 边界', status: 'normal' },
        { label: '连续下滑', value: '6', detail: '连续 3 周期', status: 'danger' },
        { label: '可分析店铺', value: '100', detail: 'P2 Mock 目标', status: 'info' }
      ]}
      sections={['店铺列表占位', '店铺详情占位', '评分趋势占位', '低效原因占位']}
    />
  );
}
