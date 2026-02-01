import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "./context/StoreContext";
import ReviewsSection from "./components/ReviewsSection";
import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const { fruits } = useContext(StoreContext);

  const email = localStorage.getItem("email") || "shuklarohan374@gmail.com";

  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }

    axios
      .get(`https://backend-project-fruit-baazaar-15.onrender.com/api/orders/my-orders/${email}`)
      .then(res => {
        setOrders(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders");
        setLoading(false);
      });
  }, [email]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return '#22c55e';
      case 'processing':
        return '#f59e0b';
      case 'cancelled':
        return '#ef4444';
      case 'pending':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bi-check-circle-fill';
      case 'processing':
        return 'bi-arrow-repeat';
      case 'cancelled':
        return 'bi-x-circle-fill';
      case 'pending':
        return 'bi-clock';
      default:
        return 'bi-clock';
    }
  };

  const handleReorder = (order) => {
    // Add items back to cart
    order.items?.forEach(item => {
      const fruit = fruits.find(f => f.id === item.productId);
      if (fruit) {
        // Add to cart logic here
      }
    });
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="my-orders-container">
        <div className="loading-spinner">
          <i className="bi bi-arrow-repeat"></i>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-orders-container">
        <div className="error-message">
          <i className="bi bi-exclamation-triangle"></i>
          <p>{error}</p>
          <button onClick={fetchOrders} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="my-orders-container">
        <div className="empty-orders">
          <div className="empty-icon">
            <i className="bi bi-box-seam"></i>
          </div>
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders. Start shopping to see your orders here!</p>
          <button onClick={() => navigate("/")} className="shop-now-btn">
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders-container">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>You have {orders.length} order{orders.length > 1 ? 's' : ''}</p>
      </div>

      <div className="orders-grid">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <span className="order-id">Order #{order.id}</span>
                <span className="order-date">{formatDate(order.createdAt)}</span>
              </div>
              <div className="order-status">
                <i className={`bi ${getStatusIcon(order.status)}`}></i>
                <span style={{ color: getStatusColor(order.status) }}>
                  {order.status || 'Pending'}
                </span>
              </div>
            </div>

            <div className="order-items">
              {order.items?.slice(0, 3).map((item, index) => {
                const fruit = fruits.find(f => f.id === item.productId);
                return (
                  <div key={index} className="order-item">
                    <img
                      src={fruit?.imageUrl || "/FRUITS.jpg"}
                      alt={fruit?.name || "Product"}
                    />
                    <div className="item-details">
                      <span className="item-name">{fruit?.name || "Product"}</span>
                      <span className="item-quantity">Qty: {item.quantity}</span>
                    </div>
                    <span className="item-price">₹{item.price || fruit?.pricePerKg}</span>
                  </div>
                );
              })}
              {order.items?.length > 3 && (
                <div className="more-items">
                  +{order.items.length - 3} more items
                </div>
              )}
            </div>

            <div className="order-footer">
              <div className="order-total">
                <span>Total: </span>
                <span className="total-amount">₹{order.totalAmount}</span>
              </div>
              <div className="order-actions">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="view-details-btn"
                >
                  View Details
                </button>
                {order.status === 'delivered' && (
                  <button
                    onClick={() => handleReorder(order)}
                    className="reorder-btn"
                  >
                    Reorder
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="order-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order Details</h3>
              <button onClick={() => setSelectedOrder(null)} className="close-btn">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="modal-content">
              <div className="order-summary">
                <div className="summary-row">
                  <span>Order ID:</span>
                  <span>#{selectedOrder.id}</span>
                </div>
                <div className="summary-row">
                  <span>Date:</span>
                  <span>{formatDate(selectedOrder.createdAt)}</span>
                </div>
                <div className="summary-row">
                  <span>Status:</span>
                  <span style={{ color: getStatusColor(selectedOrder.status) }}>
                    {selectedOrder.status || 'Pending'}
                  </span>
                </div>
                <div className="summary-row">
                  <span>Payment Method:</span>
                  <span>{selectedOrder.paymentMethod || 'COD'}</span>
                </div>
              </div>

              <div className="order-items-list">
                <h4>Items ({selectedOrder.items?.length || 0})</h4>
                {selectedOrder.items?.map((item, index) => {
                  const fruit = fruits.find(f => f.id === item.productId);
                  return (
                    <div key={index} className="modal-item">
                      <img
                        src={fruit?.imageUrl || "/FRUITS.jpg"}
                        alt={fruit?.name || "Product"}
                      />
                      <div className="modal-item-info">
                        <span className="modal-item-name">{fruit?.name || "Product"}</span>
                        <span className="modal-item-quantity">Quantity: {item.quantity}</span>
                      </div>
                      <span className="modal-item-price">₹{item.price || fruit?.pricePerKg}</span>
                    </div>
                  );
                })}
              </div>

              <div className="order-breakdown">
                <div className="breakdown-row">
                  <span>Subtotal:</span>
                  <span>₹{selectedOrder.subtotal}</span>
                </div>
                <div className="breakdown-row">
                  <span>Shipping:</span>
                  <span>₹{selectedOrder.shippingFee || 0}</span>
                </div>
                <div className="breakdown-row total">
                  <span>Total:</span>
                  <span>₹{selectedOrder.totalAmount}</span>
                </div>
              </div>

              {selectedOrder.deliveryAddress && (
                <div className="delivery-address">
                  <h4>Delivery Address</h4>
                  <p>
                    {selectedOrder.deliveryAddress.name}<br />
                    {selectedOrder.deliveryAddress.address}<br />
                    {selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.pincode}<br />
                    {selectedOrder.deliveryAddress.phone}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      {orders.length > 0 && <ReviewsSection />}
    </div>
  );
};

export default MyOrders;
