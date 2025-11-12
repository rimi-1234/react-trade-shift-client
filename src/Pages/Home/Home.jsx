import React from "react";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import LatestProducts from "../../components/LatestProducts/LatestProducts";
import { motion, useMotionValue, useTransform } from "framer-motion";

const Home = () => {
  const x = useMotionValue(0);
  const backgroundPosition = useTransform(x, [0, 100], ["0% 50%", "100% 50%"]);
  return (
    <div>
      <HeroSlider />
    <div className="flex justify-center items-center h-60 sm:h-72 md:h-96 lg:h-[500px] bg-blue-100 px-4 sm:px-6 md:px-12 overflow-hidden">
      <motion.h1
        className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-transparent bg-clip-text
          bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 rounded-3xl text-center leading-tight sm:leading-snug md:leading-snug"
        style={{
          backgroundSize: "200% 200%",
          backgroundPosition,
        }}
        animate={{ x: 100 }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration: 3, ease: "linear" },
        }}
      >
        Welcome to Our Store
      </motion.h1>
    </div>


      <section className="max-w-6xl mx-auto p-6 mt-5 text-center text-gray-700">
        <h2 className="text-2xl font-bold mb-4">Latest Products</h2>
        <p>
          Explore our latest import and export collections curated for your
          business success.
        </p>
        <LatestProducts></LatestProducts>
      </section>
    </div>
  );
};

export default Home;
