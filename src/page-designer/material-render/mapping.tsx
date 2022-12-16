import CrudRender from '@/crud-model-render';
import { memo } from 'react';
import {
  Typography,
  Alert,
  Row,
  Col,
  Carousel,
  Collapse,
  Card,
  Timeline,
  Avatar,
  Button as AntdButton,
  Breadcrumb as AntdBreadcrumb,
  Descriptions as AntdDescriptions,
  Empty as AntdEmpty,
  Progress,
  Statistic,
  Result,
  Steps,
  Tabs,
  Tag,
} from 'antd';

export default {
  Text: Typography.Text,
  Link: ({ title, ...props }) => {
    if (props.target) {
      props.target = '_blank';
    }
    return <a {...props}>{title}</a>;
  },
  Title: Typography.Title,
  Alert,
  Avatar,
  Breadcrumb: (props) => {
    return (
      <AntdBreadcrumb separator={props.separator}>
        {props.items?.map((item) => {
          return (
            <AntdBreadcrumb.Item
              key={item.value}
              onClick={(item) => {
                props.onClick?.(item);
              }}
            >
              {item.label}
            </AntdBreadcrumb.Item>
          );
        })}
      </AntdBreadcrumb>
    );
  },
  Button: (props) => {
    return <AntdButton {...props}>{props.text}</AntdButton>;
  },
  Descriptions: (props) => {
    return (
      <AntdDescriptions title={props.title} column={props.column}>
        {props.children?.map((item) => {
          return (
            <AntdDescriptions.Item label={item.label} key={item.label}>
              {item.value}
            </AntdDescriptions.Item>
          );
        })}
      </AntdDescriptions>
    );
  },
  Empty: (props) => {
    return (
      <AntdEmpty
        description={props.description}
        image={
          props.simple
            ? AntdEmpty.PRESENTED_IMAGE_SIMPLE
            : AntdEmpty.PRESENTED_IMAGE_DEFAULT
        }
      />
    );
  },
  Progress,
  Result,
  Statistic,
  Steps,
  Tabs,
  Tag,
  Timeline,
  Card,
  Carousel,
  Collapse,
  Row,
  Col,
  CrudModelRender: memo(
    (props: any) => {
      return <CrudRender {...props} />;
    },
    (pre, next) => {
      return pre.schemaId === next.schemaId;
    },
  ),
  BlockQuote: () => {
    return 'BlockQuote';
  },
} as any;
