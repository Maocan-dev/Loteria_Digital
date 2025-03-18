
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '../hooks/use-toast';
import { Button } from './ui/button';
import { Shuffle, SkipForward, Play, Pause, RotateCcw } from 'lucide-react';
import LoteriaDeck from './LoteriaDeck';
import { Card, loteriaCards } from '../data/loteriaCards';
import { shuffleDeck } from '../utils/deckUtils';
import SoundToggle from './SoundToggle';
import TimerControl from './TimerControl';
import CardHistory from './CardHistory';
import soundPlayer from '../utils/soundUtils';

const LoteriaGame = () => {
  const { toast } = useToast();
  const [deck, setDeck] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [timerDelay, setTimerDelay] = useState(3);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const timerRef = useRef<number | null>(null);

  // Initialize the deck on component mount
  useEffect(() => {
    initializeDeck();
    soundPlayer.setEnabled(isSoundEnabled);
  }, []);

  // Update sound player when sound setting changes
  useEffect(() => {
    soundPlayer.setEnabled(isSoundEnabled);
  }, [isSoundEnabled]);

  // Handle auto-play timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setTimeout(() => {
        nextCard();
      }, timerDelay * 1000);
    }
    
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, currentCardIndex, timerDelay]);

  const initializeDeck = useCallback(() => {
    const shuffledDeck = shuffleDeck([...loteriaCards]);
    setDeck(shuffledDeck);
    setCurrentCardIndex(-1);
    setFlippedCards([]);
    setIsPlaying(false);
    soundPlayer.stop();
  }, []);

  const togglePlay = useCallback(() => {
    if (currentCardIndex === -1) {
      nextCard();
    }
    setIsPlaying(prev => !prev);
  }, [currentCardIndex]);

  const nextCard = useCallback(() => {
    if (currentCardIndex >= deck.length - 1) {
      toast({
        title: "End of Deck",
        description: "You've reached the end of the deck.",
      });
      setIsPlaying(false);
      return;
    }

    const nextIndex = currentCardIndex + 1;
    setCurrentCardIndex(nextIndex);
    
    const newCard = deck[nextIndex];
    setFlippedCards(prev => [...prev, newCard]);
    
    // Play sound for the card
    if (newCard) {
      soundPlayer.playCardSound(newCard.id);
    }
  }, [currentCardIndex, deck, toast]);

  const resetGame = useCallback(() => {
    initializeDeck();
    toast({
      title: "Game Reset",
      description: "The deck has been shuffled and the game has been reset.",
    });
  }, [initializeDeck, toast]);

  const shuffleAndReset = useCallback(() => {
    initializeDeck();
    toast({
      title: "Deck Shuffled",
      description: "The deck has been shuffled and the game has been reset.",
    });
  }, [initializeDeck, toast]);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => !prev);
    toast({
      title: isSoundEnabled ? "Sound Off" : "Sound On",
      description: isSoundEnabled ? "Sound has been disabled." : "Sound has been enabled.",
    });
  }, [isSoundEnabled, toast]);

  // Get current card to display
  const currentCard = currentCardIndex >= 0 && currentCardIndex < deck.length
    ? deck[currentCardIndex]
    : null;

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={nextCard}
                disabled={currentCardIndex >= deck.length - 1}
              >
                <SkipForward className="w-4 h-4 mr-1" />
                Next
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetGame}
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={shuffleAndReset}
              >
                <Shuffle className="w-4 h-4 mr-1" />
                Shuffle
              </Button>
            </div>

            <SoundToggle isSoundEnabled={isSoundEnabled} toggleSound={toggleSound} />
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <LoteriaDeck 
              currentCard={currentCard} 
              remainingCards={deck.length - currentCardIndex - 1}
              totalCards={deck.length}
            />
          </div>

          <CardHistory flippedCards={flippedCards} />
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Game Settings</h2>
            <div className="space-y-6">
              <TimerControl 
                timerDelay={timerDelay}
                setTimerDelay={setTimerDelay}
              />
              
              <div className="pt-4 border-t">
                <SoundToggle isSoundEnabled={isSoundEnabled} toggleSound={toggleSound} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Game Stats</h2>
            <div className="space-y-2">
              <p className="text-sm">Cards Seen: {flippedCards.length}</p>
              <p className="text-sm">Remaining: {deck.length - currentCardIndex - 1}</p>
              <p className="text-sm">Total Cards: {deck.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoteriaGame;
