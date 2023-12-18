/* eslint-disable react-hooks/rules-of-hooks */
import { ReactNode, useEffect, useState } from 'react';
import { Table, CardForm } from 'react-core-form';
import { queryModelBySchemaId, registerGlobalApi } from './util';
import { isEmpty } from '@/util';
import { Empty } from '@arco-design/web-react';
import MaterialRender from '@/page-designer/material-render';
import axios from 'axios';
import { decode } from 'react-core-form-tools';

let axiosInstance = null;

export const getAxiosInstance = () => axiosInstance;

const setAxiosInstance = ({ appId, baseURL }) => {
  axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      appId,
    },
  });
};

interface CrudModelRenderProps {
  /** 应用Id */
  appId?: number;
  /** 应用Id */
  baseURL?: string;
  /** 模型Id */
  schemaId: string;
  /** 加载提示 */
  loadingText?: ReactNode;
  /** 注入模型依赖 */
  require?: any;
}

/** 渲染模型 */
const CrudModelRender = ({
  schemaId,
  loadingText = 'loading...',
  require,
  appId = 2, // 默认需要登录 dev-ops
  baseURL = 'http://dev-ops.yunliang.cloud',
}: CrudModelRenderProps): any => {
  if (isEmpty(schemaId)) {
    return <Empty description="缺少模型ID" />;
  }
  if (isEmpty(appId)) {
    return <Empty description="缺少应用ID" />;
  }
  // 绑定应用
  setAxiosInstance({
    baseURL,
    appId,
  });
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
          } = await getAxiosInstance().get(`/crud/detail?id=${schemaId}`);
          if (code === 200) {
            // 注册接口服务
            registerGlobalApi(data.services && decode(data.services), require);
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
          setStandRes({
            type: 'error',
            msg: String(error),
          });
        } finally {
          setSpin(false);
        }
      })();
    }
  }, [schemaId]);
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
    return standRes.msg;
  }
  return null;
};

CrudModelRender.queryModelBySchemaId = queryModelBySchemaId;
CrudModelRender.registerGlobalApi = registerGlobalApi;

export default CrudModelRender;
