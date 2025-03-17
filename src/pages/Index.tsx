
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoteriaGame from "@/components/LoteriaGame";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-loteria-beige">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-loteria-dark-blue mb-4">Draw Your Cards!</h2>
            <p className="text-loteria-dark-blue mb-6 max-w-2xl mx-auto">
              Experimenta el juego de la loteria de manera digital.  
              Utiliza "Next Card" para cambiar entre cartas, o prueba el "Auto-Play" para una experiencia manos libres!
            </p>
          </div>
          <LoteriaGame />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
