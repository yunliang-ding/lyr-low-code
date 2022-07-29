import React from 'react';

export default ({ error }) => {
  return (
    <div className="playground-error-info">
      <pre>解析失败:</pre>
      <pre>{error}</pre>
    </div>
  );
};
