import React, { useState, useEffect } from "react";
import LoteriaCard from "./LoteriaCard";
import { LoteriaCard as LoteriaCardType } from "../data/loteriaCards";
import { Button } from "@/components/ui/button";
import { Shuffle, Play, Pause } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LoteriaDeckProps {
  cards: LoteriaCardType[];
  onShuffle: () => void;
}

const LoteriaDeck: React.FC<LoteriaDeckProps> = ({ cards, onShuffle }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isAutoPlaying) {
      const id = window.setInterval(() => {
        setCurrentCardIndex((prevIndex) => {
          if (prevIndex === null) return 0; // Initialize game
          if (prevIndex < cards.length - 1) return prevIndex + 1; // Next card
          
          // End of deck
          clearInterval(id);
          toast({
            title: "End of Deck",
            description: "Se han terminado las cartas!",
          });
          setIsAutoPlaying(false); // Stop autoplay
          return null;
        });
      }, 3000);

      setIntervalId(id);

      return () => clearInterval(id); // Cleanup interval on unmount or state change
    } else {
      if (intervalId !== null) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  }, [isAutoPlaying]);

  const handleFlipCard = () => {
    if (currentCardIndex === null) {
      setCurrentCardIndex(0); // Start the game
      setIsFlipped(true);
      toast({
        title: "¡Lotería!",
        description: `Primer Carta: ${cards[0].spanishName}`,
      });
    } else {
      setIsFlipped(!isFlipped); // Flip the current card
    }
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => {
      if (prevIndex === null) {
        setIsFlipped(true); // Initialize game
        return 0;
      }

      if (prevIndex < cards.length - 1) {
        toast({
          title: "¡Lotería!",
          description: `Siguiente: ${cards[prevIndex + 1].spanishName}`,
        });
        return prevIndex + 1;
      }

      toast({
        title: "End of Deck",
        description: "Se han terminado las cartas!",
      });
      return null;
    });
  };

  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false); // Stop autoplay
      toast({
        title: "Juego automatico detenido",
        description: "Modo manual activado",
      });
    } else {
      if (currentCardIndex === null) {
        setCurrentCardIndex(0); // Start game if not started
        setIsFlipped(true);
      }
      setIsAutoPlaying(true); // Start autoplay
      toast({
        title: "Juego automatico encendido",
        description: "Las cartas saldrán automáticamente",
      });
    }
  };

  const handleShuffle = () => {
    setCurrentCardIndex(null); // Reset game
    setIsFlipped(false);

    // Stop autoplay if active
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
    }

    onShuffle(); // Shuffle cards
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
          className="bg-loteria-green text-white hover:bg-loteria-dark-green"
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
              <Play className="mr-2 h-4 w-4" /> Automático
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
              Comienza el juego dando click en "Comenzar"
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
            Carta {currentCardIndex + 1} de {cards.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoteriaDeck;
