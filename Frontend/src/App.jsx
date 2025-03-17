import './App.css';
import ProductCard from './components/ProductCard'; // Naya import

function App() {
  const dummyProduct = {
    name: 'Maggie Noodles',
    price: 25,
    description: '2-minute instant noodles - 70g pack',
    image: 'https://via.placeholder.com/150', // Dummy image
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to Hostel MarketPlace
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Buy and Sell Items Easily for Hostellers 🏠✨
      </p>
      <div className="flex gap-4 mb-10">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600">
          Buy Items
        </button>
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600">
          Sell Items
        </button>
      </div>

      {/* ProductCard component dummy data ke sath */}
      <ProductCard product={dummyProduct} />
    </div>
  );
}

export default App;
