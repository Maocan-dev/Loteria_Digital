import { useState, useRef, useCallback, useEffect } from 'react';
import { Card } from '../data/loteriaCards';
import loteriaCards from '../data/loteriaCards';
import { shuffleDeck } from '../utils/deckUtils';
import soundPlayer from '../utils/soundUtils';
import { useToast } from './use-toast';
import { useLanguage } from '../contexts/LanguageContext';

export const useLoteriaGame = () => {
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

  const isLastCard = currentCardIndex >= deck.length - 1;
  const remainingCards = deck.length - currentCardIndex - 1;

  return {
    currentCard,
    flippedCards,
    deck,
    isPlaying,
    isSoundEnabled,
    soundVersion,
    timerDelay,
    currentCardIndex,
    remainingCards,
    isLastCard,
    togglePlay,
    nextCard,
    shuffleAndReset,
    toggleSound,
    setTimerDelay,
    setSoundVersion
  };
};
