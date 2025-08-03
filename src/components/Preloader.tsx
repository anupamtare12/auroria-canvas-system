import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

interface AdvancedPreloaderProps {
  onComplete: () => void;
}

const AdvancedPreloader = ({ onComplete }: AdvancedPreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const brandTextRef = useRef<HTMLHeadingElement>(null);
  const loadingBarRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const runPreloaderAnimation = () => {
      const tl = gsap.timeline();

      // Preload critical assets
      const criticalImages = [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop"
      ];

      let loadedCount = 0;
      const totalAssets = criticalImages.length;

      const updateProgress = () => {
        loadedCount++;
        const progress = (loadedCount / totalAssets) * 100;
        setLoadingProgress(progress);
        
        if (loadedCount === totalAssets) {
          // Start exit animation after all assets are loaded
          setTimeout(startExitAnimation, 800);
        }
      };

      // Load critical images
      criticalImages.forEach(src => {
        const img = new Image();
        img.onload = updateProgress;
        img.onerror = updateProgress;
        img.src = src;
      });

      // Split and animate brand text
      if (brandTextRef.current) {
        const text = "ANAUR DESIGN";
        brandTextRef.current.innerHTML = "";
        
        // Create character spans with enhanced styling
        [...text].forEach((char, index) => {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char;
          span.style.display = "inline-block";
          span.style.opacity = "0";
          span.style.transform = "translateY(80px) rotateX(90deg)";
          span.style.transformOrigin = "center bottom";
          span.style.filter = "blur(3px)";
          span.className = `char-${index}`;
          brandTextRef.current?.appendChild(span);
        });

        const chars = brandTextRef.current.querySelectorAll("span");

        // Enhanced entrance animation
        tl.to(chars, {
          duration: 1.5,
          opacity: 1,
          y: 0,
          rotationX: 0,
          filter: "blur(0px)",
          stagger: {
            amount: 0.8,
            from: "start",
            ease: "power3.out"
          },
          ease: "back.out(1.2)"
        });
      }

      const startExitAnimation = () => {
        if (brandTextRef.current) {
          const chars = brandTextRef.current.querySelectorAll("span");
          
          // Character exit animation
          tl.to(chars, {
            duration: 1.2,
            y: -60,
            opacity: 0,
            rotationX: -60,
            filter: "blur(2px)",
            stagger: {
              amount: 0.4,
              from: "start"
            },
            ease: "power3.in"
          })
          
          // Loading bar fade out
          .to(loadingBarRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: "power2.in"
          }, "-=0.8")
          
          // Preloader background exit with scale effect
          .to(preloaderRef.current, {
            duration: 1,
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            pointerEvents: "none",
            ease: "power2.inOut",
            onComplete: () => {
              setIsAnimating(false);
              onComplete();
            }
          }, "-=0.6");
        }
      };

      // Fallback timer
      const fallbackTimer = setTimeout(() => {
        if (loadedCount < totalAssets) {
          setLoadingProgress(100);
          setTimeout(startExitAnimation, 500);
        }
      }, 4000);

      return () => {
        clearTimeout(fallbackTimer);
      };
    };

    // Start animation when component mounts
    if (document.readyState === "complete") {
      setTimeout(runPreloaderAnimation, 200);
    } else {
      window.addEventListener("load", runPreloaderAnimation);
    }

    return () => {
      window.removeEventListener("load", runPreloaderAnimation);
    };
  }, [onComplete]);

  return (
    <motion.div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ 
        background: "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)",
        willChange: "transform, opacity"
      }}
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
          ref={brandTextRef}
          className="text-white text-5xl md:text-7xl lg:text-9xl font-thin tracking-[0.15em] mb-16"
          style={{ 
            fontFamily: "inherit",
            lineHeight: 0.9,
            perspective: "1000px"
          }}
        >
          {/* Text will be split into spans by JavaScript */}
        </motion.h1>
        
        {/* Enhanced loading section */}
        <div ref={loadingBarRef} className="flex flex-col items-center space-y-6">
          {/* Progress bar */}
          <div className="relative w-32 h-px bg-white/10 overflow-hidden rounded-full">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-white/40 via-white/70 to-white/40 rounded-full"
              style={{ width: `${loadingProgress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ 
                duration: 0.8,
                ease: "power2.out"
              }}
            />
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: [-32, 160]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
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
            <span className="text-white/60 text-xs font-light tabular-nums">
              {Math.round(loadingProgress)}%
            </span>
          </motion.div>
        </div>

        {/* Elegant dots indicator */}
        <motion.div 
          className="flex items-center justify-center space-x-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-white/30 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Corner decorative elements */}
      <div className="absolute top-8 left-8 opacity-20">
        <motion.div
          className="w-16 h-px bg-gradient-to-r from-white/40 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2, duration: 1.2 }}
        />
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 2.2, duration: 1.2 }}
        />
      </div>
      
      <div className="absolute bottom-8 right-8 opacity-20">
        <motion.div
          className="w-16 h-px bg-gradient-to-l from-white/40 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.4, duration: 1.2 }}
        />
        <motion.div
          className="w-px h-16 bg-gradient-to-t from-white/40 to-transparent ml-auto"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 2.6, duration: 1.2 }}
        />
      </div>

      {/* Subtle vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)"
        }}
      />
    </motion.div>
  );
};

export default AdvancedPreloader;
