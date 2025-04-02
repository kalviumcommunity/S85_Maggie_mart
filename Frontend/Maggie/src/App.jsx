import './App.css';
import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import SellForm from './components/SellForm';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSellForm, setShowSellForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('http://localhost:5000/products')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-yellow-400 p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          🛒 Maggie Mart
        </h1>
      </header>

      {/* Hero Section */}
      <section className="text-center p-8 bg-white">
        <h2 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to Hostel MarketPlace
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Buy and Sell Items Easily for Hostellers 🏠✨
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600">
            Buy Items
          </button>
          <button 
            onClick={() => setShowSellForm(!showSellForm)}
            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600"
          >
            {showSellForm ? "Close Form" : "Sell Items"}
          </button>
        </div>
      </section>

      {/* Sell Form - Visible only when Sell is clicked */}
      {showSellForm && <SellForm fetchProducts={fetchProducts} />}

      {/* Product Grid */}
      <section className="p-8 flex-1">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Featured Items
        </h3>
        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No products available.</p>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-yellow-400 p-4 text-center text-gray-800 font-medium">
        © 2025 Maggie Mart. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
