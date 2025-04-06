import React, { useState } from 'react';
import './Modal.css'; // Add some basic styling for the modal

export default function Modal({ product, onClose, onUpdate }) {
  const [formData, setFormData] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData); // Call the update function passed as a prop
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Product Name:
            <input
              type="text"
              name="ProductName"
              value={formData.ProductName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="Quantity"
              value={formData.Quantity}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Room Number:
            <input
              type="text"
              name="RoomNumber"
              value={formData.RoomNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Contact:
            <input
              type="number"
              name="Contact"
              value={formData.Contact}
              onChange={handleChange}
              required
            />
          </label>
          <div className="modal-actions">
            <button type="submit" className="save-button">Save</button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}