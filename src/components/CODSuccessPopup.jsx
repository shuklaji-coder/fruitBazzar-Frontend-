import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CODSuccessPopup.css';

const CODSuccessPopup = ({ 
  isVisible, 
  onClose, 
  orderData = {}, 
  autoCloseDelay = 5000 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [checkmarkAnimated, setCheckmarkAnimated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      // Trigger checkmark animation after popup appears
      setTimeout(() => setCheckmarkAnimated(true), 300);
      
      // Auto close after delay
      if (autoCloseDelay > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, autoCloseDelay);
        
        return () => clearTimeout(timer);
      }
    } else {
      setCheckmarkAnimated(false);
    }
  }, [isVisible, autoCloseDelay]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => onClose(), 300);
  };

  const handleGoToOrders = () => {
    handleClose();
    // Navigate to my orders after popup closes
    setTimeout(() => {
      navigate('/my-orders');
    }, 300);
  };

  const handleContinueShopping = () => {
    handleClose();
    // Navigate to home after popup closes
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`cod-success-overlay ${isAnimating ? 'show' : ''}`}>
      <div className={`cod-success-popup ${isAnimating ? 'show' : ''}`}>
        {/* Close Button */}
        <button 
          className="popup-close-btn"
          onClick={handleClose}
          aria-label="Close popup"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        {/* Success Content */}
        <div className="popup-content">
          {/* Animated Checkmark */}
          <div className={`success-checkmark ${checkmarkAnimated ? 'animated' : ''}`}>
            <div className="checkmark-circle">
              <div className="checkmark">
                <i className="bi bi-check-lg"></i>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="success-message">
            <h2 className="success-title">Order Placed Successfully 🎉</h2>
            <p className="success-subtitle">Cash on Delivery selected</p>
            <p className="success-description">
              We will be arriving shrtly with your order. Thank you for choosing us!
            </p>
          </div>

          {/* Order Details */}
          <div className="order-details-card">
            <h3 className="details-title">Order Details</h3>
            
            <div className="detail-item">
              <span className="detail-label">Order ID</span>
              <span className="detail-value">
                #{orderData.orderId || 'ORD' + Date.now()}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Amount Payable</span>
              <span className="detail-value amount">
                ₹{orderData.totalAmount || '0'}
              </span>
            </div>

            {orderData.subtotal && (
              <div className="detail-item">
                <span className="detail-label">Subtotal</span>
                <span className="detail-value">
                  ₹{orderData.subtotal}
                </span>
              </div>
            )}

            {orderData.shippingFee !== undefined && (
              <div className="detail-item">
                <span className="detail-label">Shipping Fee</span>
                <span className="detail-value">
                  ₹{orderData.shippingFee}
                </span>
              </div>
            )}

            <div className="detail-item">
              <span className="detail-label">Payment Method</span>
              <span className="detail-value payment-method">
                <i className="bi bi-cash-stack"></i>
                Cash on Delivery
              </span>
            </div>

            <div className="delivery-info">
              <div className="delivery-icon">
                <i className="bi bi-truck"></i>
              </div>
              <div className="delivery-text">
                <strong>Estimated Delivery:</strong>
                <span>20-25 minutes</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="popup-actions">
            <button 
              className="btn-primary"
              onClick={handleGoToOrders}
            >
              <i className="bi bi-receipt"></i>
              Go to My Orders
            </button>
            
            <button 
              className="btn-outline"
              onClick={handleContinueShopping}
            >
              <i className="bi bi-basket"></i>
              Continue Shopping
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="progress-indicator">
            <div className="progress-dot active"></div>
            <div className="progress-line"></div>
            <div className="progress-dot"></div>
            <div className="progress-line"></div>
            <div className="progress-dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CODSuccessPopup;
