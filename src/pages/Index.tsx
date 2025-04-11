
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoteriaGame from '../components/LoteriaGame';
import { useBackground } from '../contexts/BackgroundContext';
import BackgroundToggleButton from '../components/BackgroundToggleButton';

const Index = () => {
  const { backgroundImage } = useBackground();
  
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="bg-black/30 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto py-8 px-4">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-3xl font-bold text-center mb-4 text-white">Lotería Digital</h1>            
          </div>
          <div className="backdrop-blur-sm bg-white/20 rounded-lg p-4">
            <LoteriaGame />
            <BackgroundToggleButton />
          </div>          
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
