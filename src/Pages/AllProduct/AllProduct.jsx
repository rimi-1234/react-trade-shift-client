import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import { Search, ArrowUpDown, Star, LayoutGrid, ChevronLeft, ChevronRight } from "lucide-react";
import useTitle from "../../hooks/useTitle";
import Loading from "../../components/Loading/Loading";

const AllProduct = () => {
  useTitle("All Product | TradeShift");
  
  const [products, setProducts] = useState([]); 
  const [filtered, setFiltered] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [activeSort, setActiveSort] = useState("");

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  // 1. Fetch Data
  useEffect(() => {
    setLoading(true);
    fetch("https://react-trade-shift-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        const productsArray = data.result || (Array.isArray(data) ? data : []);
        setProducts(productsArray);
        setFiltered(productsArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // 2. Search & Sort Logic
  useEffect(() => {
    let temp = [...products];

    if (query) {
      temp = temp.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    }

    if (activeSort === "low-to-high") temp.sort((a, b) => a.price - b.price);
    if (activeSort === "high-to-low") temp.sort((a, b) => b.price - a.price);
    if (activeSort === "rating") temp.sort((a, b) => b.rating - a.rating);

    setFiltered(temp);
    setCurrentPage(1); // Reset to page 1 whenever search or sort changes
  }, [query, activeSort, products]);

  // --- Pagination Calculations ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 500, behavior: 'smooth' }); // Scroll up to results top
  };

  return (
    <div className="pt-24 sm:pt-40 max-w-[1200px] mx-auto px-4 pb-20">
      <HeroSlider />

      {/* --- Controls Section --- */}
      <div className="mt-12 space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white dark:bg-gray-900 p-5 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 border-none transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveSort("low-to-high")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeSort === "low-to-high" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
            >
              <ArrowUpDown size={14} /> Price: Low
            </button>
            <button 
              onClick={() => setActiveSort("high-to-low")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeSort === "high-to-low" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
            >
              <ArrowUpDown size={14} /> Price: High
            </button>
            <button 
              onClick={() => setActiveSort("rating")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeSort === "rating" ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-600 hover:bg-amber-100"}`}
            >
              <Star size={14} /> Top Rated
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-gray-500 font-semibold">
            <LayoutGrid size={18} />
            <span>Showing {currentItems.length} of {filtered.length} products</span>
          </div>
        </div>
      </div>

      {/* --- Grid Layout --- */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loading />
        </div>
      ) : currentItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {currentItems.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* --- Pagination UI --- */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`w-10 h-10 rounded-lg border font-bold transition-all ${
                    currentPage === index + 1
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
                      : "border-gray-200 text-gray-600 hover:border-blue-400"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-32 bg-gray-50 dark:bg-gray-900/50 rounded-[3rem] mt-10 border-2 border-dashed border-gray-200 dark:border-gray-800">
          <Search size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">No products found</h3>
          <button 
            onClick={() => {setQuery(""); setActiveSort("");}}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full font-bold transition-all hover:scale-105"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProduct;