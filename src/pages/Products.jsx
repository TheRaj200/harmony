import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, useAnimation, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { setProductHover, setSelectedProduct } from '../redux/productSlice';


// Reusable 3D tilt image
const ThreeDImage = ({ src, alt, className, entry, exit, ...rest }) => {
  const imgRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 15 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 15 });
  const controls = useAnimation();
  const inView = useInView(imgRef, { margin: '-20% 0px -20% 0px', once: false });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('exit');
    }
  }, [inView, controls]);

  const handleMouseMove = (e) => {
    const img = imgRef.current;
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const newRotateX = ((y - centerY) / centerY) * 15;
    const newRotateY = -((x - centerX) / centerX) * 15;
    rotateX.set(newRotateX);
    rotateY.set(newRotateY);
  };
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  // Extract initial values
  const hidden = {
    scale: entry?.scale ?? 0.6,
    rotate: entry?.rotate ?? 0,
    opacity: entry?.opacity ?? 0,
    x: entry?.x ?? 0,
    y: entry?.y ?? 0,
    transition: entry?.transition,
  };
  const visible = {
    scale: 1,
    rotate: 0,
    opacity: 1,
    x: 0,
    y: 0,
    transition: entry?.transition,
  };

  return (
    <motion.img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      style={{
        perspective: 600,
        rotateX: springRotateX,
        rotateY: springRotateY,
      }}
      variants={{
        hidden,
        visible,
        exit: { opacity: 0, ...exit },
      }}
      initial="hidden"
      animate={controls}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      draggable={false}
      {...rest}
    />
  );
};





const ProductsPage = () => {

  const { productShowcase, makhanaShowcase, hoverStates } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  

  const handleProductClick = (productId) => {
    dispatch(setSelectedProduct(productId)); 
    navigate(`/products/product/${productId}#`); 
  };
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.5,
      },
    },
  };
  const wordVariants = {
    hidden: { opacity: 0, filter: 'blur(8px)', y: 30 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
    exit: { opacity: 0, filter: 'blur(8px)', y: -30, transition: { duration: 0.7, ease: 'easeIn' } },
  };
  const words = "Single Bars".split(" ");

  const h1Ref = useRef(null);
  const inView = useInView(h1Ref, { margin: '-20% 0px -20% 0px', once: false });
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('exit');
    }
  }, [inView, controls]);

  // Redux 
  const handleMouseEnter = (idx) => {
    dispatch(setProductHover({ index: idx, isHovered: true, type: 'products' }));
  };
  
  const handleMouseLeave = (idx) => {
    dispatch(setProductHover({ index: idx, isHovered: false, type: 'products' }));
  };
 
  const handleMakhanaMouseEnter = (idx) => {
    dispatch(setProductHover({ index: idx, isHovered: true, type: 'makhana' }));
  };
  
  const handleMakhanaMouseLeave = (idx) => {
    dispatch(setProductHover({ index: idx, isHovered: false, type: 'makhana' }));
  };

  return (
    <section>
      <div className='w-full h-full overflow-x-hidden relative min-h-screen 'style={{ background: 'linear-gradient(135deg, #f55d81 0%, #e91e63 25%, #c2185b 50%, #ad1457 75%, #880e4f 100%)' }}>
        {/* Curved text above heading */}
        <motion.h1
          ref={h1Ref}
          className='translate-y-45 md:translate-y-55 xl:translate-y-65 uppercase text 2xl:translate-y-85 text-center text-5xl font-extrabold text-[#32c0c2] text-shadow-sm text flex flex-wrap justify-center gap-x-4 relative z-50 mt-10'
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {words.map((word, i) => (
            <motion.span
              key={word + i}
              className="inline-block "
              variants={wordVariants}
              style={{ marginRight: '0.4em' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <img className='w-full opacity-95' src="/images/svg2.png" alt="" />
        <div className='w-full bg-[#fbf3f6] h-[600px] block '></div>
        <img className='w-full h-180 opacity-95 rotate-180' src="/images/svg2.png" alt="" />

        {/* Swiper slider  */}
        <div className='absolute top-80 md:top-65 xl:top-85 2xl:top-110 w-full flex justify-center gap-8 mt-12'>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="w-full h-full"
          >
            {productShowcase.map((product, idx) => (
              <SwiperSlide key={product.alt}>
                <div className='relative flex h-100 items-center justify-center flex-col'>
                  <img
                    src={product.bg}
                    alt={product.alt + " bg"}
                    className={`absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[180px] md:w-[250px] max-w-[90vw] z-0 ${product.bgClass || ''} pointer-events-none select-none transition-transform duration-500 ${hoverStates.products[idx] ? 'scale-80' : 'scale-0'}`}
                  />
                  <ThreeDImage
                    src={product.main}
                    alt={product.alt}
                    className="h-40 w-40 md:h-56 md:w-56 rounded-2xl object-contain cursor-pointer z-20 relative"
                    entry={product.entry}
                    exit={product.exit}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={() => handleMouseLeave(idx)}
                    onClick={() => handleProductClick(product.id)} 
                  />
                  {/* Product name and price below image */}
                  <div className="mt-40 text-center w-full z-90 ">
                    <div className="text-lg md:text-xl font-semibold text-[#0a2233] mb-1">{product.name}</div>
                    <div className="text-base md:text-lg font-bold text-[#32c0c2]">₹{product.price}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <motion.h1
            className=' absolute top-180 md:top-180 2xl:top-220 text-5xl text md:text-5xl font-extrabold text-[#32c0c2] text-center mb-6 w-full'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            Makhana
          </motion.h1>
         
          <div className='absolute top-190 md:top-200 2xl:top-240 w-full flex justify-center gap-8 mt-12'>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={32}
              slidesPerView={1}
              dir="rtl"
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={true}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              className="w-full h-full"
            >
              {makhanaShowcase.map((product, idx) => (
                <SwiperSlide key={product.alt + idx}>
                  <div className='relative flex h-100 items-center justify-center flex-col'>
                    <img
                      src={product.bg}
                      alt={product.alt + " bg"}
                      className={`absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[180px] md:w-[250px] max-w-[90vw] z-0 ${product.bgClass || ''} pointer-events-none select-none transition-transform duration-500 ${hoverStates.makhana[idx] ? 'scale-80' : 'scale-0'}`}
                    />
                    <ThreeDImage
                      src={product.main}
                      alt={product.alt}
                      className="h-40 w-40 md:h-56 md:w-56 rounded-2xl object-contain cursor-pointer z-20 relative"
                      entry={product.entry}
                      exit={product.exit}
                      onMouseEnter={() => handleMakhanaMouseEnter(idx)}
                      onMouseLeave={() => handleMakhanaMouseLeave(idx)}
                      onClick={() => handleProductClick(product.id)} 
                    />
                    {/* Product name and price  */}
                    <div className="mt-40 text-center w-full z-90 ">
                      <div className="text-lg md:text-xl font-semibold text-[#0a2233] mb-1">{product.name}</div>
                      <div className="text-base md:text-lg font-bold text-[#32c0c2]">₹{product.price}</div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
      </div>
    </section>
  );
};

export default ProductsPage;