// filepath: c:\Users\raj00\OneDrive\Desktop\harmony\src\pages\ProductDetail.jsx
import React from 'react';
import './ProductDetail.css'; // Import your CSS file for styles

const ProductDetail = () => {
  return (
    <div className="product-detail-container">
      <h1 className="product-title">Product Detail Page</h1>
      <div className="product-image">
        <img src="path_to_your_image.jpg" alt="Product" />
      </div>
      <div className="product-description">
        <p>This is a detailed description of the product. It includes features, specifications, and other relevant information.</p>
      </div>
      <button className="buy-button">Buy Now</button>
    </div>
  );
};

export default ProductDetail;