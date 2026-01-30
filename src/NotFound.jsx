import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <p>Let's get you back to some fresh fruits and vegetables! 🥭🥬</p>
        
        <div className="not-found-actions">
          <Link to="/" className="btn-primary">
            🏠 Go Home
          </Link>
          <Link to="/explore" className="btn-secondary">
            🛒 Shop Now
          </Link>
        </div>
        
        <div className="not-found-illustration">
          <div className="fruit-animation">
            🍎🥕🍊🥒🍇
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
