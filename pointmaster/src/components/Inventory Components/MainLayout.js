import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        <NavigationBar />
        <Content className="content">
          <Outlet /> {/* This is where the nested routes will be rendered */}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
