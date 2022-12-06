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
  Breadcrumb,
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
  Breadcrumb,
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
  BlockQuote: () => {
    return 'BlockQuote';
  },
};
