/* eslint-disable */
import { decode, encode, isEmpty } from '../util';
import { encrypt, decrypt } from '@/util';
import BabelCompile from './babel-compile';

/**
 * 解析
 */
export const babelParse = ({
  code = '',
  prefix = 'export default ',
  // 默认依赖 react、antd
  dependencies = {
    React: 'react',
    antd: 'antd',
  },
  // 默认 default 导出
  exportDefault = true,
  require = {},
}) => {
  const babel = new BabelCompile(require);
  try {
    let dependenciesString = '';
    if (!isEmpty(dependencies)) {
      dependenciesString =
        Object.keys(dependencies)
          .map((key) => {
            return `import ${key} from '${dependencies[key]}';`;
          })
          .join('\n') + '\n';
    }
    const res = babel.excuteCode(
      `${dependenciesString}${prefix}${code.replaceAll('↵', '')}`,
    );
    if (!res?.isError) {
      if (exportDefault) {
        return res?.exports.default;
      } else {
        return res?.exports;
      }
    } else {
      throw res?.error;
    }
  } catch (error) {
    console.log('catch parse error:', error);
    throw error;
  }
};

export default (config?: any) => {
  return {
    babelParse,
    BabelCompile,
    encrypt,
    decrypt,
    encode,
    decode,
  };
};
