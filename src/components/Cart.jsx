import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';

function Cart() {
  const { cartItems, getTotalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-5">
        <h2 className="mb-4">Your Cart is Empty</h2>
        <p className="mb-4">Looks like you haven't added any products to your cart yet.</p>
        <Link to="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Shopping Cart</h2>
      
      <div className="card mb-4">
        <div className="card-header bg-white">
          <div className="row">
            <div className="col-md-6">Product</div>
            <div className="col-md-2 text-center">Price</div>
            <div className="col-md-2 text-center">Quantity</div>
            <div className="col-md-2 text-center">Total</div>
          </div>
        </div>
        <div className="card-body">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6 mb-4 mb-md-0">
          <button 
            className="btn btn-outline-danger"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <span>$0.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3 fw-bold">
                <span>Total:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="btn btn-primary w-100">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;