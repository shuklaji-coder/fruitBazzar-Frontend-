import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const [fruits, setFruits] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // 👤 Get current user from localStorage
  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    
    if (userEmail && token && isLoggedIn === "true") {
      setCurrentUser({
        email: userEmail,
        token: token
      });
      // Load user-specific cart
      loadUserCart(userEmail);
    } else {
      // Load guest cart
      loadGuestCart();
    }
  }, []);

  // 🛒 Load user-specific cart from localStorage
  const loadUserCart = (userEmail) => {
    const userCartKey = `cart_${userEmail}`;
    const savedCart = localStorage.getItem(userCartKey);
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setCartItems({});
      }
    } else {
      setCartItems({});
    }
  };

  // 🛒 Load guest cart
  const loadGuestCart = () => {
    const guestCart = localStorage.getItem("guest_cart");
    if (guestCart) {
      try {
        setCartItems(JSON.parse(guestCart));
      } catch (error) {
        console.error("Error parsing guest cart:", error);
        setCartItems({});
      }
    } else {
      setCartItems({});
    }
  };

  // 💾 Save cart to user-specific storage
  const saveCartToStorage = (cart) => {
    if (currentUser) {
      // Save to user-specific cart
      const userCartKey = `cart_${currentUser.email}`;
      localStorage.setItem(userCartKey, JSON.stringify(cart));
    } else {
      // Save to guest cart
      localStorage.setItem("guest_cart", JSON.stringify(cart));
    }
  };

  // 👤 Handle user login/logout
  const handleUserLogin = (userEmail, token) => {
    setCurrentUser({ email: userEmail, token: token });
    
    // Transfer guest cart to user cart if user cart is empty
    const userCartKey = `cart_${userEmail}`;
    const existingUserCart = localStorage.getItem(userCartKey);
    const guestCart = localStorage.getItem("guest_cart");
    
    if (!existingUserCart && guestCart) {
      // Transfer guest cart to user
      localStorage.setItem(userCartKey, guestCart);
      localStorage.removeItem("guest_cart");
      loadUserCart(userEmail);
    } else {
      loadUserCart(userEmail);
    }
  };

  const handleUserLogout = () => {
    // Clear current user
    setCurrentUser(null);
    
    // Clear user data from localStorage
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
    
    // Load guest cart
    loadGuestCart();
  };

  // 🍎 Fetch fruits from API with retry mechanism
  useEffect(() => {
    const fetchFruits = async (retryCount = 0) => {
      try {
        setLoading(true);
        
        const response = await api.get('/api/fruit');
        
        if (response && response.data) {
          setFruits(Array.isArray(response.data) ? response.data : []);
          setError(null);
        } else {
          setFruits([]);
          setError('Invalid response from server');
        }
      } catch (err) {
        // Only log error in development
        if (import.meta.env.DEV) {
          console.error("Error fetching fruits:", err);
        }
        
        // Check if it's a network/timeout error
        const isNetworkError = err.code === 'ECONNABORTED' || 
                              err.message?.includes('timeout') ||
                              err.message?.includes('Network Error') ||
                              !err.response;
        
        // Retry logic - only for network errors
        if (isNetworkError && retryCount < 2) {
          setTimeout(() => {
            fetchFruits(retryCount + 1);
          }, 2000 * (retryCount + 1)); // 2s, 4s delays
          return;
        }
        
        // Set fallback fruits if backend is down after retries
        const fallbackFruits = [
          {
            _id: "fallback-1",
            name: "Apple",
            description: "Fresh red apples",
            price: 120,
            image: "https://via.placeholder.com/150x150/ff6b6b/ffffff?text=Apple",
            category: "fruits"
          },
          {
            _id: "fallback-2", 
            name: "Banana",
            description: "Ripe yellow bananas",
            price: 60,
            image: "https://via.placeholder.com/150x150/ffd93d/ffffff?text=Banana",
            category: "fruits"
          },
          {
            _id: "fallback-3",
            name: "Orange",
            description: "Juicy oranges",
            price: 80,
            image: "https://via.placeholder.com/150x150/ff9f43/ffffff?text=Orange",
            category: "fruits"
          }
        ];
        
        setFruits(fallbackFruits);
        
        // Set user-friendly error message
        if (isNetworkError) {
          setError('Backend server is not running. Using offline mode with sample data. Please start the backend server at http://localhost:8080');
        } else {
          setError('Unable to fetch fruits from server. Using offline mode.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  // ➕ Add item to cart with user-specific storage
  const addToCart = (itemId) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (!newCart[itemId]) {
        newCart[itemId] = 1;
      } else {
        newCart[itemId] += 1;
      }
      // Save to user-specific storage
      saveCartToStorage(newCart);
      return newCart;
    });
  };

  // ➖ Remove one quantity from cart
  const removeFromCart = (itemId) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      // Save to user-specific storage
      saveCartToStorage(newCart);
      return newCart;
    });
  };

  // 🗑️ Delete item completely from cart
  const deleteFromCart = (itemId) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      delete newCart[itemId];
      // Save to user-specific storage
      saveCartToStorage(newCart);
      return newCart;
    });
  };

  // 🧹 Clear entire cart
  const clearCart = () => {
    setCartItems({});
    // Clear from user-specific storage
    if (currentUser) {
      const userCartKey = `cart_${currentUser.email}`;
      localStorage.removeItem(userCartKey);
    } else {
      localStorage.removeItem("guest_cart");
    }
  };

  // 🔢 Get total cart item count
  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  };

  // 💰 Get total cart amount
  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const item = fruits.find(fruit => String(fruit.id) === String(itemId));
      if (item && item.pricePerKg) {
        total += item.pricePerKg * cartItems[itemId];
      }
    }
    return total;
  };

  // 🔄 Retry fetching fruits
  const retryFetch = () => {
    setError(null);
    setLoading(true);
    api.get('/api/fruit')
      .then(response => {
        setFruits(response?.data || []);
        setError(null);
      })
      .catch(err => {
        console.error("Error fetching fruits:", err);
        setError("Failed to load fruits. Please try again later.");
        setFruits([]); // Set empty array on error
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <StoreContext.Provider
      value={{
        fruits,
        cartItems,
        loading,
        error,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        getCartCount,
        getCartAmount,
        retryFetch,
        currentUser,
        handleUserLogin,
        handleUserLogout
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook for using the store context
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreContextProvider');
  }
  return context;
};

export default StoreContext;
