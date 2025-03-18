
import React from 'react';
import { Card } from '../data/loteriaCards';

interface LoteriaDeckProps {
  currentCard: Card | null;
  remainingCards: number;
  totalCards: number;
}

const LoteriaDeck: React.FC<LoteriaDeckProps> = ({ currentCard, remainingCards, totalCards }) => {
  return (
    <div className="p-6 flex flex-col items-center">
      {currentCard ? (
        <div className="w-full max-w-md">
          <div className="aspect-[2/3] relative overflow-hidden rounded-lg shadow-lg border-2 border-gray-200">
            <img 
              src={`/images/carta (${currentCard.id}).jpg`} 
              alt={currentCard.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
              <h3 className="text-xl font-bold">{currentCard.spanishName}</h3>
              <p className="text-sm opacity-90">{currentCard.name}</p>
            </div>
          </div>
          
          <div className="mt-4 text-center text-gray-700">
            <p>Remaining: {remainingCards} of {totalCards}</p>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md aspect-[2/3] flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
          <p className="text-gray-500">LOTERIA</p>
        </div>
      )}
    </div>
  );
};

export default LoteriaDeck;
