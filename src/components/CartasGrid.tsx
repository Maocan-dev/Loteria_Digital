
import React, { useState, useEffect } from 'react';
import { Card } from '../data/loteriaCards';
import { useToast } from '../hooks/use-toast';
import { useLanguage } from '../contexts/LanguageContext';

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

  // Bean images paths - using correct paths from public/images/frijolitos
  const beanImages = [
    '/images/frijolitos/1.png',
    '/images/frijolitos/2.png',
    '/images/frijolitos/3.png',
    '/images/frijolitos/4.png',
    '/images/frijolitos/5.png',
    '/images/frijolitos/6.png',
    '/images/frijolitos/7.png'
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

  const cleanGrid = () => {
    // Remove all overlays without changing cards
    const cleanedGrid = gridItems.map(item => ({
      ...item,
      overlay: null
    }));
    
    setGridItems(cleanedGrid);
    
    toast({
      title: t('cartas.cleaned') || 'Grid Cleaned',
      description: t('cartas.cleanedDesc') || 'All beans have been removed',
      duration: 2000
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{t('cartas.title')}</h2>
        <div className="flex space-x-2">
          <button 
            onClick={cleanGrid}
            className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            {t('cartas.cleanButton')}
          </button>
          <button 
            onClick={resetGrid}
            className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90"
          >
            {t('cartas.resetButton')}
          </button>
        </div>
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
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 animate-fade-in">
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
