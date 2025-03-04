import React from 'react';
import { useCart } from '../context/CartContext';

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    updateQuantity(item.id, value < 1 ? 1 : value);
  };

  return (
    <div className="row align-items-center py-3 border-bottom">
      <div className="col-md-6 mb-3 mb-md-0">
        <div className="d-flex align-items-center">
          <img 
            src={item.image} 
            alt={item.name} 
            className="cart-item-image me-3"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
          <div>
            <h6 className="mb-1">{item.name}</h6>
            <button 
              className="btn btn-sm btn-link text-danger p-0"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-2 text-center mb-3 mb-md-0">
        ${item.price.toFixed(2)}
      </div>
      <div className="col-md-2 text-center mb-3 mb-md-0">
        <div className="input-group input-group-sm mx-auto" style={{ maxWidth: "100px" }}>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
          <input
            type="number"
            className="form-control text-center"
            value={item.quantity}
            onChange={handleQuantityChange}
            min="1"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className="col-md-2 text-center fw-bold">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}

export default CartItem;

