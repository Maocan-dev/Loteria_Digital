
import React from 'react';
import { Clock } from 'lucide-react';
import { Slider } from './ui/slider';

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
  min = 1, 
  max = 5, 
  step = 1 
}) => {
  const handleChange = (value: number[]) => {
    setTimerDelay(value[0]);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Clock className="w-4 h-4" />
        <label className="text-sm text-gray-700">Timer Delay: {timerDelay}s</label>
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
        <span>Fast</span>
        <span>Medium</span>
        <span>Slow</span>
      </div>
    </div>
  );
};

export default TimerControl;
