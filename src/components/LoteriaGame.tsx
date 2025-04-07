import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '../hooks/use-toast';
import { Button } from './ui/button';
import { Shuffle, SkipForward, Play, Pause, RotateCcw } from 'lucide-react';
import LoteriaDeck from './LoteriaDeck';
import { Card } from '../data/loteriaCards';
import loteriaCards from '../data/loteriaCards';
import { shuffleDeck } from '../utils/deckUtils';
import SoundToggle from './SoundToggle';
import SoundVersionToggle from './SoundVersionToggle';
import TimerControl from './TimerControl';
import CardHistory from './CardHistory';
import soundPlayer from '../utils/soundUtils';
import { useLanguage } from '../contexts/LanguageContext';

const LoteriaGame = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [deck, setDeck] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [soundVersion, setSoundVersion] = useState<'short' | 'extended'>('short');
  const [timerDelay, setTimerDelay] = useState(3);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    initializeDeck();
    soundPlayer.setEnabled(isSoundEnabled);
    soundPlayer.setSoundVersion(soundVersion);
  }, []);

  useEffect(() => {
    soundPlayer.setEnabled(isSoundEnabled);
  }, [isSoundEnabled]);

  useEffect(() => {
    soundPlayer.setSoundVersion(soundVersion);
  }, [soundVersion]);

  useEffect(() => {
    if (isPlaying) {
      const effectiveDelay = soundVersion === 'extended' ? Math.max(timerDelay, 5) : timerDelay;
      
      timerRef.current = window.setTimeout(() => {
        nextCard();
      }, effectiveDelay * 1000);
    }
    
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, currentCardIndex, timerDelay, soundVersion]);

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
        title: t('toast.endDeck'),
        description: t('toast.endDeckDesc'),
      });
      setIsPlaying(false);
      return;
    }

    const nextIndex = currentCardIndex + 1;
    setCurrentCardIndex(nextIndex);
    
    const newCard = deck[nextIndex];
    setFlippedCards(prev => [...prev, newCard]);
    
    if (newCard) {
      soundPlayer.playCardSound(newCard.id);
    }
  }, [currentCardIndex, deck, toast, t]);

  const resetGame = useCallback(() => {
    initializeDeck();
    toast({
      title: t('toast.gameReset'),
      description: t('toast.gameResetDesc'),
    });
  }, [initializeDeck, toast, t]);

  const shuffleAndReset = useCallback(() => {
    initializeDeck();
    toast({
      title: t('toast.deckShuffled'),
      description: t('toast.deckShuffledDesc'),
    });
  }, [initializeDeck, toast, t]);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => !prev);
    toast({
      title: isSoundEnabled ? t('toast.soundOff') : t('toast.soundOn'),
      description: isSoundEnabled ? t('toast.soundOffDesc') : t('toast.soundOnDesc'),
    });
  }, [isSoundEnabled, toast, t]);

  const currentCard = currentCardIndex >= 0 && currentCardIndex < deck.length
    ? deck[currentCardIndex]
    : null;

  const getEffectiveTimerDelay = () => {
    return soundVersion === 'extended' ? Math.max(timerDelay, 5) : timerDelay;
  };

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
                {isPlaying ? t('game.pause') : t('game.play')}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={nextCard}
                disabled={currentCardIndex >= deck.length - 1}
              >
                <SkipForward className="w-4 h-4 mr-1" />
                {t('game.next')}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetGame}
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                {t('game.reset')}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={shuffleAndReset}
              >
                <Shuffle className="w-4 h-4 mr-1" />
                {t('game.shuffle')}
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
            <h2 className="text-lg font-semibold mb-4">{t('settings.title')}</h2>
            <div className="space-y-6">
              <TimerControl 
                timerDelay={timerDelay}
                setTimerDelay={setTimerDelay}
                min={soundVersion === 'extended' ? 5 : 2}
                max={soundVersion === 'extended' ? 8 : 5}
              />                       
              
              <div className="pt-4 border-t">
                <SoundVersionToggle 
                  soundVersion={soundVersion}
                  setSoundVersion={setSoundVersion}
                />
              </div>
              
              <div className="pt-4 border-t">
                <SoundToggle isSoundEnabled={isSoundEnabled} toggleSound={toggleSound} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">{t('stats.title')}</h2>
            <div className="space-y-2">
              <p className="text-sm">{t('stats.seen') + flippedCards.length}</p>
              <p className="text-sm">{t('stats.remaining') + (deck.length - currentCardIndex - 1)}</p>
              <p className="text-sm">{t('stats.total') + deck.length}</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoteriaGame;
