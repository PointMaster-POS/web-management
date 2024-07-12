import React from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { DownOutlined, HomeOutlined } from '@ant-design/icons';
import './navigationbar.css';

const { Header } = Layout;

const branches = [
  { id: 1, name: 'Branch 1' },
  { id: 2, name: 'Branch 2' },
  { id: 3, name: 'Branch 3' },
];


const branchesMenu = (
  <Menu>
    {branches.map(branch => (
      <Menu.Item key={branch.id}>{branch.name}</Menu.Item>
    ))}
  </Menu>
);


const NavigationBar = () => {
  return (
    <Header className="nav-header">
      <h1 className='welcome'>Welcome Back <HomeOutlined style={{ fontSize: '35px' }}/> </h1>
      <Menu theme="dark" mode="horizontal" className="nav-menu">
        <Menu.Item key="branches">
          <Dropdown overlay={branchesMenu} trigger={['click']}>
            <span className="nav-link">
              Branches <DownOutlined />
            </span>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default NavigationBar;
