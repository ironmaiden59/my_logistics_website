import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowitWorks';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile';
import EditProduct from './components/EditProduct';
import BuyItem from './components/BuyItem';
import SellerDashboard from './components/SellerDashboard';
import ProductManagement from './components/ProductManagement';
import './styles/styles.css'; 

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <HowItWorks />
              <Contact />
            </>
          } />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<SellerDashboard />} />
          <Route path="/buy-item" element={<BuyItem />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
        </Routes>
        {/* <Footer /> */} 
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
