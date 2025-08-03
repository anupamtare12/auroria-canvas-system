import React, { useEffect, useRef, useState, useCallback } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const trailContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const trailDots = useRef([]);

  // Create trail effect
  const createTrailDot = useCallback((x, y) => {
    if (!trailContainerRef.current) return;

    const dot = document.createElement('div');
    dot.className = 'absolute w-2 h-2 bg-white rounded-full pointer-events-none';
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.transform = 'translate(-50%, -50%)';
    dot.style.opacity = '0.6';
    dot.style.mixBlendMode = 'difference';
    dot.style.zIndex = '9998';

    trailContainerRef.current.appendChild(dot);

    // Animate and remove
    let opacity = 0.6;
    let scale = 1;
    const animate = () => {
      opacity -= 0.05;
      scale -= 0.02;
      
      if (opacity <= 0) {
        dot.remove();
        return;
      }
      
      dot.style.opacity = opacity.toString();
      dot.style.transform = `translate(-50%, -50%) scale(${scale})`;
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }, []);

  // Create explosion effect
  const createExplosion = useCallback((x, y) => {
    if (!trailContainerRef.current) return;

    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 6 + 2;
      const angle = (i * 45) * (Math.PI / 180);
      const distance = Math.random() * 50 + 20;
      
      particle.className = 'absolute bg-white rounded-full pointer-events-none';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.transform = 'translate(-50%, -50%)';
      particle.style.mixBlendMode = 'difference';
      particle.style.zIndex = '9998';
      
      trailContainerRef.current.appendChild(particle);

      // Animate particle
      const endX = x + Math.cos(angle) * distance;
      const endY = y + Math.sin(angle) * distance;
      
      let progress = 0;
      const animate = () => {
        progress += 0.05;
        
        if (progress >= 1) {
          particle.remove();
          return;
        }
        
        const currentX = x + (endX - x) * progress;
        const currentY = y + (endY - y) * progress;
        const opacity = 1 - progress;
        const scale = 1 - progress * 0.5;
        
        particle.style.left = `${currentX}px`;
        particle.style.top = `${currentY}px`;
        particle.style.opacity = opacity.toString();
        particle.style.transform = `translate(-50%, -50%) scale(${scale})`;
        
        requestAnimationFrame(animate);
      };
      
      requestAnimationFrame(animate);
    }
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    let lastX = 0;
    let lastY = 0;
    let trailCounter = 0;

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      
      setMousePos({ x, y });

      // Update cursor position immediately
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;

      // Update follower with slight delay
      setTimeout(() => {
        follower.style.left = `${x}px`;
        follower.style.top = `${y}px`;
      }, 100);

      // Create trail dots
      const distance = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));
      if (distance > 15) {
        trailCounter++;
        if (trailCounter % 2 === 0) { // Create trail every other movement
          createTrailDot(x, y);
        }
        lastX = x;
        lastY = y;
      }
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      createExplosion(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      document.body.style.cursor = 'none'; // Hide default cursor
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      document.body.style.cursor = 'auto'; // Show default cursor
    };

    const handleHoverStart = () => {
      setIsHovering(true);
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
    };

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
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
      
      // Reset cursor
      document.body.style.cursor = 'auto';
    };
  }, [createTrailDot, createExplosion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Trail container */}
      <div ref={trailContainerRef} className="absolute inset-0" />
      
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={`absolute w-3 h-3 bg-white rounded-full pointer-events-none transition-all duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isClicking ? 'scale-150' : 'scale-100'
        }`}
        style={{ 
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
          zIndex: 10001
        }}
      />
      
      {/* Follower circle */}
      <div
        ref={followerRef}
        className={`absolute border border-white rounded-full pointer-events-none transition-all duration-300 ${
          isVisible ? 'opacity-60' : 'opacity-0'
        } ${
          isHovering ? 'w-12 h-12 border-2' : 'w-8 h-8'
        } ${
          isClicking ? 'w-16 h-16 border-4' : ''
        }`}
        style={{ 
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
          zIndex: 10000
        }}
      />

      {/* Floating particles around cursor */}
      {isVisible && [...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full pointer-events-none animate-ping"
          style={{
            left: `${mousePos.x + Math.cos(i * 90 * Math.PI / 180) * 20}px`,
            top: `${mousePos.y + Math.sin(i * 90 * Math.PI / 180) * 20}px`,
            transform: 'translate(-50%, -50%)',
            mixBlendMode: 'difference',
            animationDelay: `${i * 0.2}s`,
            animationDuration: '2s',
            zIndex: 9999
          }}
        />
      ))}
    </div>
  );
};

export default CustomCursor;
