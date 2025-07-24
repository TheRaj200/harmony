import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedProduct, resetSelectedProduct } from "../redux/productSlice";

// स्टैटिक प्रोडक्ट डेटा को हटा दिया गया है, अब हम Redux से डेटा प्राप्त करेंगे

// स्टैटिक accordionData को हटा दिया गया है, अब हम selectedProduct से डेटा प्राप्त करेंगे

const ProductDetail = () => {
  // URL से प्रोडक्ट ID प्राप्त करें
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Redux से सिलेक्टेड प्रोडक्ट प्राप्त करें
  const { selectedProduct, productDetails } = useSelector(state => state.products);
  
  // 3D tilt effect
  const imgRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 15 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 15 });

  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // प्रोडक्ट ID के आधार पर सिलेक्टेड प्रोडक्ट सेट करें
  useEffect(() => {
    if (id) {
      dispatch(setSelectedProduct(parseInt(id)));
    }
    
    // कंपोनेंट अनमाउंट होने पर सिलेक्टेड प्रोडक्ट रीसेट करें
    return () => {
      dispatch(resetSelectedProduct());
    };
  }, [id, dispatch]);
  
  useEffect(() => {
    // Set initial accordion open
    setOpenAccordion(0);
  }, []);
  
  // अगर सिलेक्टेड प्रोडक्ट नहीं है तो लोडिंग दिखाएं
  if (!selectedProduct) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const img = imgRef.current;
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX.set(((y - centerY) / centerY) * 15);
    rotateY.set(-((x - centerX) / centerX) * 15);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#f55d81] via-[#fff] to-[#32c0c2] px-4 py-8 ">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="md:w-[80%]  !mt-25 rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl  overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
          {/* Product Image Section */}
          <div className="relative flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: isImageLoaded ? 1 : 0, 
                scale: isImageLoaded ? 1 : 0.9 
              }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-md mx-auto"
            >
              <div className="relative scale-80 md:scale-90  p-6 rounded-3xl ">
                <motion.img
                  ref={imgRef}
                  src={(productDetails && productDetails.image) || selectedProduct.image || selectedProduct.main}
                  alt={selectedProduct.name}
                  className="w-full h-auto object-contain rounded-2xl "
                  style={{
                    perspective: 800,
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                  }}
                  onLoad={() => setIsImageLoaded(true)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  draggable={false}
                />
                
           
              </div>
            </motion.div>
          </div>

          {/* Product Info Section */}
          <div className="flex  text-center md:text-left flex-col justify-center gap-6 p-4 md:p-6">
            {/* Header */}
            <div className="space-y-3">
              <motion.h1 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#164863] leading-tight font-arvo"
              >
                {selectedProduct.name}
              </motion.h1>
              
              {/* Price & Sale */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex w-full  flex-wrap justify-center md:justify-start  items-center gap-3 h-20 mt-12"
              >
                <span className="text-lg text-center text-[#164863]/60 line-through">
                  Rs. {(productDetails && productDetails.originalPrice) || selectedProduct.originalPrice || Math.round(selectedProduct.price * 1.2)}.00
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#f55d81]">
                  Rs. {selectedProduct.price}.00
                </span>
                <span className="bg-[#f55d81] text-white text-xs font-bold w-16  flex justify-center items-center py-1 rounded-full shadow-md">
                  {Math.round((((productDetails && productDetails.originalPrice) || selectedProduct.originalPrice || Math.round(selectedProduct.price * 1.2)) - selectedProduct.price) / ((productDetails && productDetails.originalPrice) || selectedProduct.originalPrice || Math.round(selectedProduct.price * 1.2)) * 100)}% OFF
                </span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex w-full justify-center items-center md:justify-start flex-wrap gap-3  !mb-4 text-sm text-[#164863]/80"
              >
                <span className="inline-flex items-center gap-1 ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#32c0c2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free shipping
                </span>
                <span className="inline-flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#32c0c2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Inclusive of all taxes
                </span>
              </motion.div>
              
              {/* Quantity Selector */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 100 }}
                className="flex w-full justify-center md:justify-start items-center gap-6 mt-6"
              >
                <span className="text-base text-[#164863] font-semibold tracking-wide relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#32c0c2] after:to-[#f55d81] after:bottom-[-4px] after:left-0 after:rounded-full">Quantity</span>
                
                <div className="flex items-center rounded-xl overflow-hidden bg-gradient-to-r shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#e0e7ff] p-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 flex items-center justify-center text-xl font-bold rounded-lg bg-gradient-to-br from-[#f55d81]/80 to-[#f55d81] text-white shadow-md hover:shadow-lg transition-all duration-300 mr-1"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    –
                  </motion.button>
                  
                  <motion.div 
                    key={quantity} 
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-14 h-12 flex items-center justify-center rounded-lg bg-white border border-[#e0e7ff] shadow-inner"
                  >
                    <span className="text-center font-bold text-lg bg-gradient-to-r from-[#164863] to-[#427D9D] bg-clip-text text-transparent">{quantity}</span>
                  </motion.div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 flex items-center justify-center text-xl font-bold rounded-lg bg-gradient-to-br from-[#32c0c2]/80 to-[#32c0c2] text-white shadow-md hover:shadow-lg transition-all duration-300 ml-1"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 80 }}
              className="flex flex-col md:flex-row h-40 !p-5 !md:w-[85%] !lg:w-[75%] gap-4 pt-6"
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(50, 192, 194, 0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 h-16 bg-gradient-to-r from-[#32c0c2] to-[#32c0c2]/90 text-white font-bold py-4 px-8 rounded-2xl shadow-[0_8px_20px_-6px_rgba(50,192,194,0.5)] backdrop-blur-sm border border-[#32c0c2]/20 transition-all duration-300 text-lg font-arvo flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#32c0c2]/0 via-white/20 to-[#32c0c2]/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="relative z-10">Add to Cart</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(245, 93, 129, 0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 h-16 bg-gradient-to-r from-[#f55d81] to-[#f55d81]/90 text-white font-bold py-4 px-8 rounded-2xl shadow-[0_8px_20px_-6px_rgba(245,93,129,0.5)] backdrop-blur-sm border border-[#f55d81]/20 transition-all duration-300 text-lg font-arvo flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#f55d81]/0 via-white/20 to-[#f55d81]/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="relative z-10">Buy Now</span>
              </motion.button>
            </motion.div>

            {/* Description */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-2  rounded-xl p-4 shadow-sm"
            >
              <h3 className="text-[#164863] text-left !p-5 font-bold text-lg mb-2">{(productDetails && productDetails.desc) || selectedProduct.desc || `Delicious ${selectedProduct.name} - A premium treat for chocolate lovers!`}</h3>
              <ul className="list-disc !ml-5 text-[#164863]/90 text-left !p-5 text-base space-y-2">
                {(productDetails && productDetails.details) ? (
                  productDetails.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))
                ) : selectedProduct.details ? (
                  selectedProduct.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))
                ) : (selectedProduct && selectedProduct.accordionData) ? (
                // प्रोडक्ट के accordionData का उपयोग करें
                selectedProduct.accordionData.map((item, idx) => (
                  <div key={idx} className={`border-b border-[#164863]/20 ${idx === selectedProduct.accordionData.length - 1 ? 'border-b-0' : ''}`}>
                    <button
                      className="w-full h-10 flex items-center justify-between p-4 text-[#164863] font-semibold text-base hover:bg-[#32c0c2]/5 transition"
                      onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[#32c0c2] text-lg">✓</span>
                        {item.title}
                      </span>
                      <span className="text-sm bg-[#32c0c2]/10 w-6 h-6 flex items-center justify-center rounded-full text-[#32c0c2]">
                        {openAccordion === idx ? "−" : "+"}
                      </span>
                    </button>
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: openAccordion === idx ? 'auto' : 0,
                        opacity: openAccordion === idx ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 text-[#164863]/80 text-sm">{item.content}</div>
                    </motion.div>
                  </div>
                ))
              ) : (
                  <>
                    <li>Made with premium ingredients for exceptional taste and quality.</li>
                    <li>Perfect balance of flavors that will delight your taste buds.</li>
                    <li>Carefully crafted to ensure the best experience with every bite.</li>
                  </>
                )}
              </ul>
            </motion.div>

            {/* Accordion Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-2 w-[95%] text-left !p-5 rounded-xl overflow-hidden "
            >
              {(productDetails && productDetails.accordionData) ? (
                // विस्तृत प्रोडक्ट डेटा से accordionData का उपयोग करें
                productDetails.accordionData.map((item, idx) => (
                  <div key={idx} className={`border-b border-[#164863]/20 ${idx === productDetails.accordionData.length - 1 ? 'border-b-0' : ''}`}>
                    <button
                      className="w-full h-10 flex items-center justify-between p-4 text-[#164863] font-semibold text-base hover:bg-[#32c0c2]/5 transition"
                      onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[#32c0c2] text-lg">✓</span>
                        {item.title}
                      </span>
                      <span className="text-sm bg-[#32c0c2]/10 w-6 h-6 flex items-center justify-center rounded-full text-[#32c0c2]">
                        {openAccordion === idx ? "−" : "+"}
                      </span>
                    </button>
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: openAccordion === idx ? 'auto' : 0,
                        opacity: openAccordion === idx ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 text-[#164863]/80 text-sm">{item.content}</div>
                    </motion.div>
                  </div>
                ))
              ) : (
                // फॉलबैक डेटा का उपयोग करें
                [
                  {title: "Product Details", content: "Premium quality product with excellent taste and texture."},
                  {title: "Shipping Information", content: "Free shipping across India. Delivery within 3-5 business days."},
                  {title: "Return Policy", content: "Easy returns within 7 days of delivery if you're not satisfied with the product."}
                ].map((item, idx) => (
                  <div key={idx} className={`border-b border-[#164863]/20 ${idx === 2 ? 'border-b-0' : ''}`}>
                    <button
                      className="w-full h-10 flex items-center justify-between p-4 text-[#164863] font-semibold text-base hover:bg-[#32c0c2]/5 transition"
                      onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[#32c0c2] text-lg">✓</span>
                        {item.title}
                      </span>
                      <span className="text-sm bg-[#32c0c2]/10 w-6 h-6 flex items-center justify-center rounded-full text-[#32c0c2]">
                        {openAccordion === idx ? "−" : "+"}
                      </span>
                    </button>
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: openAccordion === idx ? 'auto' : 0,
                        opacity: openAccordion === idx ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 text-[#164863]/80 text-sm">{item.content}</div>
                    </motion.div>
                  </div>
                ))
              )}
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-2 text-sm text-[#164863]/70 font-arvo -translate-y-5 text-left !px-5"
            >
              <div className="flex items-center gap-2  px-3 py-2 rounded-lg ">
                <span className="text-[#f55d81] text-xl">🛒</span>
                Free Delivery
              </div>
              <div className="flex items-center gap-2  px-3 py-2 rounded-lg ">
                <span className="text-[#32c0c2] text-xl">📦</span>
                Easy Returns
              </div>
              <div className="flex items-center gap-2  px-3 py-2 rounded-lg ">
                <span className="text-[#fbbf24] text-xl">⭐</span>
                Premium Quality
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetail;