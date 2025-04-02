import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="p-8 flex-1">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Featured Items</h3>
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
  );
}

export default ProductGrid;
