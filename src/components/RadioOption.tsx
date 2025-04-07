
import React from 'react';
import { RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

interface RadioOptionProps {
  id: string;
  value: string;
  label: string;
}

const RadioOption: React.FC<RadioOptionProps> = ({ id, value, label }) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={id} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
};

export default RadioOption;
