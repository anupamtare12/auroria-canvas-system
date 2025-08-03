// src/components/AdvancedPreloader.tsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface AdvancedPreloaderProps {
  onComplete: () => void;
  children?: React.ReactNode; // Landing content to reveal
}

const AdvancedPreloader = ({ onComplete, children }: AdvancedPreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const brandTextRef = useRef<HTMLHeadingElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const runPreloaderAnimation = () => {
      const tl = gsap.timeline();

      // Initially hide landing content
      if (landingRef.current) {
        gsap.set(landingRef.current, {
          visibility: "hidden",
          opacity: 0
        });
      }

      // Split and animate brand text
      if (brandTextRef.current) {
        const text = "ANAUR DESIGN";
        brandTextRef.current.innerHTML = "";
        
        // Create character spans
        [...text].forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char;
          span.style.display = "inline-block";
          span.style.opacity = "0";
          span.style.transform = "translateY(60px) rotateX(90deg)";
          span.style.transformOrigin = "center bottom";
          brandTextRef.current?.appendChild(span);
        });

        const chars = brandTextRef.current.querySelectorAll("span");

        // Main timeline animation
        tl
          // Character entrance - staggered reveal
          .to(chars, {
            duration: 1.2,
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: {
              amount: 0.6,
              from: "start"
            },
            ease: "back.out(1.7)"
          })
          
          // Hold the text for a moment
          .to({}, { duration: 1.8 })
          
          // Character exit - move up and fade
          .to(chars, {
            duration: 1,
            y: -50,
            opacity: 0,
            rotationX: -45,
            stagger: {
              amount: 0.3,
              from: "start"
            },
            ease: "power2.out"
          })
          
          // Preloader background fade out
          .to(preloaderRef.current, {
            duration: 0.8,
            opacity: 0,
            pointerEvents: "none",
            ease: "power2.in"
          }, "-=0.5")
          
          // Reveal landing content
          .set(landingRef.current, {
            visibility: "visible"
          })
          .to(landingRef.current, {
            duration: 1,
            opacity: 1,
            ease: "power2.out"
          }, "-=0.3")
          
          // Animate landing content elements
          .from(".landing-title", {
            duration: 1.2,
            opacity: 0,
            y: 50,
            stagger: 0.1,
            ease: "back.out(1.7)"
          }, "-=0.8")
          
          .from(".landing-subtitle", {
            duration: 0.8,
            opacity: 0,
            y: 30,
            ease: "power2.out"
          }, "-=0.5")
          
          .from(".landing-content", {
            duration: 0.8,
            opacity: 0,
            y: 30,
            ease: "power2.out"
          }, "-=0.5")
          
          // Animation complete
          .call(() => {
            setIsAnimating(false);
            onComplete();
          });
      }
    };

    // Check if page is loaded
    if (document.readyState === "complete") {
      runPreloaderAnimation();
    } else {
      window.addEventListener("load", runPreloaderAnimation);
    }

    // Fallback timer
    const fallbackTimer = setTimeout(() => {
      runPreloaderAnimation();
    }, 3000);

    return () => {
      window.removeEventListener("load", runPreloaderAnimation);
      clearTimeout(fallbackTimer);
    };
  }, [onComplete]);

  return (
    <>
      {/* Preloader */}
      <div
        ref={preloaderRef}
        className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
        style={{ 
          visibility: "visible", 
          opacity: 1,
          willChange: "opacity"
        }}
      >
        <div className="text-center">
          <h1
            ref={brandTextRef}
            className="text-white text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.1em] mb-8"
            style={{ 
              fontFamily: "inherit",
              lineHeight: 1.1,
              perspective: "1000px"
            }}
          >
            {/* Text will be split into spans by JavaScript */}
          </h1>
          
          {/* Elegant loading bar */}
          <div className="flex justify-center">
            <div className="relative w-24 h-px bg-white/20 overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-white/60 to-white/80"
                style={{
                  width: "0%",
                  animation: isAnimating ? "elegantLoading 3.5s cubic-bezier(0.4, 0, 0.2, 1) forwards" : "none"
                }}
              />
            </div>
          </div>
          
          {/* Subtle percentage indicator */}
          <div className="mt-4">
            <span 
              className="text-white/40 text-xs tracking-[0.2em] font-light"
              style={{
                animation: isAnimating ? "fadeInOut 3.5s ease-in-out" : "none"
              }}
            >
              LOADING
            </span>
          </div>
        </div>
      </div>

      {/* Landing Content */}
      <div
        ref={landingRef}
        className="w-full min-h-screen"
        style={{
          visibility: "hidden",
          opacity: 0,
          willChange: "opacity"
        }}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes elegantLoading {
          0% { 
            width: 0%; 
            opacity: 0.6;
          }
          20% {
            opacity: 1;
          }
          80% { 
            width: 100%; 
            opacity: 1;
          }
          100% { 
            width: 100%; 
            opacity: 0.8;
          }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        /* Utility classes for landing content */
        .landing-title {
          overflow: hidden;
        }
        
        .landing-subtitle {
          will-change: transform, opacity;
        }
        
        .landing-content {
          will-change: transform, opacity;
        }
      `}</style>
    </>
  );
};

export default AdvancedPreloader;
