import { IconClose } from '@arco-design/web-react/icon';
import { CodeEditor } from 'lyr-code-editor';
import store from '../store';

export default () => {
  return (
    <div className="form-designer-absolute-panel form-designer-json-schema">
      <div className="panel-header">
        <span className="panel-title">JsonSchema</span>
        <IconClose
          className="icon-close"
          onClick={() => {
            store.activeBar = undefined;
          }}
        />
      </div>
      <div className="panel-body">
        <CodeEditor
          value={store.getStandardSchema()}
          minimapEnabled={false}
          readOnly
        />
      </div>
    </div>
  );
};
