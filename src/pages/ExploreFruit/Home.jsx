import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Exploremenu from '../../components/ExploreMenu/Exploremenu';
import FoodDisplay from '../../components/fruit and vegetable display/FoodDisplay';
import { useSearch } from '../../context/SearchContext';
import './Home.css';

const Home = () => {
  const { debouncedQuery } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const categories = ['all', 'Fruits', 'Vegetables', 'Daily Needs', 'Combos', 'Seasonal Picks', 'Organic', 'Root Vegetables'];

  return (
    <main className='home-container'>
      <Header />
      <Exploremenu />
      
      {/* Search and Filter Section */}
      <div className="filters-section">
        <div className="container">
          <div className="filters-wrapper">
            <div className="filter-group">
              <label htmlFor="category-filter">Category:</label>
              <select 
                id="category-filter"
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort-filter">Sort by:</label>
              <select 
                id="sort-filter"
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <FoodDisplay 
        searchQuery={debouncedQuery || ''}
        category={selectedCategory}
        sortBy={sortBy}
      />
    </main>
  );
};

export default Home;