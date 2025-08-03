// src/components/Preloader.tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const loaderTextRef = useRef<HTMLDivElement>(null);
  const brandTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Wait for page to fully load or set a minimum time
    const handleLoad = () => {
      const tl = gsap.timeline();

      // Split text animation for ANAUR DESIGN
      if (brandTextRef.current) {
        const text = brandTextRef.current.textContent || "";
        brandTextRef.current.innerHTML = "";
        
        // Create spans for each character
        [...text].forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char;
          span.style.display = "inline-block";
          span.style.opacity = "0";
          span.style.transform = "translateY(50px)";
          brandTextRef.current?.appendChild(span);
        });

        const chars = brandTextRef.current.querySelectorAll("span");

        // Initial entrance animation
        tl.to(chars, {
          duration: 0.8,
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "back.out(1.7)",
          delay: 0.3
        })
        // Hold for a moment
        .to({}, { duration: 1.5 })
        // Exit animation - text moves up and fades
        .to(chars, {
          duration: 1,
          y: -50,
          opacity: 0,
          stagger: 0.02,
          ease: "power2.out"
        })
        // Preloader background fade out
        .to(preloaderRef.current, {
          duration: 0.8,
          opacity: 0,
          pointerEvents: "none",
          ease: "power2.in"
        }, "-=0.5")
        // Call onComplete when animation finishes
        .call(() => {
          onComplete();
        });
      }
    };

    // Check if page is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      // Wait for load event
      window.addEventListener("load", handleLoad);
    }

    // Fallback timer in case load event doesn't fire
    const fallbackTimer = setTimeout(() => {
      handleLoad();
    }, 3000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(fallbackTimer);
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
      style={{ visibility: "visible", opacity: 1 }}
    >
      <div ref={loaderTextRef} className="loader text-center">
        <h1
          ref={brandTextRef}
          className="text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-wider"
          style={{ 
            fontFamily: "inherit",
            letterSpacing: "0.1em",
            lineHeight: 1.2
          }}
        >
          ANAUR DESIGN
        </h1>
        
        {/* Optional loading indicator */}
        <div className="mt-8 flex justify-center">
          <div className="w-12 h-px bg-white/30 relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-white/60"
              style={{
                width: "0%",
                animation: "loadingBar 2.5s ease-out forwards"
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loadingBar {
          0% { width: 0%; }
          70% { width: 100%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
