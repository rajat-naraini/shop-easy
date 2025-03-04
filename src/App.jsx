import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import Navbar from './components/Navbar'
import { CartProvider } from './context/CartContext'
import CheckoutSuccessPage from './pages/CheckoutSuccessPage'
import TrackOrderPage from './pages/TrackOrderPage'

function App() {

  return (
    <CartProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className='flex-grow-1'>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
              <Route path="/track-order" element={<TrackOrderPage />} />
              <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
