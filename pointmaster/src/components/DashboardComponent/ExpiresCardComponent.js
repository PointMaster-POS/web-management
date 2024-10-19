import {
    Card,
    Space,
    Statistic,
    message,
    Typography,
  } from "antd";
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";

  const { Text } = Typography;

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

  export default ExpiresCard;