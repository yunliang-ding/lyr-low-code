/* eslint-disable react-hooks/rules-of-hooks */
import FormDesigner from '@/form-designer';
import TableDesigner from '@/table-desinger';
import { babelParse } from '@/tools';
import axios from 'axios';

const parseStandardSchemaStrategy = {
  1: (data) => {
    const { getStandardSchema } = FormDesigner.useTools();
    return babelParse({
      code: getStandardSchema(data),
      prefix: '',
    });
  },
  2: (data) => {
    const { getStandardSchema } = TableDesigner.useTools();
    return babelParse({
      code: getStandardSchema({
        searchSchema: {
          ...data.formProps,
          fields: data.fields,
        },
        tableSchema: {
          ...data.tableProps,
          columns: data.columns,
        },
      }),
      prefix: '',
    });
  },
};

/** 注册模型Api */
export const registerGlobalApi = async (data) => {
  const API = {};
  const Window: any = window;
  data.forEach((item) => {
    // 处理参数
    API[item.sourceName] = (params = {}) => {
      try {
        const options: any = babelParse({
          code: decode(item.params),
          prefix: '',
        });
        if (options.method === 'get') {
          options.params = params;
        } else {
          options.data = params;
        }
        return axios({
          ...options,
        });
      } catch (error) {
        console.log(`${item.sourceName} api error info -->`, error);
      }
    };
  });
  Window.API = API;
  /** 注册查询模型方法 */
  Window.getCrudModelById = async (modelId: number) => {
    const result = await queryModelBySchemaId(modelId);
    return result?.schema;
  };
};

/** 解析模型 */
export const queryModelBySchemaId = async (
  schemaId,
  baseURL = 'https://yl.server.net',
) => {
  const {
    data: { code, data },
  } = await axios.get(`${baseURL}/crud-model/schema/detail/${schemaId}`);
  if (code === 200) {
    const object = JSON.parse(decode(data.pageSchema));
    return {
      type: data.type,
      schema: parseStandardSchemaStrategy[data.type](object),
    };
  }
  return {};
};

export const decode = (str): string => {
  try {
    return decodeURIComponent(atob(str));
  } catch (error) {
    console.log(error);
    return '';
  }
};
