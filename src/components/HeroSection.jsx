import React, { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, animate, useAnimation, useScroll, useTransform } from 'framer-motion'

const HeroSection = () => {
  const imgRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const y = useMotionValue(0);

  // Scroll tracking
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, [0, 500], [0, 1]);
  const scrollYProgressReverse = useTransform(scrollY, [0, 500], [1, 0]);

  // Smooth spring for 3D effect
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 15 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 15 });
  const springY = useSpring(y, { stiffness: 40, damping: 15 });

  // Animation controls for images
  const c2Controls = useAnimation();
  const c7Controls = useAnimation();
  const c8LeftTopControls = useAnimation();
  const c8LeftCenterControls = useAnimation();
  const c8RightCenterControls = useAnimation();
  const c8RightTopControls = useAnimation();

  useEffect(() => {
    const controlsY = animate(y, [0, -20, 0, 20, 0], {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    });
    return () => {
      controlsY.stop();
    };
  }, [y]);

  // Infinite float for animated c8 after entrance
  const startC8Float = () => {
    c8LeftTopControls.start({
      y: [0, -8, 0, 8, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
    });
  };

  const startC8LeftCenterFloat = () => {
    c8LeftCenterControls.start({
      y: [0, -8, 0, 8, 0],
      transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
    });
  };

  const startC8RightCenterFloat = () => {
    c8RightCenterControls.start({
      y: [0, -8, 0, 8, 0],
      transition: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }
    });
  };

  const startC8RightTopFloat = () => {
    c8RightTopControls.start({
      y: [0, -8, 0, 8, 0],
      transition: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }
    });
  };

  const handleMouseMove = (e) => {
    const img = imgRef.current;
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const newRotateX = ((yPos - centerY) / centerY) * 15;
    const newRotateY = -((x - centerX) / centerX) * 15;
    rotateX.set(newRotateX);
    rotateY.set(newRotateY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  // Animation variants for each word
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
  };

  const words = "Luxury You Can Taste".split(" ");

  // Start c2 animation on mount
  useEffect(() => {
    c2Controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: 'easeOut' }
    });
    // Start c8 entrance animations with staggered delays
    c8LeftTopControls.start({
      x: 0,
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeOut' }
    });
    c8LeftCenterControls.start({
      x: 0,
      opacity: 0.8,
      y: 0,
      transition: { duration: 1, delay: 0.2, ease: 'easeOut' }
    });
    c8RightCenterControls.start({
      x: 0,
      opacity: 0.8,
      y: 0,
      transition: { duration: 1, delay: 0.4, ease: 'easeOut' }
    });
    c8RightTopControls.start({
      x: 0,
      opacity: 0.8,
      y: 0,
      transition: { duration: 1, delay: 0.6, ease: 'easeOut' }
    });
  }, [c2Controls, c8LeftTopControls, c8LeftCenterControls, c8RightCenterControls, c8RightTopControls]);

  // When c2 animation completes, start c7 animation
  const handleC2Complete = () => {
    c7Controls.start({
      scale: 0.22,
      opacity: 0.9,
      transition: { duration: 1, delay:.5,ease: 'easeOut' }
    });
  };

  return (
    <section >
      <motion.h1
        className='translate-y-25  md:translate-y-30 2xl:translate-y-40 text-center text-7xl font-extrabold text-white text-shadow-lg text  flex flex-wrap justify-center gap-x-4 relative z-50'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          y: useTransform(scrollYProgressReverse, [0, 1], [30, 0]),
          opacity: useTransform(scrollYProgressReverse, [0, 0.5], [0, 1]),
          filter: useTransform(scrollYProgressReverse, [0, 0.5], ['blur(8px)', 'blur(0px)'])
        }}
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
      <div className='flex flex-col items-center justify-center h-screen cursor-grab select-none relative' style={{ position: 'relative' }}> 
        {/* Back image (c7.png) */}
        <motion.img
          className='absolute w-350 top-[53%] left-1/2 -translate-y-1/2 -translate-x-1/2 z-0 rotate-90 opacity-90'
          src="./images/c7.png"
          alt=""
          style={{ 
            pointerEvents: 'none',
            scale: useTransform(scrollYProgressReverse, [0, .3], [0, .3]),
            opacity: useTransform(scrollYProgressReverse, [0, 0.9], [0, 0.9])
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={c7Controls}
          draggable={false}
        />
        {/* Left center c8.png (animated) */}
        <motion.img
          className='absolute w-60 top-[70%] left-[10%] -translate-y-1/2 z-0 opacity-100 rotate-210'
          src="./images/c8.png"
          alt=""
          style={{ 
            pointerEvents: 'none',
            x: useTransform(scrollYProgressReverse, [0, 1], [-200, 0]),
            opacity: useTransform(scrollYProgressReverse, [0, 1], [0, 1])
          }}
          initial={{ x: -200, opacity: 0, y: 0 }}
          animate={c8LeftCenterControls}
          onAnimationComplete={startC8LeftCenterFloat}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          draggable={false}
        />
        {/* Top left c8.png (animated) */}
        <motion.img
          className='absolute w-60 top-1/4 left-[10%] -translate-y-1/2 z-50 opacity-100 rotate-10'
          src="./images/c8.png"
          alt=""
          style={{ 
            pointerEvents: 'none',
            x: useTransform(scrollYProgressReverse, [0, 1], [-200, 0]),
            opacity: useTransform(scrollYProgressReverse, [0, 1], [0, 1])
          }}
          initial={{ x: -200, opacity: 0, y: 0 }}
          animate={c8LeftTopControls}
          onAnimationComplete={startC8Float}
          transition={{ duration: 1, ease: 'easeOut' }}
          draggable={false}
        />
        {/* Right center c8.png (animated) */}
        <motion.img
          className='absolute w-60 top-[70%] right-[10%] -translate-y-1/2 z-0 opacity-100 -rotate-210'
          src="./images/c8.png"
          alt=""
          style={{ 
            pointerEvents: 'none',
            x: useTransform(scrollYProgressReverse, [0, 1], [200, 0]),
            opacity: useTransform(scrollYProgressReverse, [0, 1], [0, 1])
          }}
          initial={{ x: 200, opacity: 0, y: 0 }}
          animate={c8RightCenterControls}
          onAnimationComplete={startC8RightCenterFloat}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          draggable={false}
        />
        {/* Top right c8.png (animated) */}
        <motion.img
          className='absolute w-60 top-1/4 right-[10%] -translate-y-1/2 z-0 opacity-100 -rotate-10'
          src="./images/c8.png"
          alt=""
          style={{ 
            pointerEvents: 'none',
            x: useTransform(scrollYProgressReverse, [0, 1], [200, 0]),
            opacity: useTransform(scrollYProgressReverse, [0, 1], [0, 1])
          }}
          initial={{ x: 200, opacity: 0, y: 0 }}
          animate={c8RightTopControls}
          onAnimationComplete={startC8RightTopFloat}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          draggable={false}
        />
        {/* Front image (c2.png) */}
        <motion.img
          ref={imgRef}
          className='h-100 2xl:h-120 rotate-6 absolute z-60'
          src="./images/c2.png"
          alt=""
          style={{
            perspective: 600,
            rotateX: springRotateX,
            rotateY: springRotateY,
            y: useTransform(scrollYProgressReverse, [0, 1], [-2800, springY]),
            opacity: useTransform(scrollYProgressReverse, [0, 0.8], [0, 1])
          }}
          initial={{ opacity: 0, y: -2800 }}
          animate={c2Controls}
          onAnimationComplete={handleC2Complete}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileTap={{ scale: 0.97 }}
          draggable={false}
        />
      </div>
    </section>
  )
}

export default HeroSection