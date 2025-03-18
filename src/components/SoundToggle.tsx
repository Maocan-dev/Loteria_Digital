
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Switch } from './ui/switch';
import { useLanguage } from '../contexts/LanguageContext';

interface SoundToggleProps {
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

const SoundToggle: React.FC<SoundToggleProps> = ({ isSoundEnabled, toggleSound }) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center space-x-2">
      <Switch 
        checked={isSoundEnabled}
        onCheckedChange={toggleSound}
        id="sound-toggle"
      />
      <label 
        htmlFor="sound-toggle" 
        className="flex items-center cursor-pointer text-sm text-gray-700"
      >
        {isSoundEnabled ? (
          <>
            <Volume2 className="w-4 h-4 mr-1" />
            <span>{t('sound.on')}</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 mr-1" />
            <span>{t('sound.off')}</span>
          </>
        )}
      </label>
    </div>
  );
};

export default SoundToggle;
