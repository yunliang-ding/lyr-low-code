// import { PageDesigner } from 'lyr-low-code';
// import React, { useRef } from 'react';
// import { Button, CreateDrawer } from 'lyr-design';
// import { CodeEditor } from 'lyr-code-editor'
// import { Message, Space } from '@arco-design/web-react';
// import './index.less';

// const exportDrawer = CreateDrawer({
//   title: '标准数据模型',
//   width: 600,
//   footer: false,
//   drawerProps: {
//     headerStyle: {
//       display: 'none',
//     },
//     bodyStyle: {
//       padding: 0,
//     },
//   },
//   render({ value }) {
//     return <CodeEditor value={value.code} minimapEnabled={false} />;
//   },
// });

// export default () => {
//   const pageDesignerRef: any = useRef({});
//   return (
//     <div className="page-designer-playground">
//       <div className="page-designer-playground-header">
//         <div className="page-designer-playground-header-title">
//           PageDesigner
//         </div>
//         <Space>
//           <Button
//             type="primary"
//             key="export"
//             onClick={() => {
//               if (pageDesignerRef.current.schema?.length > 0) {
//                 exportDrawer.open({
//                   initialValues: {
//                     code: pageDesignerRef.current.getPageStandardSchema({
//                       pageProps: pageDesignerRef.current.pageProps,
//                       children: pageDesignerRef.current.schema,
//                     }),
//                   },
//                 });
//               } else {
//                 Message.info('物料为空');
//               }
//             }}
//           >
//             导出schema
//           </Button>
//           <Button
//             type="primary"
//             key="export"
//             onClick={() => {
//               if (pageDesignerRef.current.schema?.length > 0) {
//                 pageDesignerRef.current.setType(
//                   pageDesignerRef.current.type === 'render'
//                     ? 'canvas'
//                     : 'render',
//                 );
//               } else {
//                 Message.info('请选择配置项');
//               }
//             }}
//           >
//             {pageDesignerRef.current.type === 'render' ? '编辑' : '预览'}
//           </Button>
//         </Space>
//       </div>
//       <div className="page-designer-playground-body">
//         <PageDesigner ref={pageDesignerRef}>
//           <PageDesigner.RegisterWidgets />
//           <PageDesigner.PageCanvas
//             onCtrlS={() => {
//               Message.loading('保存中');
//             }}
//           />
//           <PageDesigner.PropsConfigPanel />
//         </PageDesigner>
//       </div>
//     </div>
//   );
// };
