import React, { useState, useEffect } from "react";
import { Layout, message } from "antd";
import Sider from "../Sider/Sider";
import Header from "../DashboardHeader/Header";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const { Content: AntContent } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { setIsAuthenticated } = useAuth();
  useEffect(() => {
    messageApi.open({
      type: "success",
      content: "Welcome to the System",
      duration: 5,
    });
  }, []);

  const handleCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        <Header setIsAuthenticated={setIsAuthenticated} />
      </div>
      <Layout>
        <Sider onCollapse={handleCollapse} />
        <Layout
          style={{
            marginLeft: collapsed ? "80px" : "260px", // Adjust based on collapsed state
            transition: "margin-left 0.2s",
          }}
        >
          <AntContent style={{ margin: "16px 16px 0" }}>
            {contextHolder}
            <Outlet />
          </AntContent>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
