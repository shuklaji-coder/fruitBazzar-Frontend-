import React, { useState, useEffect } from 'react';
import './ReviewsSection.css';

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
    orderId: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedReviews = localStorage.getItem('productReviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      const defaultReviews = [
        {
          id: '1',
          name: 'Rahul Sharma',
          email: 'rahul@example.com',
          rating: 5,
          comment: 'Amazing quality fruits and vegetables! Very fresh and delivered on time.',
          orderId: 'ORD12345',
          date: new Date('2024-01-15').toISOString(),
          verified: true
        },
        {
          id: '2',
          name: 'Priya Patel',
          email: 'priya@example.com',
          rating: 4,
          comment: 'Good quality products and reasonable prices. The delivery was quick.',
          orderId: 'ORD12346',
          date: new Date('2024-01-14').toISOString(),
          verified: true
        }
      ];
      setReviews(defaultReviews);
      localStorage.setItem('productReviews', JSON.stringify(defaultReviews));
    }
    setLoading(false);
  }, []);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    const review = {
      id: Date.now().toString(),
      ...newReview,
      date: new Date().toISOString(),
      verified: false
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('productReviews', JSON.stringify(updatedReviews));

    setNewReview({
      name: '',
      email: '',
      rating: 5,
      comment: '',
      orderId: ''
    });
    setShowAddForm(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (loading) {
    return <div className="reviews-section"><div className="loading">Loading reviews...</div></div>;
  }

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h2>Customer Reviews</h2>
        <div className="rating-summary">
          <div className="average-rating">
            <span className="rating-number">{averageRating}</span>
            <div className="stars">{renderStars(Math.round(averageRating))}</div>
            <span className="total-reviews">({reviews.length} reviews)</span>
          </div>
          <button className="add-review-btn" onClick={() => setShowAddForm(true)}>
            Write a Review
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="review-form-overlay">
          <div className="review-form">
            <div className="form-header">
              <h3>Write Your Review</h3>
              <button className="close-btn" onClick={() => setShowAddForm(false)}>×</button>
            </div>

            <form onSubmit={handleSubmitReview}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={newReview.email}
                    onChange={(e) => setNewReview({...newReview, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Order ID (Optional)</label>
                  <input
                    type="text"
                    value={newReview.orderId}
                    onChange={(e) => setNewReview({...newReview, orderId: e.target.value})}
                    placeholder="e.g., ORD12345"
                  />
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-btn ${star <= newReview.rating ? 'active' : ''}`}
                        onClick={() => setNewReview({...newReview, rating: star})}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Your Review</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  rows="4"
                  required
                  placeholder="Share your experience..."
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <div className="no-reviews">
            <div className="no-reviews-icon">📝</div>
            <h3>No reviews yet</h3>
            <p>Be the first to share your experience!</p>
            <button className="add-first-review-btn" onClick={() => setShowAddForm(true)}>
              Write First Review
            </button>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="reviewer-details">
                    <h4>{review.name}</h4>
                    <div className="review-meta">
                      <span className="review-date">
                        {new Date(review.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      {review.verified && (
                        <span className="verified-badge">✓ Verified Purchase</span>
                      )}
                      {review.orderId && (
                        <span className="order-id">Order: {review.orderId}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
              </div>
              <div className="review-content">
                <p>{review.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
