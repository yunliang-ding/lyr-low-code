import React from 'react';
import { CrudModelRender } from 'lyr-low-code';
import './index.less';

export default ({ schema }) => {
  return (
    <div className="preview">
      <div className="preview-header"></div>
      <div className="preview-body">
        <div className="preview-sider"></div>
        <div className="preview-main">
          <CrudModelRender type="form" schema={schema} />
        </div>
      </div>
    </div>
  );
};
