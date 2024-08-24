import React, { useState, useEffect } from "react";
import { Layout, message } from "antd";
import SideBar from "./SideBar";
import Header from "./Header";
import Content from "./Content";
// import Footer from "../Footer/Footer";

const { Content: AntContent } = Layout;

const MainLayout = ({ setIsAuthenticated }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
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
        <SideBar onCollapse={handleCollapse} />
        <Layout
          style={{
            marginLeft: collapsed ? "80px" : "260px", // Adjust based on collapsed state
            transition: "margin-left 0.2s",
          }}
        >
          <AntContent style={{ margin: "16px 16px 0" }}>
            {contextHolder}
            <Content />
          </AntContent>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
