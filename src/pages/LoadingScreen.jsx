import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Wave from "react-wavify";

const LoadingScreen = () => {
  const dotsRef = useRef([]);

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

  return (
    <div className="flex bg-red- flex-col items-center justify-center w-screen h-screen  bg-transparent relative">
      <div className="z-20 flex flex-col justify-center items-center scale-50 lg:scale-75">
        <img src="./images/Adryter.png" alt="" className="z-20 w-70 mb-6" />

        <h2 className="text-2xl text-center  text-[#fff] tracking-wide z-20 font-semibold">
          Empowering Your Social Presence
        </h2>

        <div className="flex mt-20 space-x-3 mb-6 z-20">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              ref={(el) => (dotsRef.current[i] = el)}
              className="block w-4 h-4 rounded-full bg-[#fff] "
            ></span>
          ))}
        </div>
      </div>

      <div className="absolute top-0 left-0 bottom-0 w-full full z-10 pointer-events-none select-none">
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
    </div>
  );
};

export default LoadingScreen;
