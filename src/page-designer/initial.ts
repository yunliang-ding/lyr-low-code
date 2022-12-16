import { encrypt } from '@/util';

export default {
  title: encrypt(`() => {
  return <div>
    标题信息
  </div>
}`),
  breadcrumb: [
    {
      label: '菜单1',
      value: '/menu1',
    },
    {
      label: '菜单2',
      value: '/menu2',
    },
    {
      label: '菜单3',
      value: '/menu3',
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
  descriptions: [
    {
      label: '项目编号',
      value: 'CZ20220926003',
    },
    {
      label: '创建人',
      value: '测试用户',
    },
    {
      label: '创建时间',
      value: '2022-12-12',
    },
  ],
  activeKey: '{{state.activeKey}}',
  tabList: [
    {
      label: '选项卡1',
      value: '1',
    },
    {
      label: '选项卡2',
      value: '2',
    },
    {
      label: '选项卡3',
      value: '3',
    },
  ],
  onTabChange: encrypt(`(key) => {
  setState({
    activeKey: key
  })
}`),
  footer: [
    {
      label: '按钮1',
      type: 'primary',
    },
    {
      label: '按钮2',
    },
  ],
  onMount: encrypt(`async () => {
  /** 初始化一份状态管理 */
  setState({
    activeKey: "1"
  })
}`),
};
