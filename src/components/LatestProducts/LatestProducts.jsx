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
        <div className="pt-10 max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="text-left">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>

    );
};

export default LatestProducts;