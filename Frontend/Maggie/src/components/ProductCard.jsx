function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h4 className="text-xl font-semibold">{product.ProductName}</h4>
      <p className="text-gray-700">Price: ₹{product.Price}</p>
      <p className="text-gray-700">Quantity: {product.Quantity}</p>
      <p className="text-gray-700">Room: {product.RoomNumber}</p>
      <p className="text-gray-700">Contact: {product.Contact}</p>
    </div>
  );
}

export default ProductCard;
