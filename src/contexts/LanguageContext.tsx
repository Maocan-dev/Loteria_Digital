
import React, { createContext, useContext, useState, ReactNode } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    'game.play': 'Play',
    'game.pause': 'Pause',
    'game.next': 'Next',
    'game.reset': 'Reset',
    'game.shuffle': 'Shuffle',
    'settings.title': 'Settings',
    'stats.title': 'Statistics',
    'stats.seen': 'Cards seen: ',
    'stats.remaining': 'Cards remaining: ',
    'stats.total': 'Total cards: ',
    'timer.delay.2': 'Card delay: 2 seconds',
    'timer.delay.3': 'Card delay: 3 seconds',
    'timer.delay.4': 'Card delay: 4 seconds',
    'timer.delay.5': 'Card delay: 5 seconds',
    'timer.delay.6': 'Card delay: 6 seconds',
    'timer.delay.7': 'Card delay: 7 seconds',
    'timer.delay.8': 'Card delay: 8 seconds',
    'timer.fast': 'Fast',
    'timer.medium': 'Medium',
    'timer.slow': 'Slow',
    'sound.on': 'Sound On',
    'sound.off': 'Sound Off',
    'toast.soundOn': 'Sound On',
    'toast.soundOff': 'Sound Off',
    'toast.soundOnDesc': 'Sound effects have been enabled',
    'toast.soundOffDesc': 'Sound effects have been disabled',
    'toast.endDeck': 'End of Deck',
    'toast.endDeckDesc': 'You have reached the end of the deck',
    'toast.gameReset': 'Game Reset',
    'toast.gameResetDesc': 'The game has been reset',
    'toast.deckShuffled': 'Deck Shuffled',
    'toast.deckShuffledDesc': 'The cards have been shuffled',
    'history.title': 'Card History',
    'history.empty': 'No cards have been drawn yet',
    'language.en': 'English',
    'language.es': 'Spanish',
    'navigation.home': 'Home',
    'navigation.cartas': 'Cards Grid',
    'navigation.backToMain': 'Back to Main Game',
    'cartas.title': 'Lotería Cards Grid',
    'cartas.pageTitle': 'Lotería Cards Grid',
    'cartas.revealed': 'Card Revealed',
    'cartas.reset': 'Grid Reset',
    'cartas.resetDesc': 'The grid has been reset with new cards',
    'cartas.resetButton': 'New Card',
    'cartas.cleanButton' : 'Remove Beans',
    'cartas.cleaned': 'Grid Cleaned',
    'cartas.cleanedDesc': 'All beans have been removed',
    'cartas.beanRevealed': 'Bean Placed',
    'cartas.beanRemoved': 'Bean Removed',
    'cartas.clickInstructions': 'Select the card that came out from the deck, to put the bean on it',
    'language.title' : 'Cambiar Idioma',
    'sound.version' : 'Audio version',
    'sound.extended' : 'Extended',
    'sound.short' : 'Short',
    'stats.minDelay' : 'Minimum delay',
    'footer.copyright': '© 2025 Lotería Flip Fun. All rights reserved.',
  },
  es: {
    'game.play': 'Jugar',
    'game.pause': 'Pausar',
    'game.next': 'Proxima',
    'game.reset': 'Reanudar',
    'game.shuffle': 'Mezclar',
    'settings.title': 'Ajustes',
    'stats.title': 'Estadísticas',
    'stats.seen': 'Cartas vistas: ',
    'stats.remaining': 'Cartas restantes: ',
    'stats.total': 'Total de cartas: ',
    'timer.delay.2': 'Retraso: 2 segundos',
    'timer.delay.3': 'Retraso: 3 segundos',
    'timer.delay.4': 'Retraso: 4 segundos',
    'timer.delay.5': 'Retraso: 5 segundos',
    'timer.delay.6': 'Retraso: 6 segundos',
    'timer.delay.7': 'Retraso: 7 segundos',
    'timer.delay.8': 'Retraso: 8 segundos',
    'timer.fast': 'Rápido',
    'timer.medium': 'Medio',
    'timer.slow': 'Lento',
    'sound.on': 'Con Sonido',
    'sound.off': 'Sin Sonido',
    'toast.soundOn': 'Sonido Activado',
    'toast.soundOff': 'Sonido Desactivado',
    'toast.soundOnDesc': 'Los efectos de sonido han sido activados',
    'toast.soundOffDesc': 'Los efectos de sonido han sido desactivados',
    'toast.endDeck': 'Fin del Mazo',
    'toast.endDeckDesc': 'Has llegado al final del mazo',
    'toast.gameReset': 'Juego Reiniciado',
    'toast.gameResetDesc': 'El juego ha sido reiniciado',
    'toast.deckShuffled': 'Mazo Barajado',
    'toast.deckShuffledDesc': 'Las cartas han sido barajadas',
    'history.title': 'Historial de Cartas',
    'history.empty': 'Aún no se han sacado cartas',
    'language.en': 'Inglés',
    'language.es': 'Español',
    'navigation.home': 'Inicio',
    'navigation.cartas': 'Tabla de Cartas',
    'navigation.backToMain': 'Volver al Juego Principal',
    'cartas.title': 'Tabla de Cartas de Lotería',
    'cartas.pageTitle': 'Tabla de Cartas de Lotería',
    'cartas.revealed': 'Carta Revelada',
    'cartas.reset': 'Tabla Reiniciada',
    'cartas.resetDesc': 'La tabla ha sido reiniciada con nuevas cartas',
    'cartas.resetButton': 'Nueva Carta',
    'cartas.cleanButton' : 'Quitar frijolitos',
    'cartas.cleaned': 'Tabla Limpiada',
    'cartas.cleanedDesc': 'Todos los frijolitos han sido quitados',
    'cartas.beanRevealed': 'Frijolito Colocado',
    'cartas.beanRemoved': 'Frijolito Quitado',
    'cartas.clickInstructions': 'Selecciona la carta que salio del mazo, para colocar el frijolito encima',
    'language.title' : 'Change Language',
    'sound.version' : 'Versión del Audio',
    'sound.extended' : 'Larga',
    'sound.short' : 'Corta',
    'stats.minDelay' : 'Retraso minimo',
    'footer.copyright': '© 2025 Lotería Flip Fun. Todos los derechos reservados.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('es'); // Changed default to Spanish

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
