import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import axios from "axios";
import moment from "moment";

const Expires = () => {
  const [expiredItems, setExpiredItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExpiredItems = async () => {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          "http://localhost:3001/dashboard/business/expired-items",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          }
        );
        setExpiredItems(response.data); // Assuming the response returns the items array
      } catch (error) {
        message.error("Failed to fetch expired items");
      } finally {
        setLoading(false);
      }
    };

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
