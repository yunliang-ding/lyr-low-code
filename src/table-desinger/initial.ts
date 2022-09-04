import { encrypt } from '@/util';

/**
 * 默认的配置
 */
export const defaultInitialValues = {
  formProps: {
    column: 3,
    layout: 'inline',
    size: 'middle',
  },
  schema: [
    {
      key: 'userName',
      type: 'Input',
      label: '用户姓名',
      name: 'userName',
    },
  ],
  columns: [
    {
      title: '用户姓名',
      dataIndex: 'userName',
      width: 200,
    },
    {
      title: '联系方式',
      dataIndex: 'userPhone',
      width: 200,
    },
    {
      title: '用户年龄',
      dataIndex: 'userAge',
      width: 200,
    },
    {
      title: '详细地址',
      dataIndex: 'userAddress',
      width: 200,
    },
  ],
  tableProps: {
    title: '用户列表',
    size: 'middle',
    emptyNode: '-',
    scrollX: 1200,
    tools: [
      {
        label: '新增用户',
        key: 'add',
        btnType: 'primary',
      },
    ],
    pageSize: 10,
    showMore: 4,
    width: 180,
    pagination: true,
    rowKey: 'id',
    openDefaultTools: true,
    menus: [
      {
        label: '详情',
        key: 'view',
      },
      {
        label: '编辑',
        key: 'edit',
      },
      {
        label: '删除',
        key: 'delete',
        confirm: true,
        content: '是否确认删除?',
      },
    ],
    request: encrypt(`async () => {
  return {
    success: true,
    list: [{
      id: 1,
      userName: '张三',
      userPhone: '13923783472',
      userAge: 20,
      userAddress: '测试地址'
    }],
    total: 1
  }
}`),
  },
};
