import React, { useContext, useMemo } from "react";
import { StoreContext } from  "../../context/StoreContext";
import FruitItem from "../FoodItem/FruitItem";
import "./FoodDisplay.css";

const FoodDisplay = ({ searchQuery = '', category = 'all', sortBy = 'default' }) => {
  const { fruits: FruitList = [] } = useContext(StoreContext) || {};

  // Filter and sort products
  const filteredAndSortedFruits = useMemo(() => {
    let filtered = [...FruitList];

    // Search filter - use debounced query for better performance
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(fruit =>
        fruit.name?.toLowerCase().includes(query) ||
        fruit.description?.toLowerCase().includes(query) ||
        fruit.category?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (category !== 'all') {
      filtered = filtered.filter(fruit =>
        fruit.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.pricePerKg || 0) - (b.pricePerKg || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.pricePerKg || 0) - (a.pricePerKg || 0));
        break;
      case 'name':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      default:
        break;
    }

    return filtered;
  }, [FruitList, searchQuery, category, sortBy]);

  // Helper function to determine if item is seasonal, bestseller, or has discount
  const getItemFlags = (fruit, index) => {
    // Simulate some items as seasonal, bestseller, or with discount
    // In a real app, this would come from the backend
    const isSeasonal = index % 5 === 0 || fruit.category?.toLowerCase().includes('seasonal');
    const isBestseller = index % 7 === 0 || index < 3;
    const discount = index % 4 === 0 ? 15 : null;
    
    return { isSeasonal, isBestseller, discount };
  };

  return (
    <div className="container">
      {filteredAndSortedFruits.length > 0 ? (
        <>
          <div className="products-header">
            <h2 className="products-title">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Our Products'}
            </h2>
            <p className="products-count">
              {filteredAndSortedFruits.length} {filteredAndSortedFruits.length === 1 ? 'item' : 'items'} found
            </p>
          </div>
          <div className="row">
            {filteredAndSortedFruits.map((fruit, index) => {
              const flags = getItemFlags(fruit, index);
              return (
                <FruitItem
                  key={fruit.id || index}
                  name={fruit.name}
                  description={fruit.description}
                  id={fruit.id}
                  imageUrl={fruit.imageUrl}
                  pricePerKg={fruit.pricePerKg}
                  isSeasonal={flags.isSeasonal}
                  isBestseller={flags.isBestseller}
                  discount={flags.discount}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="no-products">
          <div className="no-products-icon">🍎</div>
          <h3>No items found 🍎</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
