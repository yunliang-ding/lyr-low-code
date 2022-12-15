import PageContainer from './page-container';
import { Ctx } from '@/page-designer/store';
import { useContext, useEffect } from 'react';
import { babelParse } from '@/tools';
import { decrypt } from '@/util';
import Render from './render';
import Canvas from './canvas';
import { injectStateToModules } from '../util';

export default ({ schema, accept, type = '' }) => {
  const ctx: any = useContext(Ctx); // 拿到ctx
  // 解析模块
  const modules = babelParse({
    code: decrypt(`${schema}`, false), // 解码
    exportDefault: true,
    prefix: '',
    require: {
      state: ctx.state,
      setState: ctx.setState,
    },
    dependencies: {
      React: 'react',
      state: 'state',
      setState: 'setState',
    },
  });
  /** 执行页面加载的钩子 */
  useEffect(() => {
    pageProps.onMount();
  }, []);
  const { pageProps } = modules;
  // 注入 state 到模型
  injectStateToModules(modules, ctx.state);
  return (
    <PageContainer {...pageProps}>
      {type === 'render' ? (
        <Render {...modules} />
      ) : (
        <Canvas ctx={ctx} accept={accept} />
      )}
    </PageContainer>
  );
};
