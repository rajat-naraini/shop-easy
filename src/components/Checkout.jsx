import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number is invalid';
    }
    if (!formData.expDate.trim()) newErrors.expDate = 'Expiration date is required';
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would process the payment here
      alert('Order placed successfully!');
      clearCart();
      navigate('/');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-5">
        <h2 className="mb-4">No Items in Cart</h2>
        <p className="mb-4">Your cart is empty. Please add items before checkout.</p>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/products')}
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Checkout</h2>
      
      <div className="row">
        <div className="col-md-8 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Shipping Information</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && (
                      <div className="invalid-feedback">{errors.lastName}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                      type="text"
                      className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                    {errors.city && (
                      <div className="invalid-feedback">{errors.city}</div>
                    )}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <input
                      type="text"
                      className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                    {errors.state && (
                      <div className="invalid-feedback">{errors.state}</div>
                    )}
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="zip" className="form-label">ZIP</label>
                    <input
                      type="text"
                      className={`form-control ${errors.zip ? 'is-invalid' : ''}`}
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                    />
                    {errors.zip && (
                      <div className="invalid-feedback">{errors.zip}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Payment Information</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="cardName" className="form-label">Name on Card</label>
                  <input
                    type="text"
                    className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                  />
                  {errors.cardName && (
                    <div className="invalid-feedback">{errors.cardName}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">Credit Card Number</label>
                  <input
                    type="text"
                    className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                  />
                  {errors.cardNumber && (
                    <div className="invalid-feedback">{errors.cardNumber}</div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="expDate" className="form-label">Expiration Date</label>
                    <input
                      type="text"
                      className={`form-control ${errors.expDate ? 'is-invalid' : ''}`}
                      id="expDate"
                      name="expDate"
                      value={formData.expDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                    />
                    {errors.expDate && (
                      <div className="invalid-feedback">{errors.expDate}</div>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cvv" className="form-label">CVV</label>
                    <input
                      type="text"
                      className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                    />
                    {errors.cvv && (
                      <div className="invalid-feedback">{errors.cvv}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary btn-lg">
                Place Order
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              {cartItems.map(item => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Shipping:</span>
                <span>$0.00</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Tax:</span>
                <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;