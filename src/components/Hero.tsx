import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from "@/assets/VIEW_1 - Photo.jpg";
import img2 from "@/assets/hero-image.jpg";
import img3 from "@/assets/project-1.jpg";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax layers effect
      const layers = gsap.utils.toArray<HTMLElement>(".hero-layer");
      layers.forEach((layer, i) => {
        gsap.to(layer, {
          yPercent: -50 * (i + 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Text animation - Sirotov style
      if (textRef.current) {
        gsap.fromTo(textRef.current, 
          { 
            opacity: 0, 
            y: 100,
            clipPath: "inset(100% 0 0 0)"
          },
          { 
            opacity: 1, 
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 2,
            ease: "power4.out",
            delay: 0.5
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-black">
      {/* Saisei-inspired gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10" />
      
      {/* Parallax background layers */}
      {[img1, img2, img3].map((img, i) => (
        <div
          key={i}
          className="hero-layer absolute inset-0 bg-cover bg-center opacity-80"
          style={{ 
            backgroundImage: `url(${img})`, 
            zIndex: 3 - i,
            filter: `grayscale(${i * 20}%) contrast(${100 + i * 10}%)`
          }}
        />
      ))}

      {/* Grid overlay - Saisei style */}
      <div className="absolute inset-0 opacity-[0.03] z-20">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      {/* Main content */}
      <div className="relative z-30 flex h-full items-center justify-center px-8 md:px-16">
        <div className="text-center max-w-6xl">
          <motion.div
            ref={textRef}
            className="overflow-hidden"
          >
            <h1 className="text-white font-light text-6xl md:text-8xl lg:text-9xl leading-none tracking-[-0.05em] mb-8">
              <span className="block font-extralight">ANAUR</span>
              <span className="block font-medium">DESIGN</span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="text-white/80 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto mb-12"
          >
            Architecture that feels like home
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="flex items-center justify-center space-x-8"
          >
            <div className="w-px h-12 bg-white/30" />
            <span className="text-white/60 text-sm tracking-[0.2em] uppercase">Est. 2024</span>
            <div className="w-px h-12 bg-white/30" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
      >
        <button 
          onClick={scrollToNext}
          className="flex flex-col items-center space-y-2 text-white/60 hover:text-white transition-colors duration-300"
        >
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-8 bg-white/40"
          />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;