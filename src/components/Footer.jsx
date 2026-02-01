import React, { useEffect, useRef, useState } from 'react';
import './Footer.css';

const Footer = () => {
  const footerRef = useRef(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => entries.forEach(e => e.isIntersecting && el.classList.add('visible')),
        { threshold: 0.06 }
      );
      io.observe(el);
      return () => io.disconnect();
    }
    el.classList.add('visible');
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="modern-footer" role="contentinfo" ref={footerRef}>
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="brand-logo">
            <span className="brand-icon">🥬</span>
            <h2 className="brand-name">FreshCart</h2>
          </div>
          <p className="brand-tagline">Farm-fresh produce delivered daily to your doorstep</p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="social-link" aria-label="WhatsApp">
              <i className="bi bi-whatsapp"></i>
            </a>
          </div>
        </div>

        {/* Contact & Newsletter */}
        <div className="footer-contact">
          <h3 className="contact-title">Get in Touch</h3>
          <div className="contact-info">
            <div className="contact-item">
              <i className="bi bi-telephone-fill"></i>
              <a href="tel:9580849709" className="phone-number">9580849709</a>
            </div>
            <div className="contact-item">
              <i className="bi bi-envelope-fill"></i>
              <a href="mailto:support@freshcart.com" className="email-link">support@freshcart.com</a>
            </div>
            <div className="contact-item">
              <i className="bi bi-geo-alt-fill"></i>
              <span className="address">Deliverable across India</span>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="newsletter">
            <p className="newsletter-text">Subscribe for exclusive offers!</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn">
                {subscribed ? '✓' : '→'}
              </button>
            </form>
            {subscribed && <p className="newsletter-success">Subscribed successfully!</p>}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="footer-copyright">
            <p>&copy; {currentYear} FreshCart. All rights reserved.</p>
          </div>
          
          <div className="footer-payments">
            <span className="payments-text">We Accept:</span>
            <div className="payment-icons">
              <i className="bi bi-credit-card" title="Credit Card"></i>
              <i className="bi bi-paypal" title="PayPal"></i>
              <i className="bi bi-google-pay" title="Google Pay"></i>
              <i className="bi bi-phone" title="PhonePe"></i>
              <i className="bi bi-cash" title="Cash on Delivery"></i>
            </div>
          </div>
          
          <div className="footer-credit">
            <div className="credit-content">
              <img 
                src="/4277733f-7e0d-4209-8634-5ce3e425d7a2.jpg" 
                alt="Rohan Shukla" 
                className="designer-photo"
              />
              <p className="credit-text">
                Designed with ❤️ by <strong><a className="credit-link" href="https://www.linkedin.com/in/rohan-shukla-0b8889321" target="_blank" rel="noopener noreferrer" aria-label="Rohan Shukla LinkedIn">Rohan Shukla</a> – Software Engineer</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
