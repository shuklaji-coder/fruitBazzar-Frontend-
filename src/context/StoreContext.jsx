import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const [fruits, setFruits] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // 🛒 Add item to cart
  const addToCart = (itemId) => {
    console.log('StoreContext addToCart called with itemId:', itemId);
    console.log('Current cartItems before:', cartItems);
    
    setCartItems(prev => {
      const newCart = {
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1
      };
      console.log('New cartItems after:', newCart);
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
      return newCart;
    });
  };

  // 🗑️ Delete item completely from cart
  const deleteFromCart = (itemId) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      delete newCart[itemId];
      return newCart;
    });
  };

  // 🧹 Clear entire cart
  const clearCart = () => {
    setCartItems({});
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
        retryFetch
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
