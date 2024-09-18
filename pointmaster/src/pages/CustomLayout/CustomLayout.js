import React from "react";
import { Layout } from "antd";
import Header from "../../components/LandingHeader/Header";
import Footer from "../../components/LandingFooter/Footer";
import { Outlet } from "react-router-dom";

const { Content: AntContent } = Layout;

const CustomLayout = () => {
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
        <Header />
      </div>
      <Layout>
          <AntContent style={{ margin: "16px 16px 0" }}>
            {/* {contextHolder} */}
            <Outlet />
          </AntContent>
      </Layout>
      <Footer/>
    </Layout>
  );
};

export default CustomLayout;
