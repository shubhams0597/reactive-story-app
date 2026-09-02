import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { happyEndingBeats } from '../data/slides';

export default function HappyEnding({ onRestart }) {
  const [visibleCount, setVisibleCount] = useState(1);

  // Trigger celebration confetti
  useEffect(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff6584', '#ffd700', '#ffffff', '#ff3366']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6584', '#ffd700', '#ffffff', '#ff3366']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleNextBeat = () => {
    if (visibleCount < happyEndingBeats.length) {
      setVisibleCount(prev => prev + 1);
      // Trigger extra confetti burst on final beat ("We Made It")
      if (visibleCount === happyEndingBeats.length - 1) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h2 className="sweet-title" style={{ color: '#ffd700', textShadow: '0 0 20px rgba(255, 215, 0, 0.6)' }}>
        Our Beautiful Future 💕
      </h2>

      <div className="timeline-list">
        <AnimatePresence>
          {happyEndingBeats.slice(0, visibleCount).map((beat, idx) => (
            <motion.div
              key={beat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="timeline-card"
              style={{
                background: idx === 3 ? 'rgba(255, 215, 0, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                borderColor: idx === 3 ? 'rgba(255, 215, 0, 0.4)' : 'rgba(255, 255, 255, 0.15)'
              }}
            >
              <div className="timeline-icon">{beat.icon}</div>
              <div className="timeline-text">{beat.text}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleCount < happyEndingBeats.length ? (
        <button className="btn-primary" onClick={handleNextBeat} style={{ marginTop: '12px' }}>
          See What Happens Next ✨ →
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}
        >
          <div className="sweet-title" style={{ fontSize: '2rem', color: '#ffb8c6' }}>
            "We Made It. ❤️"
          </div>
          <button className="btn-secondary" onClick={onRestart}>
            Replay Story 🔄
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
