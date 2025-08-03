import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Placeholder images for demo
const img1 = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop";
const img2 = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop";
const img3 = "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const contentRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  
  // Enhanced mouse tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25 });

  // Optimized mouse tracking
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalize mouse position to -1 to 1 range
    const normalizedX = (clientX / innerWidth - 0.5) * 2;
    const normalizedY = (clientY / innerHeight - 0.5) * 2;
    
    mouseX.set(normalizedX * 20);
    mouseY.set(normalizedY * 20);
  }, [mouseX, mouseY]);

  // Enhanced image preloading with progress tracking
  useEffect(() => {
    const images = [img1, img2, img3];
    let loadedCount = 0;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setIsLoaded(true);
        // Delay reveal to coordinate with preloader
        setTimeout(() => {
          setIsRevealing(true);
        }, 800);
      }
    };

    images.forEach(src => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
      img.src = src;
    });

    // Enhanced mouse listener with RAF throttling
    let ticking = false;
    const throttledMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
    };
  }, [handleMouseMove]);

  // Enhanced GSAP animations with better coordination
  useEffect(() => {
    if (!isLoaded || !isRevealing) return;

    const ctx = gsap.context(() => {
      // Enhanced parallax layers with improved performance
      const layers = gsap.utils.toArray(".hero-layer");
      
      layers.forEach((layer, i) => {
        gsap.set(layer, { 
          willChange: "transform",
          backfaceVisibility: "hidden",
          perspective: 1000
        });

        // Initial state - slightly blurred
        gsap.set(layer, {
          filter: `blur(${2 + i}px)`,
          scale: 1.05 + (i * 0.02)
        });

        // Reveal animation
        gsap.to(layer, {
          filter: "blur(0px)",
          scale: 1,
          duration: 1.5 + (i * 0.2),
          ease: "power3.out",
          delay: i * 0.1
        });

        // Parallax scroll effect
        gsap.to(layer, {
          yPercent: -15 * (i + 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true
          },
        });
      });

      // Enhanced typography animation with coordinated timing
      if (textRef.current) {
        const titleLines = textRef.current.querySelectorAll('.title-line');
        
        // Initial state
        gsap.set(titleLines, {
          opacity: 0,
          y: 80,
          rotationX: 45,
          filter: "blur(4px)"
        });
        
        // Staggered reveal animation
        gsap.to(titleLines, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          filter: "blur(0px)",
          duration: 1.5,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.5
        });
      }

      // Enhanced content reveal animation
      if (contentRef.current) {
        const contentElements = contentRef.current.querySelectorAll('.fade-in-element');
        
        gsap.set(contentElements, {
          opacity: 0,
          y: 30,
          filter: "blur(2px)"
        });
        
        gsap.to(contentElements, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          delay: 1.2
        });
      }

      // Floating elements animation
      const floatingElements = gsap.utils.toArray(".floating-element");
      floatingElements.forEach((el, i) => {
        gsap.to(el, {
          y: "random(-20, 20)",
          x: "random(-10, 10)",
          rotation: "random(-5, 5)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded, isRevealing]);

  // Enhanced smooth scroll
  const scrollToNext = useCallback(() => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      gsap.to(window, {
        duration: 1.8,
        scrollTo: { y: nextSection, offsetY: 80 },
        ease: "power3.inOut"
      });
    }
  }, []);

  // Enhanced loading state
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
    <section 
      ref={containerRef} 
      className="relative h-screen overflow-hidden bg-black"
    >
      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </div>
      
      {/* Enhanced parallax layers with coordinated reveal */}
      {[img1, img2, img3].map((img, i) => (
        <motion.div
          key={i}
          className="hero-layer absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${img})`, 
            zIndex: 3 - i,
            opacity: 0.9 - (i * 0.1),
          }}
          initial={{ scale: 1.1, filter: "blur(10px)" }}
          animate={{ 
            scale: 1, 
            filter: "blur(0px)",
            transition: { 
              duration: 2 + (i * 0.3),
              ease: "power3.out",
              delay: i * 0.2
            }
          }}
        />
      ))}

      {/* Enhanced grid overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]">
        <motion.div 
          className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:80px_80px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ delay: 1.5, duration: 1 }}
        />
      </div>

      {/* Enhanced mouse-responsive lighting */}
      <motion.div
        className="absolute inset-0 z-15 pointer-events-none opacity-5"
        style={{
          background: `radial-gradient(800px circle at ${springX}px ${springY}px, rgba(255,255,255,0.15), transparent 50%)`
        }}
      />

      {/* Main content with enhanced coordination */}
      <div ref={contentRef} className="relative z-30 flex h-full items-center justify-center px-8 md:px-16">
        <div className="text-center max-w-6xl">
          {/* Enhanced typography */}
          <div ref={textRef} className="overflow-hidden mb-12">
            <motion.h1 className="text-white leading-none tracking-[-0.02em]">
              <motion.span 
                className="title-line block text-6xl md:text-8xl lg:text-[10rem] font-thin"
                whileHover={{ 
                  scale: 1.02,
                  filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))",
                  transition: { duration: 0.4 }
                }}
              >
                ANAUR
              </motion.span>
              <motion.span 
                className="title-line block text-6xl md:text-8xl lg:text-[10rem] font-bold -mt-4"
                whileHover={{ 
                  scale: 1.02,
                  filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))",
                  transition: { duration: 0.4 }
                }}
              >
                DESIGN
              </motion.span>
            </motion.h1>
          </div>
          
          {/* Enhanced tagline */}
          <motion.div className="fade-in-element mb-16">
            <motion.p
              className="text-white/90 text-xl md:text-2xl lg:text-3xl font-light tracking-wide max-w-4xl mx-auto mb-6 leading-relaxed"
              whileHover={{ 
                scale: 1.02,
                color: 'rgba(255,255,255,1)',
                transition: { duration: 0.3 }
              }}
            >
              Creating spaces that breathe life into your dreams
            </motion.p>
            <motion.p
              className="text-white/70 text-lg md:text-xl font-light max-w-3xl mx-auto"
              whileHover={{ 
                color: 'rgba(255,255,255,0.85)',
                transition: { duration: 0.3 }
              }}
            >
              Where every corner tells your story and architecture meets emotion
            </motion.p>
          </motion.div>

          {/* Enhanced year indicator with decorative elements */}
          <motion.div className="fade-in-element flex items-center justify-center space-x-8">
            <motion.div 
              className="w-16 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 2 }}
            />
            <motion.span 
              className="text-white/60 text-sm tracking-[0.4em] uppercase font-light relative"
              whileHover={{ 
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '0.5em',
                transition: { duration: 0.3 }
              }}
            >
              Est. 2024
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white/40 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.5, duration: 0.6 }}
              />
            </motion.span>
            <motion.div 
              className="w-16 h-px bg-gradient-to-l from-transparent via-white/40 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 2.2 }}
            />
          </motion.div>

          {/* Floating decorative elements */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-element absolute w-2 h-2 bg-white/10 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${60 + i * 10}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 + i * 0.3, duration: 0.8 }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-40"
      >
        <motion.button 
          onClick={scrollToNext}
          className="group flex flex-col items-center space-y-4 text-white/60 hover:text-white/90 transition-all duration-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span 
            className="text-xs tracking-[0.3em] uppercase font-light"
            animate={{ 
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            EXPLORE
          </motion.span>
          
          <div className="relative">
            <motion.div
              animate={{ 
                y: [0, 8, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-px h-8 bg-gradient-to-b from-transparent via-white/70 to-transparent"
            />
            
            {/* Pulsing dot */}
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white/60 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.button>
      </motion.div>

      {/* Enhanced ambient particles */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/8 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0, 0.4, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
