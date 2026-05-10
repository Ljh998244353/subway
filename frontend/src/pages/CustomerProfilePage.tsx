import { PageScaffold } from './PageScaffold';

export function CustomerProfilePage() {
  return (
    <PageScaffold
      title="客群画像"
      description="仅展示匿名聚合的时段、楼层和业态偏好，不展示个人身份或轨迹。"
      primaryAction="查看口径"
      metrics={[
        { label: '活跃时段', value: '18:00', detail: '小时聚合', status: 'info' },
        { label: '热门业态', value: '餐饮', detail: '占比 34%', status: 'normal' },
        { label: '主要楼层', value: 'F2', detail: '停留占比最高', status: 'warning' },
        { label: '样本状态', value: '充足', detail: '小样本将隐藏', status: 'normal' }
      ]}
      sections={['时段分布占位', '楼层偏好占位', '业态偏好占位', '隐私口径说明占位']}
    />
  );
}
