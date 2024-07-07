// Sidebar.jsx
import React from 'react';
import { Layout, Menu } from 'antd';
import {
    DashboardOutlined,
  ShopOutlined,
  AppstoreOutlined,
  SolutionOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './sidebar.css';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider width="15%" className="sidebar">
      <div className="logo">
        <h2 className='title'>PointMaster</h2>
      </div>
      <Menu theme='dark' mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />} className='menu-item'>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<ShopOutlined />} className='menu-item'>
          Products
        </Menu.Item>
        <Menu.Item key="3" icon={<AppstoreOutlined />} className='menu-item'>
          Categories
        </Menu.Item>
        <Menu.Item key="4" icon={<SolutionOutlined />} className='menu-item'>
          Suppliers
        </Menu.Item>
        <Menu.Item key="5" icon={<SettingOutlined />} className='menu-item'>
          Profile
        </Menu.Item>
        <Menu.Item key="6" icon={<SettingOutlined />} className='menu-item'>
          Settings
        </Menu.Item>
        <Menu.Item key="7" icon={<LogoutOutlined />} className='menu-item'>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
