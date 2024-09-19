import {
  Card,
  Space,
  Statistic,
  Typography,
  List,
  Avatar,
  Row,
  Col,
  Dropdown,
  Menu,
} from "antd";
import {
  ShoppingCartOutlined,
  StopOutlined,
  DollarOutlined,
  PoundOutlined,
  ShoppingOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import PopularItemsModal from "../../components/Popups/PopularItemsModal";
import OutOfStockModal from "../../components/Popups/OutOfStockModal";
import { PopularItemsList } from "../../components/Data";
import { OutOfStockList } from "../../components/Data";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "./Dashboard.css";

const { Title, Text } = Typography;
Chart.register(...registerables);

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Row gutter={[30]}>
        <Col span={18}>
          <Row gutter={[20, 25]}>
            <Col span={8}>
              <SalesCard icon={<PoundOutlined style={iconStyle("green")} />} />
            </Col>
            <Col span={8}>
              <PurchasesCard
                icon={<ShoppingOutlined style={iconStyle("orange")} />}
              />
            </Col>
            <Col span={8}>
              <DashboardCard1
                icon={<ShoppingCartOutlined style={iconStyle("olive")} />}
              />
            </Col>
            <Col span={8}>
              <DashboardCard2
                icon={<ShoppingCartOutlined style={iconStyle("olive")} />}
              />
            </Col>
            <Col span={8}>
              <DashboardCard
                icon={<StopOutlined style={iconStyle("blue")} />}
                title="Expires in a month"
                value={1234}
              />
            </Col>
            <Col span={8}>
              <DashboardCard
                icon={<DollarOutlined style={iconStyle("purple")} />}
                title="Profit"
                value={1234}
              />
            </Col>
            <Col span={24}>
              <MultiLineChart />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Space size={8} direction="vertical" style={{ width: "100%" }}>
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
  backgroundColor: `rgba(${
    color === "green"
      ? "0,255,0"
      : color === "red"
      ? "255,0,0"
      : color === "orange"
      ? "255,165,0"
      : color === "olive"
      ? "128,128,0"
      : color === "blue"
      ? "0,0,255"
      : "128,0,128"
  },0.25)`,
  borderRadius: 20,
  fontSize: 24,
  padding: 8,
});

const SalesCard = ({ icon }) => {
  const [timeFrame, setTimeFrame] = useState("Today");
  const [sales, setSales] = useState(1234);

  const handleMenuClick = (e) => {
    setTimeFrame(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Today" style={{ fontWeight: "bold", fontSize: "16px" }}>
        Today
      </Menu.Item>
      <Menu.Item
        key="This Month"
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        This Month
      </Menu.Item>
      <Menu.Item
        key="This Year"
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        This Year
      </Menu.Item>
    </Menu>
  );

  return (
    <Card className="card" style={{ position: "relative" }}>
      <Dropdown overlay={menu} trigger={["click"]}>
        <MoreOutlined
          style={{
            fontSize: "20px",
            cursor: "pointer",
            position: "absolute",
            top: "35px",
            right: "30px",
          }}
        />
      </Dropdown>

      <Space direction="horizontal" size="large">
        {icon}
        <Statistic title={`${timeFrame} Sales`} className="statistic" />
      </Space>
    </Card>
  );
};

const PurchasesCard = ({ icon }) => {
  const [timeFrame, setTimeFrame] = useState("Today");
  const [sales, setSales] = useState(1234);

  const handleMenuClick = (e) => {
    setTimeFrame(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Today" style={{ fontWeight: "bold", fontSize: "16px" }}>
        Today
      </Menu.Item>
      <Menu.Item
        key="This Month"
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        This Month
      </Menu.Item>
      <Menu.Item
        key="This Year"
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        This Year
      </Menu.Item>
    </Menu>
  );

  return (
    <Card className="card" style={{ position: "relative" }}>
      <Dropdown overlay={menu} trigger={["click"]}>
        <MoreOutlined
          style={{
            fontSize: "20px",
            cursor: "pointer",
            position: "absolute",
            top: "35px",
            right: "30px",
          }}
        />
      </Dropdown>

      <Space direction="horizontal" size="large">
        {icon}
        <Statistic title={`${timeFrame} Purchases`} className="statistic" />
      </Space>
    </Card>
  );
};

const DashboardCard1 = ({ icon }) => {
  return (
    <Card className="card">
      <Space direction="horizontal" size="large" className="card-content">
        {icon}
        {/* <Statistic title={title} value={value} className="statistic" /> */}
      </Space>
    </Card>
  );
};

const DashboardCard2 = ({ icon }) => {
  return (
    <Card className="card">
      <Space direction="horizontal" size="large" className="card-content">
        {icon}
        {/* <Statistic title={title} value={value} className="statistic" /> */}
      </Space>
    </Card>
  );
};

const DashboardCard = ({ icon, title }) => {
  return (
    <Card className="card">
      <Space direction="horizontal" size="large" className="card-content">
        {icon}
        <Statistic title={title} className="statistic" />
      </Space>
    </Card>
  );
};

const PopularItems = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleViewAllClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <Card>
      <div className="card-header">
        <Title level={4}>Popular Items</Title>
        <Text
          type="secondary"
          className="view-all"
          onClick={handleViewAllClick}
        >
          View All
        </Text>
        <PopularItemsModal visible={modalVisible} onClose={handleCloseModal} />
      </div>
      <List
        itemLayout="horizontal"
        dataSource={PopularItemsList.slice(0, 4)}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.image} size={50} />}
              title={<Text className="item-title"> {item.name} </Text>}
              description={
                <Text type="secondary" className="item-description">
                  Sales: {item.sales}
                </Text>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

const OutOfStock = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleViewAllClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <Card>
      <div className="card-header">
        <Title level={4}>Out of Stock</Title>
        <Text
          type="secondary"
          className="view-all"
          onClick={handleViewAllClick}
        >
          View All
        </Text>
        <OutOfStockModal visible={modalVisible} onClose={handleCloseModal} />
      </div>
      <List
        itemLayout="horizontal"
        dataSource={OutOfStockList.slice(0, 3)}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.image} size={45} />}
              title={<Text className="item-title">{item.item}</Text>}
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
      "2021-1",
      "2021-2",
      "2021-3",
      "2021-4",
      "2021-5",
      "2021-6",
      "2021-7",
      "2021-8",
      "2021-9",
      "2021-10",
      "2021-11",
      "2021-12",
    ],
    datasets: [
      {
        label: "Total Sale",
        data: [100, 120, 150, 170, 190, 200, 220, 180, 160, 200, 220, 240],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Total Purchase",
        data: [80, 110, 130, 150, 170, 180, 200, 160, 140, 180, 200, 220],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
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
        bottom: 20,
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the default legend
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "nearest",
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
          text: "Months",
        },
      },
      y: {
        display: true,
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Values",
        },
        beginAtZero: true,
      },
    },
  };

  const legendItems = data.datasets.map((dataset) => (
    <span
      key={dataset.label}
      style={{ marginRight: 20, display: "inline-flex", alignItems: "center" }}
    >
      <span
        style={{
          display: "inline-block",
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
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