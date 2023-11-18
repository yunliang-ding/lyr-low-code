/* eslint-disable @typescript-eslint/no-shadow */
import CrudRender from '@/crud-model-render';
import { memo } from 'react';
import {
  Typography,
  Alert,
  Carousel,
  Collapse,
  Card,
  Timeline,
  Avatar,
  Button as ArcoButton,
  Breadcrumb as ArcoBreadcrumb,
  Descriptions as ArcoDescriptions,
  Empty as ArcoEmpty,
  Progress,
  Statistic,
  Result,
  Steps,
  Tabs,
  Tag,
  Grid,
} from '@arco-design/web-react';

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
      <ArcoBreadcrumb separator={props.separator}>
        {props.items?.map((item) => {
          return (
            <ArcoBreadcrumb.Item
              key={item.value}
              onClick={(item) => {
                props.onClick?.(item);
              }}
            >
              {item.label}
            </ArcoBreadcrumb.Item>
          );
        })}
      </ArcoBreadcrumb>
    );
  },
  Button: (props) => {
    return <ArcoButton {...props}>{props.text}</ArcoButton>;
  },
  Descriptions: (props) => {
    return (
      <ArcoDescriptions
        title={props.title}
        column={props.column}
        data={props.children}
      />
    );
  },
  Empty: (props) => {
    return <ArcoEmpty description={props.description} />;
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
  Row: Grid.Row,
  Col: Grid.Col,
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
