import React from "react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    { title: "Select Product", desc: "Browse our verified global catalog." },
    { title: "Secure Payment", desc: "Transact with multi-layer encryption." },
    { title: "Fast Logistics", desc: "Automated customs and fast shipping." },
    { title: "Receive Goods", desc: "Door-to-door delivery guaranteed." },
  ];

  // Container variants to coordinate the children's appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time between each card appearing
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-base-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* TITLE AREA - Improved Typography */}
        <div className="text-center mb-20">
         <div className="text-center mb-16">
              <h2 className="text-2xl font-bold  dark:text-gray-400 mb-4">How It Works</h2>
           
            <p className="text-gray-500">Simplify your import-export journey in four easy steps.</p>
          </div>
        </div>

        {/* STEPS GRID - Added Connecting Path Logic */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="group relative p-8 bg-base-200 rounded-3xl border border-base-300 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* STEP NUMBER - Enhanced with pulse animation */}
              <div className="absolute -top-6 left-8 flex items-center justify-center">
                <span className="relative z-10 w-12 h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-110 transition-transform">
                  {i + 1}
                </span>
                {/* Decorative pulse effect */}
                <span className="absolute w-12 h-12 bg-blue-500/30 rounded-xl animate-ping"></span>
              </div>

              {/* CARD CONTENT */}
              <div className="mt-4">
                <h4 className="text-xl font-bold mb-3 text-neutral dark:text-gray-100 group-hover:text-primary transition-colors">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>

              {/* DECORATIVE CORNER ELEMENT */}
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-primary/5 rounded-tl-[100px] rounded-br-3xl"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;