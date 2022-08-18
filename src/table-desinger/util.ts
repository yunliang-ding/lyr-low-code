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
  if (schema.tableSchema.emptyNode === '-') {
    delete schema.tableSchema.emptyNode;
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
    return item;
  });
  schema.tableSchema.rowOperations = {
    title: '操作',
    fixed: 'right',
    showMore: schema.tableSchema.showMore,
    width: schema.tableSchema.width,
    menus: `{{_# () => {
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
            return item;
          }),
        null,
        2,
      )}
}_#}}`,
  };
  schema.tableSchema.scroll = {
    x: schema.tableSchema.scrollX,
  };
  if (schema.tableSchema.autoNo !== true) {
    delete schema.tableSchema.autoNo;
  }
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
  /** 工具栏 */
  if (values.closeDefaultTools === true) {
    values.defaultTools = [];
  }
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
        values.menus.map((menu) => {
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
  values.scroll = {
    x: values.scrollX,
  };
  delete values.scrollX;
  return values;
};

export const parseTableColumns = (columns = []) => {
  return columns?.map((column) => {
    // render 函数转译
    let render;
    if (column.render) {
      render = (item, record, index) => {
        try {
          return babelParse(decrypt(column.render, false))(item, record, index);
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
