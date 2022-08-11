/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import { SchemaProps } from 'react-core-form';

const schema: SchemaProps<{}>[] = [
  {
    type: 'Input',
    name: 'schemaId',
    hidden: true,
  },
  {
    type: 'Input',
    name: 'createUser',
    hidden: true,
  },
  {
    type: 'Input',
    name: 'modifyUser',
    hidden: true,
  },
  {
    type: 'Input',
    name: 'name',
    label: '数据源名称',
    extra: '数据源唯一标识，请结合场景规范命名，英文驼峰形式',
    required: true,
  },
  {
    type: 'Input',
    name: 'desc',
    label: '数据源描述',
  },
  {
    type: 'Input',
    name: 'url',
    label: '接口地址',
    required: true,
  },
  {
    type: 'RadioGroup',
    name: 'method',
    label: '请求方式',
    props: {
      optionType: 'button',
      options: [
        {
          label: 'POST',
          value: 'post',
        },
        {
          label: 'GET',
          value: 'get',
        },
      ],
    },
  },
  {
    type: 'TableList',
    name: 'headers',
    label: '请求头设置',
    required: true,
    beforeReceive({ headers }) {
      return Object.keys(headers)?.map((key) => {
        return {
          label: key,
          value: headers[key],
        };
      });
    },
    transform({ headers }) {
      const obj = {};
      headers.forEach((item) => {
        obj[item.label] = item.value;
      });
      return {
        headers: obj,
      };
    },
    props: {
      showNo: false,
      schema: [
        {
          type: 'Input',
          label: '属性名',
          name: 'label',
          style: {
            width: 150,
          },
        },
        {
          type: 'Input',
          label: '属性值',
          name: 'value',
          style: {
            width: 200,
          },
        },
      ],
    },
  },
  {
    type: 'JsonData',
    name: 'params',
    label: '参数配置',
    props: {
      style: {
        height: 300,
      },
    },
  },
];

export default schema;
