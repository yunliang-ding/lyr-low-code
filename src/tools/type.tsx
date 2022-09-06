export interface babelParseProps {
  /**
   * es6 module 代码片段
   */
  code: string;
  /**
   * 配置解析前缀
   * @default 不配置默认加上 export default 前缀
   */
  prefix?: string;
  /**
   * 自动添加 import
   * @default { React: 'react', antd: 'antd' }
   */
  dependencies?: Object;
  /**
   * 是否采用默认导出解析
   * @default true
   */
  exportDefault?: boolean;
  /** 第三方依赖 */
  require?: Object;
}

const Hello: React.FC<babelParseProps> = () => null;

export default Hello;
