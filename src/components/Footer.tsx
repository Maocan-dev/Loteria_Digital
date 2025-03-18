
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const Footer: React.FC = () => {
  const { language } = useLanguage();
  
  const footerText = language === 'en' 
    ? "Lotería Digital - A traditional game in digital form"
    : "Lotería Digital - Un juego tradicional de forma digital";
    
  return (
    <footer className="bg-loteria-red text-loteria-beige py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <p className="text-loteria-light-red text-sm">
            © {new Date().getFullYear()} {footerText}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
