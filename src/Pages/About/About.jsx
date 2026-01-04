import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const stats = [
    { label: "Active Traders", value: "10K+", desc: "Verified global partners", icon: "🤝" },
    { label: "Countries", value: "150+", desc: "Reach across 6 continents", icon: "🌍" },
    { label: "Daily Shipments", value: "2.5K", desc: "Successfully delivered", icon: "📦" },
  ];

  const values = [
    { title: "Transparency", text: "Real-time ledger tracking for every shipment." },
    { title: "Efficiency", text: "AI-driven logistics to bypass supply chain bottlenecks." },
    { title: "Security", text: "Military-grade encryption for trade documentation." },
  ];

  return (
    <div ref={containerRef} className="pt-32 pb-0 overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
      
      {/* 1. HERO SECTION - High Impact Text Animation */}
     <div className="max-w-6xl mx-auto px-6 relative mb-24"> {/* Reduced margin bottom */}
  {/* Subtle Glow */}
  <div className="absolute -top-24 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
  
  <motion.div 
    className="text-center relative z-10"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    }}
  >
    {/* Tag: Smaller and more compact */}
    <motion.span 
      variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
      className="px-3 py-1 rounded-full border border-primary/20 text-primary font-mono text-[10px] tracking-[0.2em] uppercase bg-primary/5 inline-block mb-6"
    >
      Digital Supply Chain
    </motion.span>
    
    {/* Heading: Decreased from 9xl to a clean 5xl/7xl range */}
    <motion.h1 
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      className="text-4xl md:text-7xl font-black mb-6 text-slate-900 dark:text-white tracking-tight leading-[1.1]"
    >
      The New Standard <br /> 
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-primary to-cyan-400">
        In Global Trade.
      </span>
    </motion.h1>
    
    {/* Paragraph: Decreased to standard base/lg size */}
    <motion.p 
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-base md:text-lg leading-relaxed font-medium px-4"
    >
      TradeShift is an institutional-grade export-import ecosystem. 
      We eliminate complexity, reduce costs, and accelerate your global growth.
    </motion.p>
  </motion.div>
</div>

      {/* 2. CORE VALUES SECTION - Interactive Scroll Text */}
      <div className="max-w-6xl mx-auto px-6 mb-40">
        <div className="grid md:grid-cols-3 gap-16">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="border-l-2 border-primary/20 pl-8"
            >
              <h3 className="text-blue-600 font-black text-2xl uppercase italic mb-4">{v.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. STATS SECTION - Floating Cards with Tilt Effect */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, rotateZ: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative group p-1 bg-gradient-to-br from-primary/40 to-transparent rounded-[2rem]"
          >
            <div className="h-full p-10 bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[1.9rem] border border-slate-200 dark:border-white/5 shadow-2xl transition-all">
              <motion.div 
                animate={{ y: [0, -5, 0] }} 
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="text-4xl mb-6"
              >
                {stat.icon}
              </motion.div>
              <div className="text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-primary font-bold uppercase tracking-widest text-xs mb-3">
                {stat.label}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                {stat.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4. BIG CTA BANNER - Enhanced Blue Theme */}
 {/* 3. FULL WIDTH CTA BANNER - Balanced & Professional */}
<motion.div 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  /* Light: Rich Blue-600 | Dark: Deep Navy-950 with Blue Glow */
  className="w-full mt-32 py-24 relative overflow-hidden bg-blue-600 dark:bg-slate-950"
>
  {/* Professional Background Elements */}
  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
  <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
  
  <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
    <motion.h2 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      /* Text size decreased from 8xl to a clean 4xl/6xl */
      className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase italic leading-[1.1]"
    >
      Ready to Shift <br /> 
      <span className="text-blue-200">Your Trade?</span>
    </motion.h2>

    <motion.p 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-blue-100/70 max-w-lg mx-auto mb-10 text-sm md:text-base font-medium"
    >
      Join 10,000+ global merchants already scaling their business with TradeShift.
    </motion.p>

    <div className="flex flex-wrap justify-center gap-4 mt-8">
      {/* Button sizes slightly adjusted for better balance */}
      <button className="px-10 py-4 bg-white text-blue-600 font-bold rounded-xl uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl">
        Get Started Free
      </button>

      <button className="px-10 py-4 bg-transparent border border-white/30 text-white font-bold rounded-xl uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
        Contact Sales
      </button>
    </div>
  </div>
</motion.div>
    </div>
  );
};

export default About;