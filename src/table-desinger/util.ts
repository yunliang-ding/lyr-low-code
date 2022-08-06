/* eslint-disable no-await-in-loop */
import { babelParse } from '@/tools';
import { cloneDeep, decrypt, getCleanCloneSchema } from '@/util';
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
  if (schema.searchSchema.hidden === false) {
    delete schema.searchSchema.hidden;
  }
  const searchSchema = getCleanCloneSchema(
    [schema.searchSchema],
    'const searchSchema = ',
  );
  /** 过滤不需要的属性 */
  if (schema.tableSchema.emptyNode === '-') {
    delete schema.tableSchema.emptyNode;
  }
  if (schema.tableSchema.pageSize !== 10) {
    schema.tableSchema.paginationConfig = {
      pageSize: schema.tableSchema.pageSize,
    };
  }
  delete schema.tableSchema.pageSize;
  schema.tableSchema.rowOperations = {
    showMore: schema.tableSchema.showMore,
    width: schema.tableSchema.width,
    menus: `{{_#function(){
      return ${JSON.stringify(schema.tableSchema.menus, null, 2)}
}_#}}`,
  };
  delete schema.tableSchema.showMore;
  delete schema.tableSchema.width;
  delete schema.tableSchema.menus;
  const tableSchema = getCleanCloneSchema(
    [schema.tableSchema],
    'const tableSchema = ',
  );
  return `${searchSchema}\n${tableSchema}`;
};

/** 模型转换给Table */
export const parseTableSchema = (values: any = {}) => {
  /** 工具栏 */
  if (values.closeDefaultTools === true) {
    values.defaultTools = [];
  }
  // 过滤 undefined
  values.tools = values.tools?.filter((i) => i);
  /** 分页组装 */
  if (values.pagination && values.pageSize) {
    values.paginationConfig = {
      pageSize: values.pageSize,
    };
  }
  /** rowOperations 组装 */
  values.rowOperations = {
    showMore: values.showMore,
    width: values.width,
    title: '操作',
    fixed: 'right',
    menus: (record) => {
      return (
        values.menus
          ?.filter((i) => i)
          .map((menu) => {
            if (menu.confirm) {
              menu.confirm = {
                title: '提示',
                content: menu.content,
              };
            }
            return menu;
          }) || []
      );
    },
  };
  /**
   * 函数的解析
   */
  if (values.request) {
    try {
      values.request = babelParse(decrypt(values.request, false));
    } catch (error) {
      console.log('request 解析异常->', error);
    }
  }
  if (values.toolsClick) {
    try {
      values.toolsClick = babelParse(decrypt(values.toolsClick, false));
    } catch (error) {
      console.log('toolsClick 解析异常->', error);
    }
  }
  if (values.rowOperationsClick) {
    try {
      values.rowOperationsClick = babelParse(
        decrypt(values.rowOperationsClick, false),
      );
    } catch (error) {
      console.log('rowOperationsClick 解析异常->', error);
    }
  }
  /** 删除无效属性 */
  delete values.showMore;
  delete values.width;
  delete values.pageSize;
  return values;
};
