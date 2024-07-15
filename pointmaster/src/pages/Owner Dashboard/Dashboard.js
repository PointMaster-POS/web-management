import { Card, Space, Statistic, Typography, List, Avatar, Row, Col } from 'antd';
import React from 'react';
import {
  ShoppingCartOutlined,
  StopOutlined,
  DollarOutlined,
  PoundOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import "./Dashboard.css"

const { Title, Text } = Typography;
Chart.register(...registerables);

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
  {
    name: 'French Bread & Potato',
    orders: 12,
    image: 'images/top-view-sweet-delicious-bangles-with-filling-grey-wooden-table-sweet-sugar-bake-pastry-cookie-biscuit.jpg', // Replace with actual image URL
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
          <Row gutter={[20,25]}>
            <Col span={8}>
              <DashboardCard icon={<PoundOutlined style={iconStyle("green")} />} title="Daily Sales" value={1234} />
            </Col>
            <Col span={8}>
              <DashboardCard icon={<PoundOutlined style={iconStyle("red")} />} title="Monthly Sales " value={1234} />
            </Col>
            <Col span={8}>
              <DashboardCard icon={<ShoppingOutlined style={iconStyle("orange")} />} title="Daily Purchase" value={1234} />
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
              <MultiLineChart />
            </Col>
            {/* <Col span={24}>
              <MultiLineChart />
            </Col> */}
          </Row>
        </Col>
        <Col span={6}>
          <Space size={8} direction="vertical" style={{ width: '100%' }}>
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
    <Card  className='card'>
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
              avatar={<Avatar src={item.image} size={50}/>}
              title={<Text className="item-title"> {item.name } </Text>}
              description={<Text type="secondary" className="item-description">Orders: {item.orders}</Text>}
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
              title={<Text className="item-title">{item.name}</Text>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

const MultiLineChart = () => {
  const data = {
    labels: [
      '2021-1', '2021-2', '2021-3', '2021-4', '2021-5', '2021-6', 
      '2021-7', '2021-8', '2021-9', '2021-10', '2021-11', '2021-12'
    ],
    datasets: [
      {
        label: 'Total Sale',
        data: [100, 120, 150, 170, 190, 200, 220, 180, 160, 200, 220, 240],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Total Purchase',
        data: [80, 110, 130, 150, 170, 180, 200, 160, 140, 180, 200, 220],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important for custom height
    layout: {
      padding: {
        // top: 10,
        bottom: 20
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the default legend
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        display: true,
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Values',
        },
        beginAtZero: true,
      },
    },
  };

  const legendItems = data.datasets.map(dataset => (
    <span key={dataset.label} style={{ marginRight: 20, display: 'inline-flex', alignItems: 'center' }}>
      <span
        style={{
          display: 'inline-block',
          width: 12,
          height: 12,
          backgroundColor: dataset.borderColor,
          marginRight: 5,
        }}
      />
      {dataset.label}
    </span>
  ));

  return (
    <Card style={{ height: 450 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={4}>Sales Overview</Title>
        <div>{legendItems}</div>
      </div>
      <div style={{ height: 400 }}>
        <Line data={data} options={options} />
      </div>
    </Card>
  );
};


export default Dashboard;
