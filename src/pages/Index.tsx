import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdvancedPreloader from './components/Preloader';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import CustomCursor from './components/CustomCursor';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Custom Cursor - Add this at the very top */}
      <CustomCursor />
      
      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            exit={{ 
              opacity: 0,
              scale: 1.1,
              transition: { 
                duration: 0.8,
                ease: "easeInOut" 
              }
            }}
          >
            <AdvancedPreloader onComplete={handlePreloaderComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navigation />
            <main>
              <Hero />
              <About />
              
              {/* Additional Sections */}
              <section id="projects" className="py-32 bg-gray-50">
                <div className="max-w-6xl mx-auto px-8 md:px-16">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                  >
                    <h2 className="text-4xl md:text-6xl font-light mb-8 text-gray-900">
                      Our Projects
                    </h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
                      Discover our carefully curated collection of architectural masterpieces.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center"
                          whileHover={{ y: -10, scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-gray-500">Project {i}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>

              <section id="contact" className="py-32 bg-black">
                <div className="max-w-6xl mx-auto px-8 md:px-16">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                  >
                    <h2 className="text-4xl md:text-6xl font-light mb-8 text-white">
                      Let's Create Together
                    </h2>
                    <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed mb-12">
                      Ready to transform your space? We'd love to hear about your vision.
                    </p>
                    <motion.button
                      className="bg-white text-black px-8 py-4 rounded-lg font-medium tracking-wide hover:bg-gray-100 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get In Touch
                    </motion.button>
                  </motion.div>
                </div>
              </section>
            </main>

            {/* Footer */}
            <footer className="py-16 border-t border-white/10 bg-black">
              <div className="max-w-6xl mx-auto px-8 md:px-16">
                <div className="text-center">
                  <div className="text-white/40 text-sm">
                    © 2024 ANAUR DESIGN. ALL RIGHTS RESERVED.
                  </div>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
