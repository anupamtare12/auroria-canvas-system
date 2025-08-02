import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.to(imageRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Content reveal
      gsap.fromTo(contentRef.current?.children || [],
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="section-padding bg-surface"
    >
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative overflow-hidden">
            <div 
              ref={imageRef}
              className="aspect-[4/5] bg-gradient-to-br from-beige to-warm-white rounded-sm overflow-hidden"
            >
              {/* Placeholder for founders image */}
              <div className="w-full h-full bg-gradient-to-br from-stone/20 to-accent/20 flex items-center justify-center">
                <div className="text-6xl font-neue font-light text-muted-foreground/30">
                  A + S
                </div>
              </div>
            </div>
            
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-l border-t border-accent/30" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-r border-b border-accent/30" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <div className="text-caption text-muted-foreground mb-4">
                OUR STORY
              </div>
              <h2 className="text-heading mb-8">
                Crafting spaces that 
                <span className="text-accent"> inspire </span>
                and endure
              </h2>
            </div>

            <div className="space-y-6 text-body text-muted-foreground">
              <p>
                Founded by Anupam and Saurabh in 2020, ANAUR Design emerged from a 
                shared vision to create architecture that transcends mere functionality. 
                We believe that every space has the potential to become a sanctuary, 
                a place where inhabitants feel truly at home.
              </p>
              
              <p>
                Our approach combines timeless design principles with contemporary 
                innovation, resulting in spaces that are both emotionally resonant 
                and environmentally conscious. Each project is a unique narrative, 
                told through the language of space, light, and material.
              </p>
            </div>

            {/* Philosophy */}
            <div className="space-y-4">
              <h3 className="text-subheading">Our Philosophy</h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: "Emotional Architecture", desc: "Designing spaces that evoke feeling and connection" },
                  { title: "Sustainable Living", desc: "Creating environments that respect our planet" },
                  { title: "Timeless Elegance", desc: "Pursuing beauty that transcends trends" },
                ].map((item, index) => (
                  <div key={index} className="border-l-2 border-accent/30 pl-6">
                    <div className="text-caption font-medium mb-1">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards placeholder */}
            <div className="pt-8 border-t border-border">
              <div className="text-caption text-muted-foreground mb-4">
                RECOGNITION
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Emerging Studio Award 2023</div>
                <div>Design Excellence 2022</div>
                <div>Sustainable Design Merit 2021</div>
                <div>Innovation in Space 2020</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;