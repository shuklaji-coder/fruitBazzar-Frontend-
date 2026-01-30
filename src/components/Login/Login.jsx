import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleGoogleLogin = () => {
    if (!agreedToTerms) {
      setError("Please agree to Terms & Privacy Policy");
      return;
    }

    setError("");
    setIsLoading(true);
    
    setTimeout(() => {
      const mockGoogleUser = {
        email: "user@gmail.com",
        name: "Google User",
        token: "mock-google-token",
        role: "user",
        avatar: "https://picsum.photos/seed/google/200/200"
      };
      
      localStorage.setItem("token", mockGoogleUser.token);
      localStorage.setItem("email", mockGoogleUser.email);
      localStorage.setItem("role", mockGoogleUser.role);
      localStorage.setItem("user", JSON.stringify(mockGoogleUser));
      localStorage.setItem("isLoggedIn", "true");
      
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
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
                <a href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>
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
                className="google-btn"
                onClick={handleGoogleLogin}
                disabled={!agreedToTerms}
              >
                <span className="social-icon">🔍</span>
                Google
              </button>
              <button
                className="apple-btn"
                onClick={() => {}}
                disabled={!agreedToTerms}
              >
                <span className="social-icon">🍎</span>
                Apple
              </button>
            </div>

            {/* Register Link */}
            <div className="register-section">
              <p>
                Don't have an account?{' '}
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
            <p>© 2024 FreshCart • Freshness Guaranteed</p>
            <div className="footer-fruits">
              <span>🍎</span>
              <span>🥕</span>
              <span>🍓</span>
              <span>🥑</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;