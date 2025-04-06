import React, { useState } from 'react';
import './ProductCard.css';
import Modal from './Modal';

function ProductCard({ product, onDelete, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = (updatedProduct) => {
    onUpdate(updatedProduct); // Call the update function passed as a prop
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="product-card">
      <h4 className="product-name">{product.ProductName}</h4>
      <p className="product-detail">Price: ₹{product.Price}</p>
      <p className="product-detail">Quantity: {product.Quantity}</p>
      <p className="product-detail">Room: {product.RoomNumber}</p>
      <p className="product-detail">Contact: {product.Contact}</p>
      <div className="product-card-actions">
        <button className="edit-button" onClick={handleEdit}>Edit</button>
        <button className="delete-button" onClick={() => onDelete(product._id)}>
          Delete
        </button>
      </div>
      {isModalOpen && (
        <Modal
          product={product}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default ProductCard;