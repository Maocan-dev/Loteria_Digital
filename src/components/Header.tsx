
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

const Header: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <header className="bg-loteria-dark-green text-loteria-beige py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">{t('app.title')}</h1>
            <p className="text-loteria-light-green mt-2">{t('app.subtitle')}</p>
          </div>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
