// filepath: c:\Users\raj00\OneDrive\Desktop\harmony\src\pages\NewProductDetail.jsx
import React from 'react';
import './NewProductDetail.css'; // Import your CSS file for styling

const NewProductDetail = () => {
  return (
    <div className="product-detail-container">
      <h1 className="product-title">New Product Title</h1>
      <div className="product-image">
        <img src="path/to/your/image.jpg" alt="Product" />
      </div>
      <div className="product-description">
        <p>This is a detailed description of the new product. It includes features, benefits, and other relevant information.</p>
      </div>
      <button className="buy-button">Buy Now</button>
    </div>
  );
};

export default NewProductDetail;