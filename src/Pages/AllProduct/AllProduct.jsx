import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import { Search } from "lucide-react";
import useTitle from "../../hooks/useTitle";
import Loading from "../../components/Loading/Loading";

const AllProduct = () => {
  useTitle("AllProduct | TradeShift");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  // Fetch all products once
  useEffect(() => {
    setLoading(true);
    fetch("https://react-trade-shift-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        // Ensure data is an array
        const productsArray = Array.isArray(data) ? data : [];
        setProducts(productsArray);
        setFiltered(productsArray);
        setLoading(false);
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

    fetch(`https://react-trade-shift-server.vercel.app/search?search=${query}`)
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
  // ✅ Loading state display
  if (loading)
    return (
      <p className="text-center mt-10">
        <Loading></Loading>
      </p>
    );

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
        <div className="flex items-center w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto 
                bg-white rounded-full border-2 border-blue-400 px-3 sm:px-4 py-2 shadow-md 
                transition-all duration-300 hover:shadow-lg hover:shadow-blue-300/50">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-transparent text-gray-700 text-base sm:text-lg placeholder-gray-400
               outline-none px-4 py-2 rounded-l-full focus:ring-2 focus:ring-blue-400 
               transition-all duration-300"
          />
          <button
            onClick={handleSearch}
            className="flex items-center justify-center p-2 sm:p-3 rounded-r-full
               bg-gradient-to-r from-blue-400 to-purple-400
               text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-300/50
               transition-transform transition-shadow duration-300 min-w-[44px] sm:min-w-[48px]"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 sm:h-6 sm:w-6 text-white"
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
              <Search size={22} className="sm:w-6 sm:h-6" />
            )}
          </button>
        </div>

      </div>

      {/* Product Grid */}
      {Array.isArray(filtered) && filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
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
