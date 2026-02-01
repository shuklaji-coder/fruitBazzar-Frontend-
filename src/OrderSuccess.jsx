import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleViewOrders = () => {
    navigate("/my-orders");
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className="order-success-container">
      <div className="order-success-card">
        {/* Success Icon */}
        <div className="success-icon">
          <div className="icon-circle">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <path 
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                stroke="#22c55e" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="success-message">
          <h1>Order Placed Successfully! 🎉</h1>
          <p>Thank you for your order. Your fresh fruits and vegetables will be delivered soon.</p>
        </div>

        {/* Order Details */}
        <div className="order-details">
          <div className="detail-item">
            <span className="label">Order ID:</span>
            <span className="value">#ORD{Math.floor(Math.random() * 100000)}</span>
          </div>
          <div className="detail-item">
            <span className="label">Estimated Delivery:</span>
            <span className="value">Arriving shortly</span>
          </div>
          <div className="detail-item">
            <span className="label">Payment Method:</span>
            <span className="value">Cash on Delivery</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="btn btn-outline" onClick={handleViewOrders}>
            View My Orders
          </button>
          <button className="btn btn-primary" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>

        {/* Additional Info */}
        <div className="additional-info">
          <h3>What's Next?</h3>
          <ul>
            <li>You'll receive an order confirmation via email</li>
            <li>Our delivery partner will contact you before delivery</li>
            <li>You can track your order status in "My Orders" section</li>
            <li>Payment will be collected at the time of delivery</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
