import React, { useState, useEffect } from "react";
import LoteriaCard from "./LoteriaCard";
import { Card } from "../data/loteriaCards";
import { Button } from "@/components/ui/button";
import { Shuffle, Play, Pause } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LoteriaDeckProps {
  cards: Card[];
  onShuffle: () => void;
}

const LoteriaDeck: React.FC<LoteriaDeckProps> = ({ cards, onShuffle }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handleFlipCard = () => {
    if (currentCardIndex === null) {
      setCurrentCardIndex(0);
      setIsFlipped(true);
      toast({
        title: "¡Lotería!",
        description: `Primer Carta: ${cards[0].spanishName}`,
      });
    } else {
      setIsFlipped(!isFlipped);
    }
  };

  const handleNextCard = () => {
    if (currentCardIndex === null) {
      setCurrentCardIndex(0);
      setIsFlipped(true);
    } else if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(true);
      toast({
        title: "¡Lotería!",
        description: `Siguiente: ${cards[currentCardIndex + 1].spanishName}`,
      });
    } else {
      toast({
        title: "End of Deck",
        description: "Se han terminado las cartas!",
      });
    }
  };

  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      if (intervalId !== null) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      setIsAutoPlaying(false);
      toast({
        title: "Juego automatico detenido",
        description: "Modo manual activado",
      });
    } else {
      const id = window.setInterval(() => {
        handleNextCard();
      }, 3000) as unknown as number;
      
      setIntervalId(id);
      setIsAutoPlaying(true);
      toast({
        title: "Juego automatico encendido",
        description: "Las cartas saldran automaticamente",
      });
    }
  };

  const handleShuffle = () => {
    setCurrentCardIndex(null);
    setIsFlipped(false);
    
    if (isAutoPlaying) {
      if (intervalId !== null) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      setIsAutoPlaying(false);
    }
    
    onShuffle();
    toast({
      title: "Mezclador",
      description: "Las cartas han sido barajeadas",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between mb-6">
        <Button 
          onClick={handleShuffle}
          variant="outline"
          className="bg-loteria-blue text-white hover:bg-loteria-dark-blue"
        >
          <Shuffle className="mr-2 h-4 w-4" /> Barajear
        </Button>
        <Button 
          onClick={toggleAutoPlay}
          variant="outline"
          className={`${isAutoPlaying ? 'bg-loteria-red' : 'bg-loteria-yellow'} text-black hover:bg-loteria-orange`}
        >
          {isAutoPlaying ? (
            <>
              <Pause className="mr-2 h-4 w-4" /> Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" /> Automatico
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-64 h-96 mb-6" onClick={handleFlipCard}>
          {currentCardIndex !== null ? (
            <LoteriaCard 
              card={cards[currentCardIndex]} 
              isFlipped={isFlipped}
              onFlip={handleFlipCard}
              isActive
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md text-gray-400">
              Comienza el juego dando click en  "Comenzar"
            </div>
          )}
        </div>

        <Button 
          onClick={handleNextCard}
          className="bg-loteria-red hover:bg-loteria-red/80 text-white mt-4"
        >
          {currentCardIndex === null ? "Comenzar" : "Siguiente"}
        </Button>

        {currentCardIndex !== null && (
          <div className="mt-4 text-sm text-muted-foreground">
            Card {currentCardIndex + 1} of {cards.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoteriaDeck;
