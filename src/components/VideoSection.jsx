import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
  const sectionRef = useRef(null);
  const videoWrapperRef = useRef(null);

  useLayoutEffect(() => {
    let ctx;
    if (sectionRef.current && videoWrapperRef.current) {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(
          videoWrapperRef.current,
          { scale: 0.4, borderRadius: "2rem" },
          { scale: 1, borderRadius: "0rem", ease: "power1.inOut" }
        );
      }, sectionRef);
    }
 
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] md:h-[100vh] w-full"
      style={{
        background:
          "linear-gradient(135deg, #32c0c2 0%, #1fa2ff 50%, #0b486b 100%)",
      }}
    >
      <div
        className="h-screen w-screen flex items-center justify-center overflow-hidden"
      >
        <div
          ref={videoWrapperRef}
          className="w-full h-full"
          style={{
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)",
            background: "#000",
            overflow: "hidden",
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
};

export default VideoSection;
