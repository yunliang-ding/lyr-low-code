export default `import { CardForm } from 'react-core-form';

export default () => {
  return (
    <CardForm
      title="联动表单"
      onSubmit={(values) => {
        alert(JSON.stringify(values));
      }}
      schema={[
        {
          type: 'Select',
          name: 'sex',
          label: '性别',
          props: {
            options: [
              { label: '男', value: 1 },
              { label: '女', value: 2 },
            ],
          },
        },
        {
          type: 'InputNumber',
          name: 'age',
          label: '年龄',
          effect: ['sex'],
          visible: ({ sex }) => sex === 1,
        },
      ]}
    />
  );
};
`;
