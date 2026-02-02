import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SealedTruth = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleBreakSeal = () => {
    setIsOpen(true);
    if (onComplete) onComplete();
  };

  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000">
      <motion.div 
        className={`relative bg-[#F5F5F0] text-rizu-black p-8 rounded-sm shadow-2xl overflow-hidden transition-all duration-1000 ${isOpen ? 'h-auto min-h-[300px]' : 'h-[200px]'}`}
        initial={{ rotateX: 0 }}
      >
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

        {/* Content - Hidden initially */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-col items-center justify-center h-full text-center space-y-4 pt-12"
            >
              <p className="font-serif text-2xl italic leading-relaxed">
                “Even when I mess up, my heart never left you.”
              </p>
              <div className="w-12 h-1 bg-rizu-red/20 rounded-full" />
              <p className="font-serif text-xl italic text-gray-600">
                “I choose you — even in silence.”
                <br />
                <span className="text-sm mt-4 block text-rizu-red/60">— your Arqum</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Fold / Seal */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              exit={{ y: -200, opacity: 0, transition: { duration: 0.8 } }}
              className="absolute inset-0 flex items-center justify-center bg-[#E8E8E0] z-20 border-b-2 border-gray-300"
              style={{ clipPath: 'polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)' }} // Attempt at envelope shape
            >
               {/* Simplified Envelope Flap Look */}
               <div className="absolute top-0 left-0 w-full h-1/2 bg-[#Dcdcd5] shadow-inner" style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }} />
               
               <button 
                 onClick={handleBreakSeal}
                 className="relative z-30 group"
               >
                 <div className="w-16 h-16 rounded-full bg-rizu-red shadow-lg flex items-center justify-center border-4 border-rizu-red/80 group-hover:scale-105 transition-transform">
                    <span className="font-serif text-rizu-gold text-2xl font-bold">R</span>
                 </div>
                 <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/20 animate-spin-slow" />
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SealedTruth;
