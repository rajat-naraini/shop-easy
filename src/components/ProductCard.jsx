import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card h-100">
      <img 
        src={product.image} 
        className="card-img-top product-image" 
        alt={product.name} 
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-truncate">{product.description}</p>
        <p className="card-text text-primary fw-bold">${product.price.toFixed(2)}</p>
        <div className="mt-auto d-flex justify-content-between">
          <Link to={`/products/${product.id}`} className="btn btn-outline-secondary">
            Details
          </Link>
          <button 
            className="btn btn-primary" 
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;