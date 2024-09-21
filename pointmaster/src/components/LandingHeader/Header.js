// components/Registration/Header.js
import React from 'react';
import './header.css';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <Typography.Title level={2} style={{ color: 'white' }}>
        Point Master
      </Typography.Title>
      <nav className="nav-links">
        <a onClick={handleScrollToContact}>Contact Us</a>
        <Button
          type="primary"
          className="login-btn"
          onClick={() => navigate('/login')} // Wrap the navigate call in an anonymous function
        >
          Log In
        </Button>
      </nav>
    </header>
  );
}
