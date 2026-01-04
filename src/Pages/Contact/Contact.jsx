import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden bg-slate-50 dark:bg-[#020617]">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start relative z-10">
        
        {/* LEFT SIDE: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span className="text-blue-600 dark:text-blue-400 font-mono text-xs tracking-[0.3em] uppercase mb-4 block font-bold">
            Contact Us
          </motion.span>
          
          <h2 className="text-5xl font-black mb-6 text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none">
            Get in <span className="text-blue-600">Touch</span>
          </h2>
          
          <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg leading-relaxed max-w-md">
            Have questions about customs, shipping, or partnerships? Our dedicated trade advisors are available 24/7 to scale your business.
          </p>

          <div className="space-y-8">
            {/* Email Box */}
            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 bg-blue-600/10 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl transition-transform group-hover:scale-110">
                📧
              </div>
              <div>
                <p className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-sm">Official Support</p>
                <p className="text-blue-600 dark:text-blue-400 font-medium">support@tradeshift.com</p>
              </div>
            </div>

            {/* Phone Box */}
            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 bg-blue-600/10 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl transition-transform group-hover:scale-110">
                📞
              </div>
              <div>
                <p className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-sm">Trade Hotline</p>
                <p className="text-blue-600 dark:text-blue-400 font-medium">+880 1234 567890</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Professional Form */}
        <motion.form 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-slate-900/50 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/5"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">First Name</label>
              <input type="text" placeholder="John" className="input input-bordered w-full bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
              <input type="text" placeholder="Doe" className="input input-bordered w-full bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Business Email</label>
            <input type="email" placeholder="john@company.com" className="input input-bordered w-full bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all" />
          </div>

          <div className="space-y-2 mb-8">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Inquiry Details</label>
            <textarea placeholder="How can we help your export business?" className="textarea textarea-bordered w-full h-36 bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all"></textarea>
          </div>

          <button className="btn btn-primary w-full text-white font-black uppercase tracking-[0.2em] h-16 rounded-2xl shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-95 transition-all">
            Send Inquiry
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;