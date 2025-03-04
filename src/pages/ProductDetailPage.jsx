// ProductDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsData } from '../data/products';
import ProductDetail from '../components/ProductDetail';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Find product by ID
    const productId = parseInt(id);
    const foundProduct = productsData.find(p => p.id === productId);
    
    // Simulate loading
    setTimeout(() => {
      setProduct(foundProduct);
      setLoading(false);
      
      // Find related products (same category)
      if (foundProduct) {
        const related = productsData
          .filter(p => p.category === foundProduct.category && p.id !== productId)
          .slice(0, 4); // Get up to 4 related products
        setRelatedProducts(related);
      }
    }, 300);
  }, [id]);
  
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">
          <h4>Product Not Found</h4>
          <p>The product you're looking for doesn't exist or may have been removed.</p>
          <Link to="/products" className="btn btn-primary mt-3">
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/products" className="text-decoration-none">Products</Link>
          </li>
          <li className="breadcrumb-item">
            <Link 
              to={`/products?category=${product.category}`} 
              className="text-decoration-none"
            >
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>
      
      {/* Product Detail Component */}
      <ProductDetail product={product} />
      
      {/* Product Description and Features Section */}
      <div className="row mt-5">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white">
              <ul className="nav nav-tabs card-header-tabs" id="productTabs" role="tablist">
                <li className="nav-item">
                  <button 
                    className="nav-link active" 
                    id="description-tab" 
                    data-bs-toggle="tab" 
                    data-bs-target="#description" 
                    type="button" 
                    role="tab" 
                    aria-controls="description" 
                    aria-selected="true"
                  >
                    Description
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link" 
                    id="features-tab" 
                    data-bs-toggle="tab" 
                    data-bs-target="#features" 
                    type="button" 
                    role="tab" 
                    aria-controls="features" 
                    aria-selected="false"
                  >
                    Features
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link" 
                    id="reviews-tab" 
                    data-bs-toggle="tab" 
                    data-bs-target="#reviews" 
                    type="button" 
                    role="tab" 
                    aria-controls="reviews" 
                    aria-selected="false"
                  >
                    Reviews ({product.reviews})
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div className="tab-content" id="productTabsContent">
                <div 
                  className="tab-pane fade show active" 
                  id="description" 
                  role="tabpanel" 
                  aria-labelledby="description-tab"
                >
                  <p>{product.description}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
                <div 
                  className="tab-pane fade" 
                  id="features" 
                  role="tabpanel" 
                  aria-labelledby="features-tab"
                >
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item ps-0">Premium quality materials</li>
                    <li className="list-group-item ps-0">Designed for durability and performance</li>
                    <li className="list-group-item ps-0">Easy to use and maintain</li>
                    <li className="list-group-item ps-0">Energy efficient and eco-friendly</li>
                    <li className="list-group-item ps-0">Comes with a 1-year warranty</li>
                  </ul>
                </div>
                <div 
                  className="tab-pane fade" 
                  id="reviews" 
                  role="tabpanel" 
                  aria-labelledby="reviews-tab"
                >
                  <div className="d-flex align-items-center mb-4">
                    <div className="me-3">
                      <h1 className="mb-0">{product.rating.toFixed(1)}</h1>
                      <div className="text-warning">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <i 
                            key={index}
                            className={`bi ${index < Math.floor(product.rating) ? 'bi-star-fill' : index < product.rating ? 'bi-star-half' : 'bi-star'}`}
                          ></i>
                        ))}
                      </div>
                      <p className="mb-0 text-muted">Based on {product.reviews} reviews</p>
                    </div>
                    <div className="ms-auto">
                      <button className="btn btn-outline-primary">Write a Review</button>
                    </div>
                  </div>
                  
                  {/* Sample Reviews */}
                  <div className="border-bottom mb-3 pb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <h6 className="mb-0">John Doe</h6>
                      <div className="text-warning">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                    </div>
                    <p className="text-muted mb-2">Verified Purchase</p>
                    <p>Great product, exceeded my expectations. Highly recommended!</p>
                  </div>
                  
                  <div className="border-bottom mb-3 pb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <h6 className="mb-0">Jane Smith</h6>
                      <div className="text-warning">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star"></i>
                      </div>
                    </div>
                    <p className="text-muted mb-2">Verified Purchase</p>
                    <p>Good quality for the price. Delivery was fast and product was as described.</p>
                  </div>
                  
                  <div>
                    <button className="btn btn-link text-decoration-none p-0">
                      View all {product.reviews} reviews
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Shipping Information</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li className="d-flex align-items-center mb-3">
                  <i className="bi bi-truck text-primary me-2 fs-5"></i>
                  <div>
                    <strong>Free Shipping</strong>
                    <p className="mb-0 text-muted">For orders over $50</p>
                  </div>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <i className="bi bi-box-seam text-primary me-2 fs-5"></i>
                  <div>
                    <strong>Easy Returns</strong>
                    <p className="mb-0 text-muted">30-day return policy</p>
                  </div>
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-shield-check text-primary me-2 fs-5"></i>
                  <div>
                    <strong>Secure Checkout</strong>
                    <p className="mb-0 text-muted">100% secure payment</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Need Help?</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li className="d-flex align-items-center mb-3">
                  <i className="bi bi-question-circle text-primary me-2 fs-5"></i>
                  <div>
                    <strong>Product Support</strong>
                    <p className="mb-0 text-muted">Get answers to your questions</p>
                  </div>
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-chat-dots text-primary me-2 fs-5"></i>
                  <div>
                    <strong>Live Chat</strong>
                    <p className="mb-0 text-muted">Available 24/7</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-4">Related Products</h3>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            {relatedProducts.map(relProduct => (
              <div key={relProduct.id} className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <img 
                    src={relProduct.image} 
                    alt={relProduct.name} 
                    className="card-img-top product-image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{relProduct.name}</h5>
                    <p className="card-text text-primary fw-bold">${relProduct.price.toFixed(2)}</p>
                    <div className="d-flex justify-content-between">
                      <Link to={`/products/${relProduct.id}`} className="btn btn-outline-secondary btn-sm">
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
      )}
    </div>
  );
}

export default ProductDetailPage;