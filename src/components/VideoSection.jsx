import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const PIN_HEIGHT = 130; // in vh: 100vh for scale, 30vh for hold

const VideoSection = () => {
  const sectionRef = useRef(null);
  const [pinStart, setPinStart] = useState(0);
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [windowH, setWindowH] = useState(window.innerHeight);

  // Update scrollY and window height on scroll/resize
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onResize = () => setWindowH(window.innerHeight);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Calculate pin start (section top relative to document)
  useEffect(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setPinStart(rect.top + window.scrollY);
  }, [windowH]);

  // Pin range: from section top to section top + PIN_HEIGHT * vh
  const pinEnd = pinStart + (PIN_HEIGHT * windowH) / 100;
  const progress = Math.min(Math.max((scrollY - pinStart) / ((PIN_HEIGHT * windowH) / 100), 0), 1);

  // Only show fixed video during pin range
  const isPinned = scrollY >= pinStart && scrollY < pinEnd;

  // Scale from 0.4 to 1 in first 100vh, then hold
  const scale = progress < 1 ? 0.4 + Math.min(progress, 1) * 0.6 : 1;
  // Border radius from 2rem to 0 in first 100vh
  const borderRadius = progress < 1 ? `${2 - 2 * Math.min(progress, 1)}rem` : '0rem';
  // Opacity for smooth fade in/out (optional)
  const opacity = isPinned ? 1 : 0;

  // Scroll lock logic: lock scroll while pinned
  useEffect(() => {
    if (isPinned) {
      document.body.style.overflow = 'hidden';
      window.scrollTo({ top: Math.round(pinStart), behavior: 'auto' });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPinned, pinStart]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[220vh] flex flex-col items-center justify-start w-full"
      style={{
        background: 'linear-gradient(135deg, #32c0c2 0%, #1fa2ff 50%, #0b486b 100%)'
      }}
    >
      {/* Spacer before video for scroll-in effect */}
      <div className="h-[40vh]" />
      {/* Fixed, pinned video only during pin range */}
      {isPinned && (
        <motion.div
          className="fixed left-0 top-0 w-screen h-screen flex items-center justify-center z-30 pointer-events-none"
          style={{ opacity }}
        >
          <motion.div
            style={{
              scale,
              borderRadius,
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
              background: '#000',
              width: '100vw',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto',
              transition: 'scale 0.2s, border-radius 0.2s',
            }}
          >
            <video
              src="./videos/v1.mp4"
              className="w-full h-full object-cover"
              style={{ borderRadius }}
              autoPlay
              muted
              loop
              playsInline
            />
          </motion.div>
        </motion.div>
      )}
      {/* Spacer after video for scroll-out effect */}
      <div className="h-[120vh]" />
    </section>
  )
}

export default VideoSection