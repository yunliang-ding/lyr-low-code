/* eslint-disable react-hooks/rules-of-hooks */
import FormDesigner from '@/form-designer';
import TableDesigner from '@/table-desinger';
import { decode, babelParse } from 'react-core-form-tools';
import { decrypt, isEmpty } from '@/util';
import { getAxiosInstance } from '.';
import axios from 'axios';

const parseStandardSchemaStrategy = {
  form: (data) => {
    const { getStandardSchema } = FormDesigner.useTools();
    return babelParse({
      code: getStandardSchema(data),
    });
  },
  table: (data) => {
    const { getStandardSchema } = TableDesigner.useTools();
    return babelParse({
      code: getStandardSchema({
        searchSchema: {
          ...data.formProps,
          schema: data.schema,
        },
        tableSchema: {
          ...data.tableProps,
          columns: data.columns,
        },
      }),
    });
  },
};

/** 注册模型Api */
export const registerGlobalApi = async (services, require: any = {}) => {
  // 解析
  try {
    const Window: any = window;
    if (services) {
      const { baseURL, code } = JSON.parse(services);
      if (require.request === undefined) {
        require.request = axios.create({
          baseURL,
          withCredentials: true, // 携带 cookie
        });
      }
      Window.API = babelParse({
        code: decrypt(code, false),
        require,
        exportDefault: false,
      });
    }
    // 通过模型Id 获取 模型信息
    Window.getCrudModelById = async (schemaId: number) => {
      const result = await queryModelBySchemaId(schemaId);
      return result?.schema;
    };
  } catch (error) {
    console.log(error);
  }
};

/** 解析模型 */
export const queryModelBySchemaId = async (schemaId, entity = undefined) => {
  if (isEmpty(entity)) {
    const {
      data: { code, data },
    } = await getAxiosInstance().get(`/crud/detail?id=${schemaId}`);
    if (code === 200) {
      entity = data;
    } else {
      return {};
    }
  }
  const object = JSON.parse(decode(entity.schema));
  return {
    type: entity.type,
    schema: parseStandardSchemaStrategy[entity.type](object),
  };
};
