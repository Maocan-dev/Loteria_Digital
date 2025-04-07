import React from 'react';
import { Clock } from 'lucide-react';
import { Slider } from './ui/slider';
import { useLanguage } from '../contexts/LanguageContext';

interface TimerControlProps {
  timerDelay: number;
  setTimerDelay: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const TimerControl: React.FC<TimerControlProps> = ({ 
  timerDelay, 
  setTimerDelay, 
  min = 2, 
  max = 8, 
  step = 1 
}) => {
  const { t } = useLanguage();
  
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
    </div>
  );
};

export default TimerControl;
