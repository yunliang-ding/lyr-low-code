import { IconClose } from '@arco-design/web-react/icon';
import { CodeEditor } from 'lyr-code-editor';
import store from '../store';

export default () => {
  const { setting } = store.useSnapshot();
  return (
    <div className="form-designer-absolute-panel">
      <div className="panel-header">
        <span className="panel-title">设置</span>
        <IconClose
          className="icon-close"
          onClick={() => {
            store.activeBar = undefined;
          }}
        />
      </div>
      <div className="panel-body">
        <CodeEditor
          style={{
            height: '100%',
            width: '100%',
          }}
          mode="json"
          debounceTime={0}
          onChange={(value) => {
            store.setting = value;
          }}
          value={setting as any}
        />
      </div>
    </div>
  );
};
