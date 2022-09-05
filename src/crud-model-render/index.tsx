/* eslint-disable react-hooks/rules-of-hooks */
import { ReactNode, useEffect, useState } from 'react';
import { Table, CardForm } from 'react-core-form';
import { decode, queryModelBySchemaId, registerGlobalApi } from './util';
import axios from 'axios';

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
  baseURL = 'https://yl.server.net',
  require,
}: CrudModelRenderProps) => {
  const [standRes, setStandRes]: any = useState({
    type: 'form',
    schema: {},
  });
  const [spin, setSpin] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        /** 注册Api */
        const {
          data: { code, data },
        } = await axios.get(`${baseURL}/crud-model/getDetail/${schemaId}`);
        if (code === 200) {
          // 注册接口服务
          registerGlobalApi(
            decode(data.modelServiceCode || ''),
            decode(data.modelServiceOptions || ''),
            require,
          );
        }
        /** 解析模型 */
        const res = await queryModelBySchemaId(schemaId, baseURL, data);
        setStandRes(res);
      } catch (error) {
        console.log(error);
      } finally {
        setSpin(false);
      }
    })();
  }, []);
  if (spin) {
    return loadingText;
  }
  if (standRes.type === 1) {
    return <CardForm {...standRes.schema} />;
  } else if (standRes.type === 2) {
    return <Table {...standRes.schema} />;
  }
  return null;
};

CrudModelRender.queryModelBySchemaId = queryModelBySchemaId;
CrudModelRender.registerGlobalApi = registerGlobalApi;

export default CrudModelRender;
