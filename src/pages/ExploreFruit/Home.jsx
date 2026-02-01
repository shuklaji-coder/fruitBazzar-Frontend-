import React, { useState } from 'react';

import Header from '../../components/Header';
import Exploremenu from '../../components/ExploreMenu/Exploremenu';
import FoodDisplay from '../../components/fruit and vegetable display/FoodDisplay';
import { useSearch } from '../../context/SearchContext';
import './Home.css';

const Home = () => {
  const { debouncedQuery } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const categories = ['all', 'Fruits', 'Vegetables', 'Daily Needs', 'Combos', 'Seasonal Picks', 'Organic', 'Root Vegetables'];

  const toggleFilters = () => {
    setFiltersExpanded(!filtersExpanded);
  };

  return (
    <main className='home-container'>
      <Header />

      <section className="trust-strip">
        <div className="trust-item">Farm to Home in 12 Hours</div>
        <div className="trust-item">Residue Tested Produce</div>
        <div className="trust-item">Fair Price to Farmers</div>
        <div className="trust-item">Cold Chain Delivery</div>
      </section>

      <Exploremenu />

      <section className="promo-grid">
        <div className="promo-card promo-card--green">
          <div>
            <p className="promo-kicker">Fresh Picks</p>
            <h3>Season’s Best Fruits</h3>
            <p>Handpicked, ripe, and ready to enjoy.</p>
          </div>
          <span className="promo-tag">Up to 20% off</span>
        </div>
        <div className="promo-card promo-card--cream">
          <div>
            <p className="promo-kicker">Healthy Staples</p>
            <h3>Daily Veggie Basket</h3>
            <p>Everything you need for daily cooking.</p>
          </div>
          <span className="promo-tag">Combo Deals</span>
        </div>
        <div className="promo-card promo-card--dark">
          <div>
            <p className="promo-kicker">Organic Line</p>
            <h3>Certified Organic</h3>
            <p>Pure & chemical-free greens.</p>
          </div>
          <span className="promo-tag">New Arrivals</span>
        </div>
      </section>
      
      {/* Search and Filter Section */}
      <div className="filters-section">
        <div className="container">
          {/* Mobile Filter Toggle */}
          <button 
            className="mobile-filter-toggle"
            onClick={toggleFilters}
            aria-expanded={filtersExpanded}
          >
            <span>🔍 Filters & Sort</span>
            <span className={`filter-arrow ${filtersExpanded ? 'active' : ''}`}>
              ▼
            </span>
          </button>

          <div className={`filters-wrapper ${filtersExpanded ? 'expanded' : ''}`}>
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

      <section className="highlight-strip">
        <div className="highlight-card">
          <h4>Farm Fresh Promise</h4>
          <p>Direct sourcing ensures freshness and fair prices.</p>
        </div>
        <div className="highlight-card">
          <h4>Same Day Dispatch</h4>
          <p>Orders packed within hours of harvest.</p>
        </div>
        <div className="highlight-card">
          <h4>Quality You Can Trust</h4>
          <p>Stringent sorting and cold-chain delivery.</p>
        </div>
      </section>
    </main>
  );
};

export default Home;