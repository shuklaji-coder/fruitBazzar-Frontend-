import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StoreContext } from '../context/StoreContext';
import './AnimatedNavbar.css';

const AnimatedNavbar = () => {
  const { cartItems, fruits, getCartCount } = useContext(StoreContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const cartCount = getCartCount();

  return (
    <motion.nav
      className={`animated-navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        {/* Logo */}
        <motion.div
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
        >
          <h1>FreshKart</h1>
        </motion.div>

        {/* Center Navigation */}
        <div className="navbar-center">
          <motion.div
            whileHover={{ color: '#10b981' }}
            className="nav-link"
          >
            <Link to="/">Home</Link>
          </motion.div>
          <motion.div
            whileHover={{ color: '#10b981' }}
            className="nav-link"
          >
            <Link to="/explore">Shop</Link>
          </motion.div>
          <motion.div
            whileHover={{ color: '#10b981' }}
            className="nav-link"
          >
            <Link to="/explore">Categories</Link>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="navbar-right">
          {/* Cart */}
          <motion.div
            className="navbar-icon-wrapper"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCart(!showCart)}
          >
            <div className="cart-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {cartCount > 0 && (
                <motion.span
                  className="cart-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* Profile */}
          {userEmail ? (
            <motion.div
              className="navbar-icon-wrapper"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowProfile(!showProfile)}
            >
              <div className="profile-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login" className="login-btn">
                Login
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      {/* Cart Dropdown */}
      {showCart && (
        <motion.div
          className="dropdown-menu cart-dropdown"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <h4>Shopping Cart</h4>
          {cartCount === 0 ? (
            <p className="empty-message">Your cart is empty</p>
          ) : (
            <div className="cart-items">
              {Object.keys(cartItems).map(id => {
                const item = fruits?.find(f => String(f.id) === String(id));
                if (!item) return null;
                return (
                  <div key={id} className="cart-item">
                    <div className="item-image">
                      <img src={item.imageUrl || '/FRUITS.jpg'} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <p className="item-name">{item.name}</p>
                      <p className="item-quantity">{cartItems[id]} × ₹{item.pricePerKg}</p>
                    </div>
                  </div>
                );
              })}
              <Link to="/cart" className="view-cart-btn">
                View Full Cart
              </Link>
            </div>
          )}
        </motion.div>
      )}

      {/* Profile Dropdown */}
      {showProfile && (
        <motion.div
          className="dropdown-menu profile-dropdown"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="profile-info">
            <p>Logged in as</p>
            <p className="email">{userEmail}</p>
          </div>
          <button className="profile-btn" onClick={() => navigate('/my-orders')}>
            My Orders
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default AnimatedNavbar;
