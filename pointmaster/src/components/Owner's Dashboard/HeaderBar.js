import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

let manager = `John`;

const HeaderBar = () => {
  return (
    <Header
      className="site-layout-background"
      style={{
        display: "flex",
        alignItems: "center",
        height: "80px",
        padding: "0 20px",
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
  );
};

export default HeaderBar;
