import React, { useState } from "react";
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
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./SideBar.css"; 

const { Sider } = Layout;

const items = [
  {
    key: "/",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/stores",
    icon: <ShopOutlined />,
    label: "Stores",
  },
  {
    key: "/users",
    icon: <UserOutlined />,
    label: "Users",
  },
  {
    key: "/suppliers",
    icon: <PhoneOutlined />,
    label: "Suppliers",
  },
  { key: "/category", icon: <AppstoreOutlined />, label: "Category" },
  { key: "/products", icon: <ProductOutlined />, label: "Products" },
  { key: "/orders", icon: <ShoppingCartOutlined />, label: "Orders" },
  { key: "/reports", icon: <AreaChartOutlined />, label: "Reports" },
  { key: "/expired", icon: <StopOutlined />, label: "Expired" },
  { key: "logout", icon: <LogoutOutlined />, label: "Logout" },
];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onMenuClick = (e) => {
    if (e.key === "toggle") {
      toggleCollapsed();
    } else {
      navigate(e.key);
    }
  };

  return (
    <Layout style={{height: "800px"}}>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={240}
  
      >
        <Menu
          defaultSelectedKeys={["/"]}
          mode="inline"
          theme="dark"
          onClick={onMenuClick}
          className="custom-menu"
        >
          <Menu.Item
            key="toggle"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            className="custom-toggle"
            onClick={toggleCollapsed}
          />

          
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} className="custom-menu-item">
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </Layout>  
      
  );
};

export default SideBar;
