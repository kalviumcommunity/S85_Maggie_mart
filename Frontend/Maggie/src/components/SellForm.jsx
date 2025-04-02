import { useState } from 'react';

function SellForm({ fetchProducts }) {
  const [formData, setFormData] = useState({
    ProductName: '',
    Price: '',
    Quantity: '',
    RoomNumber: '',
    Contact: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:5000/sell', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert("Product added successfully!");
      setFormData({ ProductName: '', Price: '', Quantity: '', RoomNumber: '', Contact: '' });
      fetchProducts(); 
    } else {
      alert("Failed to add product.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mx-auto max-w-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Add a Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="ProductName" value={formData.ProductName} onChange={handleChange} placeholder="Product Name" className="w-full p-2 border rounded"/>
        <input type="number" name="Price" value={formData.Price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded"/>
        <input type="number" name="Quantity" value={formData.Quantity} onChange={handleChange} placeholder="Quantity" className="w-full p-2 border rounded"/>
        <input type="text" name="RoomNumber" value={formData.RoomNumber} onChange={handleChange} placeholder="Room Number" className="w-full p-2 border rounded"/>
        <input type="text" name="Contact" value={formData.Contact} onChange={handleChange} placeholder="Contact" className="w-full p-2 border rounded"/>
        <button type="submit" className="bg-green-500 text-white w-full p-2 rounded hover:bg-green-600">Submit</button>
      </form>
    </div>
  );
}

export default SellForm;
