import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import CustomCursor from '@/components/CustomCursor';
import AdvancedPreloader from '@/components/Preloader';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [isContentReady, setIsContentReady] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const pageContentRef = useRef<HTMLDivElement>(null);

  // Section data for dynamic rendering and navigation
  const sections = [
    {
      id: 'home',
      title: 'Home',
      component: <Hero />,
      className: '',
      navPath: '/'
    },
    {
      id: 'about',
      title: 'About',
      component: <About />,
      className: 'bg-surface',
      navPath: '/about'
    },
    {
      id: 'projects',
      title: 'Projects',
      component: (
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-heading mb-8 font-light tracking-wide">
              Our Projects
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover our carefully curated collection of architectural masterpieces. 
              Each project tells a unique story of innovation, sustainability, and timeless design.
            </p>
            <motion.div
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-muted/20 to-muted/5 rounded-lg border border-border/20 flex items-center justify-center group hover:border-accent/30 transition-all duration-500"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-muted-foreground group-hover:text-accent transition-colors duration-300">
                    Project {i}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      ),
      className: '',
      navPath: '/projects'
    },
    {
      id: 'shop',
      title: 'Shop',
      component: (
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-heading mb-8 font-light tracking-wide">
              Design Shop
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              Explore our curated selection of furniture, decor, and architectural elements. 
              Each piece is chosen to bring the ANAUR aesthetic into your space.
            </p>
            <motion.button
              className="bg-accent text-accent-foreground px-8 py-4 rounded-lg font-medium tracking-wide hover:bg-accent/90 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Collection
            </motion.button>
          </motion.div>
        </div>
      ),
      className: 'bg-surface',
      navPath: '/shop'
    },
    {
      id: 'blog',
      title: 'Blog',
      component: (
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-heading mb-8 font-light tracking-wide">
              Design Journal
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Insights into our design process, architectural trends, and the stories behind our creations. 
              Join us on a journey through the world of contemporary architecture.
            </p>
            <motion.div
              className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {[
                { title: "Sustainable Design Principles", date: "Dec 2024" },
                { title: "Minimalism in Modern Homes", date: "Nov 2024" },
                { title: "The Future of Architecture", date: "Oct 2024" }
              ].map((post, i) => (
                <motion.article
                  key={i}
                  className="text-left p-6 bg-background/50 rounded-lg border border-border/20 hover:border-accent/30 transition-all duration-500 group cursor-pointer"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-video bg-gradient-to-br from-muted/20 to-muted/5 rounded-lg mb-4 group-hover:from-accent/10 group-hover:to-accent/5 transition-all duration-500" />
                  <h3 className="font-medium mb-2 group-hover:text-accent transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </div>
      ),
      className: '',
      navPath: '/blog'
    },
    {
      id: 'contact',
      title: 'Contact',
      component: (
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-heading mb-8 font-light tracking-wide">
                Let's Create Together
              </h2>
              <p className="text-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Ready to transform your space? We'd love to hear about your vision 
                and explore how we can bring it to life.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-3 bg-background/50 border border-border/20 rounded-lg focus:border-accent focus:outline-none transition-all duration-300"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 bg-background/50 border border-border/20 rounded-lg focus:border-accent focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 bg-background/50 border border-border/20 rounded-lg focus:border-accent focus:outline-none transition-all duration-300"
                  />
                  <textarea
                    placeholder="Tell us about your project..."
                    rows={6}
                    className="w-full px-4 py-3 bg-background/50 border border-border/border/20 rounded-lg focus:border-accent focus:outline-none transition-all duration-300 resize-none"
                  />
                  <motion.button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground py-4 rounded-lg font-medium tracking-wide hover:bg-accent/90 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
              
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="font-medium mb-4">Studio</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    123 Design Street<br />
                    Architecture District<br />
                    City, State 12345
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-4">Get in Touch</h3>
                  <p className="text-muted-foreground">
                    hello@anaurdesign.com<br />
                    +1 (555) 123-4567
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-4">Office Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: By Appointment
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      ),
      className: 'bg-surface',
      navPath: '/contact'
    }
  ];

  // Enhanced preloader completion handler with coordinated timing
  const handlePreloaderComplete = useCallback(() => {
    setIsPreloaderComplete(true);
    
    // Small delay to ensure preloader exit animation completes
    setTimeout(() => {
      setIsLoading(false);
      
      // Start content reveal animation after preloader fully exits
      setTimeout(() => {
        setIsContentReady(true);
        
        // Enhanced page content reveal animation
        if (pageContentRef.current) {
          gsap.set(pageContentRef.current, { 
            opacity: 0, 
            y: 20,
            scale: 0.98
          });
          
          gsap.to(pageContentRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            onComplete: () => {
              // Trigger hero animations after page content is revealed
              const heroElement = document.getElementById('home');
              if (heroElement) {
                gsap.set(heroElement, { willChange: 'transform' });
                gsap.fromTo(heroElement, 
                  { 
                    opacity: 0.8,
                    filter: 'blur(4px)'
                  },
                  { 
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.5,
                    ease: "power2.out"
                  }
                );
              }
            }
          });
        }
      }, 300);
    }, 500);
  }, []);

  // Setup scroll-triggered section detection with enhanced timing
  useEffect(() => {
    if (isContentReady && mainRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const sectionElements = sections.map(section => 
          document.getElementById(section.id)
        ).filter(Boolean);

        sectionElements.forEach((element, index) => {
          if (element) {
            ScrollTrigger.create({
              trigger: element,
              start: "top 60%",
              end: "bottom 40%",
              onEnter: () => setCurrentSection(sections[index].id),
              onEnterBack: () => setCurrentSection(sections[index].id),
            });
          }
        });
      }, 100);

      return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }, [isContentReady, sections]);

  // Smooth scroll to section with enhanced easing
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.8,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power3.inOut"
      });
    }
  }, []);

  // Enhanced page transition variants with stagger
  const pageVariants = {
    initial: { 
      opacity: 0, 
      y: 30,
      scale: 0.98
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      scale: 1.02,
      transition: { 
        duration: 0.8,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  const sectionVariants = {
    initial: { 
      opacity: 0, 
      y: 40,
      filter: 'blur(2px)'
    },
    animate: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: "power2.out"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark-transition overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Enhanced Preloader with coordinated exit */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            exit={{ 
              opacity: 0,
              scale: 1.1,
              transition: { 
                duration: 0.8,
                ease: "power2.inOut" 
              }
            }}
          >
            <AdvancedPreloader onComplete={handlePreloaderComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Enhanced Coordinated Animations */}
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key="main-content"
            ref={pageContentRef}
            className="page-content"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                ease: "power2.out" 
              }}
            >
              <Navigation />
            </motion.div>
            
            <main ref={mainRef}>
              {sections.map((section, index) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  className={`section-padding ${
                    section.id === 'home' ? 'min-h-screen flex items-center' : 'py-32'
                  } ${section.className}`}
                  variants={sectionVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ 
                    once: true, 
                    margin: "-150px",
                    amount: 0.2
                  }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.8 
                  }}
                >
                  {section.component}
                </motion.section>
              ))}
            </main>

            {/* Enhanced Footer with smoother entrance */}
            <motion.footer
              className="py-16 border-t border-border/20 bg-surface/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1,
                ease: "power2.out"
              }}
            >
              <div className="container-luxury">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.2,
                    duration: 0.8,
                    staggerChildren: 0.1
                  }}
                >
                  <motion.div variants={sectionVariants}>
                    <h3 className="font-medium mb-4 tracking-wide">ANAUR DESIGN</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Creating architectural experiences that transcend the ordinary. 
                      Where innovation meets timeless design.
                    </p>
                  </motion.div>
                  <motion.div variants={sectionVariants}>
                    <h4 className="font-medium mb-4">Quick Links</h4>
                    <div className="space-y-2">
                      {sections.slice(0, -1).map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className="block text-muted-foreground text-sm hover:text-accent transition-colors duration-300"
                        >
                          {section.title}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div variants={sectionVariants}>
                    <h4 className="font-medium mb-4">Follow Us</h4>
                    <div className="space-y-2">
                      <a href="#" className="block text-muted-foreground text-sm hover:text-accent transition-colors duration-300">
                        Instagram
                      </a>
                      <a href="#" className="block text-muted-foreground text-sm hover:text-accent transition-colors duration-300">
                        LinkedIn
                      </a>
                      <a href="#" className="block text-muted-foreground text-sm hover:text-accent transition-colors duration-300">
                        Pinterest
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="pt-8 border-t border-border/20"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-caption text-muted-foreground mb-4 md:mb-0">
                      © 2024 ANAUR DESIGN. ALL RIGHTS RESERVED.
                    </div>
                    <div className="text-caption text-muted-foreground">
                      WEBSITE BY ANAUR STUDIO
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/80 to-accent z-50 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ 
          scaleX: currentSection === 'home' ? 0 : 1,
          opacity: currentSection === 'home' ? 0 : 1
        }}
        transition={{ 
          duration: 0.6,
          ease: "power2.out"
        }}
      />
    </div>
  );
};

export default Index;
