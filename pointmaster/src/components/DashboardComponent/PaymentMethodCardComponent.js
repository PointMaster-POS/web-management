import { Card, Space, Statistic, Dropdown, Menu, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../apiConfig";

const PaymentMethodDataCard = ({ icon }) => {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [salesData, setSalesData] = useState({ cash: 0, card: 0 });
  const [loading, setLoading] = useState(false);

  const fetchPaymentMethodData = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `${baseUrl}:3001/dashboard/business/sales-by-payment-method`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      const cashSales = data
        .filter((item) => item.payment_method.toLowerCase() === "cash")
        .reduce((total, item) => total + item.total_sales, 0);

      const cardSales = data
        .filter((item) => item.payment_method.toLowerCase() === "card")
        .reduce((total, item) => total + item.total_sales, 0);

      setSalesData({ cash: cashSales, card: cardSales });
    } catch (error) {
      message.error("Failed to fetch sales");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethodData();
  }, []);

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
        <Statistic
          title={`Sales by ${paymentMethod}`}
          value={
            loading
              ? "Loading..."
              : paymentMethod === "Cash"
              ? salesData.cash
              : salesData.card
          }
          className="statistic"
        />
      </Space>
    </Card>
  );
};

export default PaymentMethodDataCard;
