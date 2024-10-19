import {
    Card,
    Space,
    Statistic,
    message,
  } from "antd";
  import React, { useState, useEffect } from "react";
  import axios from "axios";

  const NoOfEmployeesCard = ({ icon, title }) => {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [loading, setLoading] = useState(false);
  
    const fetchCustomerCount = async () => {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          "http://209.97.173.123:3001/dashboard/business/employees/get-number-of-employees",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployeeCount(response.data.employeeCount);
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
            value={loading ? "Loading..." : employeeCount}
            className="statistic"
          />
        </Space>
      </Card>
    );
  };

  export default NoOfEmployeesCard;