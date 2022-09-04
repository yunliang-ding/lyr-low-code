/* eslint-disable no-await-in-loop */
import { babelParse } from '@/tools';
import { cloneDeep, decrypt, encrypt, getCleanCloneSchema } from '@/util';
/**
 * 克隆一份
 */
export const getStandardSchema = (scurce = {}) => {
  const schema: any = cloneDeep(scurce);
  /** 过滤不需要的属性 */
  if (schema.searchSchema.layout === 'inline') {
    delete schema.searchSchema.layout;
  }
  if (schema.searchSchema.size === 'middle') {
    delete schema.searchSchema.size;
  }
  if (schema.searchSchema.schema?.length === 0) {
    delete schema.searchSchema;
  }
  if (schema.tableSchema.emptyNode === '-') {
    delete schema.tableSchema.emptyNode;
  }
  if (schema.tableSchema.pagination === true) {
    delete schema.tableSchema.pagination;
  }
  if (schema.tableSchema.rowKey === 'id') {
    delete schema.tableSchema.rowKey;
  }
  if (schema.tableSchema.pageSize !== 10) {
    schema.tableSchema.paginationConfig = {
      pageSize: schema.tableSchema.pageSize,
    };
  }
  delete schema.tableSchema.pageSize;
  schema.tableSchema.tools = schema.tableSchema.tools.filter((i) => i);
  // clear tools
  schema.tableSchema.tools = schema.tableSchema.tools?.map((item) => {
    if (item.spin !== true) {
      delete item.spin;
    }
    if (item.ghost !== true) {
      delete item.ghost;
    }
    if (item.btnType === 'primary') {
      delete item.btnType;
    }
    delete item.bindFormType;
    delete item.modelId;
    delete item.modelIdType;
    return item;
  });
  schema.tableSchema.rowOperations = {
    title: '操作',
    fixed: 'right',
    showMore: schema.tableSchema.showMore,
    width: schema.tableSchema.width,
    menus: encrypt(`() => {
      return ${JSON.stringify(
        schema.tableSchema.menus
          .filter((i) => i)
          .map((item) => {
            if (item.confirm === true) {
              item.confirm = {
                title: '提示',
                content: item.content,
              };
            } else {
              delete item.confirm;
            }
            delete item.content;
            delete item.bindFormType;
            delete item.modelId;
            delete item.modelIdType;
            return item;
          }),
        null,
        2,
      )}
}`),
  };
  if (!(schema.tableSchema.menus.length > 0)) {
    delete schema.tableSchema.rowOperations;
  }
  schema.tableSchema.scroll = {
    x: schema.tableSchema.scrollX,
  };
  if (schema.tableSchema.autoNo !== true) {
    delete schema.tableSchema.autoNo;
  }
  if (schema.tableSchema.openDefaultTools !== true) {
    schema.tableSchema.defaultTools = [];
  }
  delete schema.tableSchema.openDefaultTools;
  delete schema.tableSchema.scrollX;
  delete schema.tableSchema.showMore;
  delete schema.tableSchema.width;
  delete schema.tableSchema.menus;
  // 配置查询项
  schema.tableSchema.searchSchema = schema.searchSchema;
  const tableSchema = getCleanCloneSchema([schema.tableSchema]);
  return tableSchema;
};

/** 模型转换给Table */
export const parseTableSchema = (values: any = {}) => {
  return babelParse({
    code: getStandardSchema({
      searchSchema: {},
      tableSchema: values,
    }),
    prefix: '',
  });
};

export const parseTableColumns = (columns = []) => {
  return columns?.map((column) => {
    // render 函数转译
    let render;
    if (column.render) {
      render = (item, record, index) => {
        try {
          return babelParse({
            code: decrypt(column.render, false),
          })(item, record, index);
        } catch (error) {
          console.log(error);
        }
      };
    }
    return {
      ...column,
      render,
    };
  });
};
