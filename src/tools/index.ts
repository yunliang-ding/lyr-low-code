/* eslint-disable */
import { encrypt, decrypt } from '@/util';
import BabelCompile from './babel-compile';

const babel = new BabelCompile();
/**
 * useBabel
 */
export const babelParse = (
  code: string,
  prefix = 'export default ',
  // 默认依赖 react、antd
  dependencies = {
    React: 'react',
    antd: 'antd',
  },
  // 默认导出 default
  exportDefault = true,
) => {
  try {
    let dependenciesString = '';
    if (dependencies) {
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
  };
};
