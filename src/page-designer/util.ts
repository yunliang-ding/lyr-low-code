import { decrypt } from '@/util';
import cloneDeep from 'lodash/cloneDeep';

const prettier = require('prettier/standalone');
const plugins = [require('prettier/parser-typescript')];

export const getPageStandardSchema = (scurce) => {
  const schema = cloneDeep(scurce);
  // 删除多余的属性
  schema.children.forEach((item) => {
    delete item.key;
    delete item.name;
    delete item.label;
  });
  // 替换并且使用prettier格式化代码
  const code = prettier.format(
    decrypt(
      `export default ${JSON.stringify(schema, null, 2)?.replaceAll(
        '\\"',
        '"',
      )}`,
    )
      .replaceAll('\\n', '\n')
      .replaceAll('\\', ''),
    {
      parser: 'typescript',
      plugins,
    },
  );
  return code;
};

// 字符串模版解析
export const parseString = (template, context) => {
  return template.replace(/\{\{(.*?)\}\}/g, (match, key) => {
    return context[key.split('.')[1]];
  });
};

// 注入 state 到模型
export const injectStateToModules = (modules, state) => {
  Object.keys(modules).forEach((key) => {
    if (Object.prototype.toString.call(modules[key]) === '[object Object]') {
      injectStateToModules(modules[key], state);
    }
    if (Object.prototype.toString.call(modules[key]) === '[object Array]') {
      modules[key].forEach((i) => {
        injectStateToModules(i, state);
      });
    }
    if (
      Object.prototype.toString.call(modules[key]) === '[object String]' &&
      modules[key].includes('{{')
    ) {
      modules[key] = parseString(modules[key], state);
    }
  });
};
