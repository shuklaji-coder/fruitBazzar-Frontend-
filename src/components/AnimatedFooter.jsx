import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedFooter.css';

const AnimatedFooter = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const linkVariants = {
    hover: {
      x: 5,
      color: '#10b981',
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.footer
      className="animated-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="footer-container">
        <motion.div
          className="footer-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div className="footer-section" variants={itemVariants}>
            <h3>FreshKart</h3>
            <p>Delivering farm-fresh fruits and vegetables to your doorstep with care and quality.</p>
            <div className="app-coming-soon">
              <p>📱 Mobile app coming soon on Play Store</p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="footer-section" variants={itemVariants}>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {['Home', 'Shop', 'Categories', 'My Orders'].map((link) => (
                <li key={link}>
                  <motion.a href="#" variants={linkVariants} whileHover="hover">
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Care */}
          <motion.div className="footer-section" variants={itemVariants}>
            <h4>Customer Care</h4>
            <ul className="footer-links">
              {['Contact Us', 'FAQs', 'Track Order', 'Returns'].map((link) => (
                <li key={link}>
                  <motion.a href="#" variants={linkVariants} whileHover="hover">
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div className="footer-section" variants={itemVariants}>
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p>📞 +91 1800-FRESH-01</p>
              <p>📧 support@freshkart.com</p>
              <p>📍 Across India</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="footer-social"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
            <motion.a
              key={social}
              href="#"
              className="social-link"
              whileHover={{ scale: 1.2, color: '#10b981' }}
              whileTap={{ scale: 0.9 }}
            >
              {social.charAt(0)}
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="footer-copyright"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2024 FreshKart. All rights reserved.</p>
          <div className="footer-links-bottom">
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Terms of Service</a>
            <span>•</span>
            <a href="#">Cookie Policy</a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default AnimatedFooter;
