import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { image, name, price, origin, rating, quantity, _id } = product;

  return (
    <motion.div
      className="border rounded-2xl shadow-lg p-4 max-w-xs mx-auto bg-white flex flex-col h-full "
      initial={{ opacity: 0, y: 30 }}          // start slightly below and invisible
      animate={{ opacity: 1, y: 0 }}           // animate to visible
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -5 }}      // scale up and lift on hover
      whileTap={{ scale: 0.95 }}               // click feedback
    >


      {/* Top Content */}
      <div className="flex-1 flex flex-col">
        {/* Product Image */}
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-contain mb-4 rounded-md"
        />
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
        <div className="flex items-center mb-2 text-2xl">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={i < rating ? "text-yellow-400" : "text-gray-300"}
            >
              ★
            </span>
          ))}
          <span className="ml-2 text-base text-gray-600">{rating}</span>
        </div>


        {/* Price */}
        <p className="text-red-600 font-bold text-lg mb-4">৳{price}</p>
      </div>

      {/* See Details Button aligned at the bottom */}
      <motion.div
        className="mt-auto w-full bg-white border border-blue-400 text-blue-500 py-2 rounded transition text-center"
        whileHover={{ backgroundColor: "#3B82F6", color: "#fff" }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to={`/products-details/${_id}`}
          className="w-full h-full block"
        >
          See Details
        </Link>
      </motion.div>

    </motion.div>
  );
};

export default ProductCard;
