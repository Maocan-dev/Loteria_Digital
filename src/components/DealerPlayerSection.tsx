
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
    <Card className="mb-10 bg-white border-5 shadow-5">
      <CardContent className="p-0">
        <CartasGrid cards={cards} isSoundEnabled={isSoundEnabled} />
      </CardContent>
    </Card>
  );
};

export default DealerPlayerSection;
