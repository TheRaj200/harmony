import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import About from '../pages/About';
import ProductsPage from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Login from '../pages/Login';
import HomePage from '../pages/Home';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import RegisterPage from '../pages/Register';

const MainRoutes = () => {
  // Use useLocation hook to get current path
  const location = useLocation();
  // Check if current path is about page
  const isAboutPage = location.pathname === '/about';
  
  return (
    <div className='relative '>
      <Nav/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      {!isAboutPage && <Footer/>}
    </div>
  );
};

export default MainRoutes;
