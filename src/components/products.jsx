import React, { useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";

//  3D image
const ThreeDImage = ({ src, alt, className, entry, exit, ...rest }) => {
  const imgRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 15 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 15 });
  const controls = useAnimation();
  const inView = useInView(imgRef, {
    margin: "-20% 0px -20% 0px",
    once: false,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("exit");
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

const products = () => {
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
    hidden: { opacity: 0, filter: "blur(8px)", y: 30 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      filter: "blur(8px)",
      y: -30,
      transition: { duration: 0.7, ease: "easeIn" },
    },
  };
  const words = "Our Products".split(" ");
  const curveWords = "one of a kind".split(" ");

  const h1Ref = useRef(null);
  const inView = useInView(h1Ref, { margin: "-20% 0px -20% 0px", once: false });
  const controls = useAnimation();
  const curveControls = useAnimation();
  const [bgScale, setBgScale] = useState(false);

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
      curveControls.start("visible");
    } else {
      controls.start("exit");
      curveControls.start("exit");
    }
  }, [inView, controls, curveControls]);

  const [hoverNut, setHoverNut] = useState(false);
  const [hoverBerry, setHoverBerry] = useState(false);
  const [hoverBar, setHoverBar] = useState(false);

  return (
    <div className="w-full h-full overflow-x-hidden relative ">
      <motion.h1
        ref={h1Ref}
        className="translate-y-45 md:translate-y-55  xl:translate-y-65 uppercase text 2xl:translate-y-85 text-center text-5xl font-extrabold text-[#32c0c2] text-shadow-sm text flex flex-wrap justify-center gap-x-4 relative z-50"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {words.map((word, i) => (
          <motion.span
            key={word + i}
            className="inline-block "
            variants={wordVariants}
            style={{ marginRight: "0.4em" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>
      <img className="w-full opacity-95" src="./images/svg2.png" alt="" />
      <div className="w-full bg-[#fcf3f6] h-[1500px]  block md:hidden  "></div>
      <img
        className="w-full h-180 opacity-95 rotate-180 "
        src="./images/svg2.png"
        alt=""
      />

      <div className="absolute top-100 md:top-65 xl:top-85 2xl:top-110 flex md:flex-row flex-col justify-center w-full gap-8 mt-12">
        {/* Chocolate bar images with background */}
        <div className="relative flex  items-center justify-center">
          <img
            src="./images/c6.png"
            alt="Decorative Background"
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] max-w-[90vw] z-0 rotate-12 pointer-events-none select-none transition-transform duration-500 ${
              bgScale ? "scale-100" : "scale-0"
            }`}
          />
          <ThreeDImage
            src="./images/c2.png"
            alt="Chocolate Bar 1"
            className="h-90 w-90 rounded-2xl object-contain cursor-pointer z-20 relative"
            entry={{
              scale: 0.6,
              rotate: -15,
              opacity: 0,
              transition: { duration: 2, type: "spring", bounce: 0.45 },
            }}
            exit={{
              scale: 0.6,
              rotate: -15,
              opacity: 0,
              transition: { duration: 0.7, ease: "easeIn" },
            }}
            onMouseEnter={() => setBgScale(true)}
            onMouseLeave={() => setBgScale(false)}
          />
        </div>

        <div className="relative flex items-center justify-center">
          <motion.img
            src="./images/nut2.png"
            alt="Nut Background"
            style={{ filter: "blur(0.3px)" }}
            className="absolute left-1/2 rotate-180 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110px] h-[110px] z-0 pointer-events-none select-none"
            animate={{ scale: hoverNut ? 3.5 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          />
          <ThreeDImage
            src="./images/nut1.png"
            alt="Chocolate Bar 2"
            className="h-90 w-90 rounded-2xl object-contain cursor-pointer z-10"
            entry={{
              scale: 0.6,
              rotate: 10,
              opacity: 0,
              transition: { duration: 1, type: "spring", bounce: 0.45 },
            }}
            exit={{
              scale: 0.6,
              rotate: 10,
              opacity: 0,
              transition: { duration: 0.7, ease: "easeIn" },
            }}
            onMouseEnter={() => setHoverNut(true)}
            onMouseLeave={() => setHoverNut(false)}
          />
        </div>

        <div className="relative flex items-center justify-center">
          <motion.img
            src="./images/berry2.png"
            alt="Berry Background"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110px] h-[110px] z-0 pointer-events-none select-none"
            style={{ filter: "blur(0.3px)" }}
            animate={{ scale: hoverBerry ? 3.5 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          />
          <ThreeDImage
            src="./images/berry1.png"
            alt="Chocolate Bar 3"
            className="h-90 w-90 rounded-2xl object-contain cursor-pointer z-10"
            entry={{
              scale: 0.6,
              rotate: 15,
              opacity: 0,
              transition: { duration: 1, type: "spring", bounce: 0.45 },
            }}
            exit={{
              scale: 0.6,
              rotate: 15,
              opacity: 0,
              transition: { duration: 0.7, ease: "easeIn" },
            }}
            onMouseEnter={() => setHoverBerry(true)}
            onMouseLeave={() => setHoverBerry(false)}
          />
        </div>

        <div className="relative flex items-center justify-center">
          <motion.img
            src="./images/c3.png"
            alt="Bar Background"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110px] h-[110px] z-0 pointer-events-none select-none"
            style={{ filter: "blur(0.3px)" }}
            animate={{ scale: hoverBar ? 3.8 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          />
          <ThreeDImage
            src="./images/bar1.png"
            alt="Chocolate Bar 4"
            className="h-90 w-90 rounded-2xl object-contain cursor-pointer z-10"
            entry={{
              scale: 0.6,
              rotate: -10,
              opacity: 0,
              transition: { duration: 1, type: "spring", bounce: 0.45 },
            }}
            exit={{
              scale: 0.6,
              rotate: -10,
              opacity: 0,
              transition: { duration: 0.7, ease: "easeIn" },
            }}
            onMouseEnter={() => setHoverBar(true)}
            onMouseLeave={() => setHoverBar(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default products;
