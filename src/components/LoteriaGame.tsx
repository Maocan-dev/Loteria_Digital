
import React from 'react';
import LoteriaDeck from './LoteriaDeck';
import CardHistory from './CardHistory';
import GameControls from './game/GameControls';
import GameSettings from './game/GameSettings';
import GameStats from './game/GameStats';
import DealerPlayerSection from './DealerPlayerSection';
import { useLoteriaGame } from '../hooks/useLoteriaGame';

const LoteriaGame = () => {
  const {
    currentCard,
    flippedCards,
    deck,
    isPlaying,
    isSoundEnabled,
    soundVersion,
    timerDelay,
    remainingCards,
    isLastCard,
    togglePlay,
    nextCard,
    shuffleAndReset,
    toggleSound,
    setTimerDelay,
    setSoundVersion
  } = useLoteriaGame();

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 space-y-6">
          <GameControls
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            nextCard={nextCard}
            shuffleAndReset={shuffleAndReset}
            isSoundEnabled={isSoundEnabled}
            toggleSound={toggleSound}
            isLastCard={isLastCard}
          />

          {/* Fondo de cartas */}
          <div className="bg-white/20 rounded-lg shadow-md overflow-hidden">
            <LoteriaDeck
              currentCard={currentCard}
              remainingCards={remainingCards}
              totalCards={deck.length}
            />
          </div>

          <CardHistory flippedCards={flippedCards} />
        </div>

        <div className="space-y-6">
          <GameSettings
            timerDelay={timerDelay}
            setTimerDelay={setTimerDelay}
            soundVersion={soundVersion}
            setSoundVersion={setSoundVersion}
            isSoundEnabled={isSoundEnabled}
            toggleSound={toggleSound}
          />

          <GameStats
            flippedCardsCount={flippedCards.length}
            remainingCards={remainingCards}
            totalCards={deck.length}
          />
        </div>
      </div>

      {/* DealerPlayerSection - only showing grid */}
            
      <DealerPlayerSection cards={deck} isSoundEnabled={isSoundEnabled} />
    </div>
  );
};

export default LoteriaGame;
