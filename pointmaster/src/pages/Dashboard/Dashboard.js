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
  message,
} from "antd";
import {
  DollarOutlined,
  CreditCardOutlined,
  MoreOutlined,
  ExclamationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import PopularItemsModal from "../../components/Popups/PopularItemsModal";
import OutOfStockModal from "../../components/Popups/OutOfStockModal";
import { OutOfStockList } from "../../components/Data";
import { PopularItemsList } from "../../components/Data";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const { Title, Text } = Typography;
Chart.register(...registerables);

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Row gutter={[20]}>
        <Col span={18}>
          <Row gutter={[20, 20]}>
            <Col span={8}>
              <SalesCard icon={<DollarOutlined style={iconStyle("green")} />} />
            </Col>
            <Col span={8}>
              <PurchasesCard
                icon={<DollarOutlined style={iconStyle("orange")} />}
              />
            </Col>
            <Col span={8}>
              <NoOfCustomerCard
                icon={<UserOutlined style={iconStyle("olive")} />}
                title="Number of Customers"
              />
            </Col>
            <Col span={8}>
              <PaymentMethodCard
                icon={<CreditCardOutlined style={iconStyle("teal")} />}
              />
            </Col>
            <Col span={8}>
              <ExpiresCard
                icon={<ExclamationOutlined style={iconStyle("blue")} />}
                title="Expires in a month"
              />
            </Col>
            <Col span={8}>
              <ProfitCard
                icon={<DollarOutlined style={iconStyle("purple")} />}
                title="Profit"
              />
            </Col>
            <Col span={24}>
              <MultiLineChart />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Space size={20} direction="vertical" style={{ width: "100%" }}>
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
      : color === "teal"
      ? "0,128,128"
      : "128,0,128"
  },0.25)`,
  borderRadius: 20,
  fontSize: 24,
  padding: 8,
});

const SalesCard = ({ icon }) => {
  const [timeFrame, setTimeFrame] = useState("Today");

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

const NoOfCustomerCard = ({ icon, title }) => {
  const [customerCount, setCustomerCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCustomerCount = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        "http://209.97.173.123:3001/dashboard/business/number-of-customers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCustomerCount(response.data.numberOfCustomers);
    } catch (error) {
      message.error("Failed to fetch count");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerCount();
  }, []);

  return (
    <Card className="card">
      <Space direction="horizontal" size="large" className="card-content">
        {icon}
        <Statistic
          title={title}
          value={loading ? "Loading..." : customerCount}
          className="statistic"
        />
      </Space>
    </Card>
  );
};

const PaymentMethodCard = ({ icon }) => {
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const handleMenuClick = (e) => {
    setPaymentMethod(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Cash" style={{ fontWeight: "bold", fontSize: "16px", width: "100px" }}>
        Cash
      </Menu.Item>
      <Menu.Item
        key="Card"
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        Card
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
        <Statistic title={`${paymentMethod} Payment`} className="statistic" />
      </Space>
    </Card>
  );
};


const ExpiresCard = ({ icon, title }) => {
  const [expiresCount, setExpiresCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const fetchExpiringItems = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        "http://209.97.173.123:3001/dashboard/business/expired-items",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setExpiresCount(response.data.length);
    } catch (error) {
      message.error("Failed to fetch expiring items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpiringItems();
  }, []);

  const handleViewMore = () => {
    navigate("/expires");
  };

  return (
    <Card className="card">
      <Space direction="horizontal" size="large" className="card-content">
        {icon}
        <Statistic
          title={title}
          value={loading ? "Loading..." : expiresCount}
          className="statistic"
        />
      </Space>
      <Text type="secondary" className="view-more" onClick={handleViewMore}>
        View More...
      </Text>
    </Card>
  );
};

const ProfitCard = ({ icon, title }) => {
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
  const [popularItemsList, setPopularItemsList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get today's date and 30 days prior
  const today = moment().format("YYYY-MM-DD");
  console.log(today);
  const thirtyDaysAgo = moment().subtract(30, "days").format("YYYY-MM-DD");
  console.log(thirtyDaysAgo);

  const fetchPopularItems = async (startDate, endDate) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    const adjustedEndDate = moment(endDate).add(1, "days").format("YYYY-MM-DD");

    try {
      const response = await fetch(
        `http://209.97.173.123:3001/dashboard/business/sale-report/item/${startDate}/${adjustedEndDate}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data: ", data); // Check the fetched data
      setPopularItemsList(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      message.error("Failed to fetch employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularItems(thirtyDaysAgo, today); // Fetch items on component load
  }, []);

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
        <PopularItemsModal
          visible={modalVisible}
          onClose={handleCloseModal}
          popularItemsList={PopularItemsList}
          defaultStartDate={thirtyDaysAgo}
          defaultEndDate={today}
          fetchPopularItems={fetchPopularItems}
        />
      </div>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={PopularItemsList.slice(0, 4)}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={/* item.image_url */ item.image} size={50} />}
              title={<Text className="item-title"> {/* item.item_name */ item.name} </Text>}
              description={
                <Text type="secondary" className="item-description">
                  Sales: {/* item.purchase_count */ item.sales}
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
    <Card >
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
        dataSource={OutOfStockList.slice(0, 4)}
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


const BillsBarChart = () => {}
export default Dashboard;
