import React from 'react';

function CategoryCard({ image, title, itemCount }) {


  return (
    <div className="p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors border-r border-gray-200 last:border-r-0">
      <div className="h-36 flex items-center justify-center mb-3">
        <img src={image} alt={title} className="max-w-full max-h-full object-contain" />
      </div>
      <h3 className="text-base font-semibold text-gray-800 truncate">{title}</h3>
      <p className="text-sm text-gray-500">{itemCount} items</p>
    </div>
  );
}

export default CategoryCard;
