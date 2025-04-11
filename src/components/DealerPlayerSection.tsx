
import React from 'react';
import { Card } from '@/components/ui/card';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CartasGrid from './CartasGrid';
import GameControls from './game/GameControls';
import CardHistory from './CardHistory';
import { Card as LoteriaCard } from '../data/loteriaCards';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useIsMobile } from '../hooks/use-mobile';

interface DealerPlayerSectionProps {
  flippedCards: LoteriaCard[];
  isPlaying: boolean;
  togglePlay: () => void;
  nextCard: () => void;
  shuffleAndReset: () => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
  isLastCard: boolean;
  cards: LoteriaCard[];
}

const DealerPlayerSection: React.FC<DealerPlayerSectionProps> = ({
  flippedCards,
  isPlaying,
  togglePlay,
  nextCard,
  shuffleAndReset,
  isSoundEnabled,
  toggleSound,
  isLastCard,
  cards
}) => {
  const isMobile = useIsMobile();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Dealer/Player</CardTitle>
      </CardHeader>
      <CardContent>
        {isMobile ? (
          <Tabs defaultValue="grid">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="grid" className="flex-1">Tabla</TabsTrigger>
              <TabsTrigger value="controls" className="flex-1">Controles</TabsTrigger>
              <TabsTrigger value="history" className="flex-1">Historial</TabsTrigger>
            </TabsList>
            <TabsContent value="grid">
              <CartasGrid cards={cards} isSoundEnabled={isSoundEnabled} />
            </TabsContent>
            <TabsContent value="controls">
              <GameControls
                isPlaying={isPlaying}
                togglePlay={togglePlay}
                nextCard={nextCard}
                shuffleAndReset={shuffleAndReset}
                isSoundEnabled={isSoundEnabled}
                toggleSound={toggleSound}
                isLastCard={isLastCard}
              />
            </TabsContent>
            <TabsContent value="history">
              <CardHistory flippedCards={flippedCards} />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <CartasGrid cards={cards} isSoundEnabled={isSoundEnabled} />
            </div>
            <div className="space-y-6">
              <GameControls
                isPlaying={isPlaying}
                togglePlay={togglePlay}
                nextCard={nextCard}
                shuffleAndReset={shuffleAndReset}
                isSoundEnabled={isSoundEnabled}
                toggleSound={toggleSound}
                isLastCard={isLastCard}
              />
              <CardHistory flippedCards={flippedCards} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DealerPlayerSection;
