import {
    Card,
    Typography,
    message,
  } from "antd";
  import React, { useState, useEffect } from "react";
  import { Pie } from "react-chartjs-2";
  import dayjs from "dayjs";
  import BranchPerformanceModal from "../../components/Popups/BranchPerformance";
  import baseUrl from "../../apiConfig";

  const { Title, Text } = Typography;

  const SalesPieChart = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const end_date = dayjs().format("YYYY-MM-DD");
    const start_date = dayjs().subtract(30, "days").format("YYYY-MM-DD");
  
    const fetchSalesData = async (startDate, endDate) => {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        message.error("Authorization token is missing. Please log in again.");
        return;
      }
  
      const adjustedEndDate = dayjs(endDate).add(1, "days").format("YYYY-MM-DD");
  
      try {
        const response = await fetch(
          `${baseUrl}:3001/dashboard/business/branch-performance/${startDate}/${adjustedEndDate}`,
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
  
        const result = await response.json();
  
        if (result && result.length > 0) {
          const labels = result.map((item) => item.branch_name);
          const values = result.map((item) => item.total_sales);
  
          setChartData({
            labels,
            datasets: [
              {
                data: values,
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                ],
                borderColor: [
                  "#FF6384",
                  "#36A2EB",
                ],
                borderWidth: 1,
              },
            ],
          });
        } else {
          setChartData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchSalesData(start_date, end_date);
    }, []);
  
    const handleViewAllClick = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };
  
    return (
      <Card style={{ height: "516px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title level={3}>Branch Performance by Sales</Title>
          <Text
            type="secondary"
            className="view-more"
            onClick={handleViewAllClick}
          >
            View more...
          </Text>
          <BranchPerformanceModal
            visible={modalVisible}
            onClose={handleCloseModal}
            chartData={chartData}
            defaultStartDate={start_date}
            defaultEndDate={end_date}
            fetchSalesData={fetchSalesData}
            options={options}
          />
        </div>
        <div style={{ height: "400px" }}>
          {loading ? (
            <p>Loading...</p>
          ) : chartData.labels ? (
            <Pie data={chartData} options={options} />
          ) : (
            <p>No data available</p>
          )}
        </div>
      </Card>
    );
  };

  export default SalesPieChart;