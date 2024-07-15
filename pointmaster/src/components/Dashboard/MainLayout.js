import React from 'react';
import {Layout } from 'antd';
import SideBar from './SideBar';
import Header from './Header';
import Content from "./Content"
// import Footer from "../Footer/Footer";

const { Content: AntContent } = Layout;

const MainLayout = () => {

  return (
    <Layout style={{minHeight: '100vh',}}>
      <SideBar />
      <Layout>
        <Header />
        <AntContent style={{ margin: '0 16px' }}>
          <Content />
        </AntContent>
        {/* <Footer /> */}
      </Layout>
    </Layout>
  );
};
export default MainLayout;