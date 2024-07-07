import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SiderMenu from "./SiderMenu";
import HeaderBar from "./HeaderBar";

const { Content, Footer } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* <SiderMenu /> */}
      <Layout className="site-layout">
        <HeaderBar />
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          POS System ©2024 Created by
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
