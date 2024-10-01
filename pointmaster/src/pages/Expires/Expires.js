import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import moment from "moment";

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
      title: "Items",
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
    <div>
      <h1>Items Expiring Soon</h1>
      <Table
        dataSource={expiredItems}
        columns={columns}
        loading={loading}
        rowKey="id" // Ensure each row has a unique key (e.g., id from the API)
      />
    </div>
  );
};

export default Expires;
