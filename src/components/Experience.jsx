import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import SecretRoom from './SecretRoom';
import ScratchCard from './secrets/ScratchCard';
import MemoryGallery from './secrets/MemoryGallery';
import SealedTruth from './secrets/SealedTruth';
import FinalScene from './FinalScene';

const Experience = () => {
  const [progress, setProgress] = useState(0); // 0, 1, 2, 3 (Final)
  const [activeRoom, setActiveRoom] = useState(null); // null or room ID
  const [showFinal, setShowFinal] = useState(false);

  // Scroll to bottom when progress updates
  useEffect(() => {
    if (progress > 0) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }, [progress]);

  const handleRoomComplete = (roomIndex) => {
    if (progress <= roomIndex) {
      setProgress(roomIndex + 1);
    }
  };

  const rooms = [
    {
      id: 1,
      title: "A Quiet Confession",
      component: <ScratchCard onComplete={() => handleRoomComplete(0)} />,
      description: "Something hidden beneath the surface."
    },
    {
      id: 2,
      title: "Fragments of Us",
      component: <MemoryGallery onComplete={() => handleRoomComplete(1)} />,
      description: "Moments I keep safe."
    },
    {
      id: 3,
      title: "The Sealed Truth",
      component: <SealedTruth onComplete={() => handleRoomComplete(2)} />,
      description: "What I mean when I say nothing."
    }
  ];

  if (showFinal) {
    return (
      <div className="relative min-h-screen bg-rizu-black text-rizu-gold overflow-x-hidden">
         <FloatingHearts />
         <FinalScene />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-rizu-black text-rizu-gold overflow-x-hidden pb-40">
      <FloatingHearts />

      <header className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center bg-gradient-to-b from-rizu-black to-transparent pointer-events-none">
        <h1 className="font-serif text-xl md:text-2xl text-rizu-red tracking-widest opacity-80">RIZU</h1>
        <div className="text-xs font-mono text-rizu-gold/30">
          {progress} / {rooms.length} UNLOCKED
        </div>
      </header>

      <main className="container mx-auto px-4 pt-32 z-10 relative">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16 space-y-4"
        >
          <p className="font-serif text-2xl md:text-3xl italic text-rizu-gold/80">
            "The best things are hidden."
          </p>
          <p className="text-sm text-white/30 uppercase tracking-[0.2em]">
            Unlock the secrets in order
          </p>
        </motion.div>

        <div className="space-y-12">
          {rooms.map((room, index) => {
            let status = 'locked';
            if (progress > index) status = 'completed';
            if (progress === index) status = 'active';
            if (activeRoom === room.id) status = 'open'; // Override if currently viewing
            
            // Allow re-opening completed rooms
            if (status === 'completed' && activeRoom === room.id) status = 'open';
            if (status === 'completed' && activeRoom !== room.id) status = 'completed';

            return (
              <SecretRoom
                key={room.id}
                id={room.id}
                title={room.title}
                status={status}
                onOpen={() => setActiveRoom(room.id)}
              >
                {room.component}
              </SecretRoom>
            );
          })}
        </div>

        {/* Final Scene Trigger */}
        <AnimatePresence>
          {progress >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex justify-center mt-20"
            >
              <button
                onClick={() => setShowFinal(true)}
                className="group relative px-12 py-6 bg-transparent overflow-hidden rounded-full transition-all duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rizu-red to-[#4a0810] opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 border border-rizu-gold/50 rounded-full scale-95 group-hover:scale-100 transition-transform" />
                
                <span className="relative z-10 font-serif text-xl text-rizu-gold italic group-hover:tracking-widest transition-all duration-500">
                  Open The Final Promise
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Experience;
