import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  const cursorRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState('day');
  
  // Advanced mouse tracking with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  
  // Dynamic parallax based on mouse position
  const rotateX = useTransform(springY, [0, window.innerHeight], [5, -5]);
  const rotateY = useTransform(springX, [0, window.innerWidth], [-5, 5]);

  // Scroll velocity tracking
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollVelocity = () => {
      const currentScrollY = window.scrollY;
      setScrollVelocity(Math.abs(currentScrollY - lastScrollY));
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollVelocity);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Dynamic time-based effects
  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 12) setTimeOfDay('morning');
      else if (hour >= 12 && hour < 18) setTimeOfDay('day');
      else if (hour >= 18 && hour < 22) setTimeOfDay('evening');
      else setTimeOfDay('night');
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, []);

  // Advanced mouse tracking with magnetic effects
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);

    // Magnetic cursor effect
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: clientX - 10,
        y: clientY - 10,
        duration: 0.3,
        ease: "power2.out"
      });
    }

    // Magnetic effect on interactive elements
    const interactiveElements = document.querySelectorAll('.magnetic');
    interactiveElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance < 100) {
        const strength = (100 - distance) / 100;
        gsap.to(el, {
          x: deltaX * strength * 0.3,
          y: deltaY * strength * 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    });
  }, [mouseX, mouseY]);

  // Image preloading with performance optimization
  useEffect(() => {
    const images = [img1, img2, img3];
    let loadedCount = 0;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setIsLoaded(true);
      }
    };

    // Preload with WebP detection
    const supportsWebP = () => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    images.forEach(src => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
      img.decoding = 'async';
      img.loading = 'eager';
      img.src = src;
    });

    // Add mouse listener
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  // Advanced GSAP animations with performance optimizations
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Performance-optimized parallax with intersection observer
      const layers = gsap.utils.toArray(".hero-layer");
      
      layers.forEach((layer, i) => {
        // GPU acceleration and performance hints
        gsap.set(layer, { 
          transformOrigin: "center center",
          backfaceVisibility: "hidden",
          perspective: 1000,
          transformStyle: "preserve-3d",
          willChange: "transform"
        });

        // Advanced parallax with depth-based blur and rotation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const velocity = Math.abs(self.getVelocity() / 300);
              
              // Dynamic blur based on depth and velocity
              const blur = (i + 1) * 2 + velocity;
              const scale = 1 + (progress * 0.1 * (i + 1));
              
              gsap.set(layer, {
                filter: `blur(${blur}px) brightness(${100 - i * 10}%)`,
                scale: scale,
                rotationZ: progress * (i + 1) * 2
              });
            }
          },
        });

        tl.to(layer, {
          yPercent: -40 * (i + 1),
          rotationX: 5 * (i + 1),
          ease: "none",
        });
      });

      // Advanced typography with character-level animations
      if (textRef.current) {
        const titleLines = textRef.current.querySelectorAll('.title-line');
        
        titleLines.forEach((line, lineIndex) => {
          // Split text into characters
          const text = line.textContent;
          line.innerHTML = '';
          
          [...text].forEach((char, charIndex) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.className = 'char';
            span.style.display = 'inline-block';
            span.style.transformOrigin = 'center bottom';
            line.appendChild(span);
          });

          const chars = line.querySelectorAll('.char');
          
          // Physics-based character animation
          gsap.set(chars, {
            opacity: 0,
            y: 100,
            rotationX: 90,
            rotationZ: () => Math.random() * 20 - 10,
            scale: 0.5,
            transformOrigin: "center bottom"
          });

          gsap.to(chars, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            rotationZ: 0,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.7)",
            stagger: {
              amount: 0.8,
              from: "random"
            },
            delay: lineIndex * 0.3
          });

          // Scroll-responsive typography
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            onUpdate: (self) => {
              const progress = self.progress;
              chars.forEach((char, i) => {
                gsap.to(char, {
                  y: Math.sin((progress * Math.PI * 2) + (i * 0.1)) * 5,
                  rotationZ: Math.sin((progress * Math.PI * 4) + (i * 0.2)) * 2,
                  duration: 0.3,
                  ease: "none"
                });
              });
            }
          });
        });
      }

      // Enhanced grain effect with time-based variation
      const grainAnimation = gsap.to(".film-grain", {
        backgroundPosition: "100px 100px",
        duration: 2,
        ease: "none",
        repeat: -1
      });

      // Dynamic lighting based on time of day
      const lightingTl = gsap.timeline({ repeat: -1, yoyo: true });
      lightingTl.to(".dynamic-lighting", {
        opacity: timeOfDay === 'night' ? 0.1 : 0.3,
        duration: 4,
        ease: "sine.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded, timeOfDay]);

  // Optimized scroll function with custom easing
  const scrollToNext = useCallback(() => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      // Custom smooth scroll with easing
      const start = window.pageYOffset;
      const target = nextSection.offsetTop;
      const distance = target - start;
      const duration = 1500;
      let startTime = null;

      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, start + distance * ease);
        
        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  }, []);

  // Loading state with enhanced animation
  if (!isLoaded) {
    return (
      <section className="relative h-screen overflow-hidden bg-black flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60 text-sm tracking-[0.2em] uppercase"
          >
            Loading Experience
          </motion.p>
        </div>
      </section>
    );
  }

  const timeGradients = {
    morning: 'from-orange-500/20 via-transparent to-yellow-500/20',
    day: 'from-blue-500/20 via-transparent to-cyan-500/20',
    evening: 'from-purple-500/20 via-transparent to-pink-500/20',
    night: 'from-indigo-900/30 via-transparent to-purple-900/30'
  };

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen overflow-hidden bg-black"
      style={{ contain: 'layout style paint' }}
    >
      {/* Custom magnetic cursor */}
      <div
        ref={cursorRef}
        className="fixed w-5 h-5 bg-white/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate3d(0,0,0)' }}
      />

      {/* Dynamic time-based gradient overlay */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-b ${timeGradients[timeOfDay]} z-10 pointer-events-none`}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Performance-optimized parallax layers with mouse interaction */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="absolute inset-0 transform-gpu"
      >
        {[img1, img2, img3].map((img, i) => (
          <motion.div
            key={i}
            className="hero-layer absolute inset-0 bg-cover bg-center will-change-transform"
            style={{ 
              backgroundImage: `url(${img})`, 
              zIndex: 3 - i,
              opacity: 0.9 - (i * 0.2),
              transform: 'translate3d(0,0,0)',
              imageRendering: 'crisp-edges'
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </motion.div>

      {/* Enhanced film grain with dynamic movement */}
      <div 
        className="film-grain absolute inset-0 z-20 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, transparent 1px, rgba(255,255,255,0.15) 1px)`,
          backgroundSize: '4px 4px',
          transform: 'translate3d(0,0,0)'
        }}
      />

      {/* Dynamic lighting effect */}
      <motion.div
        className="dynamic-lighting absolute inset-0 z-15 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${springX}px ${springY}px, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated grid with scroll response */}
      <motion.div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          opacity: Math.max(0.02, 0.05 - scrollVelocity * 0.001)
        }}
      >
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />
      </motion.div>

      {/* Main content with micro-interactions */}
      <div className="relative z-30 flex h-full items-center justify-center px-8 md:px-16">
        <div className="text-center max-w-6xl">
          <div ref={textRef} className="overflow-hidden mb-8">
            <h1 className="text-white font-light text-6xl md:text-8xl lg:text-9xl leading-none tracking-[-0.05em]">
              <span className="title-line magnetic block font-extralight">ANAUR</span>
              <span className="title-line magnetic block font-medium">DESIGN</span>
            </h1>
          </div>
          
          <motion.p
            className="magnetic text-white/80 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto mb-12"
            whileHover={{ 
              scale: 1.05,
              letterSpacing: '0.1em',
              transition: { duration: 0.3 }
            }}
            style={{
              filter: `blur(${Math.max(0, scrollVelocity * 0.1 - 1)}px)`
            }}
          >
            Architecture that feels like home
          </motion.p>

          <div className="magnetic flex items-center justify-center space-x-8">
            <motion.div 
              className="w-px h-12 bg-white/30"
              animate={{ 
                scaleY: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.span 
              className="text-white/60 text-sm tracking-[0.2em] uppercase"
              whileHover={{ 
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '0.3em'
              }}
            >
              Est. 2024
            </motion.span>
            <motion.div 
              className="w-px h-12 bg-white/30"
              animate={{ 
                scaleY: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator with velocity response */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
        style={{
          scale: Math.max(0.8, 1 - scrollVelocity * 0.01)
        }}
      >
        <motion.button 
          onClick={scrollToNext}
          className="magnetic group flex flex-col items-center space-y-2 text-white/60 transition-all duration-500"
          whileHover={{ 
            scale: 1.1,
            color: 'rgba(255,255,255,0.9)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span 
            className="text-xs tracking-[0.2em] uppercase"
            animate={{ 
              letterSpacing: ['0.2em', '0.4em', '0.2em']
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Scroll
          </motion.span>
          <div className="relative overflow-hidden h-8">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-px h-8 bg-gradient-to-b from-transparent via-white/40 to-transparent"
            />
          </div>
        </motion.button>
      </motion.div>

      {/* Advanced particle system */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              backgroundColor: `rgba(255,255,255,${Math.random() * 0.3})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
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
