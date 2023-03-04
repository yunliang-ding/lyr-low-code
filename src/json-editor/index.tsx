import MonacoEditor from '@/monaco-editor';
import { debounce } from 'lodash';
import { memo, useState } from 'react';
import './index.less';

export default ({ value, name, onChange, style = { height: 300 } }) => {
  const [errorInfo, setErrorInfo] = useState('');
  return (
    <div className="json_data_box" style={style}>
      {errorInfo && <div className="json_data_error_info">{errorInfo}</div>}
      <MemoMonaco
        value={value}
        onChange={onChange}
        name={name}
        setErrorInfo={setErrorInfo}
      />
    </div>
  );
};

const MemoMonaco = memo(
  ({ value, onChange, name, setErrorInfo }: any) => {
    return (
      <MonacoEditor
        id={`json_data_${name}`}
        value={JSON.stringify(value, null, 2)}
        language="json"
        theme={'vs-dark'}
        minimap={{
          enabled: false,
        }}
        onChange={debounce((code: string) => {
          try {
            const options = JSON.parse(code.replaceAll?.('\n', ''));
            onChange(options);
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
