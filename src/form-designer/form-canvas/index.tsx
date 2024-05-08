import { DragForm } from 'lyr-component';
import store from '../store';

export default () => {
  const { schema, formProps, customWidgets, selectedKey } = store.useSnapshot();
  return (
    <div className="form-canvas">
      <DragForm
        {...formProps}
        items={schema}
        widgets={customWidgets}
        onChange={(value) => {
          store.schema = value;
        }}
        selectedKey={selectedKey}
        onSelected={(key: string) => {
          store.selectedKey = key;
        }}
      />
    </div>
  );
};
