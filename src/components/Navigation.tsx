import React from 'react';
import { motion } from 'framer-motion';

const Navigation = () => {
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 p-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <motion.div 
          className="text-white font-light text-xl tracking-wider"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          ANAUR
        </motion.div>
        <div className="hidden md:flex space-x-8">
          {['Home', 'About', 'Projects', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-300"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {item}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
