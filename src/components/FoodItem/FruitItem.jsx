import React, { useMemo, useContext, useState, useRef } from "react";
import "./FruitItem.css";
import { StoreContext } from "../../context/StoreContext";

const FruitItem = ({ 
  name, 
  description, 
  id, 
  imageUrl, 
  price, 
  pricePerKg, 
  isSeasonal, 
  isBestseller, 
  isOrganic,
  discount,
  rating,
  popularity,
  index
}) => {
  const img = imageUrl || "/FRUITS.jpg";
  const { addToCart, cartItems } = useContext(StoreContext);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const cardRef = useRef(null);

  const displayPrice = price ?? pricePerKg ?? null;
  const perKg = pricePerKg != null;
  
  // Check if item is in cart (cartItems is an object with item IDs as keys)
  const isInCart = cartItems && typeof cartItems === 'object' ? cartItems[id] > 0 : false;
  
  // Enhanced rating with provided rating or random
  const itemRating = rating || useMemo(() => {
    return (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
  }, []);

  const fullStars = Math.floor(itemRating);
  const hasHalfStar = itemRating - fullStars >= 0.5;
  
  // Calculate discount price
  const originalPrice = discount && displayPrice ? Math.round(displayPrice * (1 + discount / 100)) : null;
  const savedAmount = originalPrice && displayPrice ? originalPrice - displayPrice : null;

  // Enhanced add to cart with quantity
  const handleAddToCart = (e, qty = 1) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Add to cart clicked', { id, qty, addToCart, isAdding });
    
    if (addToCart && !isAdding) {
      setIsAdding(true);
      
      // Add to cart with quantity
      for (let i = 0; i < qty; i++) {
        console.log(`Adding item ${id} to cart (${i + 1}/${qty})`);
        addToCart(id);
      }
      
      // Show added feedback
      setTimeout(() => {
        setAdded(true);
      }, 300);
      
      // Reset animation
      setTimeout(() => {
        setIsAdding(false);
        setAdded(false);
      }, 3000);
    } else {
      console.log('Cannot add to cart', { addToCart: !!addToCart, isAdding });
    }
  };

  // Quick view handler
  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickView(true);
  };

  // Toggle favorite
  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  // Image load handlers
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Get stock status (simulated)
  const stockStatus = useMemo(() => {
    const stock = Math.floor(Math.random() * 100) + 1;
    if (stock <= 5) return { status: 'low', text: 'Only 5 left', color: '#ef4444' };
    if (stock <= 20) return { status: 'medium', text: 'In Stock', color: '#f59e0b' };
    return { status: 'high', text: 'In Stock', color: '#10b981' };
  }, []);

  // Get weight options (simulated)
  const weightOptions = useMemo(() => {
    if (perKg) {
      return [
        { label: '250g', price: Math.round(displayPrice * 0.25) },
        { label: '500g', price: Math.round(displayPrice * 0.5) },
        { label: '1kg', price: displayPrice },
        { label: '2kg', price: Math.round(displayPrice * 1.8) }
      ];
    }
    return [];
  }, [displayPrice, perKg]);

  return (
    <>
      <div 
        className={`col-12 col-sm-6 col-md-4 col-lg-3 mb-4 fruit-item-container`}
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`fruit-card ${isAdding ? 'adding' : ''} ${added ? 'added' : ''} ${isHovered ? 'hovered' : ''} ${isInCart ? 'in-cart' : ''}`}>
          
          {/* PREMIUM BADGES */}
          <div className="fruit-badges">
            {isSeasonal && <span className="badge badge-seasonal">Seasonal</span>}
            {discount && <span className="badge badge-discount">-{discount}%</span>}
          </div>

          {/* FAVORITE BUTTON */}
          <button 
            className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
            onClick={toggleFavorite}
            title="Add to Favorites"
          >
            <i className={`bi ${isFavorited ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </button>

          {/* IMAGE CONTAINER */}
          <div className="fruit-image-wrapper">
            {!imageLoaded && !imageError && (
              <div className="image-skeleton">
                <div className="skeleton-shimmer"></div>
              </div>
            )}
            
            <img 
              src={imageError ? "/FRUITS.jpg" : img} 
              alt={name} 
              className={`fruit-image ${imageLoaded ? 'loaded' : ''}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            
            {/* QUICK ACTIONS */}
            <div className={`quick-actions ${isHovered ? 'visible' : ''}`}>
              <button 
                className="quick-view-btn"
                onClick={handleQuickView}
                title="Quick View"
              >
                <i className="bi bi-eye"></i>
              </button>
              <button 
                className="quick-add-btn"
                onClick={(e) => handleAddToCart(e, 1)}
                title="Quick Add"
              >
                <i className="bi bi-cart-plus"></i>
              </button>
            </div>

            {/* STOCK STATUS */}
            <div className="stock-status">
              <span className="stock-indicator" style={{ backgroundColor: stockStatus.color }}></span>
              <span className="stock-text">{stockStatus.text}</span>
            </div>

            {/* Flying Cart Icon */}
            {isAdding && (
              <div className="flying-cart">
                <i className="bi bi-cart-plus"></i>
              </div>
            )}
          </div>

          {/* BODY */}
          <div className="fruit-body">
            <div className="fruit-header">
              <h5 className="fruit-title">{name}</h5>
              <div className="fruit-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => {
                    if (i < fullStars)
                      return <i key={i} className="bi bi-star-fill"></i>;
                    if (i === fullStars && hasHalfStar)
                      return <i key={i} className="bi bi-star-half"></i>;
                    return <i key={i} className="bi bi-star"></i>;
                  })}
                </div>
                <span className="rating-value">({itemRating})</span>
              </div>
            </div>
            
            <p className="fruit-description">{description}</p>

            {/* WEIGHT OPTIONS */}
            {false && weightOptions.length > 0 && (
              <div className="weight-options">
                {weightOptions.slice(0, 3).map((option, idx) => (
                  <button 
                    key={idx}
                    className="weight-btn"
                    onClick={(e) => handleAddToCart(e, 1)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {/* PRICE SECTION */}
            <div className="fruit-price-section">
              <div className="price-container">
                {originalPrice && (
                  <span className="fruit-price-old">₹{originalPrice}</span>
                )}
                <span className="fruit-price">
                  {displayPrice ? `₹${displayPrice}${perKg ? " / kg" : ""}` : ""}
                </span>
                {savedAmount && (
                  <span className="saved-amount">Save ₹{savedAmount}</span>
                )}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="fruit-footer">
            <button 
              className={`btn-add-cart ${added ? 'added' : ''} ${isInCart ? 'in-cart' : ''}`}
              onClick={(e) => {
                handleAddToCart(e, 1);
              }}
              disabled={isAdding}
            >
              <i className={`bi ${added ? 'bi-check-lg' : isInCart ? 'bi-cart-check' : 'bi-cart-plus'}`}></i>
              {added ? 'Added ✓' : isInCart ? 'In Cart' : 'Add to Cart'}
            </button>
          </div>

          {/* HOVER OVERLAY */}
          {isHovered && (
            <div className="hover-overlay">
              <div className="overlay-content">
                <span className="quick-add-text">Quick Add to Cart</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      {quickView && (
        <div className="quick-view-modal" onClick={() => setQuickView(false)}>
          <div className="quick-view-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setQuickView(false)}>
              <i className="bi bi-x"></i>
            </button>
            
            <div className="quick-view-body">
              <div className="quick-view-image">
                <img src={imageError ? "/FRUITS.jpg" : img} alt={name} />
              </div>
              
              <div className="quick-view-details">
                <h3>{name}</h3>
                <div className="quick-view-rating">
                  {[...Array(5)].map((_, i) => {
                    if (i < fullStars)
                      return <i key={i} className="bi bi-star-fill"></i>;
                    if (i === fullStars && hasHalfStar)
                      return <i key={i} className="bi bi-star-half"></i>;
                    return <i key={i} className="bi bi-star"></i>;
                  })}
                  <span>({itemRating})</span>
                </div>
                
                <p>{description}</p>
                
                <div className="quick-view-price">
                  {originalPrice && (
                    <span className="old-price">₹{originalPrice}</span>
                  )}
                  <span className="current-price">₹{displayPrice}{perKg ? " / kg" : ""}</span>
                  {savedAmount && (
                    <span className="saved">You save ₹{savedAmount}</span>
                  )}
                </div>
                
                <div className="quick-view-actions">
                  <div className="quantity-selector">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      <i className="bi bi-dash"></i>
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                  
                  <button 
                    className="add-to-cart-btn-large"
                    onClick={(e) => {
                      handleAddToCart(e, quantity);
                      setQuickView(false);
                    }}
                  >
                    <i className="bi bi-cart-plus"></i>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FruitItem;



