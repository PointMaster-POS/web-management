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
import React, { useState, useEffect, useMemo } from "react";
import PopularItemsModal from "../../components/Popups/PopularItemsModal";
import LowStockItemsModal from "../../components/Popups/LowStockItemModal";
import SalesModal from "../../components/Popups/SalesModal";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import dayjs from "dayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import BranchPerformanceModal from "../../components/Popups/BranchPerformance";

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
            <Col span={12}>
              <BillsBarChart />
            </Col>
            <Col span={12}>
              <BillsPieChart />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Space size={20} direction="vertical" style={{ width: "100%" }}>
            <PopularItems />
            <LowStockItems />
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
      <Menu.Item
        key="Cash"
        style={{ fontWeight: "bold", fontSize: "16px", width: "100px" }}
      >
        Cash
      </Menu.Item>
      <Menu.Item key="Card" style={{ fontWeight: "bold", fontSize: "16px" }}>
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
        <Statistic title={`${paymentMethod} Payments`} className="statistic" />
      </Space>
    </Card>
  );
};

const ExpiresCard = ({ icon, title }) => {
  const [expiresCount, setExpiresCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const today = dayjs().format("YYYY-MM-DD");
  const thirtyDaysAgo = dayjs().subtract(30, "days").format("YYYY-MM-DD");

  const fetchPopularItems = async (startDate, endDate) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    const adjustedEndDate = dayjs(endDate).add(1, "days").format("YYYY-MM-DD");

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
      setPopularItemsList(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      message.error("Failed to fetch employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularItems(thirtyDaysAgo, today);
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
          popularItemsList={popularItemsList}
          defaultStartDate={thirtyDaysAgo}
          defaultEndDate={today}
          fetchPopularItems={fetchPopularItems}
        />
      </div>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={popularItemsList.slice(0, 4)}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.image_url} size={45} />}
              title={<Text className="item-title">{item.item_name}</Text>}
              description={
                <Text type="secondary" className="item-description">
                  Sales: {item.purchase_count}
                </Text>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

const LowStockItems = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [lowStockItemsList, setLowStockItemsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const defaultQuantity = 100;

  const fetchLowStockItems = async (quantity) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `http://209.97.173.123:3001/dashboard/business/low-stock-items/${quantity}`,
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
      setLowStockItemsList(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      message.error("Failed to fetch employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLowStockItems(defaultQuantity);
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
        <Title level={4}>Low stock Items</Title>
        <Text
          type="secondary"
          className="view-all"
          onClick={handleViewAllClick}
        >
          View All
        </Text>
        <LowStockItemsModal
          visible={modalVisible}
          onClose={handleCloseModal}
          lowStockItemsList={lowStockItemsList}
          defaultQuantity={defaultQuantity}
          fetchLowStockItems={fetchLowStockItems}
        />
      </div>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={lowStockItemsList.slice(0, 4)}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.image} size={45} />}
              title={<Text className="item-title"> {item.item_name} </Text>}
              // description={
              //   <Text type="secondary" className="item-description">
              //     Sales: {/* item.purchase_count */ item.stock}
              //   </Text>
              // }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

const BillsBarChart = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const start_month = useMemo(
    () => dayjs().subtract(12, "month").format("YYYY-MM"),
    []
  );
  console.log(start_month);
  const end_month = useMemo(() => dayjs().format("YYYY-MM"), []);
  console.log(end_month);

  const fetchBillsData = async (startMonth, endMonth) => {
    setLoading(true);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    // const adjustedEndDate = moment(endDate).add(1, "days").format("YYYY-MM-DD");

    try {
      const response = await fetch(
        `http://209.97.173.123:3001/dashboard/business/sale-report/number-of-bills/${startMonth}/${endMonth}`,
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

      const result = await response.json();

      // console.log(result.message);

      if (result.data && result.data.length > 0) {
        const labels = result.data.map((item) => item.bill_month);
        const values = result.data.map((item) => item.number_of_bills);

        setChartData({
          labels,
          datasets: [
            {
              label: "Number of Bills",
              data: values,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } else {
        setChartData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillsData(start_month, end_month);
  }, []);

  const dummyData = {
    labels: [
      "2024-01",
      "2024-02",
      "2024-03",
      "2024-04",
      "2024-05",
      "2024-06",
      "2024-07",
      "2024-08",
      "2024-09",
      "2024-10",
    ],
    datasets: [
      {
        data: [10, 15, 8, 20, 25, 18, 22, 16, 19, 3],
        backgroundColor: "#1E3E62",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const handleViewAllClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },

        title: {
          display: true,
          text: "Months",
          font: {
            size: 18,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },

        title: {
          display: true,
          text: "Number of Bills",
          font: {
            size: 18,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Card style={{ height: "516px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title level={3}>Number of Bills</Title>
        <Text
          type="secondary"
          className="view-more"
          onClick={handleViewAllClick}
        >
          View more...
        </Text>
        <SalesModal
          visible={modalVisible}
          onClose={handleCloseModal}
          chartData={dummyData}
          defaultStartMonth={start_month}
          defaultEndMonth={end_month}
          fetchBillsData={fetchBillsData}
          options={options}
        />
      </div>
      <div style={{ height: "400px" }}>
        {loading ? (
          <p>Loading...</p>
        ) : dummyData.labels ? (
          <Bar data={dummyData} options={options} />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </Card>
  );
};

const BillsPieChart = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const end_date = dayjs().format("YYYY-MM-DD");
  const start_date = dayjs().subtract(30, "days").format("YYYY-MM-DD");

  const fetchBillsData = async (startDate, endDate) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    // const adjustedEndDate = moment(endDate).add(1, "days").format("YYYY-MM-DD");

    try {
      const response = await fetch(
        `http://209.97.173.123:3001/dashboard/business/branch-performance/${startDate}/${endDate}`,
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

      const result = await response.json();

      // if (result.data && result.data.length > 0) {
      //   const labels = result.data.map((item) => item.bill_month);
      //   const values = result.data.map((item) => item.number_of_bills);

      //   setChartData({
      //     labels,
      //     datasets: [
      //       {
      //         label: "Number of Bills",
      //         data: values,
      //         backgroundColor: "rgba(75, 192, 192, 0.6)",
      //         borderColor: "rgba(75, 192, 192, 1)",
      //         borderWidth: 1,
      //       },
      //     ],
      //   });
      // } else {
      //   setChartData([]);
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillsData(start_date, end_date);
  }, []);

  const dummyData = {
    labels: [
      "2024-01",
      "2024-02",
      "2024-03",
      "2024-04",
      "2024-05",
      "2024-06",
      // "2024-07",
      // "2024-08",
      // "2024-09",
      // "2024-10",
    ],
    datasets: [
      {
        data: [10, 15, 8, 20, 25, 18/* , 22, 16, 19, 3 */],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          // "#FF6384",
          // "#36A2EB",
          // "#FFCE56",
          // "#4BC0C0",
        ],
        borderColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          // "#FF6384",
          // "#36A2EB",
          // "#FFCE56",
          // "#4BC0C0",
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleViewAllClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Card style={{ height: "516px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title level={3}>Branch Performance</Title>
        <Text
          type="secondary"
          className="view-more"
          onClick={handleViewAllClick}
        >
          View more...
        </Text>
        <BranchPerformanceModal
          visible={modalVisible}
          onClose={handleCloseModal}
          chartData={dummyData}
          defaultStartDate={start_date}
          defaultEndDate={end_date}
          fetchBillsData={fetchBillsData}
          options={options}
        />
      </div>
      <div style={{ height: "400px" }}>
        {loading ? (
          <p>Loading...</p>
        ) : dummyData.labels ? (
          <Pie data={dummyData} options={options} />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </Card>
  );
};

export default Dashboard;
