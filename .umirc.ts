import { defineConfig } from 'dumi';

export default defineConfig({
  mode: 'site',
  title: 'react-core-form-designer',
  outputPath: 'docs-dist',
  locales: [['zh-CN', '中文']],
  favicon:
    'https://unpkg.byted-static.com/latest/byted/arco-config/assets/favicon.ico',
  logo: 'https://unpkg.byted-static.com/latest/byted/arco-config/assets/favicon.ico',
  theme: {
    '@c-primary': '#165dff',
  },
  styles: [
    `
    div,
    span,
    td,
    th,
    a,
    button,
    p,
    label {
      font-size: 12px;
      font-weight: 500;
    }
    h2{
      font-size: 18px !important;
    }
    li, input, label{
      font-weight: 500 !important;
      font-size: 12px !important;
    }
    .__dumi-default-menu-list
      > li
      > a {
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .__dumi-default-menu-list
      > a
      > span {
        font-size: 12px;
      }
  `,
  ],
  links: [
    {
      href: 'https://unpkg.com/@arco-design/web-react@latest/dist/css/arco.min.css',
      rel: 'stylesheet',
    },
    {
      href: 'https://react-core-form.oss-cn-beijing.aliyuncs.com/cdn/index.css',
      rel: 'stylesheet',
    },
  ],
  scripts: [
    'https://g.alicdn.com/code/lib/prettier/2.0.3/standalone.min.js',
    'https://g.alicdn.com/code/lib/prettier/2.0.3/parser-typescript.min.js',
    'https://g.alicdn.com/code/lib/babel-standalone/7.21.2/babel.min.js',
    'https://react-core-form.oss-cn-beijing.aliyuncs.com/prism.min.js',
  ],
  history: { type: 'hash' },
  hash: false,
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/yunliang-ding/react-core-form-designer',
    },
  ],
  // more config: https://d.umijs.org/config
});
