import React, { useState } from "react";
import { LoteriaCard as LoteriaCardType } from "../data/loteriaCards";
import { cn } from "@/lib/utils";
interface LoteriaCardProps {
  card: LoteriaCardType;
  isFlipped: boolean;
  onFlip?: () => void;
  isActive?: boolean;
}
const LoteriaCard: React.FC<LoteriaCardProps> = ({
  card,
  isFlipped,
  onFlip,
  isActive = false
}) => {
  // Using placeholder for card back pattern
  const cardBackUrl = "/placeholder.svg";
  return <div className={cn("loteria-card w-full h-full rounded-md cursor-pointer transition-transform", isActive && "ring-4 ring-loteria-yellow shadow-lg")} onClick={onFlip}>
      <div className={cn("card-inner transition-all duration-800", isFlipped ? "animate-flip" : "animate-flip-back")}>
        {/* Card Front (The actual Lotería card) */}
        <div className="card-front rounded-md overflow-hidden border-2 border-loteria-dark-blue flex flex-col bg-loteria-beige">
          <div className="bg-loteria-red text-loteria-beige p-2 text-center font-bold">
            {card.spanishName}
          </div>
          <div className="flex-1 flex items-center justify-center p-2 py-[3px]">
            <img src={card.imageUrl} alt={card.name} className="h-full w-full object-contain" />
          </div>
          <div className="bg-loteria-blue text-loteria-beige p-1 text-center text-sm">
            {card.id}
          </div>
        </div>
        
        {/* Card Back */}
        <div className="card-back rounded-md overflow-hidden border-2 border-loteria-green bg-loteria-green">
          <div className="h-full w-full flex items-center justify-center bg-opacity-50 bg-repeat p-2">
            <div className="text-loteria-beige font-bold text-xl">
              Lotería
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default LoteriaCard;