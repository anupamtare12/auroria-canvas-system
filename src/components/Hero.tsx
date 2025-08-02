import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax effect
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // Title reveal animation
      gsap.fromTo(titleRef.current?.children || [], 
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          delay: 3.5,
        }
      );

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          delay: 4.2,
        }
      );

      // Scroll indicator animation
      gsap.fromTo(scrollIndicatorRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          delay: 4.8,
        }
      );

      // Floating animation for scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.querySelector('#about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-luxury">
      {/* Background Image */}
      <div 
        ref={heroRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.1)), url(${heroImage})`
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center container-luxury">
        {/* Main Title */}
        <div 
          ref={titleRef}
          className="mb-8"
        >
          <div className="text-hero font-neue font-light leading-none tracking-tight">
            <div className="overflow-hidden">
              <div>Architecture</div>
            </div>
            <div className="overflow-hidden">
              <div className="text-accent">that feels</div>
            </div>
            <div className="overflow-hidden">
              <div>like home</div>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div 
          ref={subtitleRef}
          className="max-w-2xl opacity-0"
        >
          <p className="text-body text-muted-foreground font-light leading-relaxed">
            We design spaces that transcend the ordinary, creating environments 
            where architecture and emotion converge in perfect harmony.
          </p>
        </div>

        {/* Studio Info */}
        <motion.div
          className="absolute bottom-8 left-8 hidden md:block"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 5 }}
        >
          <div className="text-caption text-muted-foreground mb-2">
            FOUNDED 2020
          </div>
          <div className="text-caption text-muted-foreground">
            ANUPAM + SAURABH
          </div>
        </motion.div>

        {/* Location Info */}
        <motion.div
          className="absolute bottom-8 right-8 hidden md:block text-right"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 5.2 }}
        >
          <div className="text-caption text-muted-foreground mb-2">
            BASED IN
          </div>
          <div className="text-caption text-muted-foreground">
            INDIA
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer opacity-0"
        onClick={handleScrollDown}
      >
        <div className="flex flex-col items-center group">
          <div className="text-caption text-muted-foreground mb-4 group-hover:text-accent transition-colors duration-300">
            SCROLL
          </div>
          <div className="w-px h-16 bg-muted-foreground/30 mb-4" />
          <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-4 w-px h-32 bg-gradient-to-b from-transparent via-accent to-transparent opacity-30" />
      <div className="absolute top-1/2 right-4 w-px h-32 bg-gradient-to-b from-transparent via-accent to-transparent opacity-30" />
    </section>
  );
};

export default Hero;