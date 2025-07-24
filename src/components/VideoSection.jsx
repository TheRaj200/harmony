import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
  const sectionRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoPinRef = useRef(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: videoPinRef.current,
      },
    });

    tl.fromTo(
      videoWrapperRef.current,
      { scale: 0.4, borderRadius: '2rem' },
      { scale: 1, borderRadius: '0rem', ease: 'power1.inOut' }
    );

    return () => {
      // Cleanup GSAP and ScrollTrigger instances
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] md:h-[300vh] w-full"
      style={{
        background: 'linear-gradient(135deg, #32c0c2 0%, #1fa2ff 50%, #0b486b 100%)'
      }}
    >
      <div ref={videoPinRef} className="h-screen w-screen flex items-center justify-center overflow-hidden">
        <div
          ref={videoWrapperRef}
          className="w-full h-full"
          style={{
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
            background: '#000',
            overflow: 'hidden',
          }}
        >
          <video
            src="/videos/v1.mp4"
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
    </section>
  );
}

export default VideoSection;