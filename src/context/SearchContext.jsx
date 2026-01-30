import { createContext, useState, useContext, useCallback, useEffect } from "react";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search query with 300ms delay
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setDebouncedQuery("");
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Clear search functionality
  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setDebouncedQuery("");
    setIsSearching(false);
  }, []);

  // Handle search input change
  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  return (
    <SearchContext.Provider value={{ 
      searchQuery, 
      debouncedQuery,
      isSearching,
      setSearchQuery: handleSearchChange,
      clearSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    return { 
      searchQuery: "", 
      debouncedQuery: "",
      isSearching: false,
      setSearchQuery: () => {}, 
      clearSearch: () => {} 
    };
  }
  return context;
};

