import React from "react";
import {Space } from "antd";
import SideBar from "../SideBar/SideBar";
// import Content from "./Content";
// import HeaderBar from "../HeaderBar";
// import Footer from "./Footer"
import "./MainLayout.css"

const MainLayout = () => {
  return (
    <div className="main-layout">
      {/* <HeaderBar /> */}
      <Space className="sider-content">
        <SideBar></SideBar>
        {/* <Content></Content> */}
      </Space>
      {/* <Footer className="footer" /> */}
    </div>
  );
};

export default MainLayout;
