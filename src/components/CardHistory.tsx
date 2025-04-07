
import React, { useRef, useEffect, useMemo } from 'react';
import { Card } from '../data/loteriaCards';
import { ScrollArea } from './ui/scroll-area';
import { useLanguage } from '../contexts/LanguageContext';
import { Clock3 } from 'lucide-react';

interface CardHistoryProps {
  flippedCards: Card[];
}

const CardHistory: React.FC<CardHistoryProps> = ({ flippedCards }) => {
  const { t } = useLanguage();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Only update the scroll when flippedCards length changes
  const cardsLength = flippedCards.length;

  useEffect(() => {
    // Scroll to the end when new cards are added
    if (scrollAreaRef.current && cardsLength > 0) {
      setTimeout(() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTo({
            left: scrollAreaRef.current.scrollWidth,
            behavior: 'smooth',
          });
        }
      }, 100); // Small delay to ensure DOM has updated
    }
  }, [cardsLength]);

  // Memoize the empty state
  const emptyState = useMemo(() => (
    <div className="rounded-lg bg-gray-100 p-4 text-center text-gray-500 flex items-center justify-center gap-2">
      <Clock3 className="h-4 w-4" />
      <span>{t('history.empty')}</span>
    </div>
  ), [t]);

  if (cardsLength === 0) {
    return emptyState;
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-gray-900 flex items-center gap-2">
        {t('history.title')}: <span className="text-primary">{cardsLength}</span>
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
                className="h-16 w-16 rounded-md object-cover border border-gray-300 shadow-sm"
                loading="lazy"
              />
              <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white shadow-sm">
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
