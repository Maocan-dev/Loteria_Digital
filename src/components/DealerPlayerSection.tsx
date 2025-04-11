
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
    <Card className="mb-6 bg-white border-2 shadow-none">
      <CardContent className="p-0">
        <CartasGrid cards={cards} isSoundEnabled={isSoundEnabled} />
      </CardContent>
    </Card>
  );
};

export default DealerPlayerSection;
