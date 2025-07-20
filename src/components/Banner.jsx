import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useAnimation, useInView, animate } from "framer-motion";

const Banner = () => {
  // 3D tilt effect for the image
  const imgRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 15 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 15 });
  const controls = useAnimation();
  const inView = useInView(imgRef, { margin: '-20% 0px -20% 0px', once: false });
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 40, damping: 15 });

  // Text animation controls
  const textRef = useRef(null);
  const textInView = useInView(textRef, { margin: '-20% 0px -20% 0px', once: false });
  const textControls = useAnimation();

  useEffect(() => {
    let floatAnim;
    if (inView) {
      controls.start('visible');
      floatAnim = animate(y, [0, -18, 0, 18, 0], {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      });
    } else {
      controls.start('exit');
      y.set(0);
    }
    return () => {
      if (floatAnim) floatAnim.stop();
    };
  }, [inView, controls, y]);

  useEffect(() => {
    if (textInView) {
      textControls.start('visible');
    } else {
      textControls.start('exit');
    }
  }, [textInView, textControls]);

  // Framer Motion variants for staggered text
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.12,
        staggerDirection: -1,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30  },
    visible: { opacity: 1, y: 0 , transition: { duration: 0.7, ease: 'easeOut' } },
    exit: { opacity: 0, y: 30 , transition: { duration: 0.5, ease: 'easeIn' } },
  };

  const handleMouseMove = (e) => {
    const img = imgRef.current;
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const newRotateX = ((yPos - centerY) / centerY) * 12;
    const newRotateY = -((x - centerX) / centerX) * 12;
    rotateX.set(newRotateX);
    rotateY.set(newRotateY);
  };
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="w-full overflow-hidden -translate-y-30  flex flex-col md:flex-row items-center justify-center px-4 gap-8">
      {/* Left: Chocolate image */}
      <div className="flex-1 flex justify-center items-center">
        <motion.img
          ref={imgRef}
          src="./images/c1.png"
          alt="Chocolate Bar"
          className="w-[260px] md:w-[420px] max-w-full rotate-[-22deg] drop-shadow-2xl cursor-grab"
          style={{
            objectFit: "contain",
            perspective: 600,
            rotateX: springRotateX,
            rotateY: springRotateY,
            y: springY,
          }}
          variants={{
            hidden: { opacity: 0, y: 60, scale: 0.8 },
            visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, type: 'spring', bounce: 0.35 } },
            exit: { opacity: 0, y: 60, scale: 0.8, transition: { duration: 0.7, ease: 'easeIn' } },
          }}
          initial="hidden"
          animate={controls}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          draggable={false}
        />
      </div>
      {/* Right: Text and button */}
      <motion.div
        ref={textRef}
        className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-4"
        variants={containerVariants}
        initial="hidden"
        animate={textControls}
        exit="exit"
      >
        <motion.span
          className="text-[#32c0c2] text-lg md:text-2xl text font-cursive italic mb-1 block"
          style={{ fontFamily: "cursive" }}
          variants={itemVariants}
        >
          Crafted from fair-trade Ecuadorian cacao
        </motion.span>
        <motion.h2
          className="text-white text-2xl md:text-5xl font-extrabold tracking-wide leading-tight uppercase"
          variants={itemVariants}
        >
          CHOCOLATE BEYOND
          <br />
          YOUR IMAGINATION
        </motion.h2>
        <motion.button
          className="mt-6 bg-white text-[#4a2323] text-lg font-bold rounded-sm shadow-lg hover:bg-[#32c0c2] hover:text-white hover:scale-105 transition-all duration-200  focus:ring-[#32c0c2] "
          style={{ paddingLeft: "4.5rem", paddingRight: "4.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
          variants={itemVariants}
        >
          LEARN MORE
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Banner;
