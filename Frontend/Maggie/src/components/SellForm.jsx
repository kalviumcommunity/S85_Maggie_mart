import { useState } from 'react';

function SellForm({ fetchProducts }) {
  const [formData, setFormData] = useState({
    ProductName: '',
    Price: '',
    Quantity: '',
    RoomNumber: '',
    Contact: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to sell product');
      
      const data = await res.json();
      console.log("✅ Product sold:", data);

      setFormData({ ProductName: '', Price: '', Quantity: '', RoomNumber: '', Contact: '' });

      fetchProducts(); // 🔥 Update product cards
    } catch (err) {
      console.error('❌ Error:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-bold mb-4">Sell an Item</h3>
      {['ProductName', 'Price', 'Quantity', 'RoomNumber', 'Contact'].map((field) => (
        <input
          key={field}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          placeholder={field}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
      ))}
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Submit
      </button>
    </form>
  );
}

export default SellForm;
