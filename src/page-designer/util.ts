import { decrypt } from '@/util';
import cloneDeep from 'lodash/cloneDeep';

const prettier = require('prettier/standalone');
const plugins = [require('prettier/parser-typescript')];

export const getPageStandardSchema = (scurce) => {
  const schema = cloneDeep(scurce);
  // 删除多余的属性
  schema.schema.forEach((item) => {
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
