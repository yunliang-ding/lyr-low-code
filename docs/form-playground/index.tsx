import React, { useEffect, useState, useRef } from 'react';
import SplitPane from 'react-split-pane';
import { MonacoEditor, getTools } from 'react-core-form-designer';
import { Button, Select } from 'react-core-form';
import { Space, Spin } from 'antd';
import Error from './error';
import basic from './schema/basic';
import async from './schema/async';
import effect from './schema/effect';
import './index.less';

const SchemaMapping = {
  basic,
  async,
  effect,
};

export default () => {
  const { babelParse } = getTools();
  const tempCode: any = useRef({});
  const editorMonacoRef: any = useRef({});
  const [code, setCode] = useState('export default {}');
  const [template, setTemplate] = useState('basic');
  const [iframeSpin, setIframeSpin] = useState(true);
  const [errorInfo, setErrorInfo]: any = useState(false);
  useEffect(() => {
    setIframeSpin(true);
    setErrorInfo(false);
    editorMonacoRef.current.setValue(code);
    tempCode.current.value = code;
    setIframeSpin(true); // 开始解析
    /** 本地存储一份在demo中需要 */
    localStorage.setItem('module-schema', code);
  }, [code]);
  // 运行代码
  const runCode = async () => {
    try {
      babelParse(tempCode.current.value, ''); // 检查代码是否有报错
      setErrorInfo(false);
      setCode(tempCode.current.value);
    } catch (error) {
      setErrorInfo(String(error));
    }
  };
  useEffect(() => {
    const escode = SchemaMapping[template];
    setCode(escode);
  }, [template]);
  useEffect(() => {
    const schema = new URLSearchParams(location.hash.split('?')[1]).get(
      'schema',
    );
    if (schema) {
      setCode(decodeURIComponent(schema));
    }
  }, []);
  return (
    <div className="core-form-playground">
      <div className="core-form-playground-header">
        <Space>
          <Select
            style={{ width: 120 }}
            defaultValue="basic"
            onChange={setTemplate}
            dropdownClassName="app-playground-select"
            options={[
              {
                label: '基础表单',
                value: 'basic',
              },
              {
                label: '异步选择器',
                value: 'async',
              },
              {
                label: '联动表单',
                value: 'effect',
              },
            ]}
          />
          <Button spin onClick={runCode} type="primary">
            <i className="iconfont spicon-shouqikuaijin" />
            运行
          </Button>
        </Space>
        <Select
          style={{ width: 160 }}
          defaultValue="CardForm"
          dropdownClassName="app-playground-select"
          options={[
            {
              label: '提交表单模型解析',
              value: 'CardForm',
            },
            {
              label: '查询表格模型解析',
              value: 'TableProvider',
              disabled: true,
            },
          ]}
        />
      </div>
      <div className="playground-split">
        <SplitPane
          split="vertical"
          defaultSize={'50%'}
          minSize={400}
          onDragStarted={() => (document.body.style.cursor = 'col-resize')}
          onDragFinished={() => {
            document.body.style.cursor = 'auto';
          }}
        >
          <div className="playground-split-left">
            <MonacoEditor
              style={{
                width: '50vw',
                height: 'calc(100vh - 44px)',
              }}
              value={''}
              editorMonacoRef={editorMonacoRef}
              onSave={runCode}
              onChange={(value) => {
                tempCode.current.value = value;
              }}
            />
          </div>
          <div className="playground-split-right">
            {iframeSpin && (
              <div className="playground-iframe-loading">
                <Spin spinning></Spin>
              </div>
            )}
            {errorInfo && <Error error={errorInfo} />}
            <iframe
              src="#/~demos/iframe-demo"
              key={code}
              onLoad={() => {
                setIframeSpin(false);
              }}
            />
          </div>
        </SplitPane>
      </div>
    </div>
  );
};
