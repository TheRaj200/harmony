// filepath: c:\Users\raj00\OneDrive\Desktop\harmony\src\pages\ProductDetail.jsx
import React from 'react';
import './ProductDetail.css'; // Assuming you have a CSS file for styles
import { useParams } from 'react-router-dom'; // For dynamic routing
import { motion } from 'framer-motion'; // For animations

const ProductDetail = () => {
  const { productId } = useParams(); // Get product ID from URL
  const product = getProductById(productId); // Function to fetch product details

  return (
    <motion.div 
      className="product-detail" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <h1 className="product-title">{product.name}</h1>
      <img src={product.image} alt={product.name} className="product-image" />
      <p className="product-description">{product.description}</p>
      <span className="product-price">${product.price}</span>
      <button className="add-to-cart">Add to Cart</button>
    </motion.div>
  );
};

// Mock function to simulate fetching product details
const getProductById = (id) => {
  // Replace this with actual data fetching logic
  return {
    id,
    name: "Sample Product",
    image: "path/to/image.jpg",
    description: "This is a sample product description.",
    price: "29.99"
  };
};

export default ProductDetail;