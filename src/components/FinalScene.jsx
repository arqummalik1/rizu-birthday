import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import ThreeCake from './ThreeCake';

const FLIP_HINT_QUOTES = [
  "Tap me — I hide a piece of my heart.",
  "One touch… and I fall for you again.",
  "If it’s you, I’m home.",
  "I’d choose you — every single time.",
  "You’re my favorite forever.",
  "You make my heart feel safe.",
  "Turn me over… like you turned my world.",
  "You’re the sweetest part of my day.",
  "I love you, quietly… deeply.",
  "Just tap — and let me adore you."
];

const FinalScene = () => {
  const [gameRevealed, setGameRevealed] = useState(false);
  const revealRef = useRef(null);

  useEffect(() => {
    if (gameRevealed && revealRef.current) {
      setTimeout(() => {
        revealRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }
  }, [gameRevealed]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full flex flex-col items-center justify-start pt-20 pb-40 space-y-20"
    >
      {/* 1. Memory Gallery (Horizontal) */}
      <section className="w-full max-w-full overflow-hidden">
        <h2 className="text-center font-serif text-2xl text-rizu-gold/70 mb-8 italic">Moments in time</h2>
        <div className="flex space-x-8 px-8 overflow-x-auto pb-8 snap-x scrollbar-gold touch-pan-x">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="snap-center shrink-0 w-[300px] aspect-[3/4] bg-rizu-black border border-rizu-gold/20 rounded-lg overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
              <img
                src={`gallery/rizu${i}.jpg`}
                alt={`Memory ${i}`}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/300x400/15151a/E0BFB8?text=Moment+' + i;
                  e.target.onerror = null;
                }}
              />
              <div className="absolute bottom-4 left-4 z-20">
                <p className="font-serif text-rizu-gold text-lg">Memory {i}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Hidden Mini Game */}
      <section className="w-full max-w-4xl px-4 text-center">
        <h2 className="font-serif text-2xl text-rizu-gold mb-8">Pick a number...</h2>
        <MiniGame onComplete={() => setGameRevealed(true)} />
      </section>

      {/* 3. Revealed Content: Flip Cards + Final Message + Cake */}
      <AnimatePresence>
        {gameRevealed && (
          <motion.div
            ref={revealRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="w-full flex flex-col items-center space-y-20"
          >
            {/* Whispers I kept for you... (Flip Cards) */}
            <section className="w-full max-w-6xl px-4">
              <h2 className="text-center font-serif text-3xl text-rizu-gold mb-12 italic">Whispers I kept for you...</h2>
              <div className="flex flex-wrap justify-center gap-8">
                <FlipCard front="❤️" back="Tu mera sabse beautiful khwab hai." />
                <FlipCard front="🕯️" back="Har pal bas tera hi khayal aata hai." />
                <FlipCard front="🗝️" back="Tere bina sab kuch pheeka lagta hai." />
              </div>
            </section>

            {/* Final Message & Cake */}
            <section className="w-full max-w-4xl px-4 py-20 text-center space-y-8">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-rizu-red to-transparent opacity-50" />

              <p className="font-serif text-xl md:text-3xl text-rizu-gold leading-relaxed">
                “This was never just a website.<br />
                It was my way of being close to you —<br />
                even from far away.”
              </p>

              <h1 className="font-serif text-4xl md:text-6xl text-rizu-red pt-8 pb-8">
                Happy Birthday, Rizu ❤️
              </h1>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-rizu-red to-transparent opacity-50 mb-12" />

              {/* 3D Cake Ceremony */}
              <ThreeCakeCeremony />

            </section>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

const ThreeCakeCeremony = () => {
  // States: 'hidden' -> 'candles' -> 'lit' -> 'knife' -> 'cut'
  const [stage, setStage] = useState('hidden');
  const [overlayStage, setOverlayStage] = useState('off');
  const [showLoveSoMuch, setShowLoveSoMuch] = useState(false);
  const timeoutsRef = useRef([]);
  const confettiIntervalRef = useRef(null);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
      if (confettiIntervalRef.current) clearInterval(confettiIntervalRef.current);
      confettiIntervalRef.current = null;
    };
  }, []);

  const handleStageChange = (newStage) => {
    setStage(newStage);

    if (newStage === 'cut') {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
      if (confettiIntervalRef.current) clearInterval(confettiIntervalRef.current);
      confettiIntervalRef.current = null;

      setOverlayStage('off');
      setShowLoveSoMuch(false);

      const tShow = setTimeout(() => {
        setOverlayStage('celebrate');

        const startedAt = Date.now();
        const duration = 10 * 1000;

        const fireworkBurst = (x, y, particleCount) => {
          confetti({
            particleCount,
            startVelocity: 45,
            spread: 90,
            ticks: 160,
            gravity: 0.9,
            origin: { x, y },
            colors: ['#ffb6c2', '#ffd6a5', '#fff1d6', '#f7dfe6', '#e0bfb8']
          });
        };

        confettiIntervalRef.current = setInterval(() => {
          const elapsed = Date.now() - startedAt;
          if (elapsed >= duration) {
            if (confettiIntervalRef.current) clearInterval(confettiIntervalRef.current);
            confettiIntervalRef.current = null;
            return;
          }

          const x1 = 0.15 + Math.random() * 0.2;
          const x2 = 0.65 + Math.random() * 0.2;
          const y = 0.15 + Math.random() * 0.15;

          fireworkBurst(x1, y, 55);
          fireworkBurst(x2, y, 55);
        }, 520);

        const tLove = setTimeout(() => {
          setShowLoveSoMuch(true);
        }, 4000);

        const tEnd = setTimeout(() => {
          if (confettiIntervalRef.current) clearInterval(confettiIntervalRef.current);
          confettiIntervalRef.current = null;
          setOverlayStage('black');
        }, 10000);

        timeoutsRef.current.push(tLove, tEnd);
      }, 3000);

      timeoutsRef.current.push(tShow);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 mt-12 w-full">
      {/* Instructions */}
      <AnimatePresence mode="wait">
        {stage === 'hidden' && (
          <motion.p
            key="instr-1"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-rizu-gold/60 uppercase tracking-widest text-sm animate-pulse"
          >
            Tap the cake to reveal the candles
          </motion.p>
        )}
        {stage === 'candles' && (
          <motion.p
            key="instr-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-rizu-gold/60 uppercase tracking-widest text-sm animate-pulse"
          >
            Tap again to light the candles
          </motion.p>
        )}
        {stage === 'lit' && (
          <motion.p
            key="instr-3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-rizu-gold/60 uppercase tracking-widest text-sm animate-pulse"
          >
            Make a wish… tap to blow!
          </motion.p>
        )}
        {stage === 'knife' && (
          <motion.p
            key="instr-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-rizu-gold/60 uppercase tracking-widest text-sm animate-pulse"
          >
            Candles are out! Tap to cut...
          </motion.p>
        )}
        {stage === 'cut' && (
          <motion.div
            key="final-msg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4 relative z-10"
            onAnimationComplete={() => console.log('Final message shown')}
          >
            <h2 className="font-serif text-3xl md:text-5xl text-rizu-red drop-shadow-lg">
              Happy Birthday My Love! 🎉
            </h2>
            <p className="text-rizu-gold italic">May all your wishes come true.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Cake Component */}
      <ThreeCake stage={stage} onStageChange={handleStageChange} />

      <AnimatePresence>
        {overlayStage === 'celebrate' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#12070a] via-[#050509] to-[#170810] overflow-hidden"
          >
            {/* Sky lights */}
            <div className="absolute inset-0">
              {Array.from({ length: 18 }).map((_, index) => (
                <motion.span
                  key={`sparkle-${index}`}
                  className="absolute w-2 h-2 rounded-full bg-[#ffd6a5] shadow-[0_0_22px_rgba(255,214,165,0.9)]"
                  style={{
                    left: `${6 + index * 5.2}%`,
                    top: `${10 + (index % 6) * 13}%`
                  }}
                  animate={{ opacity: [0.15, 1, 0.25], scale: [0.6, 1.35, 0.75] }}
                  transition={{ duration: 2.6 + index * 0.12, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </div>

            {/* Light beams */}
            <motion.div
              className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[140vw] h-[60vh] bg-gradient-to-t from-[#ffb6c2]/20 via-[#ffd6a5]/5 to-transparent blur-3xl"
              animate={{ opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Rising message */}
            <motion.div className="relative text-center px-6">
              <motion.h1
                initial={{ y: 240, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="text-center font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#f4b6c2] tracking-wide drop-shadow-[0_0_45px_rgba(244,182,194,0.7)]"
              >
                Happy Birthday Rizu
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="mt-4 text-base sm:text-lg md:text-xl text-[#f7dfe6]/85 font-serif italic"
              >
                Big One • Lights in the sky, and you in my heart.
              </motion.p>

              <AnimatePresence>
                {showLoveSoMuch && (
                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 text-3xl sm:text-4xl md:text-5xl text-[#f7dfe6] font-[var(--font-script)] drop-shadow-[0_0_30px_rgba(247,223,230,0.35)]"
                  >
                    I love you so much.
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mt-10 flex items-center justify-center gap-4 text-3xl">
                <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2.8, repeat: Infinity }}>�</motion.span>
                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2.2, repeat: Infinity }}>✨</motion.span>
                <motion.span animate={{ rotate: [0, -12, 12, 0] }} transition={{ duration: 3, repeat: Infinity }}>💖</motion.span>
                <motion.span animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2.6, repeat: Infinity }}>🎇</motion.span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {overlayStage === 'black' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="text-center text-4xl sm:text-5xl md:text-6xl text-[#f7dfe6] font-[var(--font-script)]"
            >
              I love you.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

const FlipCard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const hint = useMemo(() => {
    const s = `${front}-${back}`;
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      hash = (hash * 31 + s.charCodeAt(i)) | 0;
    }
    const idx = Math.abs(hash) % FLIP_HINT_QUOTES.length;
    return FLIP_HINT_QUOTES[idx];
  }, [front, back]);

  return (
    <div
      className="w-52 h-72 sm:w-60 sm:h-80 perspective-1000 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d transition-all duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-[#15151a] border border-rizu-gold/20 rounded-xl flex items-center justify-center shadow-2xl group-hover:border-rizu-gold/50 transition-colors">
          <div className="text-4xl">{front}</div>
          <div className="absolute bottom-4 left-4 right-4 text-[10px] sm:text-xs text-rizu-gold/40 tracking-wide text-center truncate">
            {hint}
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden bg-rizu-red/10 border border-rizu-red/30 rounded-xl flex items-center justify-center p-6 text-center shadow-2xl"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <p className="font-serif text-base sm:text-lg text-rizu-gold italic leading-relaxed">
            {back}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const MiniGame = ({ onComplete }) => {
  const [selected, setSelected] = useState(null);

  const messages = {
    1: "I owe you a late night drive.",
    2: "One free hug, redeemable anytime.",
    3: "You are the best thing that happened to me.",
    4: "I fell for you again today.",
    5: "Let's watch the stars together soon.",
    6: "You owe me a smile right now.",
    7: "I love you. That's the secret."
  };

  const handleSelect = (num) => {
    if (selected) return;
    setSelected(num);
    setTimeout(onComplete, 2000); // Show final message after delay
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
        <motion.button
          key={num}
          onClick={() => handleSelect(num)}
          disabled={selected !== null}
          className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-serif text-xl transition-all duration-500
            ${selected === num
              ? 'bg-rizu-red border-rizu-red text-white scale-110'
              : selected
                ? 'opacity-20 scale-90 border-gray-700 text-gray-700'
                : 'border-rizu-gold/30 text-rizu-gold hover:bg-rizu-gold/10 hover:scale-105'
            }
          `}
          whileTap={{ scale: 0.9 }}
        >
          {selected === num ? "❤️" : num}
        </motion.button>
      ))}

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mt-8"
          >
            <p className="font-serif text-xl text-rizu-gold italic">
              "You picked {selected} — {messages[selected]}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinalScene;
