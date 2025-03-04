// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { productsData } from '../data/products';

function HomePage() {
  // Get featured products (first 4 products)
  const featuredProducts = productsData.slice(0, 4);
  
  // Get latest products (last 8 products)
  const latestProducts = productsData.slice(-8);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h1 className="display-4 fw-bold">Welcome to ShopEasy</h1>
              <p className="lead">Discover amazing products at unbeatable prices.</p>
              <Link to="/products" className="btn btn-light btn-lg">
                Shop Now
              </Link>
            </div>
            <div className="col-md-6">
              <img 
                src="3259679.jpg" 
                alt="Shop banner" 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Shop by Category</h2>
          <div className="row g-4">
            <div className="col-6 col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-laptop fs-1 text-primary"></i>
                  </div>
                  <h5 className="card-title">Electronics</h5>
                  <Link to="/products?category=electronics" className="btn btn-outline-primary btn-sm">
                    View Products
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-shop fs-1 text-primary"></i>
                  </div>
                  <h5 className="card-title">Clothing</h5>
                  <Link to="/products?category=clothing" className="btn btn-outline-primary btn-sm">
                    View Products
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-house fs-1 text-primary"></i>
                  </div>
                  <h5 className="card-title">Home</h5>
                  <Link to="/products?category=home" className="btn btn-outline-primary btn-sm">
                    View Products
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-gift fs-1 text-primary"></i>
                  </div>
                  <h5 className="card-title">Accessories</h5>
                  <Link to="/products?category=accessories" className="btn btn-outline-primary btn-sm">
                    View Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Featured Products</h2>
            <Link to="/products" className="btn btn-link text-decoration-none">
              View All <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            {featuredProducts.map(product => (
              <div key={product.id} className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="position-relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="card-img-top product-image"
                    />
                    <span className="position-absolute top-0 start-0 badge bg-primary m-2">
                      Featured
                    </span>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-primary fw-bold">${product.price.toFixed(2)}</p>
                    <Link to={`/products/${product.id}`} className="btn btn-outline-primary btn-sm w-100">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="fw-bold">Special Offer</h2>
              <p className="lead mb-4">
                Get 20% off on selected items this week. Use code WELCOME20 at checkout.
              </p>
              <Link to="/products" className="btn btn-light">
                Shop Now
              </Link>
            </div>
            <div className="col-md-6 text-center">
              <div className="p-4 bg-white text-dark rounded shadow">
                <h3 className="fw-bold text-primary">WELCOME20</h3>
                <p className="mb-0">20% OFF</p>
                <p className="small text-muted">Limited time offer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Products Section */}
      <div className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Latest Products</h2>
            <Link to="/products" className="btn btn-link text-decoration-none">
              View All <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            {latestProducts.map(product => (
              <div key={product.id} className="col">
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
                        Details
                      </Link>
                      <button className="btn btn-primary btn-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">What Our Customers Say</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <img 
                      src="https://via.placeholder.com/100" 
                      alt="Customer" 
                      className="rounded-circle"
                    />
                  </div>
                  <div className="mb-3 text-warning">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p className="card-text">"Great products and fast shipping! I'm very satisfied with my purchase and will definitely shop here again."</p>
                  <p className="fw-bold mb-0">Sarah Johnson</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <img 
                      src="https://via.placeholder.com/100" 
                      alt="Customer" 
                      className="rounded-circle"
                    />
                  </div>
                  <div className="mb-3 text-warning">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-half"></i>
                  </div>
                  <p className="card-text">"The customer service is excellent! They helped me find exactly what I needed and the checkout process was smooth."</p>
                  <p className="fw-bold mb-0">Michael Davis</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <img 
                      src="https://via.placeholder.com/100" 
                      alt="Customer" 
                      className="rounded-circle"
                    />
                  </div>
                  <div className="mb-3 text-warning">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p className="card-text">"High quality products at reasonable prices. The website is easy to navigate and the delivery was faster than expected!"</p>
                  <p className="fw-bold mb-0">Emily Wilson</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <h2 className="mb-3">Subscribe to Our Newsletter</h2>
              <p className="mb-4">Stay updated with our latest products and exclusive offers.</p>
              <form className="row g-3 justify-content-center">
                <div className="col-md-8">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter your email address"
                    required 
                  />
                </div>
                <div className="col-md-auto">
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;