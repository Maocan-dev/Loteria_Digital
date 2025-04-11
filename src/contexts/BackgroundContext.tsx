
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BackgroundContextType {
  backgroundImage: string;
  changeBackground: () => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};

interface BackgroundProviderProps {
  children: ReactNode;
}

export const BackgroundProvider: React.FC<BackgroundProviderProps> = ({ children }) => {
  const [backgroundImages, setBackgroundImages] = useState<string[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  // Load available background images
  useEffect(() => {
    // Start with our known background images
    const initialImages = [
      '/fondo/7545661.jpg',
      '/fondo/7897802.jpg',
      '/fondo/9438729.jpg'
    ];
    
    setBackgroundImages(initialImages);
    
    // Set a random initial background
    const randomIndex = Math.floor(Math.random() * initialImages.length);
    setBackgroundImage(initialImages[randomIndex]);
  }, []);

  const changeBackground = () => {
    // Get a different random background
    const currentIndex = backgroundImages.indexOf(backgroundImage);
    let newIndex;
    
    do {
      newIndex = Math.floor(Math.random() * backgroundImages.length);
    } while (newIndex === currentIndex && backgroundImages.length > 1);
    
    setBackgroundImage(backgroundImages[newIndex]);
  };

  return (
    <BackgroundContext.Provider value={{ backgroundImage, changeBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};
