
import React from 'react';
import { Headphones } from 'lucide-react';
import { RadioGroup } from './ui/radio-group';
import { useLanguage } from '../contexts/LanguageContext';
import soundPlayer from '../utils/soundUtils';
import RadioOption from './RadioOption';

interface SoundVersionToggleProps {
  soundVersion: 'short' | 'extended';
  setSoundVersion: (version: 'short' | 'extended') => void;
}

const SoundVersionToggle: React.FC<SoundVersionToggleProps> = ({ 
  soundVersion, 
  setSoundVersion 
}) => {
  const { t } = useLanguage();
  
  const handleVersionChange = (version: 'short' | 'extended') => {
    setSoundVersion(version);
    soundPlayer.setSoundVersion(version);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Headphones className="w-4 h-4" />
        <span className="text-sm font-medium">{t('sound.version')}</span>
      </div>
      
      <RadioGroup 
        value={soundVersion} 
        onValueChange={(val: 'short' | 'extended') => handleVersionChange(val)}
        className="flex flex-col space-y-2"
      >
        <RadioOption 
          id="sound-short" 
          value="short" 
          label={t('sound.short')} 
        />
        
        <RadioOption 
          id="sound-extended" 
          value="extended" 
          label={t('sound.extended')} 
        />
      </RadioGroup>

      {soundVersion === 'extended' && (
        <p className="text-sm text-amber-600 mt-2">{t('stats.minDelay')}: 5s</p>
      )}
    </div>
  );
};

export default SoundVersionToggle;
