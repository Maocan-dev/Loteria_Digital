
import React from 'react';
import TimerControl from '../TimerControl';
import SoundVersionToggle from '../SoundVersionToggle';
import SoundToggle from '../SoundToggle';
import { useLanguage } from '../../contexts/LanguageContext';

interface GameSettingsProps {
  timerDelay: number;
  setTimerDelay: (value: number) => void;
  soundVersion: 'short' | 'extended';
  setSoundVersion: (version: 'short' | 'extended') => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({
  timerDelay,
  setTimerDelay,
  soundVersion,
  setSoundVersion,
  isSoundEnabled,
  toggleSound
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">{t('settings.title')}</h2>
      <div className="space-y-6">
        <TimerControl 
          timerDelay={timerDelay}
          setTimerDelay={setTimerDelay}
          soundVersion={soundVersion}
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
  );
};

export default GameSettings;
