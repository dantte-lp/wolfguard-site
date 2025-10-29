import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { QuickStart } from './components/QuickStart';
import { Links } from './components/Links';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <QuickStart />
        <Links />
      </main>
      <Footer />
    </div>
  );
};

export default App;
