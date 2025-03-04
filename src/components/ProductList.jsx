import React, { useState } from 'react';
import ProductCard from './ProductCard';

function ProductList({ products }) {
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('all');

  // Get unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesFilter = product.name.toLowerCase().includes(filter.toLowerCase()) ||
                          product.description.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    
    return matchesFilter && matchesCategory;
  });

  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="col">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No products found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;