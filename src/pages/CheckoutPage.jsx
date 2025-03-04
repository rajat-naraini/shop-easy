// CheckoutPage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, getTotalItems, clearCart } = useCart();
  
  // Customer information state
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    saveInfo: false
  });
  
  // Shipping method state
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  // Payment information state
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    sameAsShipping: true
  });
  
  // Billing address state (if different from shipping)
  const [billingAddress, setBillingAddress] = useState({
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: ''
  });
  
  // Order summary calculations
  const calculateShipping = () => {
    if (shippingMethod === 'express') return 12.99;
    if (shippingMethod === 'nextDay') return 19.99;
    return getTotalPrice() >= 50 ? 0 : 5.99; // standard shipping
  };
  
  const calculateTax = () => getTotalPrice() * 0.1;
  
  const calculateTotal = () => getTotalPrice() + calculateShipping() + calculateTax();
  
  // Form validation state
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Check if cart is empty and redirect to products if it is
  useEffect(() => {
    if (cartItems.length === 0 && !formSubmitted) {
      navigate('/products');
    }
  }, [cartItems, navigate, formSubmitted]);
  
  // Handle customer info input change
  const handleCustomerInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle payment info input change
  const handlePaymentInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle billing address input change
  const handleBillingAddressChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Validate customer info
    if (!customerInfo.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) newErrors.email = 'Email is invalid';
    
    if (!customerInfo.firstName) newErrors.firstName = 'First name is required';
    if (!customerInfo.lastName) newErrors.lastName = 'Last name is required';
    if (!customerInfo.address) newErrors.address = 'Address is required';
    if (!customerInfo.city) newErrors.city = 'City is required';
    if (!customerInfo.state) newErrors.state = 'State is required';
    if (!customerInfo.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!customerInfo.phone) newErrors.phone = 'Phone number is required';
    
    // Validate payment info
    if (!paymentInfo.cardName) newErrors.cardName = 'Name on card is required';
    
    if (!paymentInfo.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!paymentInfo.expDate) {
      newErrors.expDate = 'Expiration date is required';
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(paymentInfo.expDate)) {
      newErrors.expDate = 'Expiration date must be in MM/YY format';
    }
    
    if (!paymentInfo.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    
    // Validate billing address if different from shipping
    if (!paymentInfo.sameAsShipping) {
      if (!billingAddress.address) newErrors.billingAddress = 'Billing address is required';
      if (!billingAddress.city) newErrors.billingCity = 'Billing city is required';
      if (!billingAddress.state) newErrors.billingState = 'Billing state is required';
      if (!billingAddress.zipCode) newErrors.billingZipCode = 'Billing ZIP code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setFormSubmitted(true);
      
      // In a real app, you would process the payment here
      // For demo purposes, we'll simulate an order confirmation
      setTimeout(() => {
        clearCart();
        navigate('/checkout/success', { 
          state: { 
            orderNumber: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
            total: calculateTotal()
          } 
        });
      }, 1500);
    } else {
      // Scroll to the first error
      const firstError = document.querySelector('.is-invalid');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
  
  // If form was submitted, show loading
  if (formSubmitted) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Processing order...</span>
        </div>
        <h2 className="mt-3">Processing Your Order</h2>
        <p>Please wait while we process your payment and finalize your order.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="mb-3">Checkout</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/cart" className="text-decoration-none">Cart</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Checkout</li>
            </ol>
          </nav>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Left Side - Form Fields */}
          <div className="col-lg-8 mb-4 mb-lg-0">
            {/* Contact Information */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0">
                  <i className="bi bi-person me-2"></i>
                  Contact Information
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address*</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleCustomerInfoChange}
                    placeholder="your@email.com"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number*</label>
                  <input
                    type="tel"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    id="phone"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleCustomerInfoChange}
                    placeholder="(123) 456-7890"
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="saveInfo"
                    name="saveInfo"
                    checked={customerInfo.saveInfo}
                    onChange={handleCustomerInfoChange}
                  />
                  <label className="form-check-label" htmlFor="saveInfo">
                    Save this information for next time
                  </label>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0">
                  <i className="bi bi-truck me-2"></i>
                  Shipping Address
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label">First Name*</label>
                    <input
                      type="text"
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      id="firstName"
                      name="firstName"
                      value={customerInfo.firstName}
                      onChange={handleCustomerInfoChange}
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name*</label>
                    <input
                      type="text"
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      id="lastName"
                      name="lastName"
                      value={customerInfo.lastName}
                      onChange={handleCustomerInfoChange}
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address*</label>
                  <input
                    type="text"
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    id="address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleCustomerInfoChange}
                    placeholder="1234 Main St"
                  />
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="apartment" className="form-label">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="apartment"
                    name="apartment"
                    value={customerInfo.apartment}
                    onChange={handleCustomerInfoChange}
                    placeholder="Apartment or suite"
                  />
                </div>

                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="city" className="form-label">City*</label>
                    <input
                      type="text"
                      className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                      id="city"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleCustomerInfoChange}
                    />
                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="state" className="form-label">State*</label>
                    <input
                      type="text"
                      className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                      id="state"
                      name="state"
                      value={customerInfo.state}
                      onChange={handleCustomerInfoChange}
                    />
                    {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="zipCode" className="form-label">ZIP*</label>
                    <input
                      type="text"
                      className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                      id="zipCode"
                      name="zipCode"
                      value={customerInfo.zipCode}
                      onChange={handleCustomerInfoChange}
                    />
                    {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0">
                  <i className="bi bi-box me-2"></i>
                  Shipping Method
                </h5>
              </div>
              <div className="card-body">
                <div className="form-check mb-3 border p-3 rounded">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="shippingMethod"
                    id="standard"
                    value="standard"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                  />
                  <label className="form-check-label w-100" htmlFor="standard">
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>Standard Shipping</strong>
                        <p className="mb-0 text-muted small">Delivery in 3-5 business days</p>
                      </div>
                      <span>
                        {getTotalPrice() >= 50 ? 'Free' : `$5.99`}
                      </span>
                    </div>
                  </label>
                </div>

                <div className="form-check mb-3 border p-3 rounded">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="shippingMethod"
                    id="express"
                    value="express"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                  />
                  <label className="form-check-label w-100" htmlFor="express">
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>Express Shipping</strong>
                        <p className="mb-0 text-muted small">Delivery in 2-3 business days</p>
                      </div>
                      <span>$12.99</span>
                    </div>
                  </label>
                </div>

                <div className="form-check border p-3 rounded">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="shippingMethod"
                    id="nextDay"
                    value="nextDay"
                    checked={shippingMethod === 'nextDay'}
                    onChange={() => setShippingMethod('nextDay')}
                  />
                  <label className="form-check-label w-100" htmlFor="nextDay">
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>Next Day Delivery</strong>
                        <p className="mb-0 text-muted small">Delivery by tomorrow</p>
                      </div>
                      <span>$19.99</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0">
                  <i className="bi bi-credit-card me-2"></i>
                  Payment Information
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="cardName" className="form-label">Name on Card*</label>
                  <input
                    type="text"
                    className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                    id="cardName"
                    name="cardName"
                    value={paymentInfo.cardName}
                    onChange={handlePaymentInfoChange}
                  />
                  {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">Card Number*</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentInfoChange}
                      placeholder="XXXX XXXX XXXX XXXX"
                      maxLength="19"
                    />
                    <span className="input-group-text">
                      <i className="bi bi-credit-card"></i>
                    </span>
                    {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="expDate" className="form-label">Expiration Date*</label>
                    <input
                      type="text"
                      className={`form-control ${errors.expDate ? 'is-invalid' : ''}`}
                      id="expDate"
                      name="expDate"
                      value={paymentInfo.expDate}
                      onChange={handlePaymentInfoChange}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                    {errors.expDate && <div className="invalid-feedback">{errors.expDate}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cvv" className="form-label">CVV*</label>
                    <input
                      type="text"
                      className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                      id="cvv"
                      name="cvv"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentInfoChange}
                      placeholder="123"
                      maxLength="4"
                    />
                    {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="sameAsShipping"
                      name="sameAsShipping"
                      checked={paymentInfo.sameAsShipping}
                      onChange={handlePaymentInfoChange}
                    />
                    <label className="form-check-label" htmlFor="sameAsShipping">
                      Billing address is the same as shipping address
                    </label>
                  </div>
                </div>

                {/* Billing Address (if different from shipping) */}
                {!paymentInfo.sameAsShipping && (
                  <div className="billing-address border-top pt-3">
                    <h6 className="mb-3">Billing Address</h6>
                    
                    <div className="mb-3">
                      <label htmlFor="billingAddress" className="form-label">Address*</label>
                      <input
                        type="text"
                        className={`form-control ${errors.billingAddress ? 'is-invalid' : ''}`}
                        id="billingAddress"
                        name="address"
                        value={billingAddress.address}
                        onChange={handleBillingAddressChange}
                      />
                      {errors.billingAddress && <div className="invalid-feedback">{errors.billingAddress}</div>}
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="billingApartment" className="form-label">
                        Apartment, suite, etc. (optional)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="billingApartment"
                        name="apartment"
                        value={billingAddress.apartment}
                        onChange={handleBillingAddressChange}
                      />
                    </div>
                    
                    <div className="row">
                      <div className="col-md-5 mb-3">
                        <label htmlFor="billingCity" className="form-label">City*</label>
                        <input
                          type="text"
                          className={`form-control ${errors.billingCity ? 'is-invalid' : ''}`}
                          id="billingCity"
                          name="city"
                          value={billingAddress.city}
                          onChange={handleBillingAddressChange}
                        />
                        {errors.billingCity && <div className="invalid-feedback">{errors.billingCity}</div>}
                      </div>
                      <div className="col-md-4 mb-3">
                        <label htmlFor="billingState" className="form-label">State*</label>
                        <input
                          type="text"
                          className={`form-control ${errors.billingState ? 'is-invalid' : ''}`}
                          id="billingState"
                          name="state"
                          value={billingAddress.state}
                          onChange={handleBillingAddressChange}
                        />
                        {errors.billingState && <div className="invalid-feedback">{errors.billingState}</div>}
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="billingZipCode" className="form-label">ZIP*</label>
                        <input
                          type="text"
                          className={`form-control ${errors.billingZipCode ? 'is-invalid' : ''}`}
                          id="billingZipCode"
                          name="zipCode"
                          value={billingAddress.zipCode}
                          onChange={handleBillingAddressChange}
                        />
                        {errors.billingZipCode && <div className="invalid-feedback">{errors.billingZipCode}</div>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm mb-4 sticky-lg-top" style={{ top: '20px', zIndex: 10 }}>
              <div className="card-header bg-white py-3">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Items ({getTotalItems()}):</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
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
                
                <hr />
                
                <div className="d-flex justify-content-between mb-4 fw-bold">
                  <span>Order Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                
                <button 
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mb-3"
                >
                  Place Order
                </button>
                
                <p className="text-center text-muted small mb-0">
                  By placing your order, you agree to our <a href="#" className="text-decoration-none">Terms of Service</a> and <a href="#" className="text-decoration-none">Privacy Policy</a>
                </p>
              </div>
            </div>
            
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h6 className="mb-3">Order Details</h6>
                
                {cartItems.map(item => (
                  <div key={item.id} className="d-flex mb-3">
                    <div className="flex-shrink-0 position-relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="rounded" 
                        width="60" 
                        height="60" 
                        style={{ objectFit: 'cover' }}
                      />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-0">{item.name}</h6>
                      <p className="mb-0 text-muted small">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                
                <div className="mt-3">
                  <Link to="/cart" className="text-decoration-none">
                    Edit Cart <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;