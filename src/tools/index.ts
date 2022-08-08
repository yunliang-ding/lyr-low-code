/* eslint-disable */
import BabelCompile from './babel-compile';

const babel = new BabelCompile();
/**
 * useBabel
 */
export const babelParse = (
  code: string,
  prefix = 'export default ',
  dependencies = {},
) => {
  try {
    let dependenciesString = '';
    if (dependencies) {
      dependenciesString = Object.keys(dependencies)
        .map((key) => {
          return `import ${key} from '${dependencies[key]}';`;
        })
        .join('\n');
    }
    const res = babel.excuteCode(
      `${dependenciesString}${prefix}${code.replaceAll('↵', '')}`,
    );
    if (!res?.isError) {
      return res?.exports.default;
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
  };
};
