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
  Breadcrumb as AntdBreadcrumb,
  Button as AntdButton,
  Descriptions,
  Divider,
  Empty,
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
  Descriptions,
  Divider,
  Empty,
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
