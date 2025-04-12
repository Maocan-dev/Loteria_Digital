
import React, { useState } from 'react';
import { Card } from '../data/loteriaCards';
import { Progress } from './ui/progress';

interface LoteriaDeckProps {
  currentCard: Card | null;
  remainingCards: number;
  totalCards: number;
}

const LoteriaDeck: React.FC<LoteriaDeckProps> = ({ currentCard, remainingCards, totalCards }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const progressPercentage = Math.round(((totalCards - remainingCards) / totalCards) * 100);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  return (
    <div className="p-6 flex flex-col items-center">
      {currentCard ? (
        <div className="w-full max-w-md">
          <div className="aspect-[2/3] relative overflow-hidden rounded-lg shadow-lg border-2 border-gray-200">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-pulse w-12 h-12 rounded-full bg-gray-200"></div>
              </div>
            )}
            <img 
              src={`/images/carta (${currentCard.id}).jpg`} 
              alt={currentCard.name} 
              className={`w-full h-full object-cover ${!imageLoaded ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
              onLoad={handleImageLoad}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
              <h3 className="text-xl font-bold">{currentCard.spanishName}</h3>
              <p className="text-sm opacity-90">{currentCard.name}</p>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-center text-gray-700">
              {totalCards - remainingCards} / {totalCards} ({progressPercentage}%)
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md aspect-[1/3] flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
          <p className="text-gray-500 text-lg font-bold">LOTERIA</p>
        </div>
      )}
    </div>
  );
};

export default LoteriaDeck;
