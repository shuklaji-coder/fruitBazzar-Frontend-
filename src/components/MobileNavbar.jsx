import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import "./MobileNavbar.css";
import { StoreContext } from "../context/StoreContext";
import { useSearch } from "../context/SearchContext";

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const { cartItems, fruits, getCartCount, getCartAmount } = useContext(StoreContext);
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleCallClick = () => {
    window.open('tel:9580849709');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleHelp = () => {
    setIsHelpOpen(!isHelpOpen);
    setIsMenuOpen(false);
  };

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsHelpOpen(false);
    setShowCart(false);
    setShowProfile(false);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="mobile-navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <img
              src={assets.logo}
              alt="Logo"
              width="40"
              height="40"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Search Bar */}
          <div className="navbar-search">
            <form onSubmit={handleSearchSubmit}>
              <i className="bi bi-search search-icon"></i>
              <input
                type="text"
                placeholder="Search fruits, vegetables..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>
          </div>

          {/* Right Icons */}
          <div className="navbar-actions">
            {/* Cart */}
            <div className="action-item">
              <div className="cart-icon-wrapper" onClick={() => setShowCart(!showCart)}>
                <i className="bi bi-cart3"></i>
                {getCartCount() > 0 && (
                  <span className="cart-badge">{getCartCount()}</span>
                )}
              </div>
            </div>

            {/* Hamburger Menu */}
            <div className="action-item">
              <button 
                className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
                onClick={toggleMenu}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>

        {/* Cart Dropdown */}
        {showCart && (
          <div className="cart-dropdown">
            <div className="cart-header">
              <h6>My Cart</h6>
              <button onClick={() => setShowCart(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {getCartCount() === 0 ? (
              <div className="cart-empty">
                <i className="bi bi-cart-x"></i>
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {Object.keys(cartItems).map((id) => {
                    const item = fruits.find(f => String(f.id) === String(id));
                    if (!item) return null;

                    return (
                      <div key={id} className="cart-item">
                        <img
                          src={item.imageUrl || "/FRUITS.jpg"}
                          alt={item.name}
                        />
                        <div className="item-info">
                          <small><b>{item.name}</b></small>
                          <small>
                            {cartItems[id]} × ₹{item.pricePerKg}
                          </small>
                        </div>
                        <div className="item-price">
                          ₹{item.pricePerKg * cartItems[id]}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="cart-total">
                  <span>Total</span>
                  <span>₹{getCartAmount()}</span>
                </div>

                <Link
                  to="/cart"
                  className="view-cart-btn"
                  onClick={() => setShowCart(false)}
                >
                  View Cart
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeAll}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            {/* Menu Header */}
            <div className="menu-header">
              <div className="menu-profile">
                {userEmail ? (
                  <>
                    <img
                      src={assets.profile || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                      alt="Profile"
                      className="profile-avatar"
                    />
                    <div className="profile-info">
                      <div className="profile-email">{userEmail}</div>
                      <div className="profile-status">Active</div>
                    </div>
                  </>
                ) : (
                  <div className="menu-welcome">
                    <h3>Welcome!</h3>
                    <p>Login to access your account</p>
                  </div>
                )}
              </div>
              <button className="menu-close" onClick={closeAll}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* Menu Items */}
            <div className="menu-items">
              <Link to="/" className="menu-item" onClick={closeAll}>
                <i className="bi bi-house-door"></i>
                <span>Home</span>
              </Link>

              <Link to="/my-orders" className="menu-item" onClick={closeAll}>
                <i className="bi bi-box-seam"></i>
                <span>My Orders</span>
              </Link>

              <Link to="/cart" className="menu-item" onClick={closeAll}>
                <i className="bi bi-cart3"></i>
                <span>Cart</span>
                {getCartCount() > 0 && (
                  <span className="item-badge">{getCartCount()}</span>
                )}
              </Link>

              {userEmail && (
                <div className="menu-item" onClick={() => setShowProfile(!showProfile)}>
                  <i className="bi bi-person-circle"></i>
                  <span>Profile</span>
                  <i className="bi bi-chevron-right"></i>
                </div>
              )}

              <div className="menu-item help-item" onClick={toggleHelp}>
                <i className="bi bi-question-circle"></i>
                <span>Help & Support</span>
                <span className="help-badge">🆘</span>
              </div>

              {userEmail && (
                <div className="menu-item logout-item" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Logout</span>
                </div>
              )}
            </div>

            {/* Profile Submenu */}
            {showProfile && (
              <div className="profile-submenu">
                <div className="submenu-header">
                  <div className="submenu-avatar">
                    <img
                      src={assets.profile || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                      alt="Profile"
                    />
                  </div>
                  <div className="submenu-user-info">
                    <div className="submenu-email">{userEmail}</div>
                    <div className="submenu-status">Active Account</div>
                  </div>
                </div>

                <div className="submenu-section">
                  <h4>👤 Account</h4>
                  <div className="submenu-item" onClick={() => {navigate('/profile'); closeAll();}}>
                    <i className="bi bi-person"></i>
                    <span>Personal Information</span>
                    <i className="bi bi-chevron-right"></i>
                  </div>
                  <div className="submenu-item" onClick={() => {navigate('/security'); closeAll();}}>
                    <i className="bi bi-shield-check"></i>
                    <span>Security Settings</span>
                    <i className="bi bi-chevron-right"></i>
                  </div>
                </div>

                <div className="submenu-section">
                  <h4>💳 Payment</h4>
                  <div className="submenu-item" onClick={() => {navigate('/payment-methods'); closeAll();}}>
                    <i className="bi bi-credit-card"></i>
                    <span>Payment Methods</span>
                    <i className="bi bi-chevron-right"></i>
                  </div>
                  <div className="submenu-item" onClick={() => {navigate('/wallet'); closeAll();}}>
                    <i className="bi bi-wallet2"></i>
                    <span>Wallet</span>
                    <i className="bi bi-chevron-right"></i>
                  </div>
                </div>

                <div className="submenu-section">
                  <h4>⚙️ Settings</h4>
                  <div className="submenu-item" onClick={() => {navigate('/notifications'); closeAll();}}>
                    <i className="bi bi-bell"></i>
                    <span>Notifications</span>
                    <i className="bi bi-chevron-right"></i>
                  </div>
                  <div className="submenu-item" onClick={() => {navigate('/preferences'); closeAll();}}>
                    <i className="bi bi-gear"></i>
                    <span>App Preferences</span>
                    <i className="bi bi-chevron-right"></i>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Help & Support Bottom Sheet */}
      {isHelpOpen && (
        <div className="help-overlay" onClick={toggleHelp}>
          <div className="help-bottom-sheet" onClick={(e) => e.stopPropagation()}>
            {/* Sheet Header */}
            <div className="help-header">
              <h3>Need Help? 🤝</h3>
              <button className="help-close" onClick={toggleHelp}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* Help Content */}
            <div className="help-content">
              <div className="help-card" onClick={handleCallClick}>
                <div className="help-icon">
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <div className="help-info">
                  <div className="help-label">Call Us</div>
                  <div className="help-value">9580849709</div>
                  <div className="help-subtitle">Available 9 AM – 9 PM</div>
                </div>
                <div className="help-action">
                  <i className="bi bi-telephone"></i>
                </div>
              </div>

              <div className="help-section">
                <h4>How can we help you?</h4>
                <div className="help-options">
                  <div className="help-option">
                    <i className="bi bi-box-seam"></i>
                    <span>Order Issues</span>
                  </div>
                  <div className="help-option">
                    <i className="bi bi-credit-card"></i>
                    <span>Payment Problems</span>
                  </div>
                  <div className="help-option">
                    <i className="bi bi-truck"></i>
                    <span>Delivery Support</span>
                  </div>
                  <div className="help-option">
                    <i className="bi bi-gear"></i>
                    <span>Account Help</span>
                  </div>
                </div>
              </div>

              <div className="help-section">
                <h4>Frequently Asked Questions</h4>
                <div className="faq-item">
                  <div className="faq-question">
                    <i className="bi bi-question-circle"></i>
                    <span>How do I track my order?</span>
                  </div>
                </div>
                <div className="faq-item">
                  <div className="faq-question">
                    <i className="bi bi-question-circle"></i>
                    <span>What is your return policy?</span>
                  </div>
                </div>
                <div className="faq-item">
                  <div className="faq-question">
                    <i className="bi bi-question-circle"></i>
                    <span>How do I cancel an order?</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;
