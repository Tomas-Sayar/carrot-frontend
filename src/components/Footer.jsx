import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container footer-grid">
        <div className="footer-section brand-info">
          <h2 className="logo">CARROT</h2>
          <p>Bring the outdoors in. We deliver healthy, ready-to-go plants right to your door.</p>
        </div>
        
        <div className="footer-section">
          <h3>Shop</h3>
          <ul>
            <li><a href="/shop">All Plants</a></li>
            <li><a href="/shop">Best Sellers</a></li>
            <li><a href="/shop">Care Tools</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Care Tips</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h3>Stay Connected</h3>
          <p>Join our mailing list for plant care tips and exclusive offers.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Email Address" />
            <button className="btn btn-primary">Join</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2024 Carrot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
