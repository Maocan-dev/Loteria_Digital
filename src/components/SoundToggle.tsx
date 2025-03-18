
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Switch } from './ui/switch';

interface SoundToggleProps {
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

const SoundToggle: React.FC<SoundToggleProps> = ({ isSoundEnabled, toggleSound }) => {
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
            <span>Sound On</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 mr-1" />
            <span>Sound Off</span>
          </>
        )}
      </label>
    </div>
  );
};

export default SoundToggle;
