export type AppRoute = {
  path: string;
  label: string;
  badge?: string;
};

export const appRoutes: AppRoute[] = [
  { path: '/dashboard', label: '运营总览', badge: '高危 3' },
  { path: '/digital-twin', label: '数字孪生', badge: '拥挤 2' },
  { path: '/style-preview', label: '高级风格预览', badge: 'P7' },
  { path: '/store-analysis', label: '店铺分析', badge: 'C/D 18' },
  { path: '/customer-profile', label: '客群画像' },
  { path: '/store-alerts', label: '低效预警', badge: '未处理 12' }
];

export const defaultGlobalQuery = {
  mallId: 'M_DEMO',
  timeRange: 'today'
} as const;

export function getGlobalQuery(search: string) {
  const params = new URLSearchParams(search);

  return {
    mallId: params.get('mallId') || defaultGlobalQuery.mallId,
    timeRange: params.get('timeRange') || defaultGlobalQuery.timeRange
  };
}

export function buildRouteWithGlobalQuery(path: string, search: string) {
  const query = getGlobalQuery(search);
  const [pathname, routeSearch = ''] = path.split('?');
  const params = new URLSearchParams(routeSearch);

  Object.entries(query).forEach(([key, value]) => {
    params.set(key, value);
  });

  return `${pathname}?${params.toString()}`;
}
