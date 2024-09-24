// components/Registration/Footer.js
import React from 'react';
import './Footer.css';
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';


export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section" id="contact-section">
          <h4>Contact Us</h4>
          <p>Email: support@pointmaster.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookOutlined style={{ fontSize: 'px', color: 'white' }} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined style={{ fontSize: '24px', color: 'white' }} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined style={{ fontSize: '24px', color: 'white' }} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 PointMaster. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
