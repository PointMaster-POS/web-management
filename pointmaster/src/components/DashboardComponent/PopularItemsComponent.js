import {
    Card,
    List,
    Avatar,
    message,
    Typography,
  } from "antd";
  import React, { useState, useEffect } from "react";
  import PopularItemsModal from "../../components/Popups/PopularItemsModal";
  import dayjs from "dayjs";
  import baseUrl from "../../apiConfig";

  const { Title, Text } = Typography;

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
          `${baseUrl}:3001/dashboard/business/sale-report/item/${startDate}/${adjustedEndDate}`,
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

  export default PopularItems;