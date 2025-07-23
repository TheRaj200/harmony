// filepath: c:\Users\raj00\OneDrive\Desktop\harmony\src\pages\ProductDetail.jsx
import React from 'react';
import './ProductDetail.css'; // Assuming you have a CSS file for styles

const ProductDetail = () => {
  const product = {
    name: "Sample Product",
    description: "This is a detailed description of the sample product.",
    price: "$99.99",
    imageUrl: "https://via.placeholder.com/300", // Placeholder image
  };

  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-info">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <span className="product-price">{product.price}</span>
        <button className="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;