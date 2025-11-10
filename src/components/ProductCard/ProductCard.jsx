// ProductCard.jsx
import React from "react";

const ProductCard = ({ product }) => {
  const {
    image,
    name,
    price,
    origin,
    rating,
    quantity,
  } = product;

  return (
    <div className="border rounded-2xl shadow-lg p-4 max-w-xs mx-auto bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative">
      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-contain mb-4 rounded-md"
      />

      {/* Product Name */}
      <h3 className="text-lg font-semibold mb-2">{name}</h3>

      {/* Origin Country */}
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Origin:</span> {origin}
      </p>

      {/* Available Quantity */}
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Available:</span> {quantity}
      </p>

      {/* Rating */}
      <div className="flex items-center mb-2">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating}</span>
      </div>

      {/* Price */}
      <p className="text-red-600 font-bold text-lg mb-4">৳{price}</p>

      {/* See Details Button */}
      <button className="w-full bg-white border border-blue-400 text-blue-500 py-2 rounded hover:bg-blue-500 hover:text-white transition">
        See Details
      </button>
    </div>
  );
};

export default ProductCard;
