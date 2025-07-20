import React from 'react';
import HeroSection from '../components/HeroSection';
import Product from '../components/products';
import Banner from '../components/Banner';
import VideoSection from '../components/VideoSection';


const Home = () => {
  return (
    <div className="w-full overflow-x-hidden" style={{ background: 'linear-gradient(135deg, #f55d81 0%, #e91e63 25%, #c2185b 50%, #ad1457 75%, #880e4f 100%)' }}>
     <HeroSection/>
     <Product/>
     <Banner/>
     <VideoSection/>
    </div>
  );
};

export default Home; 