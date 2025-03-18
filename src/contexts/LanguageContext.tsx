
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'es';

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations object
const translations = {
  en: {
    // Header
    'app.title': 'Lotería!',
    'app.subtitle': 'The most traditional game of Mexico',
    
    // Game controls
    'game.play': 'Play',
    'game.pause': 'Pause',
    'game.next': 'Next',
    'game.reset': 'Reset',
    'game.shuffle': 'Shuffle',
    'game.start': 'Start',
    
    // Sound
    'sound.on': 'Sound On',
    'sound.off': 'Sound Off',
    
    // Timer
    'timer.delay': 'Timer Delay: {0}s',
    'timer.fast': 'Fast',
    'timer.medium': 'Medium',
    'timer.slow': 'Slow',
    
    // Card History
    'history.title': 'Card History ({0})',
    'history.empty': 'No cards have been flipped yet.',
    
    // Game Stats
    'stats.title': 'Game Stats',
    'stats.seen': 'Cards Seen: {0}',
    'stats.remaining': 'Remaining: {0}',
    'stats.total': 'Total Cards: {0}',
    
    // Settings
    'settings.title': 'Game Settings',
    
    // Toasts
    'toast.endDeck': 'End of Deck',
    'toast.endDeckDesc': "You've reached the end of the deck.",
    'toast.gameReset': 'Game Reset',
    'toast.gameResetDesc': 'The deck has been shuffled and the game has been reset.',
    'toast.deckShuffled': 'Deck Shuffled',
    'toast.deckShuffledDesc': 'The deck has been shuffled and the game has been reset.',
    'toast.soundOff': 'Sound Off',
    'toast.soundOffDesc': 'Sound has been disabled.',
    'toast.soundOn': 'Sound On',
    'toast.soundOnDesc': 'Sound has been enabled.',
    
    // Language
    'language.title': 'Language',
    'language.en': 'English',
    'language.es': 'Spanish',
  },
  es: {
    // Header
    'app.title': '¡Lotería!',
    'app.subtitle': 'El juego más tradicional de México',
    
    // Game controls
    'game.play': 'Jugar',
    'game.pause': 'Pausar',
    'game.next': 'Siguiente',
    'game.reset': 'Reiniciar',
    'game.shuffle': 'Barajar',
    'game.start': 'Comenzar',
    
    // Sound
    'sound.on': 'Sonido Activado',
    'sound.off': 'Sonido Desactivado',
    
    // Timer
    'timer.delay': 'Tiempo de Retraso: {0}s',
    'timer.fast': 'Rápido',
    'timer.medium': 'Medio',
    'timer.slow': 'Lento',
    
    // Card History
    'history.title': 'Historial de Cartas ({0})',
    'history.empty': 'Aún no se han volteado cartas.',
    
    // Game Stats
    'stats.title': 'Estadísticas del Juego',
    'stats.seen': 'Cartas Vistas: {0}',
    'stats.remaining': 'Restantes: {0}',
    'stats.total': 'Total de Cartas: {0}',
    
    // Settings
    'settings.title': 'Configuración del Juego',
    
    // Toasts
    'toast.endDeck': 'Fin del Mazo',
    'toast.endDeckDesc': 'Has llegado al final del mazo.',
    'toast.gameReset': 'Juego Reiniciado',
    'toast.gameResetDesc': 'El mazo ha sido barajado y el juego se ha reiniciado.',
    'toast.deckShuffled': 'Mazo Barajado',
    'toast.deckShuffledDesc': 'El mazo ha sido barajado y el juego se ha reiniciado.',
    'toast.soundOff': 'Sonido Desactivado',
    'toast.soundOffDesc': 'El sonido ha sido desactivado.',
    'toast.soundOn': 'Sonido Activado',
    'toast.soundOnDesc': 'El sonido ha sido activado.',
    
    // Language
    'language.title': 'Idioma',
    'language.en': 'Inglés',
    'language.es': 'Español',
  }
};

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  // Translation function
  const t = (key: string, ...args: any[]): string => {
    const translation = translations[language][key] || key;
    
    // Replace placeholders with arguments
    if (args.length) {
      return args.reduce((str, arg, index) => {
        return str.replace(`{${index}}`, arg);
      }, translation);
    }
    
    return translation;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
