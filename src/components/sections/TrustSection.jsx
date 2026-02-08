import React from 'react';
import { motion } from 'framer-motion';
import './TrustSection.css';

const TrustSection = () => {
  const trustPoints = [
    { icon: '🔐', text: '100% Secure Payments' },
    { icon: '✓', text: 'Quality Assured' },
    { icon: '🚚', text: 'Fast Delivery' },
    { icon: '💰', text: 'Best Prices' },
  ];

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="trust-section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="trust-header"
        >
          <h2>Trusted by Thousands</h2>
          <p>Safe, secure, and reliable shopping experience</p>
        </motion.div>

        <motion.div
          className="trust-badges"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              className="trust-badge"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
            >
              <span className="badge-icon">{point.icon}</span>
              <span className="badge-text">{point.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="razorpay-mention"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>Payments powered by <strong>Razorpay</strong></p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
