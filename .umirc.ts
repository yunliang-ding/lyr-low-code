import { defineConfig } from 'dumi';
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

export default defineConfig({
  mode: 'site',
  title: 'react-core-form-designer',
  outputPath: 'docs-dist',
  locales: [['zh-CN', '中文']],
  theme: {
    '@primary-background-color': '#4e60d4',
    '@text-color': '#6a6a6a',
    '@font-size-base': '13px',
    '@font-size-small': '12px',
    '@primary-color': '#4e60d4',
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true,
      },
      'antd',
    ],
  ],
  history: { type: 'hash' },
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'Playground',
      path: 'http://121.4.49.147:9000/react-playground',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/yunliang-ding/core-form-designer',
    },
  ],
  chainWebpack: (config) => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        languages: ['javascript', 'typescript', 'html'],
      },
    ]);
  },
  // more config: https://d.umijs.org/config
});
