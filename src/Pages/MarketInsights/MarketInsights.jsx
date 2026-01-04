import { motion } from "framer-motion";

const MarketInsights = () => {
  // Expanded data based on your specific export categories
  const trends = [
    { country: "USA", product: "Alaskan Salmon", growth: "+18.4%", status: "High Demand", vol: "High" },
    { country: "France", product: "Organic Broccoli", growth: "+12.1%", status: "Stable", vol: "Medium" },
    { country: "Australia", product: "Chao Cheese", growth: "+22.5%", status: "Trending", vol: "Low" },
    { country: "Italy", product: "Chicken Meatballs", growth: "+9.8%", status: "Expanding", vol: "Medium" },
    { country: "Mexico", product: "Angus Beef", growth: "+15.2%", status: "High Demand", vol: "High" },
    { country: "Germany", product: "Automotive Parts", growth: "+14.0%", status: "Stable", vol: "High" },
    { country: "Japan", product: "Precision Tools", growth: "+6.7%", status: "Stable", vol: "Medium" },
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      {/* 1. Header with Scramble-style Animation */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }} 
        className="mb-12 border-l-4 border-blue-500 pl-6"
      >
        <h2 className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase mb-2 font-bold">
          Real-Time Global Analytics
        </h2>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
          Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Insights</span>
        </h1>
      </motion.div>

      {/* 2. Insight Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-blue-600 rounded-3xl text-white shadow-xl shadow-blue-500/20">
          <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-2">Top Origin</p>
          <p className="text-3xl font-black italic">USA (45%)</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Global Avg Growth</p>
          <p className="text-3xl font-black text-green-500">+14.2%</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Active Shipments</p>
          <p className="text-3xl font-black text-blue-500">2,481</p>
        </div>
      </div>

      {/* 3. The Terminal Table */}
      <div className="overflow-hidden bg-white dark:bg-[#0b1120] rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-white/5">
                <th className="py-6 px-8 text-slate-900 dark:text-white uppercase font-black text-xs tracking-widest">Market</th>
                <th className="text-slate-900 dark:text-white uppercase font-black text-xs tracking-widest">Core Product</th>
                <th className="text-slate-900 dark:text-white uppercase font-black text-xs tracking-widest text-center">Volume</th>
                <th className="text-slate-900 dark:text-white uppercase font-black text-xs tracking-widest">Status</th>
                <th className="text-slate-900 dark:text-white uppercase font-black text-xs tracking-widest text-right">Growth</th>
              </tr>
            </thead>
            <motion.tbody 
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {trends.map((item, idx) => (
                <motion.tr 
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="group hover:bg-blue-500/5 border-b border-slate-100 dark:border-white/5 transition-colors"
                >
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span className="font-bold text-slate-900 dark:text-white">{item.country}</span>
                    </div>
                  </td>
                  <td className="text-slate-500 dark:text-slate-400 font-medium">{item.product}</td>
                  <td className="text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      item.vol === 'High' ? 'bg-blue-500/10 text-blue-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {item.vol}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs font-bold text-slate-400 italic">{item.status}</span>
                  </td>
                  <td className="text-right">
                    <motion.span 
                      whileHover={{ scale: 1.1 }}
                      className="inline-block text-green-500 font-black text-lg"
                    >
                      {item.growth}
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;