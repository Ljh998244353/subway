import { PageScaffold } from './PageScaffold';

export function DigitalTwinPage() {
  return (
    <PageScaffold
      title="数字孪生"
      description="用自绘空间视图解释楼层、店铺、热力和告警之间的关系。"
      primaryAction="切换热力模式"
      metrics={[
        { label: '当前楼层', value: 'F2', detail: '自绘几何楼层', status: 'info' },
        { label: '热力峰值', value: 'High', detail: '无个人轨迹', status: 'warning' },
        { label: '告警标记', value: '5', detail: '点击后进入预警', status: 'danger' },
        { label: '选中店铺', value: '未选择', detail: '支持后续点击联动', status: 'normal' }
      ]}
      sections={['自绘楼层画布占位', '覆盖层图例占位', '选中对象详情占位', '回放控制占位']}
    />
  );
}
