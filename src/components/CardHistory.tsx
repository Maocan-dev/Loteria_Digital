
import React, { useRef, useEffect, useState } from 'react';
import { Card } from '../data/loteriaCards';
import { ScrollArea } from './ui/scroll-area';
import { useLanguage } from '../contexts/LanguageContext';
import { Clock } from 'lucide-react';

interface CardHistoryProps {
  flippedCards: Card[];
}

const CardHistory: React.FC<CardHistoryProps> = ({ flippedCards }) => {
  const { t } = useLanguage();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Card[]>([]);
  
  useEffect(() => {
    // Incrementally load cards for better performance
    if (flippedCards.length > 0) {
      const lastCard = flippedCards[flippedCards.length - 1];
      setVisibleCards(prev => [...prev, lastCard]);
    } else {
      setVisibleCards([]);
    }
  }, [flippedCards.length]);
  
  useEffect(() => {
    // Only scroll when new cards are added
    if (scrollAreaRef.current && flippedCards.length > 0) {
      scrollAreaRef.current.scrollTo({
        left: scrollAreaRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [visibleCards.length]);

  if (flippedCards.length === 0) {
    return (
      <div className="rounded-lg bg-gray-100 p-4 text-center text-gray-500">
        <Clock className="w-5 h-5 mx-auto mb-2 opacity-50" />
        {t('history.empty')}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-gray-900 flex items-center">
        <Clock className="w-4 h-4 mr-2 text-primary" />
        {t('history.title')}: {flippedCards.length}
      </h3>
      <ScrollArea 
        className="w-full whitespace-nowrap rounded-md border overflow-hidden" 
        style={{ height: '120px' }}
      >
        <div 
          ref={scrollAreaRef} 
          className="flex p-4 gap-2 overflow-x-auto"
        >
          {flippedCards.map((card, index) => (
            <div 
              key={`${card.id}-${index}`} 
              className="flex-shrink-0 relative transition-transform hover:scale-105"
            >
              <img 
                src={`/images/carta (${card.id}).jpg`} 
                alt={card.name} 
                className="h-16 w-16 rounded-md object-cover border border-gray-300"
                loading="lazy"
              />
              <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white shadow-md">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CardHistory;
