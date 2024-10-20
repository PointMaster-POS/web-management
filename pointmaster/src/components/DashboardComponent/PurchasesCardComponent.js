import { Card, Space, Statistic, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const PurchasesCard = ({ icon }) => {
  const [timeFrame, setTimeFrame] = useState("Today");
  const [purchasesCount, setPurchasesCount] = useState(8); // Add state for purchases count

  const handleMenuClick = (e) => {
    setTimeFrame(e.key);
    // Optional: You can also change the purchases count based on the selected timeframe
    // For example:
    // if (e.key === "This Month") setPurchasesCount(30); 
    // else if (e.key === "This Year") setPurchasesCount(200);
    // else setPurchasesCount(8); // Today
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Today" style={{ fontWeight: "bold", fontSize: "16px" }}>
        Today
      </Menu.Item>
      <Menu.Item
        key="This Month"
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        This Month
      </Menu.Item>
      <Menu.Item
        key="This Year"
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        This Year
      </Menu.Item>
    </Menu>
  );

  return (
    <Card className="card" style={{ position: "relative" }}>
      <Dropdown overlay={menu} trigger={["click"]}>
        <MoreOutlined
          style={{
            fontSize: "20px",
            cursor: "pointer",
            position: "absolute",
            top: "35px",
            right: "30px",
          }}
        />
      </Dropdown>

      <Space direction="horizontal" size="large">
        {icon}
        <Statistic title={`${timeFrame} Purchases`} value={purchasesCount} className="statistic" />
      </Space>
    </Card>
  );
};

export default PurchasesCard;
