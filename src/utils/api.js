import axios from 'axios';

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Create Axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds timeout (increased from 10s)
  headers: {
    'Content-Type': 'application/json',
  },
  // Retry configuration
  retry: 2,
  retryDelay: 1000,
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        data: config.data,
        params: config.params,
        headers: config.headers,
      });
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }
    
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - Let component handle it, don't auto-redirect
          console.error('🔒 Unauthorized: Token expired or invalid');
          break;
          
        case 403:
          console.error('🚫 Forbidden: Insufficient permissions');
          break;
          
        case 404:
          console.error('🔍 Not Found: Resource does not exist');
          break;
          
        case 500:
          console.error('💥 Server Error: Internal server error');
          break;
          
        default:
          console.error(`❌ API Error ${status}:`, data?.message || 'Unknown error');
      }
    } else if (error.request) {
      // Network error or timeout
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        console.error('⏱️ Request Timeout: Server is taking too long to respond');
      } else {
        console.error('🌐 Network Error: Unable to connect to server');
      }
    } else {
      // Other error
      console.error('❌ Request Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Utility methods for common API calls
export const apiMethods = {
  // GET request
  get: (url, config = {}) => api.get(url, config),
  
  // POST request
  post: (url, data = {}, config = {}) => api.post(url, data, config),
  
  // PUT request
  put: (url, data = {}, config = {}) => api.put(url, data, config),
  
  // DELETE request
  delete: (url, config = {}) => api.delete(url, config),
  
  // PATCH request
  patch: (url, data = {}, config = {}) => api.patch(url, data, config),
};

// Export the configured Axios instance and utility methods
export default api;
export { API_BASE_URL };
