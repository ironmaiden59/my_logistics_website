import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowitWorks';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/styles.css'; 

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
