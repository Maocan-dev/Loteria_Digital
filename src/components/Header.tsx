
import React from 'react';
import { Link } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const { t } = useLanguage();
  
  return (
    <header className="bg-green shadow-sm p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-xl font-bold text-primary">Lotería</Link>
        </div>
        
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {t('navigation.home')}
              </Link>
            </li>
            <li>
              <Link 
                to="/cartas" 
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {t('navigation.cartas')}
              </Link>
            </li>
            <li>
              <LanguageToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
