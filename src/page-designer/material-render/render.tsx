import { Grid } from 'react-core-form';
import PageContainer from './page-container';
import renderMapping from './render-mapping';
import { Ctx } from '@/page-designer/store';
import { useContext, useEffect } from 'react';
import { babelParse } from '@/tools';
import { decrypt } from '@/util';

const parseString = (template, context) => {
  return template.replace(/\{\{(.*?)\}\}/g, (match, key) => {
    return context[key.split('.')[1]];
  });
};

const injectStateToModules = (modules, state) => {
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

export default ({ schema }) => {
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
      state: 'state',
      setState: 'setState',
    },
  });
  /** 执行页面加载的钩子 */
  useEffect(() => {
    pageProps.onMount();
  }, []);
  const { children, pageProps } = modules;
  // 注入 state 到模型
  injectStateToModules(modules, ctx.state);
  return (
    <PageContainer {...pageProps}>
      <Grid column={pageProps.column}>
        {children.map((item) => {
          // 控制是否渲染逻辑
          if (item.props.visible?.() === false) {
            return null;
          }
          const Comp = renderMapping[item.type] || (() => null);
          return (
            <div
              style={{
                gridColumnStart: `span ${item.props.span || 1}`,
              }}
            >
              <Comp {...item.props} />
            </div>
          );
        })}
      </Grid>
    </PageContainer>
  );
};
