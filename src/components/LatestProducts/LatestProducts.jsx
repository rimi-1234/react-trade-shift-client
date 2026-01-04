import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Loading from '../Loading/Loading';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 loading state

  useEffect(() => {
    fetch("https://react-trade-shift-server.vercel.app/latest-products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false)); // 👈 stop loading
  }, []);

  return (
    <div className="pt-10 max-w-[1100px] mx-auto">
      {loading ? (
        <Loading></Loading>
      ) : products?.length > 0 ? (
       
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.isArray(products)&&products.map((product) => (
            <div key={product._id} className="text-left">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
   
        <p className="text-center text-gray-500 text-lg">No products available</p>
      )}
    </div>
  );
};

export default LatestProducts;
