import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import components
import CustomCursor from '../components/ui/CustomCursor';
import AdvancedPreloader from '../components/ui/Preloader';
import Navigation from '../components/ui/Navigation';
import Hero from '../components/ui/Hero';
import About from '../components/ui/About';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Custom Cursor - ALWAYS VISIBLE */}
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
              
              {/* Test Section with buttons */}
              <section className="py-32 bg-gray-100">
                <div className="max-w-6xl mx-auto px-8 md:px-16 text-center">
                  <h2 className="text-4xl font-light mb-8 text-gray-900">Test Cursor Interaction</h2>
                  <div className="space-x-4">
                    <button className="bg-black text-white px-8 py-4 rounded hover:bg-gray-800 transition-colors">
                      Hover Me
                    </button>
                    <button className="bg-gray-600 text-white px-8 py-4 rounded hover:bg-gray-700 transition-colors">
                      Click Me
                    </button>
                    <a href="#" className="inline-block bg-blue-600 text-white px-8 py-4 rounded hover:bg-blue-700 transition-colors">
                      Link Button
                    </a>
                  </div>
                </div>
              </section>
            </main>

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
