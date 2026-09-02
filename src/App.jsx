import React, { useState } from 'react';
import HeartCanvas from './components/HeartCanvas';
import DodgeStage from './components/DodgeStage';
import StorySlides from './components/StorySlides';
import ChoiceScreen from './components/ChoiceScreen';
import HappyEnding from './components/HappyEnding';
import BittersweetEnding from './components/BittersweetEnding';

export default function App() {
  const [phase, setPhase] = useState('dodge'); // 'dodge' | 'slides' | 'choice' | 'ending_yes' | 'ending_no'

  return (
    <>
      {/* Background Interactive Particle Canvas */}
      <HeartCanvas phase={phase} />

      {/* Main Glassmorphism Reactive UI Card */}
      <main className="app-container">
        {phase === 'dodge' && (
          <DodgeStage onComplete={() => setPhase('slides')} />
        )}

        {phase === 'slides' && (
          <StorySlides onFinishSlides={() => setPhase('choice')} />
        )}

        {phase === 'choice' && (
          <ChoiceScreen
            onChooseYes={() => setPhase('ending_yes')}
            onChooseNo={() => setPhase('ending_no')}
          />
        )}

        {phase === 'ending_yes' && (
          <HappyEnding onRestart={() => setPhase('dodge')} />
        )}

        {phase === 'ending_no' && (
          <BittersweetEnding
            onChangeMind={() => setPhase('ending_yes')}
            onRestart={() => setPhase('dodge')}
          />
        )}
      </main>
    </>
  );
}
