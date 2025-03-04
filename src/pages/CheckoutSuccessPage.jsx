// CheckoutSuccessPage.js
import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

function CheckoutSuccessPage() {
  const location = useLocation();
  const orderData = location.state;
  
  // If user navigates directly to this page without checkout flow, redirect to home
  if (!orderData) {
    return <Navigate to="/" />;
  }
  
  const { orderNumber, total } = orderData;
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body text-center p-5">
              <div className="mb-4">
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
              </div>
              <h1 className="mb-4">Order Confirmed!</h1>
              <p className="lead mb-4">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>
              <div className="d-inline-block border rounded px-4 py-3 mb-4">
                <p className="mb-1">Order Number</p>
                <h4 className="mb-0 text-primary">{orderNumber}</h4>
              </div>
              <p className="mb-3">
                We've sent a confirmation email to your email address with all the details of your order.
              </p>
              <div className="d-flex justify-content-center">
                <Link to="/" className="btn btn-primary btn-lg me-3">
                  Continue Shopping
                </Link>
                <Link to="/track-order" className="btn btn-outline-primary btn-lg">
                  Track Order
                </Link>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0">Order Details</h5>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-3">
                  <p className="text-muted mb-1">Order Number</p>
                  <p className="mb-0 fw-bold">{orderNumber}</p>
                </div>
                <div className="col-md-3">
                  <p className="text-muted mb-1">Order Date</p>
                  <p className="mb-0 fw-bold">{orderDate}</p>
                </div>
                <div className="col-md-3">
                  <p className="text-muted mb-1">Total</p>
                  <p className="mb-0 fw-bold">${total.toFixed(2)}</p>
                </div>
                <div className="col-md-3">
                  <p className="text-muted mb-1">Payment Method</p>
                  <p className="mb-0 fw-bold">Credit Card</p>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-4 mb-md-0">
                  <p className="text-muted mb-1">Shipping Address</p>
                  <p className="mb-0">
                    John Doe<br />
                    123 Main Street<br />
                    Apt 4B<br />
                    New York, NY 10001<br />
                    United States<br />
                    (123) 456-7890
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="text-muted mb-1">Estimated Delivery</p>
                  <p className="mb-0 fw-bold">{estimatedDelivery}</p>
                  <p className="text-muted mb-1 mt-3">Shipping Method</p>
                  <p className="mb-0">Standard Shipping</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0">Order Summary</h5>
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
                    {/* Sample Order Items - In a real app, these would come from order data */}
                    <tr>
                      <td className="py-3">
                        <div className="d-flex align-items-center">
                          <img 
                            src="https://via.placeholder.com/60" 
                            alt="Product" 
                            className="me-3 rounded" 
                            width="60" 
                            height="60"
                            style={{ objectFit: 'cover' }}
                          />
                          <div>
                            <h6 className="mb-1">Wireless Bluetooth Headphones</h6>
                            <p className="mb-0 text-muted small">Electronics</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-center">1</td>
                      <td className="py-3 text-end">$79.99</td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <div className="d-flex align-items-center">
                          <img 
                            src="https://via.placeholder.com/60" 
                            alt="Product" 
                            className="me-3 rounded" 
                            width="60" 
                            height="60"
                            style={{ objectFit: 'cover' }}
                          />
                          <div>
                            <h6 className="mb-1">Smartphone Fast Charger</h6>
                            <p className="mb-0 text-muted small">Electronics</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-center">2</td>
                      <td className="py-3 text-end">$49.98</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-light">
                    <tr>
                      <td colSpan="2" className="text-end py-3">Subtotal:</td>
                      <td className="text-end py-3">$129.97</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="text-end py-3">Shipping:</td>
                      <td className="text-end py-3">$0.00</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="text-end py-3">Tax:</td>
                      <td className="text-end py-3">$13.00</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="text-end py-3 fw-bold">Total:</td>
                      <td className="text-end py-3 fw-bold">${total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="mb-4">What's Next?</h5>
              <div className="row">
                <div className="col-md-4 mb-4 mb-md-0">
                  <div className="text-center">
                    <i className="bi bi-envelope fs-1 text-primary mb-3"></i>
                    <h6>Order Confirmation</h6>
                    <p className="text-muted small mb-0">You'll receive an email confirmation with your order details.</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4 mb-md-0">
                  <div className="text-center">
                    <i className="bi bi-box-seam fs-1 text-primary mb-3"></i>
                    <h6>Order Processing</h6>
                    <p className="text-muted small mb-0">We'll prepare your items and notify you when they ship.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <i className="bi bi-truck fs-1 text-primary mb-3"></i>
                    <h6>Delivery</h6>
                    <p className="text-muted small mb-0">Your order will be delivered to you by {estimatedDelivery}.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccessPage;