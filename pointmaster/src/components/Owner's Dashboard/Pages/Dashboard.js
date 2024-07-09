import { Card, Space, Statistic, Typography, List, Avatar } from 'antd';
import React from 'react';
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  StopOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import "./Dashboard.css";

const { Title, Text } = Typography;

const data = [
  {
    name: 'Scrambled Eggs With Toast',
    orders: 23,
    image: 'https://via.placeholder.com/50', // Replace with actual image URL
  },
  {
    name: 'Tacos With Chicken Grilled',
    orders: 16,
    image: 'https://via.placeholder.com/50', // Replace with actual image URL
  },
  {
    name: 'Spaghetti Bolognese',
    orders: 13,
    image: 'https://via.placeholder.com/50', // Replace with actual image URL
  },
  /* {
    name: 'French Bread & Potato',
    orders: 12,
    image: 'https://via.placeholder.com/50', // Replace with actual image URL
  }, */
];

const Dashboard = () => {
  return (
    <Space size={30} direction='vertical' className='dashboard-container'>
      <Space size={20} direction='horizontal' className='dashboard-row'>
        <DashboardCard icon={<AppstoreOutlined style={{ color: "green", backgroundColor: "rgba(0,255,0,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />} title={"Total Distribution"} value={1234} />
        <DashboardCard icon={<ShoppingCartOutlined style={{ color: "red", backgroundColor: "rgba(255,0,0,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />} title={"Total Orders"} value={1234} />
        <DashboardCard icon={<StopOutlined style={{ color: "blue", backgroundColor: "rgba(0,0,255,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />} title={"Expires in a month"} value={1234} />
        <DashboardCard icon={<DollarOutlined style={{ color: "purple", backgroundColor: "rgba(0,255,255,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />} title={"Total Revenue"} value={1234} />
      </Space>
      <Space size={20} direction='horizontal' className='dashboard-row'>
        <DashboardCard icon={<AppstoreOutlined style={{ color: "green", backgroundColor: "rgba(0,255,0,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />} title={"Total Distribution"} value={1234} />
        <DashboardCard icon={<ShoppingCartOutlined style={{ color: "red", backgroundColor: "rgba(255,0,0,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />} title={"Total Orders"} value={1234} />
        <DashboardCard icon={<StopOutlined style={{ color: "blue", backgroundColor: "rgba(0,0,255,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />} title={"Expires in a month"} value={1234} />
        <DashboardCard icon={<DollarOutlined style={{ color: "purple", backgroundColor: "rgba(0,255,255,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />} title={"Total Revenue"} value={1234} />
      </Space>
      <Space>
        <PopularItems/>
      </Space>
    </Space>
  );
};

const DashboardCard = ({ icon, title, value }) => {
  return (
    <Card className='card'>
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
        <Text type="secondary" className="view-all" /* style={{color:"green", fontWeight:"500"}} */>View All</Text>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              title={<Text> {item.name}</Text>}
              description={<Text type="secondary">Orders: {item.orders}</Text>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Dashboard;
