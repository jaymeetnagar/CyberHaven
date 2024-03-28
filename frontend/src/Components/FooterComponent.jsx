import React from 'react';
import './FooterComponent.css';
const FooterComponent =()=>{
    return(
      <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>Your company description goes here.</p>
        </div>
        <div className="footer-section">
          <h4>Products</h4>
          <ul>
            <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>FAQ</li>
            <li>Contact Us</li>
            <li>Shipping Information</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect with Us</h4>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Cyber Haven. All rights reserved.</p>
      </div>
    </footer>
    )
}

export default FooterComponent