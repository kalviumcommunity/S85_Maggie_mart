import React from 'react';
import ProductCard from '../components/ProductCard';

export default function BuyItems({ products, setProducts }) {
  const handleDelete = async (id) => {
    const url = `http://localhost:5000/products/${id}`;
    try {
      const response = await fetch(url, { method: 'DELETE' });
      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
      }
    } catch (error) {
      console.error('Error deleting the product:', error);
    }
  };

  const handleUpdate = async (updatedProduct) => {
    const url = `http://localhost:5000/products/${updatedProduct._id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      if (response.ok) {
        const updatedData = await response.json();
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === updatedData._id ? updatedData : product
          )
        );
      }
    } catch (error) {
      console.error('Error updating the product:', error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Items</h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No items available for purchase.</p>
      )}
    </div>
  );
}