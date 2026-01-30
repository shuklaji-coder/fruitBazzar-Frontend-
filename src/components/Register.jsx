import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const navigate = useNavigate();

  // Password strength calculator
  const calculatePasswordStrength = (password) => {
    if (!password) return { strength: 0, text: "", color: "" };

    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    strength = Object.values(checks).filter(Boolean).length;

    const strengthLevels = {
      0: { text: "Very Weak", color: "#ef4444" },
      1: { text: "Weak", color: "#f59e0b" },
      2: { text: "Fair", color: "#eab308" },
      3: { text: "Good", color: "#84cc16" },
      4: { text: "Strong", color: "#22c55e" },
      5: { text: "Very Strong", color: "#10b981" }
    };

    return { strength, ...strengthLevels[strength] };
  };

  const passwordStrength = calculatePasswordStrength(form.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  const handleGoogleRegister = () => {
    if (!agreedToTerms) {
      setError("Please agree to Terms & Privacy Policy");
      return;
    }

    setError("");
    setIsLoading(true);

    // Mock Google registration for demo
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

  const handleRegister = async () => {
    setError("");

    // Validation
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email");
      return;
    }

    // Password validation
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreedToTerms) {
      setError("Please agree to Terms & Privacy");
      return;
    }

    setIsLoading(true);

    try {
      await api.post('/api/auth/register', {
        name: form.username,
        email: form.email,
        password: form.password
      });

      // Show success feedback
      setShowSuccess(true);

      // Navigate after success
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError("Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <div className="register-background">
      {/* Background Image with Overlay */}
      <div className="bg-overlay"></div>

      {/* Register Card */}
      <div className="register-card-container">
        <div className="register-card">
          {/* Success Toast */}
          {showSuccess && (
            <div className="success-toast">
              <i className="bi bi-check-circle-fill"></i>
              <span>Account created successfully 🎉</span>
            </div>
          )}

          {/* Logo */}
          <div className="logo-header">
            <div className="logo">
              <span className="logo-icon">🥬</span>
              <span className="logo-text">FreshCart</span>
            </div>
            <p className="welcome-text">Join us for fresh groceries</p>
          </div>

          {/* Form */}
          <div className="register-form">
            {/* Full Name Input */}
            <div className="input-group">
              <label htmlFor="username">
                <span className="label-icon">👤</span>
                Full Name
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter your full name"
                className={error && !form.username ? 'error-input' : ''}
              />
            </div>

            {/* Email Input */}
            <div className="input-group">
              <label htmlFor="email">
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="your@email.com"
                className={error && !form.email ? 'error-input' : ''}
              />
            </div>

            {/* Password Input */}
            <div className="input-group">
              <label htmlFor="password">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <div className="password-input">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Create a password"
                  className={error && !form.password ? 'error-input' : ''}
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

            {/* Password Strength Indicator */}
            {form.password && (
              <div className="password-strength">
                <div className="strength-label">
                  <span>Password Strength:</span>
                  <span style={{ color: passwordStrength.color, fontWeight: 600 }}>
                    {passwordStrength.text}
                  </span>
                </div>
                <div className="strength-bar">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className={`strength-segment ${index < passwordStrength.strength ? 'active' : ''}`}
                      style={{
                        backgroundColor: index < passwordStrength.strength ? passwordStrength.color : '#e5e7eb'
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Confirm Password Input */}
            <div className="input-group">
              <label htmlFor="confirmPassword">
                <span className="label-icon">🔒</span>
                Confirm Password
              </label>
              <div className="password-input">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Confirm your password"
                  className={error && !form.confirmPassword ? 'error-input' : ''}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
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

            {/* Register Button */}
            <button
              className={`register-button ${isLoading ? 'loading' : ''}`}
              onClick={handleRegister}
              disabled={isLoading || !agreedToTerms}
            >
              {isLoading ? (
                <>
                  <span className="button-spinner"></span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
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
                onClick={handleGoogleRegister}
                disabled={!agreedToTerms}
              >
                <span className="social-icon">🔍</span>
                Google
              </button>
              <button
                className="apple-btn"
                onClick={() => { }}
                disabled={!agreedToTerms}
              >
                <span className="social-icon">🍎</span>
                Apple
              </button>
            </div>

            {/* Login Link */}
            <div className="login-section">
              <p>
                Already have an account?{' '}
                <button
                  className="login-btn"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            <p>© 2024 FreshCart • Freshness Guaranteed</p>
            <div className="footer-fruits">
              <span>🍅</span>
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

export default Register;