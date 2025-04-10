
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Progress } from '../ui/progress';
import { BarChart, Eye, Hash } from 'lucide-react';

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
  const progressPercentage = Math.round((flippedCardsCount / totalCards) * 100);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">{t('stats.title')}</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">
            {progressPercentage}% {t('stats.seen')}
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm">{t('stats.seen')}</span>
            </div>
            <span className="font-medium">{flippedCardsCount}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart className="w-4 h-4 mr-2 text-amber-500" />
              <span className="text-sm">{t('stats.remaining')}</span>
            </div>
            <span className="font-medium">{remainingCards}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Hash className="w-4 h-4 mr-2 text-slate-500" />
              <span className="text-sm">{t('stats.total')}</span>
            </div>
            <span className="font-medium">{totalCards}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
