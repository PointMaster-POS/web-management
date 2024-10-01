import React, { useState, useEffect } from "react";
import {
  UserOutlined,
  DashboardOutlined,
  ShopOutlined,
  PhoneOutlined,
  AppstoreOutlined,
  ProductOutlined,
  ExclamationCircleOutlined,
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
    key: "/category",
    icon: <AppstoreOutlined />,
    label: "Category",
  },
  {
    key: "/products",
    icon: <ProductOutlined />,
    label: "Products",
  },
  {
    key: "/employees",
    icon: <UserOutlined />,
    label: "Employees",
  }

];

const SideBar = ({ onCollapse }) => {
  const { selectedMenu, setSelectedMenu, role } = useMenu(); // Get role from context
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
    navigate(e.key); // Navigate to the selected menu item route
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
        {/* Render the common items */}
        {items.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            className="custom-menu-item"
          >
            {item.label}
          </Menu.Item>
        ))}

        {/* Conditionally render the Employees item if the role is 'owner' */}
        {/* {role === "owner" && (
          <Menu.Item
            key="/employees"
            icon={<UserOutlined />}
            className="custom-menu-item"
          >
            Employees
          </Menu.Item>
        )} */}
        {role === "owner" && (
          <Menu.Item
            key="/Loyalty"
            icon={<UserOutlined />}
            className="custom-menu-item"
          >
            Loyalty
          </Menu.Item>
        )}
        {role === "owner" && (
          <Menu.Item
            key="/stores"
            icon={<UserOutlined />}
            className="custom-menu-item"
          >
            Stores
          </Menu.Item>
        )}
        <Menu.Item
            key="/expires"
            icon={<ExclamationCircleOutlined />}
            className="custom-menu-item"
          >
            Expires
          </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
