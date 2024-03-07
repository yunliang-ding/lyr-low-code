/* eslint-disable react-hooks/rules-of-hooks */
import FormDesigner from '@/form-designer';
import TableDesigner from '@/table-desinger';
import { babelParse } from 'lyr-extra';
import { decrypt } from '@/util';
import axios from 'axios';

export const parseStandardSchemaStrategy = {
  form: (data, require) => {
    const { getStandardSchema } = FormDesigner.useTools();
    const result = babelParse({
      code: getStandardSchema(data),
      require,
    });
    return {
      ...result.formProps,
      schema: result.schema,
    };
  },
  table: (data, require) => {
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
      require,
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
  } catch (error) {
    console.log(error);
  }
};
