import React, { useEffect } from "react";
import gsap from "gsap";

const DynamicSVGAnimation = () => {
  useEffect(() => {
    const lines = document.querySelectorAll('.line');
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
        ease: "power1.inOut"
      });
    });
  }, []);

  // Responsive strokeWidth: 8 for mobile, 5 for md+
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
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
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Main animated line */}
      <path
        className="line"
        stroke="#fff"
        strokeWidth={mainStroke}
        strokeLinecap="round"
        filter="url(#glow)"
        d="M0,60 C400,100 800,20 1200,60 C1600,100 1800,20 2000,60"
      />
      {/* Second line, slightly offset for glow effect */}
      <path
        className="line"
        stroke="#7dd3fc"
        strokeWidth={secondStroke}
        strokeLinecap="round"
        filter="url(#glow)"
        d="M0,80 C400,120 800,40 1200,80 C1600,120 1800,40 2000,80"
      />
      {/* Third line, another offset for more depth */}
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

const Footer = () => {
  const handleClick = (sectionName) => {
    alert(`Clicked on ${sectionName}`);
  };

  return (
    <footer className="w-full bg-[#0a2233] pt-0">
      <DynamicSVGAnimation />
      <div className="w-full   flex justify-center">
        <div className="max-w-6xl w-full px-4 flex flex-col items-center">
          <div className="w-full -translate-y-10 flex flex-col md:flex-row justify-center items-stretch gap-10 mt-8">
            {/* Quick Links box */}
            <div
              className="flex-1 min-w-[220px] flex flex-col items-center md:items-start text-center md:text-left rounded-lg p-6 cursor-pointer"
            >
              <h2 className="text-2xl md:text-3xl font-serif mb-4 text text-white/90">Quick links</h2>
              <ul className="space-y-2 flex flex-col gap-2 text translate-y-2 text-white/90">
                {['About Us', 'Contact Us', 'Track your order'].map((text, idx) => (
                  <li key={text} className="group cursor-pointer w-fit">
                    <span className="relative inline-block">
                      {text}
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0 group-hover:translate-x-0"></span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Follow us on Social Media box */}
            <div
              className="flex-1 min-w-[220px] flex flex-col items-center md:items-start text-center md:text-left rounded-lg p-6 cursor-pointer"
            >
              <h2 className="text-2xl md:text-3xl font-serif mb-4 text  text-white/90">Follow us on Social Media</h2>
              <ul className="space-y-2 flex flex-col gap-1 text translate-y-2  w-1/3 justify-center md:items-end  text-white/90">
                {['Instagram', 'Facebook', 'Youtube', 'Twitter'].map((text, idx) => (
                  <li key={text} className="group cursor-pointer w-fit">
                    <span className="relative inline-block">
                      {text}
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0 group-hover:translate-x-0"></span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Copyright Bar */}
          <div className="w-full text-center text-white/70 text-sm py-4 border-t border-white/20 mt-8">
            © 2025, Harmony Chocolates by Aayush Sapra
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
