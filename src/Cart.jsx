import React, { useContext } from "react";
import { StoreContext } from "./context/StoreContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();

  const {
    fruits = [],
    cartItems = {},
    addToCart,
    removeFromCart,
    deleteFromCart,
    getCartAmount,
  } = useContext(StoreContext);


  // 💰 CALCULATIONS
  const subtotal = getCartAmount();
  const shippingFee = subtotal >= 199 ? 0 : 40;
  const MIN_ORDER = 199;
  const grandTotal = subtotal + shippingFee;
  const isMinOrderReached = subtotal >= MIN_ORDER;
  const cartItemCount = Object.keys(cartItems).length;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <div className="container py-5">
        <div className="cart-header">
          <h1 className="cart-title">Your Shopping Cart</h1>
          <p className="cart-subtitle">
            {cartItemCount > 0 
              ? `${cartItemCount} ${cartItemCount === 1 ? 'item' : 'items'} in your cart`
              : 'Your cart is empty'}
          </p>
        </div>

        <div className="row">
          {/* LEFT SIDE - Cart Items */}
          <div className="col-lg-8">
            {cartItemCount === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some fresh fruits and vegetables to get started!</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="cart-items">
                {Object.keys(cartItems).map((id) => {
                  const product = fruits.find(
                    (f) => String(f.id) === String(id)
                  );
                  if (!product) return null;

                  const itemTotal = product.pricePerKg * cartItems[id];

                  return (
                    <div className="cart-item-card" key={id}>
                      <div className="cart-item-image">
                        <img
                          src={product.imageUrl || "/FRUITS.jpg"}
                          alt={product.name}
                        />
                      </div>

                      <div className="cart-item-details">
                        <h5 className="cart-item-name">{product.name}</h5>
                        <p className="cart-item-category">{product.category}</p>
                        <p className="cart-item-price-unit">
                          ₹{product.pricePerKg} / kg
                        </p>
                      </div>

                      <div className="cart-item-quantity">
                        <button
                          type="button"
                          className="quantity-btn"
                          onClick={() => removeFromCart(id)}
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <span className="quantity-value">{cartItems[id]}</span>
                        <button
                          type="button"
                          className="quantity-btn"
                          onClick={() => addToCart(id)}
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>

                      <div className="cart-item-total">
                        <span className="item-total-price">₹{itemTotal}</span>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => deleteFromCart(id)}
                          title="Remove item"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT SIDE - Order Summary */}
          <div className="col-lg-4">
            <div className="order-summary-card">
              <h5 className="summary-title">Order Summary</h5>

              <div className="summary-row">
                <span>Subtotal</span>
                <span className="summary-value">₹{subtotal}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span className={`summary-value ${shippingFee === 0 ? 'free-shipping' : ''}`}>
                  {shippingFee === 0 ? "Free" : `₹${shippingFee}`}
                </span>
              </div>

              {!isMinOrderReached && (
                <div className="min-order-warning">
                  <i className="bi bi-info-circle"></i>
                  <span>Add ₹{MIN_ORDER - subtotal} more for free shipping</span>
                </div>
              )}

              {isMinOrderReached && (
                <div className="free-shipping-badge">
                  <i className="bi bi-check-circle"></i>
                  <span>You qualify for free shipping!</span>
                </div>
              )}

              <div className="summary-divider"></div>

              <div className="summary-row total-row">
                <span>Total</span>
                <span className="summary-total">₹{grandTotal}</span>
              </div>

              <button
                type="button"
                className="checkout-btn"
                disabled={!isMinOrderReached}
                onClick={handleCheckout}
              >
                <i className="bi bi-lock-fill"></i>
                Proceed to Checkout
              </button>

              {!isMinOrderReached && (
                <p className="min-order-text">
                  Minimum order of ₹{MIN_ORDER} required
                </p>
              )}

              <button
                type="button"
                className="continue-shopping-btn"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
