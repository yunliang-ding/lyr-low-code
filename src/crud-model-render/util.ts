/* eslint-disable react-hooks/rules-of-hooks */
import FormDesigner from '@/form-designer';
import TableDesigner from '@/table-desinger';
import { babelParse } from '@/tools';
import { decrypt, isEmpty } from '@/util';
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
export const registerGlobalApi = async (
  modelServiceCode,
  modelServiceOptions,
  require: any = {},
) => {
  // 解析
  try {
    const Window: any = window;
    if (modelServiceCode) {
      const { baseURL, tokenKey, tokenValue } = JSON.parse(modelServiceOptions);
      if (require.request === undefined) {
        require.request = axios.create({
          baseURL,
          headers: {
            [tokenKey]: tokenValue,
          },
        });
      }
      Window.API = babelParse({
        code: decrypt(modelServiceCode, false),
        prefix: '',
        require,
        exportDefault: false,
      });
    }
    Window.getCrudModelById = async (modelId: number) => {
      const result = await queryModelBySchemaId(modelId);
      return result?.schema;
    };
  } catch (error) {
    console.log(error);
  }
};

/** 解析模型 */
export const queryModelBySchemaId = async (
  schemaId,
  baseURL = 'https://yl.server.net',
  schemaEntity: any = {},
) => {
  if (isEmpty(schemaEntity)) {
    const {
      data: { code, data },
    } = await axios.get(`${baseURL}/crud-model/schema/detail/${schemaId}`);
    if (code === 200) {
      schemaEntity = data;
    } else {
      return {};
    }
  }
  const object = JSON.parse(decode(schemaEntity.pageSchema));
  return {
    type: schemaEntity.type,
    schema: parseStandardSchemaStrategy[schemaEntity.type](object),
  };
};

export const decode = (str): string => {
  try {
    return decodeURIComponent(atob(str));
  } catch (error) {
    console.log(error);
    return '';
  }
};
