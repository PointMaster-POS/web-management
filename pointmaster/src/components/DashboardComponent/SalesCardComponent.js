import {
  Card,
  Space,
  Statistic,
  Dropdown,
  Menu,
  message,
} from "antd";
import {
  MoreOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

const SalesCard = ({ icon }) => {
  const [timeFrame, setTimeFrame] = useState("Today");
  const [salesData, setSalesData] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleMenuClick = (e) => {
    setTimeFrame(e.key);
  };

  const getStartAndEndDate = (timeFrame) => {
    const today = dayjs().startOf("day");
    if (timeFrame === "Today") {
      return {
        startDate: today.format("YYYY-MM-DD"),
        endDate: today.add(1, "days").format("YYYY-MM-DD"),
      };
    } else if (timeFrame === "This Month") {
      return {
        startDate: today.startOf("month").format("YYYY-MM-DD"),
        endDate: today.endOf("month").add(1, "days").format("YYYY-MM-DD"),
      };
    } else if (timeFrame === "This Year") {
      return {
        startDate: today.startOf("year").format("YYYY-MM-DD"),
        endDate: today.endOf("year").add(1, "days").format("YYYY-MM-DD"),
      };
    }
  };

  const fetchSalesData = async () => {
    setLoading(true);
    const { startDate, endDate } = getStartAndEndDate(timeFrame);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `http://209.97.173.123:3001/dashboard/business/bills-between-dates/${startDate}/${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      const Sales = data.reduce(
        (total, item) => total + item.number_of_bills,
        0
      );
      setSalesData(Sales || 0); // Assuming the response has totalSales
    } catch (error) {
      message.error("Failed to fetch sales data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [timeFrame]);

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
        <Statistic
          title={`${timeFrame} Sales`}
          value={loading ? "Loading..." : salesData}
          className="statistic"
        />
      </Space>
    </Card>
  );
};

export default SalesCard;
