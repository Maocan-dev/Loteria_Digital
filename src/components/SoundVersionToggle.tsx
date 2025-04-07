
import React from 'react';
import { Headphones } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useLanguage } from '../contexts/LanguageContext';
import soundPlayer from '../utils/soundUtils';

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
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="short" id="sound-short" />
          <Label htmlFor="sound-short">{t('sound.short')}</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="extended" id="sound-extended" />
          <Label htmlFor="sound-extended">{t('sound.extended')}</Label>
        </div>
      </RadioGroup>

      {soundVersion === 'extended' && (
        <p className="text-sm text-amber-600 mt-2">{t('stats.minDelay')}: 5s</p>
      )}
    </div>
  );
};

export default SoundVersionToggle;

