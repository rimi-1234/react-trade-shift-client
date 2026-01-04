import React from "react";
import { motion } from "framer-motion";

const GlobalImpact = () => {
  const stats = [
    { label: "Partner Companies", value: 1200, suffix: "+" },
    { label: "Successful Deliveries", value: 850, suffix: "k" },
    { label: "Global Offices", value: 24, suffix: "" },
    { label: "Countries Served", value: 115, suffix: "" },
  ];

  return (
    <section className="py-24 bg-blue-50/50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Animated Grid Container */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              whileHover={{ 
                y: -15, 
                transition: { duration: 0.3 } 
              }}
              className="group relative p-10 bg-white rounded-3xl border border-blue-100 shadow-sm hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-300 overflow-hidden"
            >
              {/* Background Decorative Circle */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full group-hover:bg-blue-600/10 transition-colors duration-500" />

              <div className="relative z-10">
                {/* Number with "Count-up" feel using Framer Motion */}
                <motion.h3 
                  className="text-4xl md:text-5xl font-black text-blue-600 mb-3 flex justify-center"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                  >
                    {stat.value.toLocaleString()}
                  </motion.span>
                  <span>{stat.suffix}</span>
                </motion.h3>

                {/* Animated Divider */}
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "40px" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-1 bg-blue-400 mx-auto mb-4 rounded-full"
                />

                <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                  {stat.label}
                </p>
              </div>

              {/* Bottom accent bar that appears on hover */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalImpact;