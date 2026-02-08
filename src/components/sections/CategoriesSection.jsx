import React from 'react';
import { motion } from 'framer-motion';
import './CategoriesSection.css';

const CategoriesSection = ({ onCategorySelect }) => {
  const categories = [
    {
      id: 1,
      name: 'Fruits',
      icon: '🍎',
      color: '#ef4444',
      description: 'Fresh seasonal fruits',
    },
    {
      id: 2,
      name: 'Vegetables',
      icon: '🥬',
      color: '#10b981',
      description: 'Crisp vegetables',
    },
    {
      id: 3,
      name: 'Leafy Greens',
      icon: '🥒',
      color: '#059669',
      description: 'Organic greens',
    },
    {
      id: 4,
      name: 'Seasonal Specials',
      icon: '🌽',
      color: '#f59e0b',
      description: 'Best of the season',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    hover: {
      y: -10,
      boxShadow: '0 20px 40px rgba(16, 185, 129, 0.2)',
    },
  };

  return (
    <section className="categories-section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>Shop by Category</h2>
          <p>Explore our fresh collections</p>
        </motion.div>

        <motion.div
          className="categories-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="category-card"
              variants={cardVariants}
              whileHover="hover"
              onClick={() => onCategorySelect(category.name)}
              style={{ cursor: 'pointer' }}
            >
              <div
                className="category-icon"
                style={{ backgroundColor: `${category.color}20` }}
              >
                <span className="icon">{category.icon}</span>
              </div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <motion.div
                className="category-arrow"
                whileHover={{ x: 5 }}
              >
                →
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
