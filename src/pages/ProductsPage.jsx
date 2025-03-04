// ProductsPage.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { productsData } from '../data/products';

function ProductsPage() {
  const location = useLocation();
  const [products, setProducts] = useState(productsData);
  const [sortOption, setSortOption] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  
  // Get unique categories
  const categories = [...new Set(productsData.map(product => product.category))];
  
  // Parse query params on load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [location.search]);
  
  // Apply filters
  useEffect(() => {
    let filteredProducts = [...productsData];
    
    // Category filter
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Price range filter
    filteredProducts = filteredProducts.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // In stock filter
    if (inStockOnly) {
      filteredProducts = filteredProducts.filter(product => product.inStock);
    }
    
    // Sort products
    switch (sortOption) {
      case 'priceLow':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'nameAZ':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameZA':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting
        break;
    }
    
    setProducts(filteredProducts);
  }, [selectedCategories, priceRange, inStockOnly, sortOption]);
  
  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  // Handle price range change
  const handlePriceChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: Number(value)
    }));
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 500 });
    setInStockOnly(false);
    setSortOption('default');
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">All Products</h1>
      
      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-lg-3 mb-4 mb-lg-0">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Filters</h5>
                <button 
                  className="btn btn-sm btn-link text-decoration-none p-0"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
              </div>
              
              {/* Categories Filter */}
              <div className="mb-4">
                <h6 className="mb-3">Categories</h6>
                {categories.map(category => (
                  <div className="form-check mb-2" key={category}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <label className="form-check-label" htmlFor={`category-${category}`}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-4">
                <h6 className="mb-3">Price Range</h6>
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2">$</span>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    min="0"
                  />
                  <span className="mx-2">to</span>
                  <span className="me-2">$</span>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    min="0"
                  />
                </div>
              </div>
              
              {/* In Stock Filter */}
              <div className="mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inStockOnly"
                    checked={inStockOnly}
                    onChange={() => setInStockOnly(!inStockOnly)}
                  />
                  <label className="form-check-label" htmlFor="inStockOnly">
                    In Stock Only
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product List */}
        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <p className="mb-0">{products.length} products found</p>
            <div className="d-flex align-items-center">
              <label htmlFor="sortOptions" className="me-2">Sort by:</label>
              <select
                id="sortOptions"
                className="form-select form-select-sm"
                style={{ width: 'auto' }}
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="nameAZ">Name: A to Z</option>
                <option value="nameZA">Name: Z to A</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
          
          {/* Product grid */}
          {products.length > 0 ? (
            <ProductList products={products} />
          ) : (
            <div className="alert alert-info text-center">
              No products found matching your filters. Try adjusting your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;