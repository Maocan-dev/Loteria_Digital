
import { useState, useEffect } from 'react';
import soundPlayer from '../utils/soundUtils';

export const useSound = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [soundVersion, setSoundVersion] = useState<'short' | 'extended'>('short');

  useEffect(() => {
    soundPlayer.setEnabled(isSoundEnabled);
  }, [isSoundEnabled]);

  useEffect(() => {
    soundPlayer.setSoundVersion(soundVersion);
  }, [soundVersion]);

  const playCardSound = (cardId: number) => {
    soundPlayer.playCardSound(cardId);
  };

  const stopSound = () => {
    soundPlayer.stop();
  };

  const toggleSound = () => {
    setIsSoundEnabled(prev => !prev);
  };

  return {
    isSoundEnabled,
    soundVersion,
    setSoundVersion,
    playCardSound,
    stopSound,
    toggleSound
  };
};
