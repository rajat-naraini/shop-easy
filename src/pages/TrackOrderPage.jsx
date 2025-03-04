// TrackOrderPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function TrackOrderPage() {
  // State for order search
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [orderFound, setOrderFound] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Sample order data (in a real app, this would come from an API)
  const sampleOrder = {
    orderNumber: 'ORD-123456',
    email: 'customer@example.com',
    status: 'In Transit',
    orderDate: 'February 15, 2025',
    estimatedDelivery: 'February 20, 2025',
    trackingNumber: 'TRK987654321',
    carrier: 'FedEx',
    items: [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        image: 'https://via.placeholder.com/60',
        price: 79.99,
        quantity: 1
      },
      {
        id: 2,
        name: 'Smartphone Fast Charger',
        image: 'https://via.placeholder.com/60',
        price: 24.99,
        quantity: 2
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States'
    },
    timeline: [
      { status: 'Order Placed', date: 'February 15, 2025', time: '10:30 AM', description: 'Your order has been received' },
      { status: 'Payment Confirmed', date: 'February 15, 2025', time: '10:35 AM', description: 'Payment has been successfully processed' },
      { status: 'Processing', date: 'February 16, 2025', time: '9:15 AM', description: 'Your order is being prepared for shipping' },
      { status: 'Shipped', date: 'February 17, 2025', time: '2:45 PM', description: 'Your order has been shipped' },
      { status: 'In Transit', date: 'February 18, 2025', time: '8:20 AM', description: 'Your order is on the way' },
      { status: 'Out for Delivery', completed: false },
      { status: 'Delivered', completed: false }
    ]
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    
    if (!orderNumber.trim()) {
      newErrors.orderNumber = 'Order number is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSearching(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        // In a real app, you would check if the order exists
        // For demo, we'll just check if the order number matches our sample
        if (orderNumber.toUpperCase() === sampleOrder.orderNumber) {
          setOrderFound(true);
          setOrderDetails(sampleOrder);
        } else {
          setOrderFound(false);
          setOrderDetails(null);
        }
        setIsSearching(false);
      }, 1500);
    }
  };

  // Function to render appropriate status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Order Placed':
        return <span className="badge bg-info">Order Placed</span>;
      case 'Payment Confirmed':
        return <span className="badge bg-success">Payment Confirmed</span>;
      case 'Processing':
        return <span className="badge bg-primary">Processing</span>;
      case 'Shipped':
        return <span className="badge bg-primary">Shipped</span>;
      case 'In Transit':
        return <span className="badge bg-primary">In Transit</span>;
      case 'Out for Delivery':
        return <span className="badge bg-warning text-dark">Out for Delivery</span>;
      case 'Delivered':
        return <span className="badge bg-success">Delivered</span>;
      default:
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h1 className="mb-4">Track Your Order</h1>

          {/* Order Search Form */}
          <div className="card border-0 shadow-sm mb-5">
            <div className="card-body p-4">
              <p className="mb-4">
                Enter your order number and email address to track your order status.
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-5 mb-3 mb-md-0">
                    <label htmlFor="orderNumber" className="form-label">Order Number*</label>
                    <input
                      type="text"
                      className={`form-control ${errors.orderNumber ? 'is-invalid' : ''}`}
                      id="orderNumber"
                      placeholder="e.g. ORD-123456"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                    />
                    {errors.orderNumber && (
                      <div className="invalid-feedback">{errors.orderNumber}</div>
                    )}
                  </div>
                  
                  <div className="col-md-5 mb-3 mb-md-0">
                    <label htmlFor="email" className="form-label">Email Address*</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  
                  <div className="col-md-2 d-flex align-items-end">
                    <button 
                      type="submit" 
                      className="btn btn-primary w-100" 
                      disabled={isSearching}
                    >
                      {isSearching ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Tracking...
                        </>
                      ) : (
                        'Track'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Details (displayed when an order is found) */}
          {orderFound && orderDetails && (
            <div className="order-details">
              {/* Order Status Header */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <h5 className="mb-1">Order #{orderDetails.orderNumber}</h5>
                      <p className="mb-0 text-muted">
                        Placed on {orderDetails.orderDate}
                      </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <div className="mb-2">
                        {getStatusBadge(orderDetails.status)}
                      </div>
                      <p className="mb-0">
                        Estimated delivery: <strong>{orderDetails.estimatedDelivery}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Tracking Timeline */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Shipping Progress</h5>
                </div>
                <div className="card-body p-4">
                  {orderDetails.trackingNumber && (
                    <div className="mb-4">
                      <p className="mb-1">
                        <strong>Tracking Number:</strong> {orderDetails.trackingNumber}
                      </p>
                      <p className="mb-0">
                        <strong>Carrier:</strong> {orderDetails.carrier}
                      </p>
                    </div>
                  )}
                  
                  <div className="timeline">
                    {orderDetails.timeline.map((event, index) => (
                      <div 
                        key={index} 
                        className={`timeline-item ${!event.completed === false ? 'completed' : 'pending'}`}
                      >
                        <div className="timeline-line"></div>
                        <div className="timeline-content">
                          <div className={`timeline-dot ${!event.completed === false ? 'bg-primary' : 'bg-light border'}`}></div>
                          <div className="ps-4 pb-4">
                            <div className="d-flex justify-content-between mb-1">
                              <h6 className={!event.completed === false ? 'mb-0' : 'text-muted mb-0'}>
                                {event.status}
                              </h6>
                              {event.date && (
                                <span className="text-muted small">
                                  {event.date} {event.time && `at ${event.time}`}
                                </span>
                              )}
                            </div>
                            {event.description && (
                              <p className="mb-0 text-muted small">{event.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Shipping Address</h5>
                </div>
                <div className="card-body">
                  <p className="mb-0">
                    {orderDetails.shippingAddress.name}<br />
                    {orderDetails.shippingAddress.address}<br />
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zip}<br />
                    {orderDetails.shippingAddress.country}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Order Items</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th scope="col" className="py-3">Product</th>
                          <th scope="col" className="py-3 text-center">Quantity</th>
                          <th scope="col" className="py-3 text-end">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderDetails.items.map(item => (
                          <tr key={item.id}>
                            <td className="py-3">
                              <div className="d-flex align-items-center">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="me-3 rounded" 
                                  width="60" 
                                  height="60"
                                  style={{ objectFit: 'cover' }}
                                />
                                <div>
                                  <h6 className="mb-0">{item.name}</h6>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 text-center">{item.quantity}</td>
                            <td className="py-3 text-end">${(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-between">
                <Link to="/" className="btn btn-outline-primary">
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Home
                </Link>
                <a href={`mailto:support@shopeasy.com?subject=Help with order ${orderDetails.orderNumber}`} className="btn btn-primary">
                  <i className="bi bi-envelope me-2"></i>
                  Need Help?
                </a>
              </div>
            </div>
          )}

          {/* Order Not Found Message */}
          {!isSearching && !orderFound && orderNumber && (
            <div className="alert alert-warning" role="alert">
              <h4 className="alert-heading">Order Not Found</h4>
              <p>We couldn't find an order with the information provided. Please check your order number and email address and try again.</p>
              <hr />
              <p className="mb-0">If you continue to experience issues, please contact our customer support team for assistance.</p>
            </div>
          )}

          {/* Help Card (shown before search) */}
          {!orderFound && !orderNumber && (
            <div className="row mt-5">
              <div className="col-md-6 mb-4 mb-md-0">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-question-circle text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                    <h5 className="card-title">Can't Find Your Order?</h5>
                    <p className="card-text">If you can't find your order or need assistance with tracking, our customer support team is here to help.</p>
                    <a href="mailto:support@shopeasy.com" className="btn btn-outline-primary">
                      Contact Support
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-person-circle text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                    <h5 className="card-title">Have an Account?</h5>
                    <p className="card-text">Sign in to your account to easily track all your orders and manage your purchases.</p>
                    <Link to="/login" className="btn btn-outline-primary">
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for timeline */}
      <style>{`
        .timeline {
          position: relative;
        }
        
        .timeline-item {
          position: relative;
        }
        
        .timeline-item:last-child .timeline-line {
          display: none;
        }
        
        .timeline-line {
          position: absolute;
          left: 0.5rem;
          top: 1.5rem;
          bottom: 0;
          width: 1px;
          background-color: #dee2e6;
          transform: translateX(-50%);
        }
        
        .timeline-content {
          position: relative;
          padding-left: 1.5rem;
          display: flex;
        }
        
        .timeline-dot {
          position: absolute;
          left: 0;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background-color: #dee2e6;
          border: 1px solid #fff;
          z-index: 1;
          transform: translateX(-50%);
        }
        
        .timeline-item.completed .timeline-dot {
          background-color: #0d6efd;
        }
        
        .timeline-item.pending .timeline-content {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}

export default TrackOrderPage;