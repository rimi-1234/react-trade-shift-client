import React, { useEffect, useState } from "react";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import LatestProducts from "../../components/LatestProducts/LatestProducts";
import { motion, useMotionValue, useTransform } from "framer-motion";
import useTitle from "../../hooks/useTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import Loading from "../../components/Loading/Loading";
import NewsletterBanner from "../../components/NewsletterBanner/NewsletterBanner";

const Home = () => {
  const [products, setProducts] = useState([]);
  useTitle("Home | TradeShift");

  useEffect(() => {
    fetch("https://react-trade-shift-server.vercel.app/best-products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Motion gradient heading
  const x = useMotionValue(0);
  const backgroundPosition = useTransform(x, [0, 100], ["0% 50%", "100% 50%"]);

  if (!products.length) return <div><Loading></Loading></div>; // optional loading state

  return (
    <div>
  
      <HeroSlider />

      <div className="flex justify-center items-center h-60 sm:h-72 md:h-96 lg:h-[300px] bg-blue-100 px-4 sm:px-6 md:px-12 overflow-hidden">
        <motion.h1
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-transparent bg-clip-text
            bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 rounded-3xl text-center leading-tight sm:leading-snug md:leading-snug"
          style={{ backgroundSize: "200% 200%", backgroundPosition }}
          animate={{ x: 100 }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 3, ease: "linear" },
          }}
        >
          Welcome to Our Store
        </motion.h1>
      </div>

      <section className="max-w-6xl mx-auto p-6 mt-5 text-center text-gray-700">
        <h2 className="text-2xl font-bold  dark:text-gray-400 mb-4">Latest Products</h2>
        <p className="mb-6 dark:text-gray-400">
          Explore our latest import and export collections curated for your
          business success.
        </p>
        <LatestProducts />
      </section>

      {/* Best Sellers Section */}
      <section className="max-w-6xl mx-auto p-6 mt-5 text-center text-gray-700">
        <h2 className="text-2xl dark:text-gray-400 font-bold mb-4">Best Sellers</h2>
        <p className="mb-6 dark:text-gray-400">
          Do not miss the current offers until the end of month.
        </p>

        {/* Category slider */}
        <div className="relative w-full p-4 mb-7 bg-blue-100 mt-8">
          {/* Custom nav buttons */}
          <div className="absolute inset-y-0 -left-5 flex items-center z-10">
            <button className="swiper-button-prev-custom bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 w-12 h-12 flex justify-center items-center">
              ◀
            </button>
          </div>
          <div className="absolute inset-y-0 -right-5 flex items-center z-10">
            <button className="swiper-button-next-custom bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 w-12 h-12 flex justify-center items-center">
              ▶
            </button>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            speed={700}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
          >
      
            {Array.from({ length: Math.ceil(products.length / 5) }).map((_, idx) => {
              const group = products.slice(idx * 5, idx * 5 + 5);
              return (
                <SwiperSlide key={idx}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {group.map((product) => (
                      <CategoryCard
                        key={product._id}
                        image={product.image}
                        title={product.name}
                        itemCount={product.quantity}
                      />
                    ))}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
      <NewsletterBanner></NewsletterBanner>

    </div>
  );
};

export default Home;
