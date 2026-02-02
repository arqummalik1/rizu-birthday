import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import EntryScreen from './components/EntryScreen';
import Experience from './components/Experience';

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen w-full relative bg-rizu-black overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!started ? (
          <EntryScreen key="entry" onUnlock={() => setStarted(true)} />
        ) : (
          <Experience key="experience" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
