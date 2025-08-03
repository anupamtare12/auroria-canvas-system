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
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Simplified mouse tracking for better performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Optimized mouse tracking - throttled for performance
  const handleMouseMove = useCallback((e) => {
    // Only update if mouse moved significantly
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  }, [mouseX, mouseY]);

  // Simplified image preloading
  useEffect(() => {
    const images = [img1, img2, img3];
    let loadedCount = 0;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setIsLoaded(true);
      }
    };

    images.forEach(src => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
      img.src = src;
    });

    // Throttled mouse listener for better performance
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

  // Optimized GSAP animations - reduced complexity
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Simplified parallax for better performance
      const layers = gsap.utils.toArray(".hero-layer");
      
      layers.forEach((layer, i) => {
        gsap.set(layer, { 
          willChange: "transform",
          backfaceVisibility: "hidden"
        });

        gsap.to(layer, {
          yPercent: -25 * (i + 1), // Reduced intensity
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5, // Smoother scrub
            invalidateOnRefresh: true
          },
        });
      });

      // Optimized typography animation
      if (textRef.current) {
        const titleLines = textRef.current.querySelectorAll('.title-line');
        
        titleLines.forEach((line, lineIndex) => {
          gsap.fromTo(line, 
            {
              opacity: 0,
              y: 60,
              rotationX: 30
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1.2,
              ease: "power3.out",
              delay: lineIndex * 0.2
            }
          );
        });
      }

      // Simplified entrance animations
      gsap.fromTo(".fade-in-element", 
        { 
          opacity: 0, 
          y: 20
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.8,
          ease: "power2.out"
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // Optimized smooth scroll
  const scrollToNext = useCallback(() => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  }, []);

  // Simplified loading state
  if (!isLoaded) {
    return (
      <section className="relative h-screen overflow-hidden bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
        />
      </section>
    );
  }

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen overflow-hidden bg-black"
    >
      {/* Simplified gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-10 pointer-events-none" />
      
      {/* Optimized parallax layers */}
      {[img1, img2, img3].map((img, i) => (
        <div
          key={i}
          className="hero-layer absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${img})`, 
            zIndex: 3 - i,
            opacity: 0.85 - (i * 0.15),
            filter: `contrast(${110 + i * 5}%) brightness(${90 - i * 5}%)`
          }}
        />
      ))}

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.02]">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:60px_60px]" />
      </div>

      {/* Subtle mouse-responsive lighting */}
      <motion.div
        className="absolute inset-0 z-15 pointer-events-none opacity-10"
        style={{
          background: `radial-gradient(600px circle at ${springX}px ${springY}px, rgba(255,255,255,0.1), transparent 40%)`
        }}
      />

      {/* Main content */}
      <div className="relative z-30 flex h-full items-center justify-center px-8 md:px-16">
        <div className="text-center max-w-6xl">
          <div ref={textRef} className="overflow-hidden mb-8">
            {/* Typography matching your reference image */}
            <h1 className="text-white leading-none tracking-[-0.02em]">
              <motion.span 
                className="title-line block text-6xl md:text-8xl lg:text-9xl font-thin"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                ANAUR
              </motion.span>
              <motion.span 
                className="title-line block text-6xl md:text-8xl lg:text-9xl font-bold"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                DESIGN
              </motion.span>
            </h1>
          </div>
          
          {/* Enhanced tagline with more emotion */}
          <motion.p
            className="fade-in-element text-white/85 text-xl md:text-2xl font-light tracking-wide max-w-3xl mx-auto mb-16 leading-relaxed"
            whileHover={{ 
              scale: 1.02,
              color: 'rgba(255,255,255,0.95)',
              transition: { duration: 0.3 }
            }}
          >
            Creating spaces that breathe life into your dreams,
            <br />
            <span className="text-white/70 text-lg md:text-xl">where every corner tells your story</span>
          </motion.p>

          {/* Refined year indicator */}
          <div className="fade-in-element flex items-center justify-center space-x-6">
            <motion.div 
              className="w-12 h-px bg-white/30"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            />
            <motion.span 
              className="text-white/50 text-sm tracking-[0.3em] uppercase font-light"
              whileHover={{ 
                color: 'rgba(255,255,255,0.8)',
                letterSpacing: '0.4em',
                transition: { duration: 0.3 }
              }}
            >
              Est. 2024
            </motion.span>
            <motion.div 
              className="w-12 h-px bg-white/30"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.7 }}
            />
          </div>
        </div>
      </div>

      {/* Centered scroll indicator matching your reference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-40"
      >
        <motion.button 
          onClick={scrollToNext}
          className="group flex flex-col items-center space-y-3 text-white/50 hover:text-white/80 transition-colors duration-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span 
            className="text-xs tracking-[0.25em] uppercase font-light"
            animate={{ 
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            SCROLL
          </motion.span>
          
          <div className="relative">
            <motion.div
              animate={{ 
                y: [0, 6, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-px h-6 bg-gradient-to-b from-transparent via-white/60 to-transparent"
            />
          </div>
        </motion.button>
      </motion.div>

      {/* Minimal floating particles for ambiance */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0, 0.3, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
