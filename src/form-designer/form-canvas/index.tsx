import { recursionFind } from '@/util';
import { DragForm } from 'lyr-component';
import store from '../store';

export default () => {
  const { schema, formProps, customWidgets } = store.useSnapshot();
  return (
    <div className="form-canvas">
      <DragForm
        {...formProps}
        items={schema}
        widgets={customWidgets}
        onChange={(value) => {
          store.schema = value;
        }}
        onSelected={(key: string) => {
          store.selectedSchema = recursionFind(schema, key);
        }}
      />
    </div>
  );
};
