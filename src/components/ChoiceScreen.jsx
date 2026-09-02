import React from 'react';
import { motion } from 'framer-motion';

export default function ChoiceScreen({ onChooseYes, onChooseNo }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h2 className="sweet-title" style={{ fontSize: '2.8rem', marginBottom: '8px' }}>
        The Big Question... 💕
      </h2>
      <p className="handwriting-note" style={{ color: '#ffd6e0', marginBottom: '24px' }}>
        "Looking at all our memories, will you choose to stay?"
      </p>

      <div className="choice-box">
        <motion.button
          className="btn-primary btn-yes"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={onChooseYes}
          style={{ fontSize: '1.2rem', padding: '16px 36px' }}
        >
          Yes, I Want to Stay! 💕✨
        </motion.button>

        <motion.button
          className="btn-secondary btn-no"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onChooseNo}
          style={{ fontSize: '1.1rem', padding: '16px 28px' }}
        >
          No, I Won't Stay... 💔
        </motion.button>
      </div>
    </motion.div>
  );
}
