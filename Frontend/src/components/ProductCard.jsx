import React from 'react';
import PropTypes from 'prop-types'; // ✅ Import PropTypes

const ProductCard = ({ product }) => {
  return (
    <div className="w-72 rounded-xl overflow-hidden shadow-md bg-white p-4 flex flex-col items-center">
      <img
        className="w-32 h-32 object-cover rounded-lg mb-4"
        src={"https://imgs.search.brave.com/XhoiZZIKouk-08uG8G_iKkVwHIH8edRoW5rUnORJzME/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFrRDlUd0xHYVMu/anBn"}
        alt={"MAGGI"}
      />
      <div className="text-center">
        <h2 className="font-semibold text-lg text-gray-800">{"MAGGI"}</h2>
        <p className="text-blue-600 font-bold mt-1">₹{"11"}</p>
        <p className="text-gray-600 text-sm mt-1">{"noodles"}</p>
        <button className="mt-3 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
          Buy Now
        </button>
      </div>
    </div>
  );
};
// ✅ Define PropTypes
ProductCard.propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
  };
export default ProductCard;
