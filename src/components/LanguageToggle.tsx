import React from 'react';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { useLanguage } from '../contexts/LanguageContext';
const LanguageToggle: React.FC = () => {
  const {
    language,
    setLanguage,
    t
  } = useLanguage();
  return <div className="space-y-2">
      <label className="text-sm font-medium text-white-700">
        {t('language.title')}
      </label>
      <ToggleGroup type="single" value={language} onValueChange={value => {
      if (value) setLanguage(value as 'en' | 'es');
    }} className="border rounded-md">
        <ToggleGroupItem value="en" className="text-xs px-2 py-1">
          {t('language.en')}
        </ToggleGroupItem>
        <ToggleGroupItem value="es" className="text-xs px-2 py-1">
          {t('language.es')}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>;
};
export default LanguageToggle;