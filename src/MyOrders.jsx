import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "./utils/api";
import { StoreContext } from "./context/StoreContext";
import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const navigate = useNavigate();

  const { fruits } = useContext(StoreContext);

  useEffect(() => {
    // Check if user is logged in - More lenient check
    const token = localStorage.getItem("token");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userEmail = localStorage.getItem("email");
    
    // Debug logging
    if (import.meta.env.DEV) {
      console.log("MyOrders Auth Check:", {
        hasToken: !!token,
        isLoggedIn,
        hasEmail: !!userEmail,
        email: userEmail,
        tokenPreview: token ? token.substring(0, 20) + "..." : null
      });
    }
    
    // Check authentication - token is most important
    // If token exists, allow access even if other values are missing
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate("/login", { replace: true });
      return;
    }
    
    // If token exists but email is missing, try to get it from user object
    const finalEmail = userEmail || (() => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        return user.email || userEmail;
      } catch {
        return userEmail;
      }
    })();

    const fetchOrders = async () => {
      try {
        // Use finalEmail or fallback to a default
        const emailToUse = finalEmail || "user@example.com";
        const response = await api.get(`/api/orders/my-orders/${emailToUse}`);
        setOrders(response.data || []);
        setLoading(false);
        setError("");
      } catch (err) {
        console.error("Error fetching orders:", err);
        
        // If it's a 401 error, user might not be authenticated
        if (err.response?.status === 401) {
          console.log("Unauthorized, redirecting to login");
          localStorage.removeItem("token");
          localStorage.removeItem("isLoggedIn");
          navigate("/login", { replace: true });
          return;
        }
        
        // For other errors, show error message but don't redirect
        setError("Failed to load orders. Please try again.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return '#10b981';
      case 'processing': return '#f59e0b';
      case 'shipped': return '#3b82f6';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return '✅';
      case 'processing': return '⏳';
      case 'shipped': return '🚚';
      case 'cancelled': return '❌';
      default: return '📦';
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const closeOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  const handleReorder = (order) => {
    // Add all items from this order to cart
    order.items?.forEach(item => {
      // Assuming addToCart function exists
      // addToCart(item.productId || item.id);
    });
    navigate("/explore");
  };

  if (loading) {
    return (
      <div className="my-orders-container">
        <div className="orders-header">
          <div className="orders-title">My Orders</div>
        </div>
        <div className="loading-state">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-orders-container">
        <div className="orders-header">
          <div className="orders-title">My Orders</div>
        </div>
        <div className="error-state">
          <div className="error-icon">❌</div>
          <h3>{error}</h3>
          <button className="btn-primary" onClick={() => navigate("/explore")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="my-orders-container">
        <div className="orders-header">
          <div className="orders-title">My Orders</div>
        </div>
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No orders yet</h3>
          <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
          <button className="btn-primary" onClick={() => navigate("/explore")}>
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders-container">
      <div className="orders-header">
        <div className="orders-title">My Orders</div>
        <div className="orders-count">{orders.length} {orders.length === 1 ? 'Order' : 'Orders'}</div>
      </div>

      <div className="orders-grid">
        {orders.map((order, orderIndex) => (
          <div 
            key={order._id || order.id || orderIndex} 
            className="order-card"
            onClick={() => handleOrderClick(order)}
          >
            {/* Order Header */}
            <div className="order-header">
              <div className="order-info">
                <div className="order-id">#{order._id || order.id || `ORD${orderIndex + 1}`}</div>
                <div className="order-date">{formatDate(order.createdAt || order.orderDate)}</div>
              </div>
              <div className="order-status" style={{ color: getStatusColor(order.status) }}>
                <span className="status-icon">{getStatusIcon(order.status)}</span>
                <span className="status-text">{order.status || 'Processing'}</span>
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <div className="summary-item">
                <span className="label">Total Amount</span>
                <span className="value">₹{order.totalAmount || order.total || 0}</span>
              </div>
              <div className="summary-item">
                <span className="label">Items</span>
                <span className="value">{order.items?.length || 0}</span>
              </div>
              <div className="summary-item">
                <span className="label">Payment</span>
                <span className="value">{order.paymentStatus || order.paymentMethod || 'COD'}</span>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="order-items-preview">
              <div className="items-grid">
                {order.items?.slice(0, 3).map((item, itemIndex) => {
                  const fruit = fruits.find(
                    f => String(f.id) === String(item.productId) || 
                         String(f.id) === String(item._id) ||
                         f.name === item.name
                  );
                  return (
                    <div key={itemIndex} className="preview-item">
                      <img
                        src={fruit?.imageUrl || fruit?.image || item.image || "/FRUITS.jpg"}
                        alt={fruit?.name || item.name || "Product"}
                        className="preview-image"
                      />
                    </div>
                  );
                })}
                {order.items?.length > 3 && (
                  <div className="more-items">+{order.items.length - 3} more</div>
                )}
              </div>
            </div>

            {/* Order Actions */}
            <div className="order-actions">
              <button 
                className="btn-outline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOrderClick(order);
                }}
              >
                View Details
              </button>
              <button 
                className="btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReorder(order);
                }}
              >
                Reorder
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="order-details-modal" onClick={closeOrderDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order Details</h3>
              <button className="close-btn" onClick={closeOrderDetails}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="order-info-grid">
                <div className="info-item">
                  <span className="label">Order ID</span>
                  <span className="value">#{selectedOrder._id || selectedOrder.id}</span>
                </div>
                <div className="info-item">
                  <span className="label">Date</span>
                  <span className="value">{formatDate(selectedOrder.createdAt || selectedOrder.orderDate)}</span>
                </div>
                <div className="info-item">
                  <span className="label">Status</span>
                  <span className="value" style={{ color: getStatusColor(selectedOrder.status) }}>
                    {getStatusIcon(selectedOrder.status)} {selectedOrder.status || 'Processing'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Total Amount</span>
                  <span className="value">₹{selectedOrder.totalAmount || selectedOrder.total || 0}</span>
                </div>
                <div className="info-item">
                  <span className="label">Payment Method</span>
                  <span className="value">{selectedOrder.paymentStatus || selectedOrder.paymentMethod || 'COD'}</span>
                </div>
              </div>

              <div className="order-items-full">
                <h4>Order Items</h4>
                <div className="items-list">
                  {selectedOrder.items?.map((item, itemIndex) => {
                    const fruit = fruits.find(
                      f => String(f.id) === String(item.productId) || 
                           String(f.id) === String(item._id) ||
                           f.name === item.name
                    );
                    const itemPrice = item.price || item.totalPrice || fruit?.price || fruit?.pricePerKg || 0;
                    const quantity = item.quantity || 1;
                    
                    return (
                      <div key={itemIndex} className="order-item-full">
                        <img
                          src={fruit?.imageUrl || fruit?.image || item.image || "/FRUITS.jpg"}
                          alt={fruit?.name || item.name || "Product"}
                          className="item-image"
                        />
                        <div className="item-details">
                          <div className="item-name">{fruit?.name || item.name || `Product ${itemIndex + 1}`}</div>
                          <div className="item-qty">
                            <span className="quantity">{quantity} {item.unit || 'kg'}</span>
                            <span className="price-info">₹{itemPrice} per {item.unit || 'kg'}</span>
                          </div>
                        </div>
                        <div className="item-price">₹{itemPrice * quantity}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedOrder.billingAddress && (
                <div className="delivery-address-full">
                  <h4>📍 Delivery Address</h4>
                  <p>
                    {selectedOrder.billingAddress.fullName}<br />
                    {selectedOrder.billingAddress.street}<br />
                    {selectedOrder.billingAddress.city}, {selectedOrder.billingAddress.state} - {selectedOrder.billingAddress.pincode}<br />
                    📱 {selectedOrder.billingAddress.mobile}
                  </p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn-outline" onClick={closeOrderDetails}>Close</button>
              <button 
                className="btn-primary" 
                onClick={() => {
                  handleReorder(selectedOrder);
                  closeOrderDetails();
                }}
              >
                Reorder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
