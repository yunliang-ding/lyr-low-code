import { defineConfig } from 'dumi';

export default defineConfig({
  mode: 'site',
  title: 'react-core-form-designer',
  outputPath: 'docs-dist',
  locales: [['zh-CN', '中文']],
  favicon:
    'https://react-core-form.oss-cn-beijing.aliyuncs.com/assets/favicon.ico',
  logo: 'https://react-core-form.oss-cn-beijing.aliyuncs.com/assets/favicon.ico',
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
      font-weight: 500 !important;
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
      href: 'https://react-core-form.oss-cn-beijing.aliyuncs.com/cdn/arco.min.css',
      rel: 'stylesheet',
    },
    {
      href: 'https://react-core-form.oss-cn-beijing.aliyuncs.com/cdn/react-core-form.min.css',
      rel: 'stylesheet',
    },
  ],
  scripts: [
    'https://react-core-form.oss-cn-beijing.aliyuncs.com/cdn/babel-standalone.min.js',
    'https://react-core-form.oss-cn-beijing.aliyuncs.com/cdn/prettier-standalone.min.js',
    'https://react-core-form.oss-cn-beijing.aliyuncs.com/cdn/prettier-parser-typescript.min.js',
    'https://react-core-form.oss-cn-beijing.aliyuncs.com/cdn/prism.min.js',
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
