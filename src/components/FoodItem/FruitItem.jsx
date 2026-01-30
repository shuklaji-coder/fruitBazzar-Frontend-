import React, { useMemo, useContext, useState } from "react";
import "./FruitItem.css";
import { StoreContext } from "../../context/StoreContext";

const FruitItem = ({ name, description, id, imageUrl, price, pricePerKg, isSeasonal, isBestseller, discount }) => {
  const img = imageUrl || "/FRUITS.jpg";
  const { addToCart } = useContext(StoreContext);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const displayPrice = price ?? pricePerKg ?? null;
  const perKg = pricePerKg != null;

  // ⭐ Rating always between 4.0 – 5.0
  const rating = useMemo(() => {
    return (Math.random() * (5 - 4) + 4).toFixed(1);
  }, []);

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (addToCart && !isAdding) {
      setIsAdding(true);
      
      // Add to cart immediately
      addToCart(id);
      
      // Show added feedback after a short delay
      setTimeout(() => {
        setAdded(true);
      }, 300);
      
      // Reset animation after longer duration
      setTimeout(() => {
        setIsAdding(false);
        setAdded(false);
      }, 3000);
    }
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className={`fruit-card ${isAdding ? 'adding' : ''} ${added ? 'added' : ''}`}>
        {/* BADGES */}
        <div className="fruit-badges">
          {isSeasonal && <span className="badge-seasonal">🌿 Seasonal</span>}
          {isBestseller && <span className="badge-bestseller">⭐ Bestseller</span>}
          {discount && <span className="badge-discount">{discount}% OFF</span>}
        </div>

        {/* IMAGE */}
        <div className="fruit-image-wrapper">
          <img src={img} alt={name} className="fruit-image" />
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            title="Add to Cart"
          >
            <i className="bi bi-cart-plus"></i>
          </button>
          {/* Flying Cart Icon */}
          {isAdding && (
            <div className="flying-cart">
              <i className="bi bi-cart-plus"></i>
            </div>
          )}
        </div>

        {/* BODY */}
        <div className="fruit-body">
          <h5 className="fruit-title">{name}</h5>
          <p className="fruit-description">{description}</p>

          <div className="fruit-price-rating">
            <div className="price-container">
              {discount && displayPrice && (
                <span className="fruit-price-old">
                  ₹{Math.round(displayPrice * (1 + discount / 100))}
                </span>
              )}
              <span className="fruit-price">
                {displayPrice ? `₹${displayPrice}${perKg ? " / kg" : ""}` : ""}
              </span>
            </div>

            {/* ⭐ RATING */}
            <div className="fruit-rating">
              {[...Array(5)].map((_, i) => {
                if (i < fullStars)
                  return <i key={i} className="bi bi-star-fill"></i>;
                if (i === fullStars && hasHalfStar)
                  return <i key={i} className="bi bi-star-half"></i>;
                return <i key={i} className="bi bi-star"></i>;
              })}
              <small>({rating})</small>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="fruit-footer">
          <button 
            className={`btn-add-cart ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            <i className={`bi ${added ? 'bi-check-lg' : 'bi-cart-plus'}`}></i>
            {added ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default FruitItem;



