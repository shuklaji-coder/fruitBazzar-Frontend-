import React, { useContext, useMemo, useState, useEffect, useRef } from "react";
import { StoreContext } from "../../context/StoreContext";
import FruitItem from "../FoodItem/FruitItem";
import "./FoodDisplay.css";

const FoodDisplay = ({ searchQuery = '', category = 'all', sortBy = 'default' }) => {
  const { fruits: FruitList = [], addToCart, cartItems } = useContext(StoreContext) || {};
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(12);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilters, setSelectedFilters] = useState({
    organic: false,
    seasonal: false,
    bestseller: false,
    discount: false,
    inStock: true
  });
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());
  const [compareList, setCompareList] = useState(new Set());
  const [sortByOption, setSortByOption] = useState(sortBy);
  const [showCompareBar, setShowCompareBar] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const scrollContainerRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const sliderIntervalRef = useRef(null);
  const [isSliderPaused, setIsSliderPaused] = useState(false);
  const fruitSliderRef = useRef(null);
  const fruitSliderIntervalRef = useRef(null);
  const [isFruitSliderPaused, setIsFruitSliderPaused] = useState(false);
  const [fruitSliderIndex, setFruitSliderIndex] = useState(0);

  // Add to cart handler for featured items
  const handleAddToCart = (e, fruitId) => {
    e.preventDefault();
    e.stopPropagation();
    if (addToCart) {
      addToCart(fruitId);
    }
  };

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [searchQuery, category, sortBy]);

  // Generate search suggestions
  useEffect(() => {
    if (searchQuery && searchQuery.length > 1) {
      const suggestions = FruitList
        .filter(fruit => 
          fruit.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fruit.category?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
        .map(fruit => fruit.name);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, FruitList]);

  // Enhanced filter and sort products
  const filteredAndSortedFruits = useMemo(() => {
    let filtered = [...FruitList];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(fruit =>
        fruit.name?.toLowerCase().includes(query) ||
        fruit.description?.toLowerCase().includes(query) ||
        fruit.category?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (category !== 'all') {
      filtered = filtered.filter(fruit =>
        fruit.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // Advanced filters
    if (selectedFilters.organic) {
      filtered = filtered.filter(fruit => 
        fruit.category?.toLowerCase().includes('organic') || 
        Math.random() > 0.7
      );
    }

    if (selectedFilters.seasonal) {
      filtered = filtered.filter(fruit => 
        fruit.category?.toLowerCase().includes('seasonal') || 
        Math.random() > 0.8
      );
    }

    if (selectedFilters.bestseller) {
      filtered = filtered.filter(fruit => 
        Math.random() > 0.6
      );
    }

    if (selectedFilters.discount) {
      filtered = filtered.filter(fruit => 
        Math.random() > 0.5
      );
    }

    // Price range filter
    filtered = filtered.filter(fruit => {
      const price = fruit.pricePerKg || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Enhanced sort
    switch (sortByOption) {
      case 'price-low':
        filtered.sort((a, b) => (a.pricePerKg || 0) - (b.pricePerKg || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.pricePerKg || 0) - (a.pricePerKg || 0));
        break;
      case 'name':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [FruitList, searchQuery, category, sortByOption, selectedFilters, priceRange]);

  // Enhanced helper function with more flags
  const getItemFlags = (fruit, index) => {
    const isSeasonal = selectedFilters.seasonal || index % 5 === 0 || fruit.category?.toLowerCase().includes('seasonal');
    const isBestseller = selectedFilters.bestseller || index % 7 === 0 || index < 3;
    const isOrganic = selectedFilters.organic || index % 6 === 0 || fruit.category?.toLowerCase().includes('organic');
    const discount = selectedFilters.discount || (index % 4 === 0 ? Math.floor(Math.random() * 30) + 5 : null);
    const rating = (Math.random() * 2 + 3).toFixed(1);
    const popularity = Math.floor(Math.random() * 100) + 20;
    const isNew = index % 8 === 0;
    const isTrending = popularity > 80;
    const inStock = Math.random() > 0.1;
    
    return { 
      isSeasonal, 
      isBestseller, 
      isOrganic, 
      discount, 
      rating, 
      popularity, 
      isNew, 
      isTrending, 
      inStock 
    };
  };

  // Wishlist handlers
  const toggleWishlist = (itemId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(itemId)) {
        newWishlist.delete(itemId);
      } else {
        newWishlist.add(itemId);
      }
      return newWishlist;
    });
  };

  // Compare handlers
  const toggleCompare = (itemId) => {
    setCompareList(prev => {
      const newCompareList = new Set(prev);
      if (newCompareList.has(itemId)) {
        newCompareList.delete(itemId);
      } else {
        if (newCompareList.size < 4) {
          newCompareList.add(itemId);
        }
      }
      return newCompareList;
    });
  };

  // Filter handlers
  const handleFilterChange = (filterName) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      organic: false,
      seasonal: false,
      bestseller: false,
      discount: false,
      inStock: true
    });
    setPriceRange([0, 1000]);
    setSortByOption('default');
  };

  // Load more functionality
  const handleLoadMore = () => {
    setVisibleItems(prev => prev + 8);
  };

  // Update showLoadMore based on filtered items
  useEffect(() => {
    setShowLoadMore(filteredAndSortedFruits.length > visibleItems);
  }, [filteredAndSortedFruits.length, visibleItems]);

  // Update showCompareBar
  useEffect(() => {
    setShowCompareBar(compareList.size > 0);
  }, [compareList]);

  // Reset visible items when filters change
  useEffect(() => {
    setVisibleItems(12);
  }, [searchQuery, category, sortByOption, selectedFilters, priceRange]);

  // Display items
  const displayItems = filteredAndSortedFruits.slice(0, visibleItems);
  const sliderItems = filteredAndSortedFruits.slice(0, Math.min(10, filteredAndSortedFruits.length));

  useEffect(() => {
    if (!sliderItems.length || !sliderContainerRef.current) return;
    const container = sliderContainerRef.current;
    const scrollStep = 260;

    const startAutoScroll = () => {
      if (sliderIntervalRef.current) return;
      sliderIntervalRef.current = setInterval(() => {
        if (!container || isSliderPaused) return;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const nextScroll = container.scrollLeft + scrollStep;
        if (nextScroll >= maxScroll - 4) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollStep, behavior: 'smooth' });
        }
      }, 2500);
    };

    const stopAutoScroll = () => {
      if (sliderIntervalRef.current) {
        clearInterval(sliderIntervalRef.current);
        sliderIntervalRef.current = null;
      }
    };

    startAutoScroll();
    return () => stopAutoScroll();
  }, [sliderItems.length, isSliderPaused]);

  const handleSliderScroll = (direction) => {
    if (!sliderContainerRef.current) return;
    const scrollStep = 260;
    sliderContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollStep : scrollStep,
      behavior: 'smooth'
    });
  };

  // FruitItem horizontal slider auto-scroll
  useEffect(() => {
    if (!displayItems.length || !fruitSliderRef.current) return;
    const container = fruitSliderRef.current;
    const scrollStep = 260;

    const startAutoScroll = () => {
      if (fruitSliderIntervalRef.current) return;
      fruitSliderIntervalRef.current = setInterval(() => {
        if (!container || isFruitSliderPaused) return;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const nextScroll = container.scrollLeft + scrollStep;
        if (nextScroll >= maxScroll - 4) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollStep, behavior: 'smooth' });
        }
      }, 2500);
    };

    const stopAutoScroll = () => {
      if (fruitSliderIntervalRef.current) {
        clearInterval(fruitSliderIntervalRef.current);
        fruitSliderIntervalRef.current = null;
      }
    };

    startAutoScroll();
    return () => stopAutoScroll();
  }, [displayItems.length, isFruitSliderPaused]);

  const handleFruitSliderScroll = (direction) => {
    if (!fruitSliderRef.current) return;
    const scrollStep = 260;
    fruitSliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollStep : scrollStep,
      behavior: 'smooth'
    });
  };

  // Enhanced loading skeleton
  const renderSkeleton = () => (
    <div className="products-loading">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="skeleton-item">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-description"></div>
            <div className="skeleton-price"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Enhanced stats
  const stats = {
    total: filteredAndSortedFruits.length,
    visible: displayItems.length,
    inStock: filteredAndSortedFruits.filter(f => getItemFlags(f, 0).inStock).length,
    onSale: filteredAndSortedFruits.filter(f => getItemFlags(f, 0).discount).length,
    organic: filteredAndSortedFruits.filter(f => getItemFlags(f, 0).isOrganic).length,
    wishlist: wishlist.size
  };

  return (
    <div className="food-display-enhanced">
      {/* Enhanced Header */}
      <div className="display-header">
        <div className="header-content">
          <h1 className="page-title">Fresh Fruits & Vegetables</h1>
          <p className="page-subtitle">Discover our premium collection of fresh produce</p>
        </div>
        
        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Products</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.inStock}</span>
            <span className="stat-label">In Stock</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.onSale}</span>
            <span className="stat-label">On Sale</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.organic}</span>
            <span className="stat-label">Organic</span>
          </div>
        </div>
      </div>

      {/* Enhanced Controls */}
      <div className="display-controls">
        <div className="controls-left">
          {/* Search with Suggestions */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => {
                // Handle search change
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="search-suggestions">
                {searchSuggestions.map((suggestion, index) => (
                  <div key={index} className="suggestion-item">
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Advanced Filters Toggle */}
          <button 
            className={`filters-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className="bi bi-funnel"></i>
            Filters
            {Object.values(selectedFilters).some(v => v) && (
              <span className="filter-count"></span>
            )}
          </button>
        </div>

        <div className="controls-right">
          {/* Sort Options */}
          <select 
            className="sort-select"
            value={sortByOption}
            onChange={(e) => setSortByOption(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="discount">Best Discount</option>
          </select>

          {/* View Mode Toggle */}
          <div className="view-mode-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <i className="bi bi-grid-3x3-gap"></i>
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <i className="bi bi-list"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="advanced-filters">
          <div className="filters-section">
            <h3>Product Type</h3>
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFilters.organic}
                  onChange={() => handleFilterChange('organic')}
                />
                <span>Organic</span>
              </label>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFilters.seasonal}
                  onChange={() => handleFilterChange('seasonal')}
                />
                <span>Seasonal</span>
              </label>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFilters.bestseller}
                  onChange={() => handleFilterChange('bestseller')}
                />
                <span>Bestseller</span>
              </label>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFilters.discount}
                  onChange={() => handleFilterChange('discount')}
                />
                <span>On Sale</span>
              </label>
            </div>
          </div>

          <div className="filters-section">
            <h3>Price Range</h3>
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="price-slider"
              />
              <div className="price-labels">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>

          <button className="clear-filters-btn" onClick={clearAllFilters}>
            Clear All Filters
          </button>
        </div>
      )}

      {/* Compare Bar */}
      {showCompareBar && (
        <div className="compare-bar">
          <div className="compare-content">
            <span>{compareList.size} items selected for comparison</span>
            <button className="compare-btn">Compare</button>
            <button className="clear-compare-btn" onClick={() => setCompareList(new Set())}>
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Products Display */}
      <div className="products-container" ref={scrollContainerRef}>
        {isLoading ? (
          renderSkeleton()
        ) : displayItems.length > 0 ? (
          <>
            {sliderItems.length > 0 && (
              <div className="kk-slider-section" aria-label="Featured products slider">
                <div className="kk-slider-header">
                  <h3>Featured Picks</h3>
                  <div className="kk-slider-controls">
                    <button
                      className="kk-slider-btn"
                      onClick={() => handleSliderScroll('left')}
                      aria-label="Scroll left"
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <button
                      className="kk-slider-btn"
                      onClick={() => handleSliderScroll('right')}
                      aria-label="Scroll right"
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </div>
                <div
                  className="kk-slider-track"
                  ref={sliderContainerRef}
                  onMouseEnter={() => setIsSliderPaused(true)}
                  onMouseLeave={() => setIsSliderPaused(false)}
                >
                  {sliderItems.map((fruit, index) => (
                    <div className="kk-slider-card" key={`${fruit.id || index}-slider-${index}`}>
                      <div className="kk-slider-image">
                        <img src={fruit.imageUrl || "/FRUITS.jpg"} alt={fruit.name} />
                      </div>
                      <span className="kk-slider-category">
                        {fruit.category || (index % 2 === 0 ? 'Dairy Fresh' : 'Kisan Special')}
                      </span>
                      <h4 className="kk-slider-title">{fruit.name}</h4>
                      <p className="kk-slider-description">
                        {fruit.description || `Premium quality ${fruit.name} carefully selected for the best taste and nutrition.`}
                      </p>
                      <div className="kk-slider-footer">
                        <span className="kk-slider-price">₹{fruit.pricePerKg || fruit.price || 0}/kg</span>
                        <button 
                          className={`kk-slider-cart ${cartItems && cartItems[fruit.id] ? 'in-cart' : ''}`}
                          type="button"
                          onClick={(e) => handleAddToCart(e, fruit.id)}
                          title={cartItems && cartItems[fruit.id] ? 'In Cart' : 'Add to Cart'}
                        >
                          <i className={`bi ${cartItems && cartItems[fruit.id] ? 'bi-cart-check' : 'bi-cart-plus'}`}></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="fruit-horizontal-slider" onMouseEnter={() => setIsFruitSliderPaused(true)} onMouseLeave={() => setIsFruitSliderPaused(false)}>
              <div className="fruit-slider-header">
                <h3>All Products</h3>
                <div className="fruit-slider-controls">
                  <button
                    className="fruit-slider-btn"
                    onClick={() => handleFruitSliderScroll('left')}
                    aria-label="Scroll left"
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  <button
                    className="fruit-slider-btn"
                    onClick={() => handleFruitSliderScroll('right')}
                    aria-label="Scroll right"
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>
              <div className="fruit-slider-track" ref={fruitSliderRef}>
                {displayItems.map((fruit, index) => {
                  const flags = getItemFlags(fruit, index);
                  return (
                    <div className="kk-slider-card" key={`${fruit.id || index}-fruit-slider-${index}`}>
                      <div className="kk-slider-image">
                        <img src={fruit.imageUrl || "/FRUITS.jpg"} alt={fruit.name} />
                      </div>
                      <span className="kk-slider-category">
                        {fruit.category || (index % 2 === 0 ? 'Fresh Produce' : 'Daily Essentials')}
                      </span>
                      <h4 className="kk-slider-title">{fruit.name}</h4>
                      <p className="kk-slider-description">
                        {fruit.description || `Fresh and premium quality ${fruit.name} sourced directly from farms. Perfect for daily consumption.`}
                      </p>
                      <div className="kk-slider-footer">
                        <span className="kk-slider-price">₹{fruit.pricePerKg || fruit.price || 0}/kg</span>
                        <button 
                          className={`kk-slider-cart ${cartItems && cartItems[fruit.id] ? 'in-cart' : ''}`}
                          type="button"
                          onClick={(e) => handleAddToCart(e, fruit.id)}
                          title={cartItems && cartItems[fruit.id] ? 'In Cart' : 'Add to Cart'}
                        >
                          <i className={`bi ${cartItems && cartItems[fruit.id] ? 'bi-cart-check' : 'bi-cart-plus'}`}></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Load More */}
            {showLoadMore && (
              <div className="load-more-container">
                <button className="load-more-btn" onClick={handleLoadMore}>
                  Load More Products
                  <i className="bi bi-arrow-down"></i>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-products">
            <div className="no-products-icon">🍎</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <div className="no-products-actions">
              <button className="clear-filters-btn" onClick={clearAllFilters}>
                Clear All Filters
              </button>
              <button className="browse-all-btn">
                Browse All Products
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Back to Top */}
      {visibleItems > 12 && (
        <button 
          className="back-to-top-btn"
          onClick={() => scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <i className="bi bi-arrow-up"></i>
        </button>
      )}
    </div>
  );
};

export default FoodDisplay;
