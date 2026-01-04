import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { image, name, price, origin, rating, quantity, _id } = product;

  return (
    <motion.div
      className="border rounded-xl shadow-sm p-3 w-full bg-white flex flex-col h-full border-gray-100 dark:border-gray-800 transition-all dark:bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
    >
      <div className="flex-1 flex flex-col">
        
        {/* IMAGE CONTAINER */}
        <div className="w-full aspect-[3/2] mb-3 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
          <img
            src={image}
            alt={name}
            // CHANGED: Added p-4 (Padding) to shrink the product size inside the box
            // CHANGED: Switched back to object-contain so the full image is visible
            className="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* TITLE */}
        <h3 className="text-base font-bold mb-1 line-clamp-1 leading-tight text-gray-800 dark:text-gray-100">
          {name}
        </h3>

        {/* DETAILS */}
        <div className="text-[11px] text-gray-500 space-y-0.5 mb-2 uppercase tracking-wider">
          <p><span className="font-semibold text-gray-400">Origin:</span> {origin}</p>
          <p><span className="font-semibold text-gray-400">Stock:</span> {quantity} Units</p>
        </div>

        {/* RATING */}
        <div className="flex items-center mb-2">
          <div className="flex text-amber-400 text-sm">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>{i < rating ? "★" : "☆"}</span>
            ))}
          </div>
          <span className="ml-1 text-[10px] font-bold text-gray-400">{rating}.0</span>
        </div>

        {/* PRICE */}
        <p className="text-red-600 font-black text-lg mb-3 mt-auto">৳{price}</p>
      </div>

      {/* BUTTON */}
      <motion.div whileTap={{ scale: 0.95 }}>
        <Link
          to={`/products-details/${_id}`}
          className="w-full block bg-white dark:bg-transparent border border-blue-500 text-blue-500 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-500 hover:text-white transition-all text-center"
        >
          See Details
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;