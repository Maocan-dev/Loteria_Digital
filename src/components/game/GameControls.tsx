
import React from 'react';
import { Button } from '../ui/button';
import { Shuffle, SkipForward, Play, Pause, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import SoundToggle from '../SoundToggle';

interface GameControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  nextCard: () => void;
  resetGame: () => void;
  shuffleAndReset: () => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
  isLastCard: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  isPlaying, 
  togglePlay, 
  nextCard, 
  resetGame, 
  shuffleAndReset, 
  isSoundEnabled, 
  toggleSound,
  isLastCard 
}) => {
  const { t } = useLanguage();
  
  return (
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
          disabled={isLastCard}
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
  );
};

export default GameControls;
