import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import { Search } from "lucide-react";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  // Fetch all products once
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        // Ensure data is an array
        const productsArray = Array.isArray(data) ? data : [];
        setProducts(productsArray);
        setFiltered(productsArray);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Function to filter products
  const handleSearch = () => {
    if (query.trim() === "") {
      setFiltered(products); // reset to all products if query is empty
      return;
    }
    setLoading(true);

    fetch(`http://localhost:3000/search?search=${query}`)
      .then((res) => res.json())
      .then((data) => {
        const results = Array.isArray(data) ? data : [];
        setFiltered(results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  // Trigger search on Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="pt-24 sm:pt-52 md:pt-52 lg:pt-30 max-w-[1200px] mx-auto px-2">
      {/* Hero Section */}
      <HeroSlider />

      {/* Top Bar: Total Products + Search */}
      <div className="flex mt-10 flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Total Products */}
        <div className="flex items-center flex-1">
          <span className="text-gray-700 text-2xl font-bold">
            Total Products: {filtered.length}
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-white rounded-full border-2 border-blue-400 px-4 py-3 shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-blue-300/50">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            className="border-none outline-none w-96 sm:w-[28rem] md:w-[32rem] lg:w-[36rem] px-4 py-2 text-gray-700 bg-transparent text-lg placeholder-gray-400 
               focus:w-[38rem] focus:shadow-lg focus:shadow-blue-300/50 transition-all duration-300"
          />
          <button
            onClick={handleSearch}
            className="p-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 text-white 
               hover:scale-110 hover:shadow-lg hover:shadow-blue-300/50 
               transition-transform transition-shadow duration-300"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              <Search size={22} />
            )}
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {Array.isArray(filtered) && filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No products found for “{query}”.
        </p>
      )}
    </div>
  );
};

export default AllProduct;
