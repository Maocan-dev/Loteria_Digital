
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
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-loteria-light-red text-sm">
            © {new Date().getFullYear()} {footerText}
          </p>
          <p className="text-loteria-light-red text-xs opacity-80">
            Basado en el diseño original de Clemente Jackes en 1887
          </p>
          <p className="text-loteria-light-red text-xs opacity-80">
            Imagenes de fondo: Diseñado por Freepik
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
