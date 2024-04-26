/* eslint-disable react-hooks/rules-of-hooks */
import { Table, CardForm } from 'lyr-design';
import { isEmpty } from '@/util';
import { parseStandardSchemaStrategy, registerGlobalApi } from './util';
import { Empty, Result } from '@arco-design/web-react';
import PageRender from '@/page-designer/material-render';
import { decode } from 'lyr-extra';

export interface CrudModelRenderProps {
  type: 'form' | 'table' | 'page';
  /** 数据模型 */
  schema: string;
  /** 接口模型 */
  services?: string;
  /** 注入模型依赖 */
  require?: any;
}

/** 渲染模型 */
export default ({
  type,
  schema,
  services,
  require,
}: CrudModelRenderProps): any => {
  if (isEmpty(schema)) {
    return <Empty description="缺少模型" />;
  }
  // 注册接口服务
  if (services) {
    registerGlobalApi(decode(services), require);
  }
  try {
    const parseSchema: any = parseStandardSchemaStrategy[type](
      decode(schema),
      require,
    );
    if (type === 'form') {
      return <CardForm {...parseSchema} />;
    } else if (type === 'table') {
      return <Table {...parseSchema} />;
    } else if (type === 'page') {
      return <PageRender schema={parseSchema} />;
    }
  } catch (error) {
    return <Result status="error" title={error?.toString()} />;
  }
  return null;
};
