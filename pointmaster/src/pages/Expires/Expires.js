import React, { useState, useEffect } from "react";
import { Table, message, Card, Typography } from "antd";
import moment from "moment";

const { Title } = Typography;

const Expires = () => {
  const [expiredItems, setExpiredItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExpiredItems = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");

      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/dashboard/business/expired-items",
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

      const fetched_data = await response.json();
      setExpiredItems(fetched_data); // Assuming the response returns the items array
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpiredItems();
  }, []);

  const columns = [
    {
      title: "Item Id",
      dataIndex: "item_id",
      key: "item_id",
    },
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Expired Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (date) => moment(date).format("YYYY-MM-DD"), // Format the date
    },
  ];

  return (
    <Card
      style={{ margin: 30, padding: 30, borderRadius: "10px" }}
      bodyStyle={{ padding: "20px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={3} style={{ marginBottom: 10 }}>
          Items Expiring Soon
        </Title>
      </div>
      <hr color="#1890ff" />

      <Table
        dataSource={expiredItems}
        columns={columns}
        pagination={{ pageSize: 7 }}
        loading={loading}
        rowKey="id"
        locale={{ emptyText: "No items available." }}
        style={{ marginTop: 20 }}
      />
    </Card>
  );
};

export default Expires;
