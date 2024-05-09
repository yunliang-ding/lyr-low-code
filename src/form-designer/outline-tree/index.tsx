import { IconClose } from '@arco-design/web-react/icon';
import store from '../store';

export default () => {
  return (
    <div className="form-designer-absolute-panel form-designer-outline-tree">
      <div className="panel-header">
        <span className="panel-title">大纲树</span>
        <IconClose
          className="icon-close"
          onClick={() => {
            store.activeBar = undefined;
          }}
        />
      </div>
    </div>
  );
};
