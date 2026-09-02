import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DodgeStage({ onComplete }) {
  const [stage, setStage] = useState(0);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });

  const messages = [
    { title: "Click me please 🥺", subtitle: "I have something special to show you..." },
    { title: "Sorry sorry, vapas click karo! 🙈", subtitle: "Oops, it slipped away! Try again!" },
    { title: "Wait... abhi pakka nahi! 😅", subtitle: "One last catch, I promise!" },
    { title: "I am sorry I messed up, but I really love you... 🥺💕", subtitle: "Click below to unlock our story..." }
  ];

  const handleButtonClick = () => {
    if (stage === 0) {
      // Shift right/up
      setButtonPos({ x: 120, y: -40 });
      setStage(1);
    } else if (stage === 1) {
      // Shift left/down
      setButtonPos({ x: -140, y: 50 });
      setStage(2);
    } else if (stage === 2) {
      // Reset position to center for final catch
      setButtonPos({ x: 0, y: 0 });
      setStage(3);
    } else if (stage === 3) {
      // Complete phase
      onComplete();
    }
  };

  const handleHoverDodge = () => {
    // Subtle playful wiggle on hover during stage 1 & 2
    if (stage === 1) {
      setButtonPos(prev => ({ x: prev.x + (Math.random() * 40 - 20), y: prev.y + (Math.random() * 40 - 20) }));
    }
  };

  return (
    <div className="dodge-box">
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="sweet-title">{messages[stage].title}</h2>
          <p className="subtitle">{messages[stage].subtitle}</p>
        </motion.div>
      </AnimatePresence>

      <div className="dodge-area">
        <motion.button
          className="btn-primary"
          animate={{
            x: buttonPos.x,
            y: buttonPos.y,
            scale: stage === 3 ? [1, 1.08, 1] : 1
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            scale: stage === 3 ? { repeat: Infinity, duration: 1.5 } : {}
          }}
          onClick={handleButtonClick}
          onMouseEnter={handleHoverDodge}
        >
          {stage === 0 && "Click Me! 💕"}
          {stage === 1 && "Catch Me! 🏃‍♂️💨"}
          {stage === 2 && "Here Again! 🙈"}
          {stage === 3 && "Open Story Book ✨"}
        </motion.button>
      </div>
    </div>
  );
}
