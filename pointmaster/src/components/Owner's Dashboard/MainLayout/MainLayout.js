import React from "react";
import {Space } from "antd";
import SideBar from "../SideBar/SideBar";
import Content from "../Content";
import Header from "../Header/Header";
import Footer from "../Footer/Footer"
import "./MainLayout.css"

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <Space className="sider-content">
        <SideBar></SideBar>
        <Content></Content>
      </Space>
      <Footer />
    </div>
  );
};

export default MainLayout;
