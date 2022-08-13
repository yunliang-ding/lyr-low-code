/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import MonacoEditor from '@/monaco-editor';
import { babelParse } from '@/tools';
import { decrypt, encrypt } from '@/util';
import { debounce, isEmpty } from 'lodash';
import { memo, useRef, useState } from 'react';
import './index.less';

export default ({
  value,
  onChange,
  name,
  style = { height: 300 },
  prefix,
  useEncrypt = true,
  defaultCode = `() => {

}`,
}) => {
  const [errorInfo, setErrorInfo] = useState('');
  return (
    <div className="function_data_box" style={style}>
      {errorInfo && <div className="function_data_error_info">{errorInfo}</div>}
      <MemoMonaco
        value={value}
        onChange={onChange}
        name={name}
        setErrorInfo={setErrorInfo}
        prefix={prefix}
        useEncrypt={useEncrypt}
        defaultCode={defaultCode}
      />
    </div>
  );
};

const MemoMonaco = memo(
  ({
    value,
    name,
    onChange,
    setErrorInfo,
    prefix,
    useEncrypt,
    defaultCode,
  }: any) => {
    const monacoRef: any = useRef({});
    return (
      <MonacoEditor
        id={`bind-function_${name}`}
        value={value ? decrypt(value, false) : defaultCode}
        editorMonacoRef={monacoRef}
        options={{
          theme: 'vs-dark',
          minimap: {
            enabled: false,
          },
        }}
        onChange={debounce(async (codeString) => {
          try {
            if (isEmpty(codeString) || codeString === defaultCode) {
              onChange(undefined);
            }
            await new Promise((res) => setTimeout(res, 1000));
            babelParse(codeString, prefix);
            onChange(useEncrypt ? encrypt(codeString) : codeString);
            setErrorInfo('');
          } catch (error) {
            setErrorInfo(error.toString());
          }
        }, 300)}
      />
    );
  },
  () => {
    return true;
  },
);
