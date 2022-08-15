/* eslint-disable @iceworks/best-practices/recommend-polyfill */
/* eslint-disable react-hooks/rules-of-hooks */
import cloneDeep from 'lodash/cloneDeep';

const prettier = require('prettier/standalone');
const plugins = [require('prettier/parser-typescript')];

// 查找指定key
export const recursionFind = (fields: any, key: string) => {
  const targetField: any = { field: {} };
  recursionLoopFind(fields, key, targetField);
  return targetField.field;
};

// 递归查找指定key
export const recursionLoopFind = (fields: any, key: string, currentField) => {
  for (let i = 0; i < fields.length; i++) {
    const item = fields[i];
    if (item.key === key) {
      currentField.field = item;
      break;
    } else if (item.type === 'FieldSet' && item.props.children) {
      recursionLoopFind(item.props.children, key, currentField);
    }
  }
};

/** 判断空 */
export const isEmpty = (param: any) => {
  if (param === null || param === undefined) {
    return true;
  }
  if (Array.isArray(param)) {
    return param.length === 0;
  }
  if (typeof param === 'string') {
    return param.trim() === '';
  }
  if (typeof param === 'object') {
    return Object.keys(param).length === 0;
  }
  return false;
};
/**
 * 简易uuid
 */
export const uuid = (size: number) => {
  return Math.random().toString().substr(2, size);
};

export { cloneDeep };

export const InputOrSelect = [
  'Input',
  'InputNumber',
  'CountInput',
  'BankCardInput',
  'AmountInput',
  'TextArea',
  'Password',
  'AsyncSelect',
  'AsyncCascader',
  'DebounceSelect',
  'Select',
  'AutoComplete',
  'Cascader',
  'TreeSelect',
  'AsyncTreeSelect',
];

/**
 * 删除空属性
 */
const deleteEmptyObjProps = (object) => {
  Object.keys(object).forEach((key) => {
    // 删除空属性
    if (object[key] === undefined || key === 'itemRender') {
      delete object[key];
    }
    if (Object.prototype.toString.call(object[key]) === '[object Object]') {
      deleteEmptyObjProps(object[key]);
    }
    if (key === 'schema') {
      getCleanCloneSchema(object[key]);
    }
  });
};
/**
 * 克隆一份
 */
export const getStandardSchema = (scurce = {}, exportTs = false) => {
  const schema = cloneDeep(scurce);
  return getCleanCloneSchema([schema], undefined, exportTs);
};
/** 函数打码 */
export const encrypt = (str: string) => {
  return `{{_#${str}_#}}`;
};
/** 函数解码 */
export const decrypt = (str: string, quotation = true) => {
  if (quotation) {
    return str?.replaceAll('"{{_#', '').replaceAll('_#}}"', '');
  }
  return str?.replaceAll('{{_#', '').replaceAll('_#}}', '');
};
/**
 * 获取纯净的模型
 */
export const getCleanCloneSchema = (
  fields = [],
  prefix = ' default ',
  exportTs = false,
) => {
  fields.forEach((item) => {
    deleteEmptyObjProps(item);
    /** 移除函数字符串_is_code 结尾的 */
    Object.keys(item).forEach((key) => {
      if (key.endsWith('_is_code')) {
        try {
          item[key.replace('_is_code', '')] = item[key];
          delete item[key];
        } catch (error) {
          console.log(error);
        }
      }
    });
    /** item */
    delete item.key;
    delete item.__parentKey__;
    delete item.isNew;
    delete item.selectField;
    if (item.actionAlign === 'end') {
      delete item.actionAlign;
    }
    if (item.layout === 'vertical') {
      delete item.layout;
    }
    if (item.size === 'middle') {
      delete item.size;
    }
    if (['BlockQuote'].includes(item.type)) {
      delete item.span;
      delete item.name;
    }
    if (item.type === 'FieldSet') {
      getCleanCloneSchema(item.props.children, prefix);
    }
    delete item.message;
    if (item.rules?.length === 0) {
      delete item.rules;
    }
    if (item.required === false) {
      delete item.required;
    }
    if (item.span === 1) {
      delete item.span;
    }
    if (item?.effect?.length === 0) {
      delete item.effect;
      delete item.effectClearField;
    }
    if (item.effectClearField !== true) {
      delete item.effectClearField;
    }
    // innerItemRender -> itemRender
    if (item.innerItemRender) {
      item.itemRender = item.innerItemRender;
      delete item.innerItemRender;
    }
    // innerVisible -> visible
    if (item.innerVisible) {
      item.visible = item.innerVisible;
      delete item.visible;
    }
    /** props */
    if (
      InputOrSelect.includes(item.type) &&
      ['请输入', '请选择'].includes(item.props?.placeholder)
    ) {
      delete item.props.placeholder;
    }
    if (item.props?.allowClear === true) {
      delete item.props.allowClear;
    }
    if (item.props?.showCount === false) {
      delete item.props.showCount;
    }
    if (item.props?.maxLength === 64) {
      delete item.props.maxLength;
    }
    if (item.props?.disabled === false) {
      delete item.props.disabled;
    }
    if (isEmpty(item.props?.mode)) {
      delete item.props?.mode;
    }
    if (item.props && isEmpty(item.props)) {
      delete item.props;
    }
  });
  // 替换并且使用prettier格式化代码
  const code = prettier.format(
    decrypt(`${
      exportTs ? 'import { SchemaProps } from "react-core-form";\n' : ''
    } 
      export ${prefix} ${JSON.stringify(fields[0], null, 2)?.replaceAll(
      '\\"',
      '"',
    )}`).replaceAll('\\n', '\n'),
    {
      parser: 'typescript',
      plugins,
    },
  );
  return exportTs
    ? code.replace('};', '} as { schema: SchemaProps[] };')
    : code;
};
