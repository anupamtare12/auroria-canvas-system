import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

interface FloatingCircle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  element: HTMLDivElement;
}

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const floatingCircles = useRef<FloatingCircle[]>([]);
  const moveTimeout = useRef<NodeJS.Timeout>();

  const createFloatingCircle = useCallback(() => {
    if (!containerRef.current) return null;

    const circle = document.createElement('div');
    const size = Math.random() * 20 + 10;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    circle.className = 'absolute rounded-full border border-white/20 pointer-events-none';
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.transform = 'translate(-50%, -50%)';
    circle.style.opacity = '0.3';
    
    containerRef.current.appendChild(circle);
    
    return {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
      opacity: 0.3,
      element: circle
    };
  }, []);

  const animateFloatingCircles = useCallback(() => {
    floatingCircles.current.forEach((circle) => {
      if (!isMoving) {
        // Random movement when mouse is stationary
        const newX = circle.x + (Math.random() - 0.5) * 100;
        const newY = circle.y + (Math.random() - 0.5) * 100;
        
        // Keep within bounds
        const boundedX = Math.max(50, Math.min(window.innerWidth - 50, newX));
        const boundedY = Math.max(50, Math.min(window.innerHeight - 50, newY));
        
        gsap.to(circle.element, {
          left: boundedX,
          top: boundedY,
          duration: 2 + Math.random() * 3,
          ease: "power2.inOut"
        });
        
        circle.x = boundedX;
        circle.y = boundedY;
      } else {
        // Magnetic attraction to mouse
        const distance = Math.sqrt(
          Math.pow(mousePos.x - circle.x, 2) + Math.pow(mousePos.y - circle.y, 2)
        );
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          const attractionX = mousePos.x + (circle.x - mousePos.x) * (1 - force * 0.3);
          const attractionY = mousePos.y + (circle.y - mousePos.y) * (1 - force * 0.3);
          
          gsap.to(circle.element, {
            left: attractionX,
            top: attractionY,
            duration: 0.5,
            ease: "power2.out"
          });
          
          circle.x = attractionX;
          circle.y = attractionY;
        }
      }
    });
  }, [isMoving, mousePos]);

  useEffect(() => {
    // Create initial floating circles
    for (let i = 0; i < 8; i++) {
      const circle = createFloatingCircle();
      if (circle) {
        floatingCircles.current.push(circle);
      }
    }

    // Animation loop
    const interval = setInterval(animateFloatingCircles, 100);

    return () => {
      clearInterval(interval);
      floatingCircles.current.forEach(circle => {
        circle.element.remove();
      });
    };
  }, [createFloatingCircle, animateFloatingCircles]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });

      // Reset moving state after a delay
      clearTimeout(moveTimeout.current);
      moveTimeout.current = setTimeout(() => {
        setIsMoving(false);
      }, 300);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
      
      clearTimeout(moveTimeout.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-50 hidden lg:block">
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={`absolute w-3 h-3 bg-white mix-blend-difference rounded-full transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Follower circle */}
      <div
        ref={followerRef}
        className={`absolute border border-white/40 mix-blend-difference rounded-full transition-all duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovering ? 'w-20 h-20 bg-white/5' : 'w-10 h-10'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </div>
  );
};

export default CustomCursor;