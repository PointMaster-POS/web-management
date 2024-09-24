import React, { useState, useEffect } from "react";
import {
  UserOutlined,
  DashboardOutlined,
  ShopOutlined,
  PhoneOutlined,
  AppstoreOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  AreaChartOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sider.css";
import { useMenu } from "../../context/MenuContext"; // Import MenuContext



const { Sider } = Layout;

const items = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/loyalty",
    icon: <PhoneOutlined />,
    label: "Loyalty",
  },
  {
    key: "/stores",
    icon: <ShopOutlined />,
    label: "Stores",
  },
  {
    key: "/employees",
    icon: <UserOutlined />,
    label: "Employees",
  },
  
  { key: "/category", icon: <AppstoreOutlined />, label: "Category" },
  { key: "/products", icon: <ProductOutlined />, label: "Products" },
  // { key: "/orders", icon: <ShoppingCartOutlined />, label: "Orders" },
  // { key: "/reports", icon: <AreaChartOutlined />, label: "Reports" },
  // { key: "/expired", icon: <StopOutlined />, label: "Expired" },
];

const SideBar = ({ onCollapse }) => {
  const { selectedMenu, setSelectedMenu } = useMenu(); // Get selectedMenu and setter from context
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  // Update selectedKey when the location changes
  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  // Handle menu item click
  const onMenuClick = (e) => {
    navigate(e.key);  // Navigate to the selected menu item route
    setSelectedMenu(e.key); // Update the selected menu in context
  };

  // Handle sidebar collapse
  const handleCollapse = (value) => {
    setCollapsed(value);
    onCollapse(value);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      width={260}
      onCollapse={handleCollapse}
      theme="light"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 75,
        bottom: 0,
      }}
    >
      <Menu
        selectedKeys={[selectedKey]}
        mode="inline"
        theme="light"
        onClick={onMenuClick}
        className="custom-menu"
      >
        {items.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            className="custom-menu-item"
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideBar;
