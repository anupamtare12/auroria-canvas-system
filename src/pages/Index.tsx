import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import components
import CustomCursor from '../components/CustomCursor';
import AdvancedPreloader from '../components/Preloader';  
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import { Link } from 'wouter';

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
              
              {/* Featured Projects Section */}
              <section className="py-32 bg-gray-50">
                <div className="max-w-6xl mx-auto px-8 md:px-16">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                  >
                    <h2 className="text-4xl md:text-6xl font-light mb-8 text-gray-900">
                      Featured Projects
                    </h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                      Explore our carefully curated collection of architectural masterpieces that blend form and function.
                    </p>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { name: "Modern Villa", location: "Mumbai", category: "Residential" },
                      { name: "Urban Loft", location: "Delhi", category: "Residential" },
                      { name: "Minimalist Office", location: "Bangalore", category: "Commercial" }
                    ].map((project, i) => (
                      <motion.div
                        key={i}
                        className="group cursor-pointer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.2 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                      >
                        <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 group-hover:shadow-xl transition-all duration-500">
                          <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white font-light">View Project</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-light mb-2 group-hover:text-gray-600 transition-colors">{project.name}</h3>
                        <p className="text-gray-500 text-sm">{project.category} • {project.location}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                  >
                    <Link to="/projects">
                      <motion.button
                        className="bg-black text-white px-8 py-4 rounded-lg font-medium tracking-wide hover:bg-gray-800 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View All Projects
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </section>

              {/* Featured Blog Posts */}
              <section className="py-32 bg-white">
                <div className="max-w-6xl mx-auto px-8 md:px-16">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                  >
                    <h2 className="text-4xl md:text-6xl font-light mb-8 text-gray-900">
                      Latest Insights
                    </h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                      Discover our thoughts on design, architecture, and creating spaces that inspire.
                    </p>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {[
                      { 
                        title: "The Art of Minimalist Living", 
                        excerpt: "Exploring how minimalism creates more meaningful spaces by focusing on what truly matters...",
                        category: "Design Philosophy",
                        readTime: "5 min read"
                      },
                      { 
                        title: "Sustainable Materials in Modern Architecture", 
                        excerpt: "How choosing eco-friendly materials can create beautiful spaces while protecting our environment...",
                        category: "Sustainability",
                        readTime: "7 min read"
                      }
                    ].map((post, i) => (
                      <motion.article
                        key={i}
                        className="group cursor-pointer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.2 }}
                      >
                        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-6 group-hover:scale-105 transition-transform duration-500"></div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{post.category}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                          <h3 className="text-2xl font-light group-hover:text-gray-600 transition-colors">{post.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                  
                  <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                  >
                    <Link to="/blog">
                      <motion.button
                        className="bg-black text-white px-8 py-4 rounded-lg font-medium tracking-wide hover:bg-gray-800 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Read More Articles
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </section>

              {/* Featured Products */}
              <section className="py-32 bg-gray-50">
                <div className="max-w-6xl mx-auto px-8 md:px-16">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                  >
                    <h2 className="text-4xl md:text-6xl font-light mb-8 text-gray-900">
                      Curated Collection
                    </h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                      Handpicked furniture and decor pieces that complement our architectural vision.
                    </p>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                      { name: "Minimalist Table Lamp", price: "₹15,000", category: "Lighting" },
                      { name: "Modern Dining Chair", price: "₹25,000", category: "Furniture" },
                      { name: "Oak Coffee Table", price: "₹45,000", category: "Furniture" },
                      { name: "Ceramic Vase Set", price: "₹12,000", category: "Decor" }
                    ].map((product, i) => (
                      <motion.div
                        key={i}
                        className="group cursor-pointer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 group-hover:shadow-lg transition-all duration-300"></div>
                        <div className="space-y-1">
                          <h3 className="font-light group-hover:text-gray-600 transition-colors">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.category}</p>
                          <p className="font-medium">{product.price}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                  >
                    <Link to="/shop">
                      <motion.button
                        className="bg-black text-white px-8 py-4 rounded-lg font-medium tracking-wide hover:bg-gray-800 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Explore Collection
                      </motion.button>
                    </Link>
                  </motion.div>
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
