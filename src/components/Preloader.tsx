import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const logoAnimation = {
  initial: { 
    scale: 0.8,
    opacity: 0,
    rotate: -5 
  },
  animate: { 
    scale: 1,
    opacity: 1,
    rotate: 0,
  },
  exit: { 
    scale: 1.1,
    opacity: 0,
    y: -50,
  }
};

const textAnimation = {
  initial: { 
    y: 30,
    opacity: 0 
  },
  animate: { 
    y: 0,
    opacity: 1,
  },
  exit: { 
    y: -20,
    opacity: 0,
  }
};

const progressAnimation = {
  initial: { width: "0%" },
  animate: { 
    width: "100%",
  }
};

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 800);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-beige via-transparent to-gold" />
          </div>

          <div className="relative flex flex-col items-center">
            {/* Animated Logo */}
            <motion.div
              className="mb-8"
              variants={logoAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="relative">
                {/* Main Logo */}
                <div className="text-6xl md:text-8xl font-neue font-light tracking-wider">
                  <span className="inline-block animate-logo-float">A</span>
                  <span className="inline-block animate-logo-float [animation-delay:0.1s]">N</span>
                  <span className="inline-block animate-logo-float [animation-delay:0.2s]">A</span>
                  <span className="inline-block animate-logo-float [animation-delay:0.3s]">U</span>
                  <span className="inline-block animate-logo-float [animation-delay:0.4s]">R</span>
                </div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 text-6xl md:text-8xl font-neue font-light tracking-wider text-accent opacity-20 blur-sm">
                  ANAUR
                </div>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              className="text-center mb-12"
              variants={textAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="text-caption text-muted-foreground mb-2">
                ARCHITECTURE & INTERIOR DESIGN
              </div>
              <div className="text-sm text-muted-foreground/60 font-light">
                Creating spaces that feel like home
              </div>
            </motion.div>

            {/* Progress Bar */}
            <div className="relative w-64 h-px bg-border overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-gold"
                variants={progressAnimation}
                initial="initial"
                animate="animate"
              />
            </div>

            {/* Progress Text */}
            <motion.div
              className="mt-4 text-xs text-muted-foreground font-light tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {Math.round(progress)}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;