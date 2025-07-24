import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

const DynamicSVGAnimation = () => {
  useEffect(() => {
    const lines = document.querySelectorAll(".line");
    lines.forEach((line, i) => {
      const length = line.getTotalLength();
      line.style.strokeDasharray = length;
      line.style.strokeDashoffset = length;
      gsap.to(line, {
        strokeDashoffset: 0,
        duration: 2 + i,
        delay: i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });
  }, []);

  // Responsive
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const mainStroke = isMobile ? 80 : 5;
  const secondStroke = isMobile ? 50 : 3;
  const thirdStroke = isMobile ? 40 : 2;

  return (
    <svg
      viewBox="0 0 2000 120"
      fill="none"
      width="100%"
      height="100%"
      className="w-full -translate-y-10 h-32 md:h-40"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#32c0c2" />
          <stop offset="50%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#f55d81" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f55d81" />
          <stop offset="50%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#32c0c2" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Main line */}
      <path
        className="line"
        stroke="url(#gradient1)"
        strokeWidth={mainStroke}
        strokeLinecap="round"
        filter="url(#glow)"
        d="M0,60 C400,100 800,20 1200,60 C1600,100 1800,20 2000,60"
      />
      {/*  glow effect */}
      <path
        className="line"
        stroke="url(#gradient2)"
        strokeWidth={secondStroke}
        strokeLinecap="round"
        filter="url(#glow)"
        d="M0,80 C400,120 800,40 1200,80 C1600,120 1800,40 2000,80"
      />
      {/* Third line */}
      <path
        className="line"
        stroke="#38bdf8"
        strokeWidth={thirdStroke}
        strokeLinecap="round"
        filter="url(#glow)"
        d="M0,100 C400,140 800,60 1200,100 C1600,140 1800,60 2000,100"
      />
    </svg>
  );
};

// Social media icons
const SocialIcon = ({ platform }) => {
  const iconMap = {
    Instagram: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    Facebook: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    ),
    Youtube: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
      </svg>
    ),
    x: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M20.39 3H3.61c-.48 0-.88.39-.88.88v16.24c0 .48.39.88.88.88h16.77c.48 0 .88-.39.88-.88V3.88c0-.48-.39-.88-.88-.88zm-5.63 13.3h-1.67l-2.3-3.2-2.3 3.2H7.83l3.12-4.3-3-4.1h1.67l2.14 2.9 2.14-2.9h1.64l-3 4.1 3.12 4.3z" />
      </svg>
    ),
  };

  return iconMap[platform] || null;
};

// Quick link
const QuickLinkItem = ({ text, delay }) => {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.1 + 0.3, duration: 0.5 }}
      className="group cursor-pointer w-fit flex items-center gap-2 hover:text-white transition-colors duration-300"
    >
      <span className="relative inline-block">
        {text}
        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-[#32c0c2] to-[#f55d81] transition-all duration-300 group-hover:w-full"></span>
      </span>
    </motion.li>
  );
};

// Social media item
const SocialMediaItem = ({ platform, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.1 + 0.3, duration: 0.5 }}
      className="group cursor-pointer w-fit  flex items-center gap-2 hover:text-white transition-colors duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.5 }}
        className="text-[#32c0c2] group-hover:text-[#f55d81] transition-colors duration-300"
      >
        <SocialIcon platform={platform} />
      </motion.div>
      <span className="relative inline-block">
        {platform}
        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-[#f55d81] to-[#32c0c2] transition-all duration-300 group-hover:w-full"></span>
      </span>
    </motion.li>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#0a2233] to-[#051622] pt-0 overflow-hidden ">
      <DynamicSVGAnimation />
      <div className="w-full flex justify-center relative !px-5">
        {/* Decorative  */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#32c0c2]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#f55d81]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-5xl w-full px-6 flex flex-col items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full -translate-y-10 flex flex-col md:flex-row justify-between items-stretch gap-10 mt-8"
          >
            {/* Logo and description */}
            <div className="flex-1 min-w-[220px] flex flex-col items-center md:items-start text-center md:text-left">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl md:text-4xl font-serif mb-4  font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#32c0c2] to-[#f55d81]"
              >
                Harmony
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-white/70 mb-6 max-w-xs"
              >
                Indulge in the finest chocolate creations, crafted with passion
                and the highest quality ingredients.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex space-x-4 mt-2"
              >
                {["Instagram", "Facebook", "Youtube", "x"].map(
                  (platform, idx) => (
                    <motion.a
                      key={platform}
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href="#"
                      className="w-10 h-10 !mt-4 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-[#32c0c2] hover:to-[#f55d81] transition-all duration-300"
                    >
                      <SocialIcon platform={platform} />
                    </motion.a>
                  )
                )}
              </motion.div>
            </div>

            <div className="flex-1 min-w-[220px] flex flex-col items-center md:items-start text-center md:text-left">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl md:text-2xl font-serif mb-6 text-white/90 relative -translate-y-4 inline-block"
              >
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-[#32c0c2] to-[#f55d81] rounded-full"></span>
              </motion.h2>
              <ul className="space-y-4 flex flex-col gap-2 text-white/70">
                {[
                  "About Us",
                  "Contact Us",
                  "Track your order",
                  "FAQs",
                  "Privacy Policy",
                ].map((text, idx) => (
                  <QuickLinkItem key={text} text={text} delay={idx} />
                ))}
              </ul>
            </div>

            {/* Newsletter  */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="w-full max-w-md mx-auto mt-8 mb-12 rounded-2xl p-8    relative "
            >
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-white text-xl font-medium mb-2 text-center relative z-10"
              >
                Subscribe to our Newsletter
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="text-white/60 text-sm text-center !mb-6 relative z-10"
              >
                Get updates on new products and exclusive offers
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 relative z-10"
              >
                <div className="flex-1 justify-center  md:justify-end md:items-end flex relative group">
                  <input
                    type="email"
                    placeholder="  Your email address"
                    className="w-[300px] bg-white/10 border-2 border-white/20 rounded-xl px-5 !py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#32c0c2]/70 focus:bg-white/15 transition-all duration-300 pr-10"
                  />
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(50, 192, 194, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#32c0c2] to-[#f55d81] text-white font-medium  translate-x-20 md:translate-x-0 w-1/2 md:w-40 h-10  py-3 px-6 rounded-xl shadow-lg shadow-[#32c0c2]/20 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  <span className="relative flex items-center justify-center gap-2">
                    Subscribe
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Copyright Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="w-full text-center text-white/50 text-sm py-6 border-t border-white/10 mt-4 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p>© 2025, Harmony Chocolates by Aayush Sapra</p>
            <div className="flex gap-6">
              <a
                href="#"
                className="hover:text-white/80 transition-colors duration-300"
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:text-white/80 transition-colors duration-300"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-white/80 transition-colors duration-300"
              >
                Cookies
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
