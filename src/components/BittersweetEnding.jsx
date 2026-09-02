import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BittersweetEnding({ onChangeMind, onRestart }) {
  const fullText = "You will have a good life with someone else maybe... and I will watch you happily growing in your life, and I will die knowing you were happy. 😊🤍";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(prev => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 45);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bittersweet-box"
      style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div className="typewriter-text">
        "{displayedText}"
        <span className="blinking-cursor">|</span>
      </div>

      {displayedText.length >= fullText.length && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', marginTop: '10px' }}
        >
          <button className="btn-primary" onClick={onChangeMind} style={{ background: 'linear-gradient(135deg, #ff6584 0%, #ff3366 100%)' }}>
            Wait... I Changed My Heart! 💖
          </button>
          <button className="btn-secondary" onClick={onRestart} style={{ fontSize: '0.9rem', opacity: 0.7 }}>
            Replay Story 🔄
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
