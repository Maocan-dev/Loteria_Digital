
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Progress } from '../ui/progress';
import { Card, CheckCircle2, Clock } from 'lucide-react';

interface GameStatsProps {
  flippedCardsCount: number;
  remainingCards: number;
  totalCards: number;
}

const GameStats: React.FC<GameStatsProps> = ({
  flippedCardsCount,
  remainingCards,
  totalCards
}) => {
  const { t } = useLanguage();
  
  // Calculate progress percentage
  const progressPercentage = (flippedCardsCount / totalCards) * 100;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">{t('stats.title')}</h2>
      
      {/* Progress bar */}
      <div className="mb-4">
        <Progress value={progressPercentage} className="h-2" />
        <p className="text-xs text-gray-500 mt-1">
          {Math.round(progressPercentage)}% {t('stats.seen').split(':')[0]}
        </p>
      </div>
      
      <div className="space-y-3">
        {/* Cards seen */}
        <div className="flex items-center">
          <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
          <p className="text-sm">{t('stats.seen')} <span className="font-medium">{flippedCardsCount}</span></p>
        </div>
        
        {/* Cards remaining */}
        <div className="flex items-center">
          <Clock className="w-5 h-5 text-amber-500 mr-2" />
          <p className="text-sm">{t('stats.remaining')} <span className="font-medium">{remainingCards}</span></p>
        </div>
        
        {/* Total cards */}
        <div className="flex items-center">
          <Card className="w-5 h-5 text-blue-500 mr-2" />
          <p className="text-sm">{t('stats.total')} <span className="font-medium">{totalCards}</span></p>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
