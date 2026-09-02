import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storySlides } from '../data/slides';

export default function StorySlides({ onFinishSlides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSlide = storySlides[currentIndex];

  const handleNext = () => {
    if (currentIndex < storySlides.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onFinishSlides();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="slide-card">
      {/* Slide Header Counter */}
      <p className="subtitle" style={{ marginBottom: 12 }}>
        Memory {currentIndex + 1} of {storySlides.length}
      </p>

      {/* Slide Image + Caption Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -40, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div className="slide-image-wrapper">
            <img src={currentSlide.image} alt={currentSlide.title} />
          </div>
          <div className="slide-caption">
            "{currentSlide.caption}"
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots */}
      <div className="progress-dots">
        {storySlides.map((_, idx) => (
          <div
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      {/* Navigation Controls */}
      <div style={{ display: 'flex', gap: 14 }}>
        {currentIndex > 0 && (
          <button className="btn-secondary" onClick={handlePrev}>
            ← Previous
          </button>
        )}
        <button className="btn-primary" onClick={handleNext}>
          {currentIndex === storySlides.length - 1 ? "Make A Choice 💖" : "Next Memory 💕 →"}
        </button>
      </div>
    </div>
  );
}
