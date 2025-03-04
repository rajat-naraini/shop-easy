// CartPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cartItems, getTotalPrice, getTotalItems } = useCart();

  // Calculate shipping cost (free shipping over $50)
  const calculateShipping = () => {
    const subtotal = getTotalPrice();
    return subtotal >= 50 ? 0 : 5.99;
  };

  // Calculate tax (10%)
  const calculateTax = () => {
    return getTotalPrice() * 0.1;
  };

  // Calculate order total
  const calculateTotal = () => {
    return getTotalPrice() + calculateShipping() + calculateTax();
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-4">
            <i className="bi bi-cart-x fs-1 text-muted"></i>
          </div>
          <h2 className="mb-4">Your Cart is Empty</h2>
          <p className="mb-4">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8 mb-4 mb-lg-0">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-white py-3">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h5 className="mb-0">Product Details</h5>
                  </div>
                  <div className="col-md-2 text-center">
                    <h5 className="mb-0">Price</h5>
                  </div>
                  <div className="col-md-2 text-center">
                    <h5 className="mb-0">Quantity</h5>
                  </div>
                  <div className="col-md-2 text-center">
                    <h5 className="mb-0">Total</h5>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                {cartItems.map(item => (
                  <div key={item.id} className="row align-items-center p-3 border-bottom mx-0">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <div className="d-flex align-items-center">
                        <Link to={`/products/${item.id}`}>
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="cart-item-image me-3"
                          />
                        </Link>
                        <div>
                          <Link 
                            to={`/products/${item.id}`}
                            className="text-decoration-none text-dark"
                          >
                            <h6 className="mb-1">{item.name}</h6>
                          </Link>
                          <p className="mb-1 text-muted small">
                            Category: {item.category}
                          </p>
                          <button 
                            className="btn btn-sm text-danger p-0 border-0 bg-transparent"
                            onClick={() => useCart().removeFromCart(item.id)}
                          >
                            <i className="bi bi-trash me-1"></i> Remove
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
                          onClick={() => useCart().updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control text-center"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            useCart().updateQuantity(item.id, value < 1 ? 1 : value);
                          }}
                          min="1"
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => useCart().updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2 text-center fw-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-footer bg-white d-flex justify-content-between py-3">
                <Link to="/products" className="btn btn-outline-primary">
                  <i className="bi bi-arrow-left me-2"></i>
                  Continue Shopping
                </Link>
                <button 
                  className="btn btn-outline-danger"
                  onClick={() => useCart().clearCart()}
                >
                  <i className="bi bi-trash me-2"></i>
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <span>Items ({getTotalItems()}):</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping:</span>
                  {calculateShipping() === 0 ? (
                    <span className="text-success">Free</span>
                  ) : (
                    <span>${calculateShipping().toFixed(2)}</span>
                  )}
                </div>
                
                <div className="d-flex justify-content-between mb-3">
                  <span>Estimated Tax:</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
                
                {getTotalPrice() < 50 && (
                  <div className="alert alert-info text-center mb-3" role="alert">
                    <i className="bi bi-info-circle me-2"></i>
                    Add ${(50 - getTotalPrice()).toFixed(2)} more to get FREE shipping!
                  </div>
                )}
                
                <div className="input-group mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Promo code"
                  />
                  <button className="btn btn-outline-secondary" type="button">
                    Apply
                  </button>
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between mb-3 fw-bold">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                
                <Link to="/checkout" className="btn btn-primary w-100">
                  Proceed to Checkout
                </Link>
                
                <div className="mt-3 text-center">
                  <div className="d-flex justify-content-center gap-2">
                    <i className="bi bi-credit-card fs-5"></i>
                    <i className="bi bi-paypal fs-5"></i>
                    <i className="bi bi-wallet2 fs-5"></i>
                  </div>
                  <small className="text-muted">Secure Payment Options</small>
                </div>
              </div>
            </div>
            
            <div className="card border-0 shadow-sm mt-4">
              <div className="card-body">
                <h6 className="mb-3">Need Help?</h6>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <i className="bi bi-question-circle me-2"></i>
                    <a href="#" className="text-decoration-none">Shipping Policy</a>
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-arrow-return-left me-2"></i>
                    <a href="#" className="text-decoration-none">Return Policy</a>
                  </li>
                  <li>
                    <i className="bi bi-headset me-2"></i>
                    <a href="#" className="text-decoration-none">Contact Support</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {cartItems.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-4">You Might Also Like</h3>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            {/* This would typically come from your product recommendations */}
            {[10, 14, 16, 19].map(id => {
              const product = id <= 20 ? 
                {
                  id,
                  name: `Product ${id}`,
                  price: Math.floor(Math.random() * 100) + 10,
                  image: "https://via.placeholder.com/300",
                } : null;
              
              if (!product) return null;
              
              return (
                <div key={id} className="col">
                  <div className="card h-100 border-0 shadow-sm">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="card-img-top product-image"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text text-primary fw-bold">${product.price.toFixed(2)}</p>
                      <div className="d-flex justify-content-between">
                        <Link to={`/products/${product.id}`} className="btn btn-outline-secondary btn-sm">
                          View
                        </Link>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => useCart().addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;