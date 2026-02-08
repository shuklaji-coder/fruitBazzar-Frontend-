import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HeroSection.css';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-gradient"></div>
      </div>

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="hero-text">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="hero-headline"
          >
            Fresh Fruits & Vegetables
            <br />
            <span className="highlight">Delivered to Your Doorstep</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="hero-subheading"
          >
            Farm fresh produce • Fast delivery • Secure online payments
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="hero-buttons"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/explore" className="btn btn-primary">
                Start Shopping
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/explore" className="btn btn-secondary">
                Browse Categories
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="hero-image-wrapper"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="hero-image"
          >
            <img
              src="/hero-produce.jpg"
              alt="Fresh produce basket"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
