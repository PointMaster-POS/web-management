import {
    Card,
    message,
    Typography,
  } from "antd";
  import React, { useState, useEffect, useMemo } from "react";
  import SalesModal from "../../components/Popups/SalesModal";
  import { Bar } from "react-chartjs-2";
  import dayjs from "dayjs";
  import baseUrl from "../../apiConfig";

  const { Title, Text } = Typography;

  const BillsBarChart = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const start_month = useMemo(
      () => dayjs().subtract(12, "month").format("YYYY-MM"),
      []
    );
    const end_month = useMemo(() => dayjs().format("YYYY-MM"), []);
  
    const getLast12Months = () => {
      const months = [];
      for (let i = 0; i < 12; i++) {
        months.unshift(dayjs().subtract(i, "month").format("YYYY-MM"));
      }
      return months;
    };
  
    const fetchBillsData = async (startMonth, endMonth) => {
      setLoading(true);
  
      const token = localStorage.getItem("accessToken");
      if (!token) {
        message.error("Authorization token is missing. Please log in again.");
        return;
      }
  
      try {
        const response = await fetch(
          `${baseUrl}:3001/dashboard/business/sale-report/number-of-bills/${startMonth}/${endMonth}`,
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
  
        const last12Months = getLast12Months();
  
        const billsData = last12Months.map((month) => {
          const monthData = result.data.find((item) => item.bill_month === month);
          return monthData ? monthData.number_of_bills : 0;
        });
  
        setChartData({
          labels: last12Months,
          datasets: [
            {
              data: billsData,
              backgroundColor: "#3495eb",
              borderColor: "#0f34d6",
              borderWidth: 1,
            },
  
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchBillsData(start_month, end_month);
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
      scales: {
        x: {
          grid: {
            display: false,
          },
  
          title: {
            display: true,
            text: "Months",
            font: {
              size: 18,
            },
          },
          ticks: {
            font: {
              size: 14,
            },
          },
        },
        y: {
          grid: {
            display: false,
          },
  
          title: {
            display: true,
            text: "Sales",
            font: {
              size: 18,
            },
          },
          ticks: {
            font: {
              size: 14,
            },
          },
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  
    return (
      <Card style={{ height: "516px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title level={3}>Sales</Title>
          <Text
            type="secondary"
            className="view-more"
            onClick={handleViewAllClick}
          >
            View more...
          </Text>
          <SalesModal
            visible={modalVisible}
            onClose={handleCloseModal}
            chartData={chartData}
            defaultStartMonth={start_month}
            defaultEndMonth={end_month}
            fetchBillsData={fetchBillsData}
            options={options}
          />
        </div>
        <div style={{ height: "400px" }}>
          {loading ? (
            <p>Loading...</p>
          ) : chartData.labels ? (
            <Bar data={chartData} options={options} />
          ) : (
            <p>No data available</p>
          )}
        </div>
      </Card>
    );
  };

  export default BillsBarChart;