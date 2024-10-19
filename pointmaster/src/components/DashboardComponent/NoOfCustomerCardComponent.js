import {
    Card,
    Space,
    Statistic,
    message,
  } from "antd";
  import React, { useState, useEffect } from "react";
  import axios from "axios";

  const NoOfCustomersCard = ({ icon, title }) => {
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

  export default NoOfCustomersCard;