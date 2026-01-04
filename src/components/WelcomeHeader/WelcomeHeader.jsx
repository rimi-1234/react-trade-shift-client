import { motion } from "framer-motion";

export const WelcomeHeader = () => {
  const sentence = "Welcome to Our Store";

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const child = {
    visible: {
      opacity: [0.7, 1, 0.7], 
      y: [0, -8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    hidden: { opacity: 0, y: 0 },
  };

  return (
    /* We use a slightly darker blue bg-blue-600 so the White text pops beautifully */
    <div className="relative flex justify-center items-center h-32 sm:h-40 md:h-44 bg-blue-500 px-4 overflow-hidden border-b border-blue-700">
      
      {/* 1. BACKGROUND DECORATION - Using lighter blues for contrast */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 rounded-full blur-[60px] opacity-50"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], rotate: [0, -45, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 1 }}
        className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-400 rounded-full blur-[70px] opacity-40"
      />

      {/* 2. MAIN HEADING - Pure White with Glow */}
      <div className="relative z-10 text-center">
        <motion.h1
          className="flex flex-wrap justify-center text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight"
          style={{
            textShadow: "0px 0px 20px rgba(255, 255, 255, 0.4)", // White glow
          }}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {sentence.split("").map((letter, index) => (
            <motion.span
              variants={child}
              key={index}
              className={letter === " " ? "mr-2" : "inline-block"}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.p 
          animate={{ 
            opacity: [0.6, 1, 0.6],
            letterSpacing: ["0.2em", "0.4em", "0.2em"] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-blue-200 font-bold uppercase text-[8px] sm:text-[10px] mt-2 text-center"
        >
          Premium Global Trade Solutions
        </motion.p>
      </div>

      {/* 3. SUBTLE WAVE - White transition to the next section */}
      <motion.div 
        animate={{ y: [0, 2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]"
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-8 text-white fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105,121,111.41,180.33,107.05,240.5,102.66,285.49,76.54,321.39,56.44Z"></path>
        </svg>
      </motion.div>
    </div>
  );
};