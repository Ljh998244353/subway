import { PageScaffold } from './PageScaffold';

export function DashboardPage() {
  return (
    <PageScaffold
      title="运营总览"
      description="快速判断全场客流、拥挤、低效店铺和高等级告警。"
      primaryAction="刷新总览"
      metrics={[
        { label: '当前场内人数', value: '8,426', detail: '较上小时 +6.4%', status: 'info' },
        { label: '今日累计客流', value: '42,180', detail: 'Mock 小时粒度', status: 'normal' },
        { label: '拥挤楼层', value: '2', detail: 'F2、F4 需要关注', status: 'warning' },
        { label: '未处理告警', value: '12', detail: '高危 3 条', status: 'danger' }
      ]}
      sections={['客流趋势占位', '楼层状态占位', '低效店铺榜占位', '实时告警摘要占位']}
    />
  );
}
