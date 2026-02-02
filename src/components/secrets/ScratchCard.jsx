import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ScratchCard = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;

    // Set canvas size
    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      // Fill with "Gold Foil"
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#B76E79'); // Rose Gold Dark
      gradient.addColorStop(0.5, '#E0BFB8'); // Rose Gold Light
      gradient.addColorStop(1, '#B76E79');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some "noise" or texture
      ctx.globalCompositeOperation = 'source-over';
      // ... texture drawing could go here
    };

    resize();
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  const handleScratch = (e) => {
    if (isRevealed) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();

    // Calculate progress (simplified)
    // In a real app, we'd count transparent pixels, but let's just use a counter for now
    // or just assume if they scratch enough it's done.
    
    // Better way: Check pixels every N scratches
    if (Math.random() > 0.9) {
      checkProgress();
    }
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparent++;
    }
    
    const percentage = (transparent / (pixels.length / 4)) * 100;
    setScratchProgress(percentage);
    
    if (percentage > 50) {
      setIsRevealed(true);
      if (onComplete) onComplete();
      
      // Fade out canvas
      canvas.style.transition = 'opacity 1s';
      canvas.style.opacity = '0';
      setTimeout(() => {
        canvas.style.display = 'none';
      }, 1000);
    }
  };

  return (
    <div className="relative w-full max-w-md sm:max-w-lg aspect-[3/2] bg-rizu-black border border-rizu-gold/20 p-5 sm:p-8 flex items-center justify-center text-center rounded-lg overflow-hidden shadow-2xl">
      {/* Hidden Content */}
      <div className="absolute inset-0 flex items-center justify-center p-6 bg-[#1a1a20]">
        <p className="font-serif text-xl sm:text-2xl text-rizu-gold italic">
          “You are the only dream I never want to wake up from.”
        </p>
      </div>

      {/* Scratch Layer */}
      <div ref={containerRef} className="absolute inset-0 z-10">
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none cursor-crosshair"
          onMouseMove={(e) => e.buttons === 1 && handleScratch(e)}
          onTouchMove={handleScratch}
        />
      </div>
      
      {!isRevealed && (
        <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none z-20">
          <p className="text-rizu-black/50 text-sm font-medium animate-pulse">Scratch to reveal</p>
        </div>
      )}
    </div>
  );
};

export default ScratchCard;
