
import React, { useState, useEffect } from 'react';
import { Card } from '../data/loteriaCards';
import { useToast } from '../hooks/use-toast';
import { useLanguage } from '../contexts/LanguageContext';
import soundPlayer from '../utils/soundUtils';

interface GridItem {
  card: Card;
  overlay: Card | null;
}

interface CartasGridProps {
  cards: Card[];
  isSoundEnabled: boolean;
}

const CartasGrid: React.FC<CartasGridProps> = ({ cards, isSoundEnabled }) => {
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    initializeGrid();
  }, [cards]);

  const initializeGrid = () => {
    // Shuffle and select 16 unique cards for the grid
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    const gridCards = shuffledCards.slice(0, 16);
    
    // Create grid items with no overlays initially
    const items: GridItem[] = gridCards.map(card => ({
      card,
      overlay: null
    }));
    
    setGridItems(items);
  };

  const handleCardClick = (index: number) => {
    // Select a random card as overlay
    const randomCardIndex = Math.floor(Math.random() * cards.length);
    const randomCard = cards[randomCardIndex];
    
    // Play the sound of the revealed card if sound is enabled
    if (isSoundEnabled) {
      soundPlayer.playCardSound(randomCard.id);
    }
    
    // Update the grid with the overlay card
    const updatedGrid = [...gridItems];
    updatedGrid[index] = {
      ...updatedGrid[index],
      overlay: randomCard
    };
    
    setGridItems(updatedGrid);
    
    // Show toast with the card info
    toast({
      title: t('cartas.revealed'),
      description: `${randomCard.spanishName} (${randomCard.name})`,
      duration: 2000
    });
  };

  const resetGrid = () => {
    initializeGrid();
    toast({
      title: t('cartas.reset'),
      description: t('cartas.resetDesc')
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{t('cartas.title')}</h2>
        <button 
          onClick={resetGrid}
          className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90"
        >
          {t('cartas.resetButton')}
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {gridItems.map((item, index) => (
          <div 
            key={`${item.card.id}-${index}`}
            className="relative aspect-[2/3] cursor-pointer overflow-hidden rounded-md border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            onClick={() => handleCardClick(index)}
          >
            {/* Base card */}
            <img 
              src={`/images/carta (${item.card.id}).jpg`}
              alt={item.card.name}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay card (appears when clicked) */}
            {item.overlay && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 animate-fade-in">
                <div className="w-3/4 h-3/4 relative">
                  <img 
                    src={`/images/carta (${item.overlay.id}).jpg`}
                    alt={item.overlay.name}
                    className="w-full h-full object-contain rounded"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center text-xs p-1">
                    {item.overlay.spanishName}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartasGrid;
