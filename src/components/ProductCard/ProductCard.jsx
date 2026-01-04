import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";


const ProductCard = ({ product }) => {
  const { 
    image, 
    name, 
    price, 
    origin, 
    rating, 
    quantity, 
    _id, 
    short_description, 
    createdAt, 
    status 
  } = product;

  // Formatting date for the Meta Info section
  const postDate = new Date(createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: '2-digit'
  });

  return (
    <motion.div
      // Fixed height of 400px ensures all cards in the row align perfectly
      className="border rounded-2xl shadow-sm p-3 w-full bg-white flex flex-col h-[400px] border-gray-100 dark:border-gray-800 transition-all dark:bg-gray-900 group"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 12px 24px rgba(0,0,0,0.06)" }}
    >
      {/* 1. IMAGE CONTAINER */}
      <div className="w-full aspect-[3/2] mb-3 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
        {/* Floating Status Badge */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full border border-gray-100">
          <span className="text-[8px] font-black uppercase text-emerald-600 tracking-tighter">
            ● {status || "Available"}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-1">
        {/* 2. TITLE & RATING ROW */}
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="text-[14px] font-bold line-clamp-1 leading-tight text-gray-800 dark:text-gray-100 uppercase tracking-tight">
            {name}
          </h3>
          <div className="flex text-amber-400 text-[10px] mt-0.5">
            {"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}
          </div>
        </div>

        {/* 3. SHORT DESCRIPTION */}
        <p className="text-[10px] text-gray-500 line-clamp-2 leading-snug mb-2 min-h-[28px]">
          {short_description || "Verified trade product meeting global export quality standards."}
        </p>

        {/* 4. META INFO GRID (Upper-Middle Section) */}
        <div className="grid grid-cols-2 gap-y-2 border-t border-gray-50 dark:border-gray-800 pt-2 mb-3">
          <div className="space-y-0.5">
      
            <span className="text-[9px] font-bold text-gray-500 uppercase">{origin}</span>
          </div>
          <div className="space-y-0.5 text-right">
            
            <span className="text-[9px] font-bold text-gray-500 uppercase">{postDate}</span>
          </div>
          <div className="space-y-0.5">
           
            <span className="text-[9px] font-bold text-gray-500 uppercase">{quantity} Units</span>
          </div>
          <div className="space-y-0.5 text-right">
           
            <span className="text-[9px] font-bold text-blue-500 uppercase italic">Verified</span>
          </div>
        </div>

        {/* 5. PRICE & BUTTON SECTION (Your specific design) */}
     {/* 5. PRICE & BUTTON SECTION - Perfect Vertical Alignment */}
<div className="mt-auto flex flex-cols items-center justify-between gap-4 pt-3 border-t border-gray-50 dark:border-gray-800">
  
  {/* Price Side: Centered vertically with the button */}
  <div className="flex flex-col justify-center">
    
    <p className="text-base font-black text-red-600 italic leading-none">
      ৳{price.toLocaleString()}
    </p>
  </div>
  
  {/* Button Side: flex-1 ensures it takes up remaining space */}
  <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
    <Link
      to={`/products-details/${_id}`}
      className="w-full block bg-white dark:bg-transparent border border-blue-500 text-blue-500 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all text-center leading-none"
    >
      See Details
    </Link>
  </motion.div>
</div>
      </div>
    </motion.div>
  );
};

export default ProductCard;