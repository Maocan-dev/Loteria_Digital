
import React from 'react';
import { Button } from './ui/button';
import { useBackground } from '../contexts/BackgroundContext';
import { Image } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BackgroundToggleButton: React.FC = () => {
  const { changeBackground } = useBackground();
  const { language } = useLanguage();
  
  const buttonText = language === 'en' 
    ? "Change Background" 
    : "Cambiar Fondo";
  
  return (
    <Button 
      onClick={changeBackground} 
      variant="outline" 
      className="flex items-center gap-2"
    >
      <Image size={16} />
      {buttonText}
    </Button>
  );
};

export default BackgroundToggleButton;
