import CrudModelRender from '@/crud-model-render';
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
  Button,
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
  Button,
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
  CrudModelRender,
  BlockQuote: () => {
    return 'BlockQuote';
  },
};
