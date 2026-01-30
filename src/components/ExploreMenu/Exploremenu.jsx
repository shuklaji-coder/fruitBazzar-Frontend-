import React from "react";
import "./Exploremenu.css";

const categories = [
  { name: "Fruits", img: "/FRUITS.jpg" },
  { name: "Vegetables", img: "/VEGETABLES.jpg" },
  { name: "Daily Needs", img: "/daily%20need.jpg" },
  { name: "Combos", img: "/combos.jpg" },
  { name: "Seasonal Picks", img: "/Seasonal%20fruits.jpg" },
  { name: "Organic", img: "/organic.jpg" },
  { name: "Root Vegetables", img: "/root%20vegetables.jpg" },
];

const Exploremenu = () => {
  return (
    <div className="explore-menu">
      <h2>Explore Our Menu</h2>
      <p>Explore curated lists of fresh fruits & vegetables</p>

      <div className="category-scroll">
        {categories.map((item, index) => (
          <div className="category-card" key={index}>
            <img src={item.img} alt={item.name} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exploremenu;
