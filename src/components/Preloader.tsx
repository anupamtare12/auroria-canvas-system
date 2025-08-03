import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AdvancedPreloader = ({ onComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
      setLoadingProgress(progress);
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        transition: { 
          duration: 1,
          ease: [0.4, 0, 1, 1]
        }
      }}
    >
      {/* Ambient background elements */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:100px_100px]" />
        </div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.3, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative text-center z-10">
        {/* Brand text */}
        <motion.h1
          className="text-white text-5xl md:text-7xl lg:text-9xl font-thin tracking-[0.15em] mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.span 
            className="block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            ANAUR
          </motion.span>
          <motion.span 
            className="block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            DESIGN
          </motion.span>
        </motion.h1>
        
        {/* Enhanced loading section */}
        <div className="flex flex-col items-center space-y-6">
          {/* Progress bar */}
          <div className="relative w-32 h-px bg-white/10 overflow-hidden rounded-full">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-white/40 via-white/70 to-white/40 rounded-full"
              style={{ width: `${loadingProgress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
            />
          </div>
          
          {/* Loading text with percentage */}
          <motion.div
            className="flex items-center space-x-4"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-white/40 text-xs tracking-[0.3em] font-light">
              LOADING
            </span>
            <div className="w-px h-3 bg-white/20" />
            <span className="text-white/60 text-xs font-light">
              {Math.round(loadingProgress)}%
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdvancedPreloader;
