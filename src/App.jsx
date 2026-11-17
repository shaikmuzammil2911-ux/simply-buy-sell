import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import Modals from './components/Modals';

// Pages
import Home from './pages/Home';
import Motto from './pages/Motto';
import BuyProperty from './pages/BuyProperty';
import SellProperty from './pages/SellProperty';
import OpenProperties from './pages/OpenProperties';
import BuyersChoice from './pages/BuyersChoice';
import PropertyDetail from './pages/PropertyDetail';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import AdminDashboard from './pages/Admin/AdminDashboard';
import NotFound from './pages/NotFound';

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <ScrollToTop />
      <Header />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/motto" element={<Motto />} />
          <Route path="/buy" element={<BuyProperty />} />
          <Route path="/sell" element={<SellProperty />} />
          <Route path="/open-properties" element={<OpenProperties />} />
          <Route path="/buyers-choice" element={<BuyersChoice />} />
          <Route path="/properties" element={<BuyProperty />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <FloatingActions />
      <Modals />
    </div>
  );
}
