import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const particleContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  // Particle system
  const particles = useRef([]);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const createParticle = useCallback((x, y, type = 'trail') => {
    if (!particleContainerRef.current) return;

    const particle = document.createElement('div');
    const size = type === 'explosion' ? Math.random() * 8 + 4 : Math.random() * 4 + 2;
    const colors = ['#ffffff', '#f0f0f0', '#e0e0e0', '#d0d0d0'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.className = `absolute rounded-full pointer-events-none`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.backgroundColor = color;
    particle.style.transform = 'translate(-50%, -50%)';
    particle.style.mixBlendMode = 'difference';
    particle.style.zIndex = '9999';
    
    particleContainerRef.current.appendChild(particle);

    // Animate particle
    if (type === 'explosion') {
      const angle = Math.random() * Math.PI * 2;
      const force = Math.random() * 100 + 50;
      const endX = x + Math.cos(angle) * force;
      const endY = y + Math.sin(angle) * force;
      
      particle.animate([
        { 
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: 1
        },
        { 
          transform: `translate(${endX - x}px, ${endY - y}px) translate(-50%, -50%) scale(0)`,
          opacity: 0
        }
      ], {
        duration: 800 + Math.random() * 400,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).onfinish = () => particle.remove();
    } else {
      // Trail particle
      particle.animate([
        { 
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: 0.8
        },
        { 
          transform: 'translate(-50%, -50%) scale(0)',
          opacity: 0
        }
      ], {
        duration: 600,
        easing: 'ease-out'
      }).onfinish = () => particle.remove();
    }
  }, []);

  const createExplosion = useCallback((x, y) => {
    for (let i = 0; i < 12; i++) {
      setTimeout(() => createParticle(x, y, 'explosion'), i * 20);
    }
  }, [createParticle]);

  const createTrail = useCallback((x, y) => {
    const distance = Math.sqrt(
      Math.pow(x - lastMousePos.current.x, 2) + 
      Math.pow(y - lastMousePos.current.y, 2)
    );
    
    if (distance > 10) {
      createParticle(x, y, 'trail');
      lastMousePos.current = { x, y };
    }
  }, [createParticle]);

  // Cursor variants
  const cursorVariants = {
    default: {
      width: 16,
      height: 16,
      backgroundColor: 'white',
      mixBlendMode: 'difference',
      border: 'none'
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: 'transparent',
      border: '2px solid white',
      mixBlendMode: 'difference'
    },
    click: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '3px solid white',
      mixBlendMode: 'difference'
    },
    text: {
      width: 100,
      height: 100,
      backgroundColor: 'transparent',
      border: '1px solid white',
      mixBlendMode: 'difference'
    }
  };

  useEffect(() => {
    const moveCursor = (e) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      // Calculate velocity
      setVelocity({
        x: newX - mousePos.x,
        y: newY - mousePos.y
      });
      
      setMousePos({ x: newX, y: newY });
      mouseX.set(newX);
      mouseY.set(newY);

      // Create trail particles based on movement speed
      const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
      if (speed > 2 && Math.random() < 0.3) {
        createTrail(newX, newY);
      }
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      setCursorVariant('click');
      createExplosion(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      setCursorVariant(isHovering ? 'hover' : 'default');
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverStart = (e) => {
      setIsHovering(true);
      const element = e.target;
      
      if (element.tagName === 'A' || element.tagName === 'BUTTON') {
        setCursorVariant('hover');
      } else if (element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'P') {
        setCursorVariant('text');
      } else {
        setCursorVariant('hover');
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
      setCursorVariant('default');
    };

    // Event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, h1, h2, h3, p, [data-cursor-hover]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [mousePos, velocity, isHovering, createTrail, createExplosion]);

  // Floating orbs that follow cursor
  const FloatingOrb = ({ delay, distance }) => (
    <motion.div
      className="absolute w-4 h-4 rounded-full bg-white/20 mix-blend-difference pointer-events-none"
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        x: [0, distance, -distance, 0],
        y: [0, -distance, distance, 0],
        scale: [0.5, 1, 0.5],
        opacity: [0.3, 0.7, 0.3]
      }}
      transition={{
        duration: 4,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  // Ripple effect component
  const RippleEffect = () => (
    <motion.div
      className="absolute rounded-full border border-white/30 pointer-events-none"
      style={{
        x: springX,
        y: springY,
        transform: 'translate(-50%, -50%)'
      }}
      animate={{
        width: [0, 200],
        height: [0, 200],
        opacity: [0.8, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeOut"
      }}
    />
  );

  if (typeof window === 'undefined') return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      {/* Particle container */}
      <div ref={particleContainerRef} className="absolute inset-0" />
      
      {/* Floating orbs */}
      {[...Array(6)].map((_, i) => (
        <FloatingOrb 
          key={i} 
          delay={i * 0.3} 
          distance={20 + i * 5} 
        />
      ))}
      
      {/* Ripple effects */}
      <RippleEffect />
      
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="absolute rounded-full pointer-events-none z-[10000]"
        style={{
          x: springX,
          y: springY,
          transform: 'translate(-50%, -50%)'
        }}
        animate={cursorVariants[cursorVariant]}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          rotate: isClicking ? 180 : 0
        }}
      >
        {/* Inner dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full mix-blend-difference"
          style={{ transform: 'translate(-50%, -50%)' }}
          animate={{
            scale: cursorVariant === 'default' ? 1 : 0
          }}
        />
        
        {/* Hover text for interactive elements */}
        {cursorVariant === 'hover' && (
          <motion.div
            className="absolute top-full left-1/2 mt-2 px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-xs text-white whitespace-nowrap"
            style={{ transform: 'translateX(-50%)' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            Click me
          </motion.div>
        )}
      </motion.div>
      
      {/* Trail elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-white/20 mix-blend-difference pointer-events-none"
          style={{
            x: springX,
            y: springY,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 1,
            delay: i * 0.1,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Magnetic field visualization */}
      <motion.div
        className="absolute rounded-full border border-white/10 pointer-events-none"
        style={{
          x: springX,
          y: springY,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          width: [100, 150, 100],
          height: [100, 150, 100],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default CustomCursor;
