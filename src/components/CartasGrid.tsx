
import React, { useState, useEffect } from 'react';
import { Card } from '../data/loteriaCards';
import { useToast } from '../hooks/use-toast';
import { useLanguage } from '../contexts/LanguageContext';
import soundPlayer from '../utils/soundUtils';

interface GridItem {
  card: Card;
  overlay: string | null;
}

interface CartasGridProps {
  cards: Card[];
  isSoundEnabled: boolean;
}

const CartasGrid: React.FC<CartasGridProps> = ({ cards, isSoundEnabled }) => {
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Bean images paths
  const beanImages = [
    '/lovable-uploads/8c907090-e770-4aa4-b357-540d08227670.png',
    '/lovable-uploads/7bb05139-d622-485f-8b79-2c60bcdccd1e.png',
    '/lovable-uploads/852380d2-db03-493e-80e7-cb134d70a314.png',
    '/lovable-uploads/c9ad337b-bce4-4d1c-8c51-95fef4f841fc.png',
    '/lovable-uploads/bbed6df6-ebb8-4658-9d33-21839ed06e53.png', 
    '/lovable-uploads/b3f6d1cf-45d5-4b22-badb-6d5fda328572.png',
    '/lovable-uploads/a2c68d24-2e46-46bd-9e1b-828a513bb59c.png'
  ];

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
    // Select a random bean image
    const randomBeanIndex = Math.floor(Math.random() * beanImages.length);
    const randomBeanImage = beanImages[randomBeanIndex];
    
    // Play sound if enabled
    if (isSoundEnabled) {
      soundPlayer.playCardSound(gridItems[index].card.id);
    }
    
    // Update the grid with the overlay image
    const updatedGrid = [...gridItems];
    updatedGrid[index] = {
      ...updatedGrid[index],
      overlay: randomBeanImage
    };
    
    setGridItems(updatedGrid);
    
    // Show toast with bean notification
    toast({
      title: t('cartas.revealed'),
      description: t('cartas.beanRevealed'),
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
            
            {/* Overlay image (appears when clicked) */}
            {item.overlay && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 animate-fade-in">
                <div className="w-3/4 h-3/4 relative">
                  <img 
                    src={item.overlay}
                    alt="Bean"
                    className="w-full h-full object-contain rounded"
                  />
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
