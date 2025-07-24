import React, { useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";

//  3D effect
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

const products = [
  {
    name: "Classic Milk Chocolate",
    image: "/images/mk1.png",
    desc: "Smooth and creamy milk chocolate for every mood.",
    entry: {
      scale: 0.6,
      rotate: -15,
      opacity: 0,
      transition: { duration: 1.2, type: "spring", bounce: 0.45 },
    },
    bg: "/images/c6.png",
    bgClass: "rotate-12",
  },
  {
    name: "Dark Berry Crunch",
    image: "/images/mk2.png",
    desc: "Rich dark chocolate with a burst of berry flavor.",
    entry: {
      scale: 0.6,
      rotate: 10,
      opacity: 0,
      transition: { duration: 1.2, type: "spring", bounce: 0.45 },
    },
    bg: "/images/nut2.png",
    bgClass: "rotate-180",
  },
  {
    name: "Nutty Caramel Bliss",
    image: "/images/mk3.png",
    desc: "Caramel-filled chocolate with crunchy nuts.",
    entry: {
      scale: 0.6,
      rotate: 15,
      opacity: 0,
      transition: { duration: 1.2, type: "spring", bounce: 0.45 },
    },
    bg: "/images/berry2.png",
    bgClass: "",
  },
];

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
const words = "New Products".split(" ");

const NewProducts = () => {
  const h1Ref = useRef(null);
  const inView = useInView(h1Ref, { margin: "-20% 0px -20% 0px", once: false });
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("exit");
    }
  }, [inView, controls]);

  // Hover states
  const [hoverIdx, setHoverIdx] = useState(-1);

  return (
    <div
      className="w-full h-full overflow-x-hidden relative"
      style={{
        background:
          "linear-gradient(180deg,#f55d81  0%, #164863 35%, #32c0c2 65%, #0a2233 100%)",
      }}
    >
      <motion.h1
        ref={h1Ref}
        className="translate-y-45 md:translate-y-55 xl:translate-y-65 uppercase text 2xl:translate-y-85 text-center text-5xl font-extrabold text-[#32c0c2] text-shadow-sm text flex flex-wrap justify-center gap-x-4 relative z-50"
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
      <img className="w-full opacity-95" src="/images/svg2.png" alt="" />
      <div className="w-full bg-[#fcf3f6] h-[1100px]  block md:hidden  "></div>
      <img
        className="w-full h-120 opacity-95 rotate-180 "
        src="/images/svg2.png"
        alt=""
      />
      <div className="absolute top-100 md:top-65 xl:top-85 2xl:top-110 flex md:flex-row flex-col justify-center w-full gap-8 mt-12">
        {products.map((product, idx) => (
          <div
            key={product.name}
            className="relative flex items-center justify-center"
          >
            <img
              src={product.bg}
              alt="Decorative Background"
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] md:w-[320px] max-w-[90vw] z-0 ${
                product.bgClass
              } pointer-events-none select-none transition-transform duration-500 ${
                hoverIdx === idx ? "scale-100" : "scale-0"
              }`}
            />
            <ThreeDImage
              src={product.image}
              alt={product.name}
              className="h-80 w-80 rounded-2xl object-contain cursor-pointer z-10 relative  p-4 "
              entry={product.entry}
              onMouseEnter={() => setHoverIdx(idx)}
              onMouseLeave={() => setHoverIdx(-1)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
