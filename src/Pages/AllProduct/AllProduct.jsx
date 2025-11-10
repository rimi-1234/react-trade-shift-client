import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';

const AllProduct = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error(err));
    }, []);
    return (
        <div className="pt-40 max-w-[1200px] mx-auto px-2">
            {/* Top bar: total products + search */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                {/* Left side: total products */}
                <div className="flex items-center flex-1">
                    <span className="text-gray-600  text-2xl font-bold">
                        Total Products: {products.length}
                    </span>
                </div>

                {/* Right side: search bar (visual only) */}
                <div className="flex-shrink-0">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="border rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>


    );
};

export default AllProduct;