import { motion } from "framer-motion";
import { FiGlobe, FiShield, FiZap } from "react-icons/fi";

const features = [
  {
    title: "Global Logistics",
    desc: "Seamless trade across 150+ countries with real-time tracking.",
    icon: <FiGlobe />,
  },
  {
    title: "Secure Payments",
    desc: "Military-grade encryption for every transaction you make.",
    icon: <FiShield />,
  },
  {
    title: "Express Delivery",
    desc: "Priority handling to ensure your goods arrive ahead of schedule.",
    icon: <FiZap />,
  },
];

export const FeaturesSection = () => {
  return (
    <section className="relative w-full bg-blue-500 py-24 px-6 overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400 rounded-full blur-[100px] opacity-40" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-blue-100 font-mono text-sm tracking-[0.3em] uppercase mb-2">
            Why Choose Us
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Smart Trading Solutions
          </h3>
        </div>

        {/* CARDS - Changed to Clean White with Soft Shadows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative p-10 bg-white rounded-3xl shadow-xl shadow-blue-900/20 overflow-hidden"
            >
              {/* Icon - Blue-500 on White background */}
              <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight uppercase">
                {item.title}
              </h3>
              
              <p className="text-slate-500 group-hover:text-slate-700 transition-colors leading-relaxed text-sm">
                {item.desc}
              </p>

              {/* Decorative Accent - Slides in from the side on hover */}
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};