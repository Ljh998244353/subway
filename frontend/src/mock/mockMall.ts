import type { Mall } from '../types/index.ts';

export const mockMall: Mall = {
  id: 'M_DEMO',
  name: '示范商业中心',
  city: '演示城市',
  timezone: 'Asia/Shanghai',
  businessHours: {
    open: '10:00',
    close: '22:00'
  },
  dataSource: 'mock',
  description: '用于课程演示的虚构商业综合体，不对应任何真实商场。'
};
