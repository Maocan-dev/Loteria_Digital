
import React, { useRef, useEffect } from 'react';
import { Card } from '../data/loteriaCards';
import { ScrollArea } from './ui/scroll-area';
import { useLanguage } from '../contexts/LanguageContext';

interface CardHistoryProps {
  flippedCards: Card[];
}

const CardHistory: React.FC<CardHistoryProps> = ({ flippedCards }) => {
  const { t } = useLanguage();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        left: scrollAreaRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [flippedCards]);

  if (flippedCards.length === 0) {
    return (
      <div className="rounded-lg bg-gray-100 p-4 text-center text-gray-500">
        {t('history.empty')}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-gray-900">{t('history.title')}: {flippedCards.length}</h3>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border" style={{ height: '120px' }}>
        <div 
          ref={scrollAreaRef} 
          className="flex p-4 gap-2 overflow-x-auto"
        >
          {flippedCards.map((card, index) => (
            <div key={`${card.id}-${index}`} className="flex-shrink-0 relative">
              <img 
                src={`/images/carta (${card.id}).jpg`} 
                alt={card.name} 
                className="h-16 w-16 rounded-md object-cover border border-gray-300"
              />
              <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
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
