import React from 'react';
import './HelpSection.css';

const HelpSection = () => {
  const handleCallClick = () => {
    window.open('tel:9580849709');
  };

  return (
    <div className="help-section">
      <div className="container">
        <div className="help-card">
          <div className="help-header">
            <h2>Need Help? 🤝</h2>
          </div>
          
          <div className="help-content">
            <div className="help-item" onClick={handleCallClick}>
              <div className="help-icon">
                <i className="bi bi-telephone-fill"></i>
              </div>
              <div className="help-info">
                <div className="help-label">Call us</div>
                <div className="help-value">9580849709</div>
              </div>
            </div>
            
            <div className="help-item">
              <div className="help-icon">
                <i className="bi bi-clock-fill"></i>
              </div>
              <div className="help-info">
                <div className="help-label">Available</div>
                <div className="help-value">9 AM – 9 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
