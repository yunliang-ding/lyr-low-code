/* eslint-disable react-hooks/rules-of-hooks */
import { ReactNode, useEffect, useState } from 'react';
import { Table, CardForm, Tools } from 'react-core-form';
import { queryModelBySchemaId, registerGlobalApi } from './util';
import { isEmpty } from '@/util';
import { Button, Empty, Result } from 'antd';
import MaterialRender from '@/page-designer/material-render';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://121.4.49.147:8360',
  withCredentials: true,
  headers: {
    appId: 11,
  },
});

interface CrudModelRenderProps {
  schemaId: string;
  loadingText?: ReactNode;
  baseURL?: string;
  require?: any;
}

/** 渲染模型 */
const CrudModelRender = ({
  schemaId,
  loadingText = 'loading...',
  require,
}: CrudModelRenderProps): any => {
  const [standRes, setStandRes]: any = useState({
    type: 'form',
    schema: {},
  });
  const [spin, setSpin] = useState(true);
  useEffect(() => {
    if (schemaId) {
      (async () => {
        try {
          /** 注册Api */
          const {
            data: { code, data, msg },
          } = await axiosInstance.get(`/crud/detail?id=${schemaId}`);
          if (code === 200) {
            // 注册接口服务
            registerGlobalApi(Tools.decode(data.services), require);
            /** 解析模型 */
            const res = await queryModelBySchemaId(schemaId, data);
            setStandRes(res);
          } else {
            setStandRes({
              type: 'error',
              msg,
            });
          }
        } catch (error) {
          console.log(error);
        } finally {
          setSpin(false);
        }
      })();
    }
  }, [schemaId]);
  if (isEmpty(schemaId)) {
    return (
      <Empty description="缺少模型ID" image={Empty.PRESENTED_IMAGE_SIMPLE} />
    );
  }
  if (spin) {
    return loadingText;
  }
  if (standRes.type === 'form') {
    return <CardForm {...standRes.schema} />;
  } else if (standRes.type === 'table') {
    return <Table {...standRes.schema} />;
  } else if (standRes.type === 'page') {
    return <MaterialRender schema={standRes.schema} />;
  } else if (standRes.type === 'error') {
    return (
      <Result
        status="403"
        title="403"
        subTitle={standRes.msg}
        extra={
          <Button
            type="primary"
            onClick={() => {
              window.open(
                `http://121.4.49.147:8360/unification/login?redirect=${location.href}&appId=11`,
              );
            }}
          >
            点击登录
          </Button>
        }
      />
    );
  }
  return null;
};

CrudModelRender.queryModelBySchemaId = queryModelBySchemaId;
CrudModelRender.registerGlobalApi = registerGlobalApi;

export default CrudModelRender;
