import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { auth, googleProvider, signInWithPopup } from "../../firebase";
import api from "../../utils/api";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!agreedToTerms) {
      setError("Please agree to Terms & Privacy Policy");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });

      const { token, email: userEmail, role, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("email", userEmail);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");

      setShowSuccess(true);
      
      setTimeout(() => {
        navigate("/");
      }, 1500);
      
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else if (err.response?.status === 404) {
        setError("User not found. Please register first");
      } else if (err.code === "NETWORK_ERROR") {
        setError("Network error. Please check connection");
      } else {
        setError("Login failed. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!agreedToTerms) {
      setError("Please agree to Terms & Privacy Policy");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      
      // Use Firebase to sign in with Google
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Get ID token from Firebase
      const idToken = await user.getIdToken();
      
      try {
        // Send ID token to backend for verification and JWT creation
        const response = await api.post('/api/auth/google-login', {
          idToken: idToken,
          email: user.email,
          name: user.displayName,
          googleId: user.uid,
          avatar: user.photoURL
        });

        const { token, email: userEmail, role, user: backendUser } = response.data;

        // Store JWT and user info
        localStorage.setItem("token", token);
        localStorage.setItem("email", userEmail);
        localStorage.setItem("role", role);
        localStorage.setItem("user", JSON.stringify(backendUser));
        localStorage.setItem("isLoggedIn", "true");

        setShowSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 1500);
        
      } catch (backendError) {
        // Fallback: Store user info directly from Firebase if backend is not ready
        console.warn("Backend not available, using Firebase user data:", backendError);
        
        const userData = {
          email: user.email,
          name: user.displayName,
          googleId: user.uid,
          avatar: user.photoURL,
          role: "USER"
        };
        
        localStorage.setItem("token", idToken); // Use Firebase token as fallback
        localStorage.setItem("email", user.email);
        localStorage.setItem("role", "USER");
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isLoggedIn", "true");

        setShowSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
      
    } catch (err) {
      console.error("Google login error:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        // Don't show error for popup closed by user
        return;
      } else if (err.code === 'auth/popup-blocked') {
        setError("Popup was blocked. Please allow popups and try again.");
      } else if (err.code === 'auth/unauthorized-domain') {
        setError("This domain is not authorized. Please add it to Firebase console.");
      } else {
        setError("Google login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleForgotPassword = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setResetLoading(true);
      setError("");
      
      // Mock API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResetSuccess(true);
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetEmail("");
        setResetSuccess(false);
      }, 3000);
      
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="login-background">
      {/* Background Image with Overlay */}
      <div className="bg-overlay"></div>
      
      {/* Login Card */}
      <div className="login-card-container">
        <div className="login-card">
          {/* Success Toast */}
          {showSuccess && (
            <div className="success-toast">
              <i className="bi bi-check-circle-fill"></i>
              <span>Logged in successfully 🎉</span>
            </div>
          )}

          {/* Logo */}
          <div className="logo-header">
            <div className="logo">
              <span className="logo-icon">🥬</span>
              <span className="logo-text">FreshCart</span>
            </div>
            <p className="welcome-text">Welcome back to fresh groceries</p>
          </div>

          {/* Form */}
          <div className="login-form">
            {/* Email Input */}
            <div className="input-group">
              <label htmlFor="email">
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="your@email.com"
                className={error && !email ? 'error-input' : ''}
              />
            </div>

            {/* Password Input */}
            <div className="input-group">
              <div className="password-header">
                <label htmlFor="password">
                  <span className="label-icon">🔒</span>
                  Password
                </label>
                <a href="#" className="forgot-link" onClick={(e) => {
                  e.preventDefault();
                  setShowForgotPassword(true);
                  setResetEmail(email);
                }}>
                  Forgot password?
                </a>
              </div>
              <div className="password-input">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your password"
                  className={error && !password ? 'error-input' : ''}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Terms Agreement */}
            <div className="terms-agreement">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="terms-checkbox"
                />
                <span className="terms-text">
                  I agree to <a href="#">Terms</a> & <a href="#">Privacy Policy</a>
                </span>
              </label>
            </div>

            {/* Login Button */}
            <button
              className={`login-button ${isLoading ? 'loading' : ''}`}
              onClick={handleLogin}
              disabled={isLoading || !agreedToTerms}
            >
              {isLoading ? (
                <>
                  <span className="button-spinner"></span>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>

            {/* Divider */}
            <div className="divider">
              <span>or continue with</span>
            </div>

            {/* Social Login */}
            <div className="social-login">
              <button
                className="google-login-btn"
                onClick={handleGoogleLogin}
                disabled={isLoading || !agreedToTerms}
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
                  <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-7.18-2.53H1.83v2.07A8 8 0 0 0 8.98 17z"/>
                  <path fill="#FBBC05" d="M4.5 10.49a4.8 4.8 0 0 1 0-3.07V5.35H1.83a8 8 0 0 0 0 7.3l2.67-2.16z"/>
                  <path fill="#EA4335" d="M8.98 6.5c1.3 0 2.24.56 2.75 1.14l2.3-2.3A8 8 0 0 0 1.83 5.35L4.5 7.42a4.77 4.77 0 0 1 4.48-.92z"/>
                </svg>
                Continue with Google
              </button>
            </div>

            {/* Register Link */}
            <div className="register-section">
              <p>
                <button
                  className="register-btn"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            <p> 2024 FreshCart • Freshness Guaranteed</p>
            <div className="footer-fruits">
              <span>🍎</span>
              <span>🥕</span>
              <span>🍓</span>
              <span>🥑</span>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="forgot-password-overlay">
          <div className="forgot-password-modal">
            <div className="modal-header">
              <h3>Reset Password</h3>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetEmail("");
                  setError("");
                }}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              {resetSuccess ? (
                <div className="success-message">
                  <div className="success-icon">✉️</div>
                  <h4>Password Reset Email Sent!</h4>
                  <p>We've sent a password reset link to your email address.</p>
                  <p>Please check your inbox and follow the instructions.</p>
                </div>
              ) : (
                <>
                  <p>Enter your email address and we'll send you a link to reset your password.</p>
                  
                  <div className="input-group">
                    <label htmlFor="reset-email">
                      <span className="label-icon">📧</span>
                      Email Address
                    </label>
                    <input
                      id="reset-email"
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="your@email.com"
                      className={error && !resetEmail ? 'error-input' : ''}
                    />
                  </div>

                  {error && (
                    <div className="error-message">
                      <span className="error-icon">⚠️</span>
                      <span>{error}</span>
                    </div>
                  )}
                </>
              )}
            </div>
            
            {!resetSuccess && (
              <div className="modal-footer">
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetEmail("");
                    setError("");
                  }}
                >
                  Cancel
                </button>
                <button
                  className={`reset-btn ${resetLoading ? 'loading' : ''}`}
                  onClick={handleForgotPassword}
                  disabled={resetLoading}
                >
                  {resetLoading ? (
                    <>
                      <span className="button-spinner"></span>
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;