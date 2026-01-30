import React, { useEffect, useRef } from 'react';
import './Footer.css';

const Footer = () => {
  const footerRef = useRef(null);

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

  return (
    <footer className="modern-footer" role="contentinfo" ref={footerRef}>
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <h2 className="brand-name">Fresh Fruits &amp; Vegetables</h2>
          <p className="brand-tagline">Farm-fresh produce delivered daily to your doorstep</p>
        </div>

        {/* Help Section */}
        <div className="footer-help">
          <h3 className="help-title">Help</h3>
          <a className="phone-button" href="tel:9580849709" aria-label="Call support">
            <span className="phone-icon">📞</span>
            <span className="phone-number">9580849709</span>
          </a>
          <div className="support-meta">Customer Support (9 AM – 9 PM)</div>
        </div>

        {/* Divider */}
        <div className="footer-divider" aria-hidden="true"></div>

        {/* Footer Credit */}
        <div className="footer-credit">
          <p className="credit-text">Designed by <a className="credit-link" href="https://www.linkedin.com/in/rohan-shukla-0b8889321" target="_blank" rel="noopener noreferrer" aria-label="Rohan Shukla LinkedIn">Rohan Shukla</a> – Software Engineer</p>
        </div>
      </div>  
    </footer>
  );
};

export default Footer;
