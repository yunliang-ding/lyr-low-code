import PageContainer from './page-container';
import { babelParse } from 'lyr-extra';
import { Ctx } from '@/page-designer/store';
import { useContext, useEffect } from 'react';
import { decrypt } from '@/util';
import Render from './render';
import Canvas from './canvas';
import { injectStateToModules } from '../util';

export default ({ schema, accept = 'left' }) => {
  const ctx: any = useContext(Ctx); // 拿到ctx
  let modules = {
    children: [],
    pageProps: {
      onMount: () => {},
    },
  };
  // 解析模块
  try {
    modules = babelParse({
      code: decrypt(`${schema}`, false), // 解码
      exportDefault: true,
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
  } catch (error) {
    console.log(error);
  }
  /** 执行页面加载的钩子 */
  useEffect(() => {
    pageProps.onMount();
  }, []);
  const { pageProps } = modules;
  // 注入 state 到模型
  injectStateToModules(modules, ctx.state);
  return ctx.type === 'canvas' ? (
    <PageContainer {...pageProps} title={() => '标题信息'}>
      <Canvas ctx={ctx} accept={accept} />
    </PageContainer>
  ) : (
    <PageContainer {...pageProps}>
      <Render {...modules} />
    </PageContainer>
  );
};
