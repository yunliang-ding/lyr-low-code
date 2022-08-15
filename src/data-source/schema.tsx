import { SchemaProps } from 'react-core-form';

const schema: SchemaProps<{}>[] = [
  {
    type: 'Input',
    name: 'id',
    hidden: true,
  },
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
    type: 'FunctionEditor',
    name: 'axiosConfig',
    label: '请求配置',
    extra: (
      <span>
        关于axios库相关的配置
        <a
          style={{ marginLeft: 8 }}
          href="https://www.kancloud.cn/yunye/axios/234845/"
          target="_blank"
        >
          参看这里
        </a>
      </span>
    ),
    props: {
      prefix: '',
      useEncrypt: false,
      style: {
        height: 500,
        width: 510,
      },
    },
  },
];

export default schema;
