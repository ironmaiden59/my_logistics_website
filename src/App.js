import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowitWorks';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import './styles/styles.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Hero />
        <Features />
        <HowItWorks />
        <Contact />
        <Routes>
          <Route path="/" exact>
              
          </Route>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
