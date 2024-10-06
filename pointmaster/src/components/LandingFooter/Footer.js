// components/Registration/Footer.js
import React from 'react';
import './Footer.css';
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined, AppleOutlined, AndroidOutlined } from '@ant-design/icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section" id="contact-section">
          <h4>Contact Us</h4>
          <p>Email: <a href="mailto:support@pointmaster.com" className="footer-link">support@pointmaster.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="footer-link">+1 234 567 890</a></p>
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookOutlined style={{ fontSize: '24px', color: 'white' }} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <TwitterOutlined style={{ fontSize: '24px', color: 'white' }} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedinOutlined style={{ fontSize: '24px', color: 'white' }} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/about" className="footer-link">About Us</a></li>
            <li><a href="/services" className="footer-link">Services</a></li>
            <li><a href="/privacy-policy" className="footer-link">Privacy Policy</a></li>
            <li><a href="/terms-of-service" className="footer-link">Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer-section" id="download-section">
          <h4>Download Our App</h4>
          <div className="app-store-links">
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
              <AppleOutlined style={{ fontSize: '24px', color: 'white', marginRight: '10px' }} />
            </a>
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
              <AndroidOutlined style={{ fontSize: '24px', color: 'white' }} />
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
