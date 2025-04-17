
import React from 'react';
import { Card } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import CartasGrid from './CartasGrid';
import { Card as LoteriaCard } from '../data/loteriaCards';
import { useIsMobile } from '../hooks/use-mobile';

interface DealerPlayerSectionProps {
  cards: LoteriaCard[];
  isSoundEnabled: boolean;
}

const DealerPlayerSection: React.FC<DealerPlayerSectionProps> = ({
  cards,
  isSoundEnabled
}) => {
  return (
    <Card
      //style={{ width: "120%", height: "120%", padding: "20px"}}
      style={{ padding: "10px" }}
      // Fondo de tabla de cartas
      className="mb-6 bg-white/20 border-2 shadow-none"
    >
      <CardContent className="p-0">
        <CartasGrid cards={cards} isSoundEnabled={isSoundEnabled} />
      </CardContent>
    </Card>
  );
};

export default DealerPlayerSection;
