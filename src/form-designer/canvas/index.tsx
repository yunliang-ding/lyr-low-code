import { CardForm, DragForm } from 'lyr-component';
import { babelParse } from 'lyr-extra';
import store from '../store';

export default () => {
  const { schema, formProps, customWidgets, selectedKey, preview } =
    store.useSnapshot();
  const pureProps = babelParse({
    code: store.getStandardSchema(),
  });
  return (
    <div className="form-canvas">
      {preview ? (
        <CardForm {...pureProps} widgets={customWidgets} />
      ) : (
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
      )}
    </div>
  );
};
