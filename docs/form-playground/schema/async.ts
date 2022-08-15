export default `import { Tag, Empty } from 'antd';
import { CardForm } from 'react-core-form';

const sleep = (timer) => new Promise((res) => setTimeout(res, timer));

export default () => {
  return (
    <CardForm
      title="异步选择器"
      initialValues={{
        level: 1,
        classify: [1, 2, 3, 0],
        liked: [1, 2],
        sex: 1,
        position: ['zhejiang', 'dynamic1'],
        department: '0-0-1',
      }}
      onSubmit={async (values) => {
        alert(JSON.stringify(values));
      }}
      schema={[
        {
          type: 'DebounceSelect',
          name: 'level',
          label: '员工级别',
          props: {
            debounceTimeout: 1000,
            fetchOptions: async (search, form) => {
              await sleep(1000);
              return [1, 2, 3].map((item) => {
                return {
                  label: search + item + '级别',
                  value: item,
                };
              });
            },
          },
        },
        {
          type: 'AsyncSelect',
          name: 'classify',
          label: '员工职位',
          props: {
            mode: 'multiple',
            showSearch: true,
            fieldNames: {
              label: 'name',
              value: 'id',
            },
            maxTagCount: 'responsive',
            options: async (form) => {
              await sleep(1000);
              return [
                {
                  name: '前端',
                  id: 0,
                },
                {
                  name: '后端',
                  id: 1,
                },
                {
                  name: '产品经理',
                  id: 2,
                },
                {
                  name: '项目经理',
                  id: 3,
                },
              ];
            },
          },
        },
        {
          type: 'AsyncCheckGroup',
          name: 'liked',
          label: '员工爱好',
          props: {
            showCheckAll: true,
            options: async (form) => {
              await sleep(1000);
              return [
                {
                  label: '游戏',
                  value: 0,
                },
                {
                  label: '篮球',
                  value: 1,
                },
                {
                  label: '游泳',
                  value: 2,
                },
                {
                  label: '卡牌',
                  value: 3,
                },
              ];
            },
          },
        },
        {
          type: 'AsyncRadioGroup',
          name: 'sex',
          label: '员工性别',
          props: {
            options: async (form) => {
              await sleep(1000);
              return [
                {
                  label: '男',
                  value: 0,
                },
                {
                  label: '女',
                  value: 1,
                },
                {
                  label: '未知',
                  value: 2,
                },
              ];
            },
          },
        },
        {
          type: 'AsyncTreeSelect',
          name: 'department',
          label: '员工所在部门',
          props: {
            options: async () => {
              await sleep(1000);
              const options = [
                {
                  title: '部门1',
                  value: '0-0',
                  children: [
                    {
                      title: '部门1-1',
                      value: '0-0-1',
                    },
                    {
                      title: '部门1-2',
                      value: '0-0-2',
                    },
                  ],
                },
                {
                  title: '部门2',
                  value: '0-1',
                },
              ];
              return options;
            },
          },
        },
        {
          type: 'AsyncRender',
          label: '已选择性别',
          key: 'render',
          effect: ['sex'],
          props: {
            spin: true,
            async render({ getFieldOption, getFieldsValue, initialValues }) {
              const { sex } = getFieldsValue(true) || initialValues;
              const options = await getFieldOption('sex');
              const option = options.find((i) => i.value === sex);
              return option ? (
                <Tag color="processing">{option.label}</Tag>
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              );
            },
          },
        },
      ]}
    />
  );
};
`;
