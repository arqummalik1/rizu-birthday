import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const initialHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setHearts(initialHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <Heart key={heart.id} {...heart} />
      ))}
    </div>
  );
};

const Heart = ({ x, y, size, duration, delay }) => {
  const [msgOpen, setMsgOpen] = useState(false);
  
  // Occasionally a heart is interactive (larger, distinct color, clickable)
  const isInteractive = Math.random() > 0.8; 

  return (
    <motion.div
      initial={{ x: `${x}vw`, y: '110vh', opacity: 0 }}
      animate={{ 
        y: '-10vh', 
        opacity: [0, 0.5, 0],
        x: [`${x}vw`, `${x + (Math.random() * 20 - 10)}vw`]
      }}
      transition={{ 
        duration: duration, 
        repeat: Infinity, 
        delay: delay,
        ease: "linear"
      }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
      }}
      className={`text-rizu-red/20 ${isInteractive ? 'pointer-events-auto cursor-pointer hover:text-rizu-red/60' : ''}`}
      onClick={() => isInteractive && setMsgOpen(true)}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      
      <AnimatePresence>
        {msgOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-rizu-black/90 border border-rizu-gold/30 p-2 rounded text-[10px] text-rizu-gold text-center pointer-events-none"
          >
            This heart is yours. I just carry it.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FloatingHearts;
