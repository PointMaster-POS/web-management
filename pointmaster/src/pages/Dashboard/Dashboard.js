import {
  Space,
  Row,
  Col,
} from "antd";
import {
  DollarOutlined,
  CreditCardOutlined,
  ExclamationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { Chart, registerables } from "chart.js";
import "./Dashboard.css";
import SalesCard from "../../components/DashboardComponent/SalesCardComponent";
import PurchasesCard from "../../components/DashboardComponent/PurchasesCardComponent";
import NoOfCustomersCard from "../../components/DashboardComponent/NoOfCustomerCardComponent";
import PaymentMethodDataCard from "../../components/DashboardComponent/PaymentMethodCardComponent";
import ExpiresCard from "../../components/DashboardComponent/ExpiresCardComponent";
import NoOfEmployeesCard from "../../components/DashboardComponent/NoOfEmployeesCardComponent";
import PopularItems from "../../components/DashboardComponent/PopularItemsComponent";
import LowStockItems from "../../components/DashboardComponent/LowStockItemsComponent";
import BillsBarChart from "../../components/DashboardComponent/BillsBarChartComponent";
import SalesPieChart from "../../components/DashboardComponent/SalesPieChartComponent";
import baseUrl from "../../apiConfig";

Chart.register(...registerables);

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Row gutter={[20, 20]}>
        {/* Left Column: Data Cards */}
        <Col span={18}>
          <Row gutter={[20, 20]}>
            {/* Financial Data Cards */}
            <Col span={8}>
              <SalesCard icon={<DollarOutlined style={iconStyle("green")} />} />
            </Col>
            <Col span={8}>
              <PurchasesCard
                icon={<DollarOutlined style={iconStyle("orange")} />}
              />
            </Col>
            <Col span={8}>
              <PaymentMethodDataCard
                icon={<CreditCardOutlined style={iconStyle("teal")} />}
              />
            </Col>
            <Col span={8}>
              <ExpiresCard
                icon={<ExclamationOutlined style={iconStyle("blue")} />}
                title="Expires in a month"
              />
            </Col>
            <Col span={8}>
              <NoOfCustomersCard
                icon={<UserOutlined style={iconStyle("olive")} />}
                title="Number of Customers"
              />
            </Col>
            <Col span={8}>
              <NoOfEmployeesCard
                icon={<UserOutlined style={iconStyle("purple")} />}
                title="Number of Employees"
              />
            </Col>

            {/* Increased space for the Bar Chart */}
            <Col span={16}>
              <BillsBarChart />
            </Col>
            <Col span={8}>
              <SalesPieChart />
            </Col>
          </Row>
        </Col>

        {/* Right Column: Popular & Low Stock Items */}
        <Col span={6}>
          <Space size={20} direction="vertical" style={{ width: "100%" }}>
            <PopularItems />
            <LowStockItems />
          </Space>
        </Col>
      </Row>
    </div>
  );
};

const iconStyle = (color) => ({
  color: color,
  backgroundColor: `rgba(${
    color === "green"
      ? "0,255,0"
      : color === "red"
      ? "255,0,0"
      : color === "orange"
      ? "255,165,0"
      : color === "olive"
      ? "128,128,0"
      : color === "blue"
      ? "0,0,255"
      : color === "teal"
      ? "0,128,128"
      : "128,0,128"
  },0.25)`,
  borderRadius: 20,
  fontSize: 24,
  padding: 8,
});

export default Dashboard;
