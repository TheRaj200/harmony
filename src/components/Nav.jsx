import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import Wave from 'react-wavify';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Products' },
  { to: '/clients', label: 'Clients' },
  { to: '/contact', label: 'Contact' },
];

const Nav = ({ animateNav }) => {
  const location = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRefs = useRef([]);
  navRefs.current = Array(navLinks.length).fill(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const activeIdx = navLinks.findIndex(link => link.to === location.pathname);
    if (navRefs.current[activeIdx]) {
      const el = navRefs.current[activeIdx];
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        height: el.offsetHeight,
      });
    }
  }, [location.pathname]);

  // Helper to get nav link height for indicator
  const [linkHeight, setLinkHeight] = useState(0);
  useEffect(() => {
    if (navRefs.current[0]) {
      setLinkHeight(navRefs.current[0].offsetHeight);
    }
  }, [navRefs, location.pathname]);

  // Framer Motion variant for the whole navbar
  const navVariant = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: .1, // 2 seconds delay before animation starts
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="w-screen flex justify-center items-start pt-6 fixed top-4 left-0 z-80">
      <motion.nav
        className="relative bg-white rounded-full shadow-2xl px-12 py-0 flex items-center justify-around min-h-[64px] gap-8 w-[800px] md:min-w-[500px] border border-white/70 drop-shadow-lg"
        variants={navVariant}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <div className="flex items-center  select-none" style={{height: linkHeight ? linkHeight : 48}}>
          <img className='h-8 object-contain ' src="./images/logo.avif" alt="" />
        </div>
        {/* Hamburger Menu Button (Mobile Only) */}
        <button
          className="md:hidden ml-auto p-2 text-[#f55d81]"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <HiMenu size={32} />
        </button>
        {/* Nav Links (Desktop Only) */}
        <div className="relative hidden md:flex items-center" style={{minHeight: linkHeight ? linkHeight : 48}}>
          {/* Animated Indicator */}
          {indicatorStyle.width && (
            <span
              className="absolute rounded-full z-0 transition-all duration-300 shadow"
              style={{
                left: indicatorStyle.left-8,
                width: indicatorStyle.width+20,
                height: linkHeight ? linkHeight +5 : 70,
                top: -2,
                background: '#f55d81 ',
                transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
                boxShadow: '0 2px 12px 0 rgba(255, 119, 153, 0.10)',
                opacity: 0.9,
              }}
            />
          )}
          {/* Nav Links */}
          <div className="flex gap-6 md:gap-10 z-10 items-center" style={{minHeight: linkHeight ? linkHeight : 40}}>
            {navLinks.map((link, idx) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  ref={el => (navRefs.current[idx] = el)}
                  className={`relative px-6 py-2 rounded-full font-semibold transition-colors duration-200 flex items-center
                    ${isActive ? 'text-white' : 'text-gray-800 hover:text-pink-600'}
                  `}
                  style={{
                    background: isActive ? 'transparent' : 'transparent',
                    boxShadow: isActive ? 'none' : 'none',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </motion.nav>
      {/* Mobile Fullscreen Wave Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center w-screen h-screen md:hidden"
            initial={{ y: '-100%', opacity: 1 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }}
            exit={{ y: '-100%', opacity: 1, transition: { duration: 0.4, ease: 'easeIn' } }}
          >
            {/* Animated Wave at the top, like LoadingScreen */}
            <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none select-none">
              <Wave
                fill="#32c0c2"
                paused={false}
                options={{
                  height: 2,
                  amplitude: 60,
                  speed: 0.2,
                  points: 4,
                }}
                className="absolute w-full rotate-[180deg] h-full"
              />
            </div>
            {/* Menu Content above the wave */}
            <div className="relative z-20 flex flex-col items-start justify-start w-full h-full ">
              <button
                className="self-end mb-8 mt-4 mr-6 !p-12 text-white text-3xl hover:text-pink-500"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <HiX size={36} />
              </button>
              <div className="flex flex-col items-center justify-center w-full gap-5 ">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`w-full text-center !py-2 my-2 rounded-lg font-bold text-3xl  transition-colors duration-200 ${location.pathname === link.to ? 'bg-[#f55d81] text-white' : 'text-white hover:bg-[#f55d81]/10'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Nav;
