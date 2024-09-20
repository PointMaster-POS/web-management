// components/Registration/Header.js
import React from 'react';
import './header.css';
import { Button,Typography } from 'antd';

export default function Header() {
  return (
    <header className="header">
      <Typography.Title level={2} style={{color:'white'}}>
        Point Master
      </Typography.Title>
      <nav className="nav-links">
        <a href="#contact">Contact Us</a>
        <Button type="primary" className="login-btn">
          Log In
        </Button>
      </nav>
    </header>
  );
}
