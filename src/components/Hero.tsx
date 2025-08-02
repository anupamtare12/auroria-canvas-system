import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";
import scrollDownAnimation from "@/assets/lottie/scroll-down.json";

import img1 from "@/assets/VIEW_1 - Photo.jpg";
import img2 from "@/assets/hero-image.jpg";
import img3 from "@/assets/project-1.jpg";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>(".hero-layer");

      layers.forEach((layer, i) => {
        gsap.to(layer, {
          scale: 1.05 + i * 0.02,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={containerRef} className="relative h-[300vh] overflow-hidden">
      <div className="sticky top-0 h-screen w-full">
        {[img1, img2, img3].map((img, i) => (
          <div
            key={i}
            className="hero-layer absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img})`, zIndex: 10 - i }}
          />
        ))}

        <div className="absolute inset-0 bg-black/40 z-20" />

        <div className="relative z-30 flex h-full items-end justify-start px-8 md:px-16 pb-32">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-white font-neue font-bold leading-tight tracking-tight max-w-4xl text-5xl md:text-7xl lg:text-8xl"
          >
            Anaur design
          </motion.h1>
        </div>

        <div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40 cursor-pointer"
          onClick={scrollToNext}
        >
          <Lottie animationData={scrollDownAnimation} className="w-14 h-14" loop autoplay />
        </div>
      </div>
    </section>
  );
};

export default Hero;