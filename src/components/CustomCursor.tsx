import React, { useEffect, useRef, useState, useCallback } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const trailContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // High-performance position tracking
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const animationId = useRef(null);
  const trailCounter = useRef(0);

  // Performance optimized trail creation
  const createTrailDot = useCallback((x, y, intensity = 1) => {
    if (!trailContainerRef.current || Math.random() > 0.7) return;

    const dot = document.createElement('div');
    const size = Math.random() * 3 + 2;
    
    // Use transform for better performance
    dot.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: white;
      border-radius: 50%;
      pointer-events: none;
      mix-blend-mode: difference;
      z-index: 9998;
      transform: translate3d(${x}px, ${y}px, 0) translate(-50%, -50%);
      opacity: ${0.6 * intensity};
      will-change: transform, opacity;
    `;

    trailContainerRef.current.appendChild(dot);

    // Optimized animation using requestAnimationFrame
    let startTime = performance.now();
    const duration = 800;
    
    const animateTrail = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      if (progress >= 1) {
        dot.remove();
        return;
      }
      
      const opacity = (0.6 * intensity) * (1 - progress);
      const scale = 1 - progress * 0.5;
      
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      dot.style.opacity = opacity;
      
      requestAnimationFrame(animateTrail);
    };
    
    requestAnimationFrame(animateTrail);
  }, []);

  // High-performance explosion effect
  const createExplosion = useCallback((x, y) => {
    if (!trailContainerRef.current) return;

    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const angle = (i * (360 / particleCount)) * (Math.PI / 180);
      const distance = Math.random() * 60 + 30;
      const speed = Math.random() * 0.5 + 0.5;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: white;
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: difference;
        z-index: 9998;
        transform: translate3d(${x}px, ${y}px, 0) translate(-50%, -50%);
        will-change: transform, opacity;
      `;
      
      trailContainerRef.current.appendChild(particle);

      // Optimized particle animation
      let startTime = performance.now();
      const duration = 1000;
      
      const animateParticle = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        if (progress >= 1) {
          particle.remove();
          return;
        }
        
        const currentDistance = distance * progress * speed;
        const currentX = x + Math.cos(angle) * currentDistance;
        const currentY = y + Math.sin(angle) * currentDistance;
        const opacity = 1 - progress;
        const scale = 1 - progress * 0.3;
        
        particle.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${scale})`;
        particle.style.opacity = opacity;
        
        requestAnimationFrame(animateParticle);
      };
      
      requestAnimationFrame(animateParticle);
    }
  }, []);

  // Ultra-smooth animation loop
  const animate = useCallback(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    // Calculate velocity for trail intensity
    const velX = mousePos.current.x - lastPos.current.x;
    const velY = mousePos.current.y - lastPos.current.y;
    const speed = Math.sqrt(velX * velX + velY * velY);
    
    velocity.current = { x: velX, y: velY };
    lastPos.current = { ...mousePos.current };

    // Update cursor position with transform3d for hardware acceleration
    cursor.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) ${isClicking ? 'scale(1.5)' : 'scale(1)'}`;

    // Smooth follower with easing
    const easing = 0.15;
    followerPos.current.x += (mousePos.current.x - followerPos.current.x) * easing;
    followerPos.current.y += (mousePos.current.y - followerPos.current.y) * easing;
    
    follower.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%)`;

    // Create trail based on speed (higher speed = more trails)
    trailCounter.current++;
    if (speed > 1 && trailCounter.current % 3 === 0) {
      const intensity = Math.min(speed / 20, 1);
      createTrailDot(mousePos.current.x, mousePos.current.y, intensity);
    }

    animationId.current = requestAnimationFrame(animate);
  }, [isClicking, createTrailDot]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Initialize positions
    cursor.style.cssText = `
      position: fixed;
      width: 12px;
      height: 12px;
      background: white;
      border-radius: 50%;
      pointer-events: none;
      z-index: 10001;
      mix-blend-mode: difference;
      will-change: transform;
      transition: none;
    `;

    follower.style.cssText = `
      position: fixed;
      width: 32px;
      height: 32px;
      border: 2px solid white;
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      mix-blend-mode: difference;
      will-change: transform;
      transition: width 0.2s ease, height 0.2s ease, border-width 0.2s ease;
    `;

    const moveCursor = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
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
      document.body.style.cursor = 'none';
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      document.body.style.cursor = 'auto';
    };

    const handleHoverStart = () => {
      setIsHovering(true);
      if (follower) {
        follower.style.width = '50px';
        follower.style.height = '50px';
        follower.style.borderWidth = '3px';
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
      if (follower) {
        follower.style.width = '32px';
        follower.style.height = '32px';
        follower.style.borderWidth = '2px';
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, [data-cursor-hover]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart, { passive: true });
      el.addEventListener('mouseleave', handleHoverEnd, { passive: true });
    });

    // Start animation loop
    animationId.current = requestAnimationFrame(animate);

    return () => {
      // Cleanup
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
      
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      
      document.body.style.cursor = 'auto';
    };
  }, [animate, createExplosion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Trail container */}
      <div ref={trailContainerRef} className="absolute inset-0" />
      
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={`transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Follower circle */}
      <div
        ref={followerRef}
        className={`transition-opacity duration-200 ${
          isVisible ? 'opacity-60' : 'opacity-0'
        }`}
      />

      {/* Floating orbs with optimized animations */}
      {isVisible && [...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full pointer-events-none opacity-30"
          style={{
            left: `${mousePos.current?.x || 0}px`,
            top: `${mousePos.current?.y || 0}px`,
            transform: `translate(-50%, -50%) translate(${Math.cos(Date.now() * 0.001 + i) * 25}px, ${Math.sin(Date.now() * 0.001 + i) * 25}px)`,
            mixBlendMode: 'difference',
            zIndex: 9999,
            animation: `orbit-${i} 3s linear infinite`,
            willChange: 'transform'
          }}
        />
      ))}

      {/* CSS animations for orbs */}
      <style jsx>{`
        @keyframes orbit-0 { 
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(20px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(20px) rotate(-360deg); }
        }
        @keyframes orbit-1 { 
          from { transform: translate(-50%, -50%) rotate(60deg) translateX(25px) rotate(-60deg); }
          to { transform: translate(-50%, -50%) rotate(420deg) translateX(25px) rotate(-420deg); }
        }
        @keyframes orbit-2 { 
          from { transform: translate(-50%, -50%) rotate(120deg) translateX(30px) rotate(-120deg); }
          to { transform: translate(-50%, -50%) rotate(480deg) translateX(30px) rotate(-480deg); }
        }
        @keyframes orbit-3 { 
          from { transform: translate(-50%, -50%) rotate(180deg) translateX(20px) rotate(-180deg); }
          to { transform: translate(-50%, -50%) rotate(540deg) translateX(20px) rotate(-540deg); }
        }
        @keyframes orbit-4 { 
          from { transform: translate(-50%, -50%) rotate(240deg) translateX(25px) rotate(-240deg); }
          to { transform: translate(-50%, -50%) rotate(600deg) translateX(25px) rotate(-600deg); }
        }
        @keyframes orbit-5 { 
          from { transform: translate(-50%, -50%) rotate(300deg) translateX(30px) rotate(-300deg); }
          to { transform: translate(-50%, -50%) rotate(660deg) translateX(30px) rotate(-660deg); }
        }
      `}</style>
    </div>
  );
};

export default CustomCursor;
