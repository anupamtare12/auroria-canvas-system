import React, { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setMousePos({ x: mouseX, y: mouseY });

      // Move cursor immediately
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animateFollower);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      document.body.style.cursor = 'none';
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      document.body.style.cursor = 'auto';
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    // Initialize cursor as visible immediately
    setIsVisible(true);
    document.body.style.cursor = 'none';

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Hover listeners
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    // Start follower animation
    animateFollower();

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
      
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Make sure cursor is visible by using inline styles */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          backgroundColor: '#ff6b6b',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease',
          willChange: 'transform',
          boxShadow: '0 0 10px rgba(255, 107, 107, 0.5)'
        }}
      />
      
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '40px' : '30px',
          height: isHovering ? '40px' : '30px',
          border: '2px solid #ff6b6b',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: isVisible ? 0.6 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
          willChange: 'transform',
          backgroundColor: 'rgba(255, 107, 107, 0.1)'
        }}
      />

      {/* Trail particles */}
      {isVisible && (
        <div
          style={{
            position: 'fixed',
            top: mousePos.y,
            left: mousePos.x,
            width: '4px',
            height: '4px',
            backgroundColor: 'white',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 99997,
            mixBlendMode: 'difference',
            opacity: 0.4,
            transform: 'translate(-50%, -50%)',
            animation: 'fadeOut 1s ease-out forwards'
          }}
        />
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes fadeOut {
          0% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
