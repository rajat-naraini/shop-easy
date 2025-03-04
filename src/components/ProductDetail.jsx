// ProductDetail.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value < 1 ? 1 : value);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (!product) {
    return <div className="text-center py-5">Product not found</div>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded product-detail-image"
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-3">{product.name}</h2>
          <p className="fs-4 text-primary fw-bold mb-3">${product.price.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>
          
          <div className="d-flex align-items-center mb-4">
            <div className="input-group me-3" style={{ width: "130px" }}>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
              >
                -
              </button>
              <input
                type="number"
                className="form-control text-center"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>
            <button 
              className="btn btn-primary"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
          
          <div className="mb-4">
            <p className="mb-2"><strong>Category:</strong> {product.category}</p>
            {product.inStock ? (
              <span className="badge bg-success">In Stock</span>
            ) : (
              <span className="badge bg-danger">Out of Stock</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;