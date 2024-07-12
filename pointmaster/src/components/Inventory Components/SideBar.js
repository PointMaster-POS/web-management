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
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider width="13%" className="sidebar">
      <div className="logo">
        <img src="/images/Point master logo.jpg" alt="PointMaster Logo" className="logo-image" />
      </div>
      <Menu theme='dark' mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined style={{ fontSize: '30px' }}/>} className='menu-item'>
          <Link to="/">Dashboard</Link>  
        </Menu.Item>
        <Menu.Item key="2" icon={<ShopOutlined style={{ fontSize: '30px' }}/>} className='menu-item'>
          <Link to="/productlist">Products</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<AppstoreOutlined style={{ fontSize: '30px' }}/>} className='menu-item'>
          <Link to="/category">Categories</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<SolutionOutlined style={{ fontSize: '30px' }}/>} className='menu-item'>
          <Link to="/suppliers">Suppliers</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<UserOutlined style={{ fontSize: '30px' }}/>} className='menu-item'>
          <Link to="/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<SettingOutlined style={{ fontSize: '30px' }}/>} className='menu-item'>
          <Link to="/settings">Settings</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<LogoutOutlined style={{ fontSize: '30px' }}/>} className='menu-item'>
          <Link to="/logout">Logout</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
