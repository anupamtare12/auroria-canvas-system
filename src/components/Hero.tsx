import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <section className="relative h-screen overflow-hidden bg-black flex items-center justify-center">
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border border-white/20 border-t-white rounded-full"
          />
          <span className="text-white/60 text-sm tracking-wider">LOADING EXPERIENCE</span>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop)`
        }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />
      
      {/* Content */}
      <div className="relative z-20 flex h-full items-center justify-center px-8 md:px-16">
        <div className="text-center max-w-6xl">
          {/* Typography */}
          <motion.h1 
            className="text-white leading-none tracking-[-0.02em] mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.span 
              className="block text-6xl md:text-8xl lg:text-[10rem] font-thin"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              ANAUR
            </motion.span>
            <motion.span 
              className="block text-6xl md:text-8xl lg:text-[10rem] font-bold -mt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              DESIGN
            </motion.span>
          </motion.h1>
          
          {/* Tagline */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <p className="text-white/90 text-xl md:text-2xl lg:text-3xl font-light tracking-wide max-w-4xl mx-auto mb-6 leading-relaxed">
              Creating spaces that breathe life into your dreams
            </p>
            <p className="text-white/70 text-lg md:text-xl font-light max-w-3xl mx-auto">
              Where every corner tells your story and architecture meets emotion
            </p>
          </motion.div>

          {/* Year indicator */}
          <motion.div 
            className="flex items-center justify-center space-x-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <span className="text-white/60 text-sm tracking-[0.4em] uppercase font-light">
              Est. 2024
            </span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent via-white/40 to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div 
          className="flex flex-col items-center space-y-4 text-white/60"
          animate={{ 
            y: [0, 8, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-xs tracking-[0.3em] uppercase font-light">
            SCROLL
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/70 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
