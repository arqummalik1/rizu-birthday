import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EntryScreen = ({ onUnlock }) => {
  const [showButton, setShowButton] = useState(false);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    // Sequence: 
    // 1. Typing animation starts immediately.
    // 2. Wait for typing to finish (approx 2-3s).
    // 3. Wait 3 more seconds as requested.
    // 4. Show button.
    
    const typingDuration = 2000; // 2s for typing
    const delayAfterTyping = 3000; // 3s delay

    const timer1 = setTimeout(() => {
      setTypingDone(true);
    }, typingDuration);

    const timer2 = setTimeout(() => {
      setShowButton(true);
    }, typingDuration + delayAfterTyping);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 overflow-hidden bg-[#050505]"
    >
      {/* Deep Space Background with Stars */}
      <StarryBackground />
      
      {/* Glow Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rizu-red/5 to-rizu-black/80 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rizu-gold/5 rounded-full blur-[100px] animate-pulse" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-12">
        
        {/* Typing Animation */}
        <div className="h-20 flex items-center justify-center">
            <TypingText text="Welcome, Rizu..." duration={2} />
        </div>

        {/* Button Interaction */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center gap-6"
            >
              <button 
                onClick={onUnlock}
                className="group relative flex items-center justify-center p-8 transition-all duration-500 cursor-pointer"
              >
                {/* Glowing Aura */}
                <div className="absolute inset-0 bg-rizu-red/30 rounded-full blur-2xl group-hover:bg-rizu-red/50 group-hover:blur-3xl transition-all duration-700 animate-pulse" />
                <div className="absolute inset-0 bg-rizu-gold/10 rounded-full blur-xl group-hover:scale-110 transition-all duration-700" />
                
                {/* Heart Icon */}
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-20 h-20 fill-current text-rizu-red group-hover:scale-110 group-hover:text-rizu-red/90 transition-transform duration-500 drop-shadow-[0_0_25px_rgba(220,20,60,0.8)]"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-serif text-rizu-gold/60 text-sm tracking-[0.2em] uppercase"
              >
                Tap to enter
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

// --- Helper Components ---

const TypingText = ({ text, duration }) => {
  // We can use Framer Motion's staggering or just CSS steps
  // For a smooth "typing" feel, let's use Framer Motion on characters
  
  const characters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration / text.length, delayChildren: 0.5 }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      textShadow: "0 0 10px rgba(224, 191, 184, 0.5)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span 
          variants={child} 
          key={index}
          className="font-serif text-4xl md:text-6xl text-rizu-gold"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      stars = [];
      const numStars = 150;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5,
          alpha: Math.random(),
          speed: Math.random() * 0.05 + 0.01,
          direction: Math.random() > 0.5 ? 1 : -1
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw background (optional if parent has bg, but canvas clear needs transparency)
      // We rely on parent bg color

      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        // Twinkle
        star.alpha += star.speed * star.direction;
        if (star.alpha > 1 || star.alpha < 0.2) {
          star.direction *= -1;
        }
        
        // Slight movement
        star.y -= star.speed * 0.5;
        if (star.y < 0) star.y = height;
      });

      requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', init);

    return () => window.removeEventListener('resize', init);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />;
};

export default EntryScreen;
