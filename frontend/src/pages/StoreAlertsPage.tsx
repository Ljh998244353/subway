import { PageScaffold } from './PageScaffold';

export function StoreAlertsPage() {
  return (
    <PageScaffold
      title="低效预警"
      description="集中处理低评分、低转化、拥挤和数据异常预警，P2 仅做前端 Mock 状态。"
      primaryAction="处理选中告警"
      metrics={[
        { label: '未处理', value: '12', detail: 'open 状态', status: 'danger' },
        { label: '处理中', value: '5', detail: 'handling 状态', status: 'warning' },
        { label: '今日新增', value: '9', detail: 'Mock 数据', status: 'info' },
        { label: '已处理', value: '28', detail: 'resolved 状态', status: 'normal' }
      ]}
      sections={['告警列表占位', '告警详情占位', '处理状态占位', '告警统计占位']}
    />
  );
}
