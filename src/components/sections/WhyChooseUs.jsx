import React from 'react';
import { motion } from 'framer-motion';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: '🚜',
      title: 'Farm Fresh Quality',
      description: 'Direct from farms to your table. No middlemen, maximum freshness.',
    },
    {
      id: 2,
      icon: '🚚',
      title: 'Fast Local Delivery',
      description: 'Same-day or next-day delivery in your area. Swift and reliable.',
    },
    {
      id: 3,
      icon: '💚',
      title: 'Affordable Prices',
      description: 'Competitive pricing without compromising on quality.',
    },
    {
      id: 4,
      icon: '🔒',
      title: 'Secure Payments',
      description: '100% secure transactions with Razorpay integration.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    hover: {
      x: 10,
      transition: { duration: 0.3 },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        type: 'spring',
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.15,
      rotate: 10,
    },
  };

  return (
    <section className="why-choose-us">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>Why Choose FreshKart?</h2>
          <p>Experience the difference with premium, farm-fresh produce</p>
        </motion.div>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="feature-card"
              variants={featureVariants}
              whileHover="hover"
            >
              <motion.div
                className="feature-icon"
                variants={iconVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                {feature.icon}
              </motion.div>

              <h3>{feature.title}</h3>
              <p>{feature.description}</p>

              <motion.div
                className="feature-underline"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
