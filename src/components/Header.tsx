
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-loteria-dark-blue text-loteria-beige py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">¡Lotería!</h1>
          <p className="text-loteria-light-blue mt-2">El juego mas tradicional de México</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
