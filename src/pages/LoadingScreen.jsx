import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Wave from "react-wavify";

const LoadingScreen = () => {
  const dotsRef = useRef([]);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    gsap.to(dotsRef.current, {
      y: -18,
      repeat: -1,
      yoyo: true,
      stagger: 0.15,
      duration: 0.7,
      ease: "power1.inOut",
      delay: 0.1,
    });
  }, []);

  useEffect(() => {
    let current = 0;
    let timeout;
    function updatePercent() {
      if (current < 100) {
        // Random increment between 1 and 7
        const increment = Math.floor(Math.random() * 7) + 1;
        current = Math.min(current + increment, 100);
        setPercent(current);
        // Random delay between 30ms and 120ms
        const delay = Math.floor(Math.random() * 90) + 30;
        timeout = setTimeout(updatePercent, delay);
      }
    }
    updatePercent();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen bg-transparent relative"
      style={{
        backgroundImage: "url('/images/loaderbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="z-20 flex  justify-center items-center scale-70 lg:scale-85 ">
        <div className="flex flex-col items-center w-full">
          {/* Percentage Loader */}
          <div className="!mb-2 flex flex-col items-center w-full">
            <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-white drop-shadow-lg tracking-tight animate-pulse">
              {percent}%
            </span>
            <div className="w-40 md:w-64 h-2 bg-white/30 rounded-full !mt-10 overflow-hidden ">
              <div
                className="h-full bg-white rounded-full transition-all  duration-200"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
          <h2 className="text-5xl text-center text-[#fff] tracking-wide z-20 font-semibold w-full flex  items-center justify-center">
            Loading  
              <div className="flex !mt-10 !space-x-3 !ml-4 !mb-5 z-20">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                ref={(el) => (dotsRef.current[i] = el)}
                className="block w-4 h-4 rounded-full bg-[#fff]"
              ></span>
            ))}
          </div>
          </h2>
       
        </div>
      </div>

      {/* White area at the bottom */}
      <div className="absolute left-0 bottom-0 w-full h-[30vh]  z-10" />

      {/* Wave at the bottom */}
      <div className="absolute left-0 bottom-0 w-full h-[10vh] z-20 pointer-events-none select-none ">
        <Wave
          fill="#dd3a60f5"
          paused={false}
          options={{
            height: 20,
            amplitude: 40,
            speed: 0.2,
            points: 4,
          }}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
