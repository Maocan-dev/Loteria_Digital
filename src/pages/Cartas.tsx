
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartasGrid from '../components/CartasGrid';
import { Button } from '../components/ui/button';
import SoundToggle from '../components/SoundToggle';
import { Card } from '@/components/ui/card';
import loteriaCards from '../data/loteriaCards';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '../contexts/LanguageContext';

const Cartas = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const { toast } = useToast();
  const { t } = useLanguage();

  const toggleSound = () => {
    setIsSoundEnabled(prev => !prev);
    toast({
      title: isSoundEnabled ? t('toast.soundOff') : t('toast.soundOn'),
      description: isSoundEnabled ? t('toast.soundOffDesc') : t('toast.soundOnDesc'),
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">{t('cartas.pageTitle')}</h1>
        
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 mb-4">
            <div className="text-center mb-4">
              <p className="text-gray-700">{t('Click on any card put your bean!') || 'Click on any card to reveal a special bean pattern!'}</p>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <div className="flex justify-end mb-4">
              <SoundToggle isSoundEnabled={isSoundEnabled} toggleSound={toggleSound} />
            </div>
            <CartasGrid cards={loteriaCards} isSoundEnabled={isSoundEnabled} />
          </Card>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="mt-4"
            >
              {t('navigation.backToMain')}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cartas;
