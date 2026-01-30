import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const FruitDisplay = () => {
  const { fruits = [] } = useContext(StoreContext) || {};

  return (
    <div className="container">
      <div className="row">
        {fruits && fruits.length > 0 ? (
          fruits.map((item) => (
            <div key={item.id || item.name} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
              <div className="card" style={{ maxWidth: "320px" }}>
                <img
                  src={item.image || "/FRUITS.jpg"}
                  className="card-img-top"
                  alt={item.name || "Product Image"}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name || "Product"}</h5>
                  <p className="card-text">{item.description || ""}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="h5 mb-0">{item.price ? `₹${item.price}` : ""}</span>
                    <div>
                      <i className="bi bi-star-fill text-warning"></i>
                      <i className="bi bi-star-fill text-warning"></i>
                      <i className="bi bi-star-fill text-warning"></i>
                      <i className="bi bi-star-fill text-warning"></i>
                      <i className="bi bi-star-half text-warning"></i>
                      <small className="text-muted">({item.rating ?? "4.5"})</small>
                    </div>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-between bg-light">
                  <button className="btn btn-primary btn-sm">Add to Cart</button>
                  <button className="btn btn-outline-secondary btn-sm"><i className="bi bi-heart"></i></button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-4">
            <h4>No food found.</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default FruitDisplay;
