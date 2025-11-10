import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// ---
// 1. Updated prices to Bangladeshi Taka (৳).
// 2. Changed offers to a percentage format (e.g., "15% Off").
// ---
const slides = [
  {
    id: 1,
    name: "Alpro Plant-Based Milks",
    image: "https://i.ibb.co/MyP2RtvD/slider-image-7.jpg",
    description: "A delicious, healthy alternative. Try our Almond and Coconut milks.",
    price: "৳450", // Changed price
    offer: "15% Off", // Corrected offer format
  },
  {
    id: 2,
    name: "Kettle Salt & Vinegar Chips",
    image: "https://i.ibb.co/svyh9dFc/slider-image-6.jpg", // Fixed URL
    description: "The perfect tangy, salty crunch for snack time or with lunch.",
    price: "৳400", // Changed price
    offer: "10% Off", // Corrected offer format
  },
  {
    id: 3,
    name: "Fenway Creamy Chicken Pasta",
    image: "https://i.ibb.co/m3fhP31/slider-image-3.jpg", // Fixed URL
    description: "A restaurant-quality meal at home. Rich, creamy, and ready in minutes.",
    price: "৳900", // Changed price
    offer: "20% Off", // Corrected offer format
  },
];

const HeroSlider = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      loop
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      className="w-full h-[600px]"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="w-full h-[600px] bg-cover bg-center relative flex items-center justify-center text-white"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            {/* Dark transparent overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

            {/* Text content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
              {/* --- NEW: Offer Badge --- */}
              {slide.offer && (
                <span className="bg-red-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
                  {slide.offer}
                </span>
              )}

              {/* --- Product Name --- */}
              <h2 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                {slide.name}
              </h2>

              {/* --- Product Description --- */}
              <p className="max-w-xl text-base md:text-lg text-gray-200 mb-4">
                {slide.description}
              </p>

              {/* --- Price (Now in TK) --- */}
              <div className="text-3xl font-bold text-yellow-300 drop-shadow-md">
                {slide.price}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;