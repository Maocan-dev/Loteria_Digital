
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

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
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">{t('stats.title')}</h2>
      <div className="space-y-2">
        <p className="text-sm">{t('stats.seen') + flippedCardsCount}</p>
        <p className="text-sm">{t('stats.remaining') + remainingCards}</p>
        <p className="text-sm">{t('stats.total') + totalCards}</p>
      </div>
    </div>
  );
};

export default GameStats;
