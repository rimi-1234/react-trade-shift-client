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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>

    );
};

export default AllProduct;