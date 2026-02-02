import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart, Key } from 'lucide-react';

const SecretRoom = ({ id, status, onOpen, children, title }) => {
  // status: 'locked' | 'active' | 'open' | 'completed'
  
  const isLocked = status === 'locked';
  const isActive = status === 'active';
  const isOpen = status === 'open';
  const isCompleted = status === 'completed';

  return (
    <motion.div 
      layout
      className={`relative w-full max-w-2xl mx-auto my-6 md:my-8 transition-all duration-500 ${isOpen ? 'p-0' : 'p-3 sm:p-4'}`}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="door"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => isActive && onOpen()}
            disabled={isLocked}
            className={`w-full aspect-[3/1] sm:aspect-[4/1] md:aspect-[5/1] relative overflow-hidden rounded-lg border transition-all duration-500 group
              ${isLocked 
                ? 'bg-rizu-black border-white/10 opacity-50 cursor-not-allowed' 
                : 'bg-gradient-to-r from-rizu-black to-[#1a1a20] border-rizu-gold/30 hover:border-rizu-gold/60 cursor-pointer shadow-[0_0_20px_rgba(183,110,121,0.1)]'
              }
            `}
          >
            <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 md:px-12">
              <div className="flex items-center space-x-4">
                <div className={`p-2 sm:p-3 rounded-full transition-colors duration-500 ${isActive ? 'bg-rizu-red/20 text-rizu-red' : 'bg-white/5 text-white/20'}`}>
                  {isLocked ? <Lock size={18} /> : isCompleted ? <Heart size={18} className="fill-current" /> : <Key size={18} className="animate-pulse" />}
                </div>
                <div className="text-left">
                  <h3 className={`font-serif text-base sm:text-lg md:text-xl tracking-wide transition-colors ${isActive ? 'text-rizu-gold' : 'text-white/30'}`}>
                    {isLocked ? "Locked Secret" : title}
                  </h3>
                  {isActive && !isCompleted && (
                    <p className="text-xs text-rizu-gold/50 uppercase tracking-widest mt-1">Tap to unlock</p>
                  )}
                  {isCompleted && (
                    <p className="text-xs text-rizu-red/50 uppercase tracking-widest mt-1">Discovered</p>
                  )}
                </div>
              </div>
              
              {/* Decorative Number */}
              <span className={`font-serif text-3xl sm:text-4xl md:text-6xl font-bold opacity-10 ${isActive ? 'text-rizu-gold' : 'text-white'}`}>
                {String(id).padStart(2, '0')}
              </span>
            </div>

            {/* Hover Effect for Active */}
            {isActive && (
              <div className="absolute inset-0 bg-rizu-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            )}
          </motion.button>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full bg-rizu-black/50 backdrop-blur-sm border border-rizu-gold/10 rounded-xl p-5 sm:p-6 md:p-8 relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rizu-black px-4 py-1 border border-rizu-gold/20 rounded-full">
              <span className="text-xs text-rizu-gold/70 uppercase tracking-widest">Secret {id}</span>
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SecretRoom;
