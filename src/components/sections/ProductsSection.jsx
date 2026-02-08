import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { StoreContext } from '../../context/StoreContext';
import './ProductsSection.css';

const ProductsSection = ({ products = [], title = 'Products', subtitle = '' }) => {
  const { addToCart } = useContext(StoreContext);
  const [hoveredId, setHoveredId] = useState(null);

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    hover: {
      y: -8,
      boxShadow: '0 20px 40px rgba(16, 185, 129, 0.15)',
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
    },
  };

  return (
    <section className="products-section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </motion.div>

        <motion.div
          className="products-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="product-card"
              variants={cardVariants}
              whileHover="hover"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="product-image-wrapper">
                <motion.img
                  src={product.imageUrl || '/FRUITS.jpg'}
                  alt={product.name}
                  className="product-image"
                  variants={imageVariants}
                />
                {product.discount && (
                  <motion.div
                    className="discount-badge"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    -{product.discount}%
                  </motion.div>
                )}
              </div>

              <div className="product-info">
                <h4 className="product-name">{product.name}</h4>
                
                <div className="product-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating">(4.8)</span>
                </div>

                <div className="product-pricing">
                  <span className="price">₹{product.pricePerKg}</span>
                  {product.originalPrice && (
                    <span className="original-price">₹{product.originalPrice}</span>
                  )}
                </div>

                <motion.button
                  className="add-to-cart-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(product.id)}
                >
                  {hoveredId === product.id ? 'Add to Cart' : 'Quick Add'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
