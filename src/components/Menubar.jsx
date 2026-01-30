import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import "./Menubaar.css";
import { StoreContext } from "../context/StoreContext";
import { useSearch } from "../context/SearchContext";

const Menubar = () => {
  const { cartItems, fruits, getCartCount, getCartAmount } =
    useContext(StoreContext);
  const { searchQuery, debouncedQuery, isSearching, setSearchQuery, clearSearch } = useSearch();

  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleClearSearch = () => {
    clearSearch();
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* LOGO */}
        <img
          src={assets.logo}
          alt="Logo"
          width="60"
          height="60"
          className="logo"
          onClick={() => navigate("/")}
        />

        {/* SEARCH BAR */}
        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <i className="bi bi-search search-icon"></i>
          <input
            type="text"
            placeholder="Search fruits, vegetables & more…"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            className={isSearchFocused ? "focused" : ""}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          )}
          {isSearching && (
            <div className="search-loading">
              <i className="bi bi-arrow-repeat"></i>
            </div>
          )}
        </form>

        <div className="menubar-right">
          {/* MY ORDERS */}
          <div className="my-orders-wrapper">
            <button 
              className="my-orders-btn"
              onClick={() => navigate("/my-orders")}
              title="My Orders"
            >
              <i className="bi bi-box-seam"></i>
              <span className="my-orders-text">My Orders</span>
            </button>
          </div>

          {/* CART */}
          <div className="position-relative">
            <div className="cart-icon-wrapper" onClick={() => setShowCart(!showCart)}>
              <img
                src={assets.cart}
                alt="Cart"
                width={28}
                height={28}
              />
              {getCartCount() > 0 && (
                <span className="cart-badge">{getCartCount()}</span>
              )}
            </div>

            {showCart && (
              <div className="cart-dropdown">
                <h6>My Cart</h6>

                {getCartCount() === 0 ? (
                  <p style={{ color: "var(--text-light)", margin: "1rem 0" }}>
                    Your cart is empty
                  </p>
                ) : (
                  <>
                    {Object.keys(cartItems).map((id) => {
                      const item = fruits.find(
                        (f) => String(f.id) === String(id)
                      );
                      if (!item) return null;

                      return (
                        <div key={id} className="cart-item-preview">
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
          </div>

          {/* PROFILE */}
          {userEmail && (
            <div className="position-relative">
              <div className="profile-icon-wrapper" onClick={() => setShowProfile(!showProfile)}>
                <img
                  src={
                    assets.profile ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="Profile"
                  width={38}
                  height={38}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              </div>

              {showProfile && (
                <div className="profile-dropdown">
                  <div className="user-email">Logged in as</div>
                  <div className="user-email-value">{userEmail}</div>

                  <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                      setShowProfile(false);
                      navigate("/my-orders");
                    }}
                  >
                    My Orders
                  </button>

                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
