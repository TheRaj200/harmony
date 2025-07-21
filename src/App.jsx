import React, { useState, useEffect } from 'react'
import MainRoutes from './routes/MainRoutes'
import LoadingScreen from './pages/LoadingScreen'
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import Footer from './components/Footer';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Lenis smooth scroll setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative ">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
          >
            <LoadingScreen />
          </motion.div>
        ) : null}
      </AnimatePresence>
      {!loading && (
        <>
          <MainRoutes />
       
        </>
      )}
    </div>
  )
}

export default App