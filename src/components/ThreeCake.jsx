import React, { useState, useEffect } from 'react';

const ThreeCake = ({ stage, onStageChange }) => {
  const isCandlesVisible = stage !== 'hidden';
  const isLit = stage === 'lit';
  const isBlownOut = stage === 'knife' || stage === 'cut';
  const isCut = stage === 'cut';

  const handleClick = () => {
    if (stage === 'hidden') onStageChange('candles');
    else if (stage === 'candles') onStageChange('lit');
    else if (stage === 'lit') onStageChange('knife');
    else if (stage === 'knife') onStageChange('cut');
  };

  return (
    <div
      className="relative w-full h-[500px] flex items-center justify-center cursor-pointer select-none"
      onClick={handleClick}
    >
      <div className="relative scale-110 md:scale-125">
        {/* Plate */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-80 h-10 bg-[#2a2a3a] rounded-[100%] border-b-4 border-black/30 shadow-2xl z-0" />

        {/* Cake Container */}
        <div className={`relative transition-transform duration-700 ${isCut ? '-translate-x-8' : ''}`}>
          {/* Main Cake Body */}
          <div className="relative w-56 h-40 bg-gradient-to-b from-[#5D1523] to-[#3D0D17] rounded-t-lg shadow-xl overflow-hidden border-b-4 border-[#2D1B1E]">
            {/* Layers */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-[#FFD700] opacity-50" />

            {/* Top Icing */}
            <div className="absolute -top-4 -left-2 w-[calc(100%+16px)] h-12 bg-[#f7e5e9] rounded-[100%] shadow-md" />

            {/* Drips */}
            <div className="absolute top-4 left-0 w-full flex justify-around px-4">
              {[30, 45, 35, 50, 40].map((h, i) => (
                <div key={i} className="w-4 bg-[#f7e5e9] rounded-b-full shadow-sm" style={{ height: `${h}px` }} />
              ))}
            </div>

            {/* Cake Text */}
            <div className="absolute inset-0 flex items-center justify-center pt-8">
              <span className="font-serif italic text-rizu-gold text-sm opacity-60 pointer-events-none">Happy Birthday Rizu</span>
            </div>
          </div>

          {/* Candles */}
          {isCandlesVisible && (
            <div className="absolute -top-16 left-0 w-full flex justify-center gap-10">
              {[0, 1, 2].map((i) => (
                <div key={i} className="relative">
                  {/* Candle Stick */}
                  <div className="w-3 h-16 bg-gradient-to-b from-white via-pink-100 to-pink-200 rounded-sm relative shadow-md">
                    {/* Stripes */}
                    <div className="absolute top-4 left-0 w-full h-1 bg-pink-300 -rotate-12" />
                    <div className="absolute top-8 left-0 w-full h-1 bg-pink-300 -rotate-12" />
                  </div>

                  {/* Wick */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-gray-800" />

                  {/* Flame */}
                  {isLit && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-6 animate-pulse">
                      <div className="w-full h-full bg-gradient-to-t from-orange-600 via-yellow-400 to-transparent rounded-full blur-[1px] animate-[flicker_0.15s_infinite_alternate]" />
                      <div className="absolute top-0 left-0 w-full h-full bg-yellow-300 rounded-full blur-[4px] opacity-40 scale-150" />
                    </div>
                  )}

                  {/* Smoke (when blown out) */}
                  {isBlownOut && !isCut && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-2 h-8 bg-white/20 blur-md rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* The Slice (appears when cut) */}
        {isCut && (
          <div className="absolute top-0 left-[60%] w-32 h-40 bg-gradient-to-b from-[#5D1523] to-[#3D0D17] rounded-t-lg shadow-2xl skew-x-6 rotate-12 transition-all duration-700">
            <div className="absolute -top-4 -left-2 w-[calc(100%+8px)] h-12 bg-[#f7e5e9] rounded-[100%]" />
            <div className="absolute top-4 left-0 w-full flex justify-around px-2">
              <div className="w-3 h-8 bg-[#f7e5e9] rounded-b-full" />
              <div className="w-3 h-10 bg-[#f7e5e9] rounded-b-full" />
            </div>
          </div>
        )}

        {/* Floating Hearts/Sparkles */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          {isLit && [0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="absolute text-red-400 animate-ping opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`
              }}
            >❤️</div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes flicker {
          0% { transform: scale(1) rotate(-1deg); opacity: 0.9; }
          50% { transform: scale(1.1) rotate(1deg); opacity: 1; }
          100% { transform: scale(0.95) rotate(-0.5deg); opacity: 0.8; }
        }
      `}} />

      {/* Helper text overlay */}
      <div className="absolute bottom-10 left-0 w-full text-center">
        <p className="text-rizu-gold/60 font-serif italic tracking-widest uppercase text-xs animate-pulse">
          {stage === 'hidden' && 'Tap the cake to prepare'}
          {stage === 'candles' && 'Tap to light the candles!'}
          {stage === 'lit' && 'Make a wish & tap to blow!'}
          {stage === 'knife' && 'Now tap to cut your slice!'}
          {stage === 'cut' && '🍰 Enjoy your birthday!'}
        </p>
      </div>
    </div>
  );
};

export default ThreeCake;
