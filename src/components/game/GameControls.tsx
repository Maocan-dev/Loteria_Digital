
import React from 'react';
import { Button } from '../ui/button';
import { Shuffle, SkipForward, Play, Pause, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import SoundToggle from '../SoundToggle';
import { useIsMobile } from '../../hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-2 w-full`}>
        <Button 
          variant="outline" 
          size={isMobile ? "sm" : "default"}
          onClick={togglePlay}
          className="flex items-center justify-center"
        >
          {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
          {isPlaying ? t('game.pause') : t('game.play')}
        </Button>
        
        <Button 
          variant="outline" 
          size={isMobile ? "sm" : "default"}
          onClick={nextCard}
          disabled={isLastCard}
          className="flex items-center justify-center"
        >
          <SkipForward className="w-4 h-4 mr-1" />
          {t('game.next')}
        </Button>
        
        <Button 
          variant="outline" 
          size={isMobile ? "sm" : "default"}
          onClick={resetGame}
          className="flex items-center justify-center"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          {t('game.reset')}
        </Button>
        
        <Button 
          variant="outline" 
          size={isMobile ? "sm" : "default"}
          onClick={shuffleAndReset}
          className="flex items-center justify-center"
        >
          <Shuffle className="w-4 h-4 mr-1" />
          {t('game.shuffle')}
        </Button>
      </div>

      <div className="flex justify-center w-full">
        <SoundToggle isSoundEnabled={isSoundEnabled} toggleSound={toggleSound} />
      </div>
    </div>
  );
};

export default GameControls;
