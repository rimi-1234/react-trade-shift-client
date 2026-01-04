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
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import GlobalImpact from "../../components/GlobalImpact/GlobalImpact";
import { WelcomeHeader } from "../../components/WelcomeHeader/WelcomeHeader";
import { FeaturesSection } from "../../components/FeaturesSection/FeaturesSection";



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
  
      <WelcomeHeader/>


      <section className="max-w-6xl mx-auto p-6 mt-5 text-center text-gray-700">
        <h2 className="text-2xl font-bold  dark:text-gray-400 mb-4">Latest Products</h2>
        <p className="mb-6 dark:text-gray-400">
          Explore our latest import and export collections curated for your
          business success.
        </p>
        <LatestProducts />
      </section>

      {/* 5. TRADE PROCESS STEPS */}
      <HowItWorks />
      <GlobalImpact />
      <FeaturesSection/>

      
      {/* 4. GLOBAL IMPACT STATS */}
      
      {/* <section className="py-24 bg-base-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
              <h2 className="text-2xl font-bold  dark:text-gray-400 mb-4">How It Works</h2>
           
            <p className="text-gray-500">Simplify your import-export journey in four easy steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Select Product", desc: "Browse our verified global catalog." },
              { title: "Secure Payment", desc: "Transact with multi-layer encryption." },
              { title: "Fast Logistics", desc: "Automated customs and fast shipping." },
              { title: "Receive Goods", desc: "Door-to-door delivery guaranteed." },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="relative p-8 bg-base-200 rounded-2xl border-t-4 border-primary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <span className="absolute -top-6 left-6 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  {i + 1}
                </span>
                <h4 className="text-xl font-bold mb-3 mt-4">{step.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

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
