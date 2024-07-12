// Sidebar.jsx
import React from 'react';
import { Layout, Menu } from 'antd';
import {
    DashboardOutlined,
  ShopOutlined,
  AppstoreOutlined,
  SolutionOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './sidebar.css';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider width="13%" className="sidebar">
      <div className="logo">
        <img src="/images/Point master logo.jpg" alt="PointMaster Logo" className="logo-image" />
      </div>
      <Menu theme='dark' mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined style={{ fontSize: '30px' }}/>} className='menu-item'>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<ShopOutlined style={{ fontSize: '30px' }}/>} className='menu-item'>
          Products
        </Menu.Item>
        <Menu.Item key="3" icon={<AppstoreOutlined style={{ fontSize: '30px' }}/>} className='menu-item'>
          Categories
        </Menu.Item>
        <Menu.Item key="4" icon={<SolutionOutlined style={{ fontSize: '30px' }}/>} className='menu-item'>
          Suppliers
        </Menu.Item>
        <Menu.Item key="5" icon={<UserOutlined style={{ fontSize: '30px' }}/>} className='menu-item'>
          Profile
        </Menu.Item>
        <Menu.Item key="6" icon={<SettingOutlined style={{ fontSize: '30px' }}/>} className='menu-item'>
          Settings
        </Menu.Item>
        <Menu.Item key="7" icon={<LogoutOutlined style={{ fontSize: '30px' }}/>} className='menu-item'>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
