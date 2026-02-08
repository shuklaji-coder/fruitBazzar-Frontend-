import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StoreContext } from '../../context/StoreContext';
import AnimatedNavbar from '../../components/AnimatedNavbar';
import HeroSection from '../../components/sections/HeroSection';
import CategoriesSection from '../../components/sections/CategoriesSection';
import ProductsSection from '../../components/sections/ProductsSection';
import WhyChooseUs from '../../components/sections/WhyChooseUs';
import TrustSection from '../../components/sections/TrustSection';
import AnimatedFooter from '../../components/AnimatedFooter';
import './AnimatedHome.css';

const AnimatedHome = () => {
  const { fruits } = useContext(StoreContext);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get popular products (top 8)
  const popularProducts = fruits?.slice(0, 8) || [];

  return (
    <motion.div
      className="animated-home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatedNavbar />

      <HeroSection />

      <CategoriesSection onCategorySelect={setSelectedCategory} />

      <ProductsSection 
        products={popularProducts}
        title="Popular Products"
        subtitle="Fresh, hand-picked selections trending now"
      />

      <WhyChooseUs />

      <TrustSection />

      <AnimatedFooter />
    </motion.div>
  );
};

export default AnimatedHome;
