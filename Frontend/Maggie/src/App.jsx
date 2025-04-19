// import './App.css';
// import { Route, Routes } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import ProductCard from './components/ProductCard';
// import SellForm from './components/SellForm';
// import BuyItems from './Pages/BuyItems';
// import UserValidation from './Pages/UserValidation';

// function App() {
//   const [products, setProducts] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState('');
//   const [setLoading] = useState(true);
//   const [showSellForm, setShowSellForm] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchProducts();
//       fetchUsers();
//     }
//   }, [isAuthenticated]);

//   const fetchProducts = (userId = '') => {
//     const url = userId ? `http://localhost:5000/products?created_by=${userId}` : 'http://localhost:5000/products';
//     fetch(url)
//       .then((res) => {
//         if (!res.ok) throw new Error('Network response was not ok');
//         return res.json();
//       })
//       .then((data) => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching products:', err);
//         setLoading(false);
//       });
//   };

//   const fetchUsers = () => {
//     fetch('http://localhost:5000/users')
//       .then((res) => res.json())
//       .then((data) => setUsers(data))
//       .catch((err) => console.error('Error fetching users:', err));
//   };

//   const handleUserChange = (e) => {
//     const userId = e.target.value;
//     setSelectedUser(userId);
//     fetchProducts(userId);
//   };

//   if (!isAuthenticated) {
//     return <UserValidation onLoginSuccess={() => setIsAuthenticated(true)} />;
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       {/* Header */}
//       <header className="bg-yellow-400 p-4 shadow-md">
//         <h1 className="text-3xl font-bold text-center text-gray-800">
//           🛒 Maggie Mart
//         </h1>
//       </header>

//       {/* User Dropdown */}
//       <div className="p-4">
//         <label htmlFor="user-select" className="block text-gray-700 font-bold mb-2">
//           Filter by User:
//         </label>
//         <select
//           id="user-select"
//           value={selectedUser}
//           onChange={handleUserChange}
//           className="w-full p-2 border border-gray-300 rounded"
//         >
//           <option value="">All Users</option>
//           {users.map((user) => (
//             <option key={user._id} value={user._id}>
//               {user.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Routes */}
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <>
//               {/* Hero Section */}
//               <section className="text-center p-8 bg-white">
//                 <h2 className="text-4xl font-bold text-blue-600 mb-4">
//                   Welcome to Hostel MarketPlace
//                 </h2>
//                 <p className="text-lg text-gray-700 mb-6">
//                   Buy and Sell Items Easily for Hostellers 🏠✨
//                 </p>
//                 <div className="flex justify-center gap-4">
//                   <button
//                     onClick={() => (window.location.href = '/buy-items')}
//                     className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600"
//                   >
//                     Buy Items
//                   </button>
//                   <button
//                     onClick={() => setShowSellForm(!showSellForm)}
//                     className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600"
//                   >
//                     {showSellForm ? 'Close Form' : 'Sell Items'}
//                   </button>
//                 </div>
//               </section>

//               {/* Sell Form - Visible only when Sell is clicked */}
//               {showSellForm && <SellForm fetchProducts={fetchProducts} />}

//               {/* Product Grid */}
//               <div className="p-8">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Items</h2>
//                 {products.length > 0 ? (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                     {products.map((product, index) => (
//                       <ProductCard
//                         key={index}
//                         product={product}
//                         onDelete={() => fetchProducts(selectedUser)}
//                         onUpdate={() => fetchProducts(selectedUser)}
//                       />
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-600">No items available for purchase.</p>
//                 )}
//               </div>
//             </>
//           }
//         />
//         <Route
//           path="/buy-items"
//           element={<BuyItems products={products} setProducts={setProducts} />}
//         />
//       </Routes>

//       {/* Footer */}
//       <footer
//         className="bg-yellow-400 p-4 text-center text-gray-800 font-medium"
//         style={{ margin: '10px' }}
//       >
//         © 2025 Maggie Mart. All rights reserved.
//       </footer>
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [items, setItems] = useState([]);

  // Fetch all users on load
  useEffect(() => {
    fetch('http://localhost:3000/api/users') // or your actual backend port

      .then(res => res.json())
      .then(data => {
        console.log('👤 Users API response:', data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('❌ Unexpected response format for users:', data);
          setUsers([]);
        }
      })
      .catch(err => {
        console.error('❌ Error fetching users:', err);
        setUsers([]);
      });
  }, []);

  // Fetch items when user is selected
  useEffect(() => {
    if (selectedUser) {
      console.log("Selected user ID:", selectedUser);
      axios.get(`http://localhost:3000/api/items/${selectedUser}`)
      

        .then(res => {
          console.log(`📦 Items for user ${selectedUser}:`, res.data);
          setItems(res.data);
        })
        .catch(err => {
          console.error('❌ Failed to fetch items:', err);
          setItems([]);
        });
    }
  }, [selectedUser]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>ASAP Project: Items by User</h1>

      <select onChange={(e) => setSelectedUser(e.target.value)}>
  <option value="">Select a user</option>
  {users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))}
</select>


      <ul>
        {items.length === 0 && selectedUser && <p>No items found for this user.</p>}
        {items.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
