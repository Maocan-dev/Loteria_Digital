
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoteriaGame from '../components/LoteriaGame';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Lotería Flip Fun</h1>
        <LoteriaGame />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
