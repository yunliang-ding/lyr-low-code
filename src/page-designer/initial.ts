import { encrypt } from '@/util';

export default {
  header: {
    title: '设置单个页面',
    breadcrumb: [
      {
        breadcrumbName: '菜单1',
        path: '/menu1',
      },
      {
        breadcrumbName: '菜单2',
        path: '/menu2',
      },
      {
        breadcrumbName: '菜单3',
        path: '/menu3',
      },
    ],
    extra: [
      {
        label: '按钮1',
        type: 'primary',
      },
      {
        label: '按钮2',
      },
    ],
  },
  tabList: [
    {
      tab: '选项卡1',
      key: '1',
    },
    {
      tab: '选项卡2',
      key: '2',
    },
    {
      tab: '选项卡3',
      key: '3',
    },
  ],
  onTabChange: encrypt(`async (key) => {
console.log(key)
}`),
  column: 1,
};
