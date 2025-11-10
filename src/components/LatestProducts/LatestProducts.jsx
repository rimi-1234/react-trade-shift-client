import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';

const LatestProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/latest-products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error(err));
    }, []);
    return (
       <div className="pt-10 max-w-[1200px] mx-auto px-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {products.map((product) => (
                          <ProductCard key={product.id} product={product} />
                      ))}
                  </div>
              </div>
    );
};

export default LatestProducts;