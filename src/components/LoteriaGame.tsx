
import React, { useState, useEffect } from "react";
import LoteriaDeck from "./LoteriaDeck";
import loteriaCards from "../data/loteriaCards";
import { shuffleDeck } from "../utils/deckUtils";

const LoteriaGame: React.FC = () => {
  const [deck, setDeck] = useState(loteriaCards);
  
  // Shuffle the deck initially
  useEffect(() => {
    handleShuffleDeck();
  }, []);

  const handleShuffleDeck = () => {
    setDeck(shuffleDeck(loteriaCards));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <LoteriaDeck cards={deck} onShuffle={handleShuffleDeck} />
    </div>
  );
};

export default LoteriaGame;
