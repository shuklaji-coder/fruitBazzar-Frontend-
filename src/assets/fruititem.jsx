import React from "react";
import "./fruititem.css";


const FruitItem = ({ name, description, id, imageUrl, price }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
      
      <div className="card product-card">
        
        {/* Image */}
        <img
          src={imageUrl}
          className="card-img-top product-image"
          alt={name}
        />

        {/* Body */}
        <div className="card-body product-card-body">
          <h5 className="card-title">{name}</h5>

          {/* Truncated description */}
          <p className="card-text product-description">
            {description}
          </p>

          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="h5 mb-0">₹{pricePerKg}</span>

            <div className="rating">
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-half text-warning"></i>
              <small className="text-muted ms-1">(4.5)</small>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="card-footer product-card-footer">
          <button className="btn btn-primary btn-sm">
            Add to Cart
          </button>

          <button className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-heart"></i>
          </button>
        </div>

      </div>
    </div>
  );
};

export default FruitItem;
