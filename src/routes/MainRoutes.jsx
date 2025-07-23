import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from '../pages/About';
import ProductsPage from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Login from '../pages/Login';
import SignIn from '../pages/SignIn';
import HomePage from '../pages/Home';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const MainRoutes = () => (
 <div className='relative '>
    <Nav/>
     <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<About />} />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signin" element={<SignIn />} />
  </Routes>
  <Footer/>
 </div>
);

export default MainRoutes;
