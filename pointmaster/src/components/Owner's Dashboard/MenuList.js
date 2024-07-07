import React from "react";
import { Layout, Menu } from "antd";
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
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

let manager = `John`;

const MenuList = () => {
  const location = useLocation();
  const selectedKey = location.pathname === "/" ? "1" : location.pathname.split("/")[1];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <Menu
          theme="dark"
          selectedKeys={[selectedKey]}
          mode="inline"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontSize: "15px",
            fontWeight: "bold",
            marginTop: "65px",
          }}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="stores" icon={<ShopOutlined />}>
            <Link to="/stores">Stores</Link>
          </Menu.Item>
          <Menu.Item key="users" icon={<UserOutlined />}>
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="suppliers" icon={<PhoneOutlined />}>
            <Link to="/suppliers">Suppliers</Link>
          </Menu.Item>
          <Menu.Item key="category" icon={<AppstoreOutlined />}>
            <Link to="/category">Category</Link>
          </Menu.Item>
          <Menu.Item key="products" icon={<ProductOutlined />}>
            <Link to="/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
            <Link to="/orders">Orders</Link>
          </Menu.Item>
          <Menu.Item key="reports" icon={<AreaChartOutlined />}>
            <Link to="/reports">Reports</Link>
          </Menu.Item>
          <Menu.Item key="expired" icon={<StopOutlined />}>
            <Link to="/expired">Expired</Link>
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            display: "flex",
            alignItems: "center",
            height: "80px",
            padding: 0,
            background: "#001529",
          }}
        >
          <div
            className="logo"
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "#1890ff",
            }}
          >
            Welcome back, {manager}
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          {/* <div style={{ padding: 24, minHeight: 360 }}>
          <Stores managers={managers} />
          </div> */}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          POS System ©2024 Created by
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MenuList;
