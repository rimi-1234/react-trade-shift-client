import React from "react";
import HeroSlider from "../../components/HeroSlider/HeroSlider";


const Home = () => {
  return (
    <div>
      <HeroSlider />

      <section className="max-w-6xl mx-auto p-6 text-center text-gray-700">
        <h2 className="text-2xl font-bold mb-4">Latest Products</h2>
        <p>
          Explore our latest import and export collections curated for your
          business success.
        </p>
      </section>
    </div>
  );
};

export default Home;
