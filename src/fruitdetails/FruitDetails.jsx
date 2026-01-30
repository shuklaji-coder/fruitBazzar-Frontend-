import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { StoreContext } from "../context/StoreContext";

const FruitDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(StoreContext);

  const [fruit, setFruit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchFruitDetails = async () => {
      try {
        const response = await api.get(`/fruit/${id}`);
        setFruit(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching fruit details:", err);
        setError("Failed to load fruit details");
        setLoading(false);
      }
    };

    fetchFruitDetails();
  }, [id]);

  // ✅ ONLY ADD TO CART (NO REDIRECT)
  const handleAddToCart = () => {
    addToCart(fruit.id);
    alert("Item added to cart 🛒");
  };

  // ✅ BUY NOW → DIRECT CHECKOUT
  const handleBuyNow = () => {
    addToCart(fruit.id);
    navigate("/checkout");
  };

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;
  if (!fruit) return <h3 className="text-center mt-5">Not Found</h3>;

  return (
    <div className="container mt-5">
      <div className="row p-4 shadow rounded bg-white">

        {/* IMAGE */}
        <div className="col-md-5 text-center">
          <img
            src={fruit.imageUrl || "/FRUITS.jpg"}
            alt={fruit.name}
            className="img-fluid rounded"
          />
        </div>

        {/* DETAILS */}
        <div className="col-md-7">
          <h2>{fruit.name}</h2>
          <span className="badge bg-primary">{fruit.category}</span>

          <h4 className="text-success mt-2">
            ₹{fruit.pricePerKg} / kg
          </h4>

          {/* ⭐ Rating */}
          <div className="mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{
                  cursor: "pointer",
                  fontSize: "22px",
                  color: star <= rating ? "gold" : "gray",
                }}
              >
                ★
              </span>
            ))}
            <span className="ms-2">({rating}/5)</span>
          </div>

          <p className="mt-3">{fruit.description}</p>

          {/* BUTTONS */}
          <div className="d-flex gap-3 mt-4 flex-wrap">
            <button className="btn btn-success" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>

            <button className="btn btn-warning" onClick={handleBuyNow}>
              🛍️ Buy Now
            </button>

            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate(-1)}
            >
              ⬅ Back
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FruitDetails;
