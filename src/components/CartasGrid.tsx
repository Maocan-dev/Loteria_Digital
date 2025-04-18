
import React, { useState, useEffect } from 'react';
import { Card } from '../data/loteriaCards';
import { useToast } from '../hooks/use-toast';
import { useLanguage } from '../contexts/LanguageContext';
import loteriaCards from '../data/loteriaCards';

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
  const [initialized, setInitialized] = useState(false);

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
    // Only initialize the grid once when the component mounts
    if (!initialized) {
      initializeGrid();
      setInitialized(true);
    }
  }, [initialized]);

  const initializeGrid = () => {
    // Use the original full deck of cards, not the shuffled one from props
    const fixedDeck = [...loteriaCards];
    
    // Shuffle and select 16 unique cards for the grid, but only once
    const shuffledCards = fixedDeck.sort(() => Math.random() - 0.5);
    const gridCards = shuffledCards.slice(0, 16);
    
    // Create grid items with no overlays initially
    const items: GridItem[] = gridCards.map(card => ({
      card,
      overlay: null
    }));
    
    setGridItems(items);
  };

  const handleCardClick = (index: number) => {
    // Toggle bean overlay - if already has overlay, remove it
    const updatedGrid = [...gridItems];
    
    if (updatedGrid[index].overlay) {
      // Remove bean if already present
      updatedGrid[index] = {
        ...updatedGrid[index],
        overlay: null
      };
      
      setGridItems(updatedGrid);
      
      // Show toast for bean removed toast commented
      //toast({
        //title: t('cartas.beanRemoved'),
        //description: t('cartas.beanRemoved'),
        //duration: 2000
      //});
    } else {
      // Add new bean if not present
      const randomBeanIndex = Math.floor(Math.random() * beanImages.length);
      const randomBeanImage = beanImages[randomBeanIndex];
      
      updatedGrid[index] = {
        ...updatedGrid[index],
        overlay: randomBeanImage
      };
      
      setGridItems(updatedGrid);
      
      // Show toast for bean placed toast commented
      //toast({
        //title: t('cartas.beanRevealed'),
        //description: t('cartas.beanRevealed'),
        //duration: 2000
      //});
    }
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
      title: t('cartas.cleaned'),
      description: t('cartas.cleanedDesc'),
      duration: 2000
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2
          //style was added to text to change the background color and padding to match the original design
          style={{
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "5px",
          }}
          className="text-xl font-bold"
        >
          {t("cartas.title")}
        </h2>
        <div className="flex space-x-2">
          <button
            //style was added to the button to make it look like the original design
            style={{
              padding: "5px",
              borderRadius: "5px",
              width: "100%",
            }}
            onClick={cleanGrid}
            className="px-3 py-1 text-sm bg-green-800 text-white rounded-md hover:bg-green-600"
          >
            {t("cartas.cleanButton")}
          </button>
          <button
            //style was added to the button to make it look like the original design
            style={{
              padding: "5px",
              borderRadius: "5px",
              width: "100%",
            }}
            onClick={resetGrid}
            className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90"
          >
            {t("cartas.resetButton")}
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
