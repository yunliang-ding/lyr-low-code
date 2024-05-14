// import axios from 'axios';
// import { decrypt } from 'lyr-code-editor';
import { CardForm, DragForm } from 'lyr-component';
import { babelParse } from 'lyr-extra';
import store from '../store';

export default () => {
  const { schema, formProps, customWidgets, selectedKey, preview, storeCode } =
    store.useSnapshot();
  let pureProps = {};
  try {
    pureProps = babelParse({
      code: store.getStandardSchema(),
      // require: {
      //   "./store": babelParse({
      //     code: decrypt(storeCode, false),
      //     require: {
      //       axios,
      //     },
      //   }),
      // },
    });
  } catch (error) {
    console.log(error);
  }
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
