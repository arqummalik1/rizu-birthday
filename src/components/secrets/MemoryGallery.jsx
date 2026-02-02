import React, { useState } from 'react';
import { motion } from 'framer-motion';

const memories = [
  { id: 1, caption: "The way you laugh", color: "from-purple-900 to-indigo-900", src: "/gallery/rizu1.jpg" },
  { id: 2, caption: "Quiet moments", color: "from-pink-900 to-rose-900", src: "/gallery/rizu2.jpg" },
  { id: 3, caption: "Just us", color: "from-blue-900 to-cyan-900", src: "/gallery/rizu3.jpg" },
];

const MemoryGallery = ({ onComplete }) => {
  const [revealedCount, setRevealedCount] = useState(0);
  const [revealedIds, setRevealedIds] = useState(new Set());

  const handleReveal = (id) => {
    if (!revealedIds.has(id)) {
      const newSet = new Set(revealedIds).add(id);
      setRevealedIds(newSet);
      if (newSet.size === memories.length && onComplete) {
        onComplete();
      }
    }
  };

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-3 sm:p-4">
      {memories.map((mem) => (
        <MemoryCard 
          key={mem.id} 
          memory={mem} 
          onReveal={() => handleReveal(mem.id)} 
        />
      ))}
    </div>
  );
};

const MemoryCard = ({ memory, onReveal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer group"
      onHoverStart={() => {
        setIsHovered(true);
        onReveal();
      }}
      onHoverEnd={() => setIsHovered(false)}
      onTouchStart={() => {
        setIsHovered(true);
        onReveal();
      }}
      onTouchEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Blurred Cover / Image */}
      {memory.src && !imgError ? (
        <img 
          src={memory.src} 
          alt={memory.caption}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isHovered ? 'blur-none scale-105' : 'blur-xl scale-110'}`}
          onError={() => setImgError(true)}
        />
      ) : (
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${memory.color} transition-all duration-700 ${isHovered ? 'blur-none scale-105' : 'blur-xl scale-110'}`}
        />
      )}
      
      {/* Overlay for blur effect */}
      <div className={`absolute inset-0 bg-black/50 transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />

      {/* Caption */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-rizu-gold font-serif italic text-center">{memory.caption}</p>
      </div>

      {/* Hint Icon */}
      {!isHovered && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="w-8 h-8 text-white/30 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default MemoryGallery;
