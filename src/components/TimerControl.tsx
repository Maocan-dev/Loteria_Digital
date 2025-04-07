
import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Slider } from './ui/slider';
import { useLanguage } from '../contexts/LanguageContext';

interface TimerControlProps {
  timerDelay: number;
  setTimerDelay: (value: number) => void;
  soundVersion: 'short' | 'extended';
  min?: number;
  max?: number;
  step?: number;
}

const TimerControl: React.FC<TimerControlProps> = ({ 
  timerDelay, 
  setTimerDelay,
  soundVersion,
  min: propMin = 2, 
  max: propMax = 8, 
  step = 1 
}) => {
  const { t } = useLanguage();
  
  // Calculate effective min/max based on soundVersion
  const min = soundVersion === 'extended' ? 5 : propMin;
  const max = soundVersion === 'extended' ? 8 : propMax;  
  
  // Adjust the timer delay when soundVersion changes
  useEffect(() => {
    if (soundVersion === 'extended' && timerDelay < 5) {
      setTimerDelay(5);
    }
  }, [soundVersion, timerDelay, setTimerDelay]);

  // cuando la version es corta y el timer es mayor que 5, timer baja a 3
  useEffect(() => {
    if (soundVersion === 'short' && timerDelay > 3) {
      setTimerDelay(3);
    }
  }, [soundVersion, timerDelay, setTimerDelay]);

  const handleChange = (value: number[]) => {
    setTimerDelay(value[0]);
  }; 

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Clock className="w-4 h-4" />
        <label className="text-sm text-gray-700">{t(`timer.delay.${timerDelay}`)}</label>
      </div>
      <Slider
        value={[timerDelay]}
        min={min}
        max={max}
        step={step}
        onValueChange={handleChange}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-600">
        <span>{t('timer.fast')}</span>
        <span>{t('timer.medium')}</span>
        <span>{t('timer.slow')}</span>
      </div>
      
      {soundVersion === 'extended' && (
        <p className="text-sm text-amber-600 mt-2">{t('stats.minDelay')}: 5s</p>
      )}
    </div>
  );
};

export default TimerControl;
