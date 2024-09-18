// components/Registration/Header.js
import React from 'react';
import './header.css';
import { Button } from 'antd';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <a href="/">PointMaster</a>
      </div>
      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">Contact</a>
        <Button type="primary" className="login-btn">
          Log In
        </Button>
      </nav>
    </header>
  );
}
