import {
    Card,
    List,
    Avatar,
    message,
    Typography
  } from "antd";
  import React, { useState, useEffect, useMemo } from "react";
  import LowStockItemsModal from "../../components/Popups/LowStockItemModal";

  const { Title, Text } = Typography;

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
                avatar={<Avatar src={item.image_url} size={45} />}
                title={<Text className="item-title"> {item.item_name} </Text>}
              />
            </List.Item>
          )}
        />
      </Card>
    );
  };

  export default LowStockItems;