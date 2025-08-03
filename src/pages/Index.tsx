import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import CustomCursor from '@/components/CustomCursor';
import AdvancedPreloader from '@/components/AdvancedPreloader';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');
  const mainRef = useRef<HTMLElement>(null);

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
                    className="w-full px-4 py-3 bg-background/50 border border-border/20 rounded-lg focus:border-accent focus:outline-none transition-all duration-300 resize-none"
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

  // Handle preloader completion with smooth reveal
  const handlePreloaderComplete = () => {
    setIsLoading(false);
    
    // Animate page elements after preloader
    setTimeout(() => {
      gsap.fromTo(".page-content", 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: "power2.out"
        }
      );
    }, 100);
  };

  // Setup scroll-triggered section detection
  useEffect(() => {
    if (!isLoading && mainRef.current) {
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

      return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }, [isLoading]);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power2.inOut"
      });
    }
  };

  // Enhanced page transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark-transition overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Enhanced Preloader */}
      <AnimatePresence>
        {isLoading && (
          <AdvancedPreloader onComplete={handlePreloaderComplete}>
            <div className="page-content">
              <Navigation />
              <main ref={mainRef}>
                {sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className={`section-padding min-h-screen flex items-center ${section.className}`}
                  >
                    {section.component}
                  </section>
                ))}
              </main>
            </div>
          </AdvancedPreloader>
        )}
      </AnimatePresence>

      {/* Main Content with Enhanced Animations */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            className="page-content"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Navigation />
            
            <main ref={mainRef}>
              {sections.map((section, index) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  className={`section-padding ${
                    section.id === 'home' ? 'min-h-screen flex items-center' : 'py-32'
                  } ${section.className}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-200px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  {section.component}
                </motion.section>
              ))}
            </main>

            {/* Enhanced Footer */}
            <motion.footer
              className="py-16 border-t border-border/20 bg-surface/50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="container-luxury">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                  <div>
                    <h3 className="font-medium mb-4 tracking-wide">ANAUR DESIGN</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Creating architectural experiences that transcend the ordinary. 
                      Where innovation meets timeless design.
                    </p>
                  </div>
                  <div>
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
                  </div>
                  <div>
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
                  </div>
                </div>
                
                <div className="pt-8 border-t border-border/20">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-caption text-muted-foreground mb-4 md:mb-0">
                      © 2024 ANAUR DESIGN. ALL RIGHTS RESERVED.
                    </div>
                    <div className="text-caption text-muted-foreground">
                      WEBSITE BY ANAUR STUDIO
                    </div>
                  </div>
                </div>
              </div>
            </motion.footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX: 0 }}
        animate={{ scaleX: currentSection === 'home' ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default Index;
