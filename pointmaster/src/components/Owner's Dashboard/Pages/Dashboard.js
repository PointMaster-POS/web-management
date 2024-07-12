import { Card, Space, Statistic, Typography, List, Avatar, Row, Col } from 'antd';
import React from 'react';
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  StopOutlined,
  DollarOutlined,
  PoundOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import "./Dashboard.css"

const { Title, Text } = Typography;

const data_set_1 = [
  {
    name: 'Scrambled Eggs With Toast',
    orders: 23,
    image: "images/sandwich-with-poached-egg.jpg", // Replace with actual image URL
  },
  {
    name: 'Tacos With Chicken Grilled',
    orders: 16,
    image: "images/top-view-delicious-tacos-red-plate.jpg", // Replace with actual image URL
  },
  {
    name: 'Spaghetti Bolognese',
    orders: 13,
    image: 'images/delicious-pasta-plate.jpg', // Replace with actual image URL
  },
];

const data_set_2 = [
  {
    name: 'Hawaiian Chicken Skewers',
  },
  {
    name: 'Veggie Supreme Pizza',
  },
  {
    name: 'Fish and Chips',
  },
  {
    name: 'Scrambled Eggs With Toast'
  }
];

const Dashboard = () => {
  return (
    <div className='dashboard-container' >
      <Row gutter={[30]}>
        <Col span={18}>
          <Row gutter={[20,20]}>
            <Col span={8}>
              <DashboardCard icon={<PoundOutlined style={iconStyle("green")} />} title="Daily Sales" value={1234} />
            </Col>
            <Col span={8}>
              <DashboardCard icon={<PoundOutlined style={iconStyle("red")} />} title="Monthly Sales " value={1234} />
            </Col>
            <Col span={8}>
              <DashboardCard icon={<ShoppingOutlined style={iconStyle("orange")} />} title="Daily Orders" value={1234} />
            </Col>
            <Col span={8}>
              <DashboardCard icon={<ShoppingCartOutlined style={iconStyle("olive")} />} title="Daily Distribution" value={1234} />
            </Col>
            <Col span={8}>
              <DashboardCard icon={<StopOutlined style={iconStyle("blue")} />} title="Expires in a month" value={1234} />
            </Col>
            <Col span={8}>
              <DashboardCard icon={<DollarOutlined style={iconStyle("purple")} />} title="Total Revenue" value={1234} />
            </Col>
            <Col span={24}>
              <Chart />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Space size={20} direction="vertical" style={{ width: '100%' }}>
            <PopularItems />
            <OutOfStock />
          </Space>
        </Col>
      </Row>
    </div>
  );
};

const iconStyle = (color) => ({
  color: color,
  backgroundColor: `rgba(${color === "green" ? "0,255,0" : color === "red" ? "255,0,0" : color === "orange" ? "255,165,0" : color === "olive" ? "128,128,0" : color === "blue" ? "0,0,255" : "128,0,128"},0.25)`,
  borderRadius: 20,
  fontSize: 24,
  padding: 8,
});

const DashboardCard = ({ icon, title, value }) => {
  return (
    <Card hoverable className='card'>
      <Space direction='horizontal' size='large' className='card-content'>
        {icon}
        <Statistic title={title} value={value} className='statistic'/>
      </Space>
    </Card>
  );
};

const PopularItems = () => {
  return (
    <Card className="popular-items-card">
      <div className="card-header">
        <Title level={4}>Popular Items</Title>
        <Text type="secondary" className="view-all" >View All</Text>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={data_set_1}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta 
              avatar={<Avatar src={item.image} size={40}/>}
              title={<Text> {item.name}</Text>}
              description={<Text type="secondary">Orders: {item.orders}</Text>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

const OutOfStock = () => {
  return (
    <Card className="out-of-stock-card">
      <div className="card-header">
        <Title level={4}>Out of Stock</Title>
        <Text type="secondary" className="view-all">View All</Text>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={data_set_2}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<Text>{item.name}</Text>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

const Chart = () => {
  return (
    <Card className='chart-card'>
      <Title level={4}>Chart</Title>
    </Card>
  );
};

export default Dashboard;
