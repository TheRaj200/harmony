import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import '../styles/animations.css'

gsap.registerPlugin(ScrollTrigger);

const About = () => {

  const [vals, setVals] = useState({
    currentIndex: 1,
    maxIndex: 908,
  });
  const imageObject = useRef([]);
  const imagesLoader = useRef(0);
  const canvasRef = useRef(null);
  const parentDivRed = useRef(null)

  useEffect(() => {
    preloadImages();

    // Set up intersection observer for animation triggers
    const animatedElements = document.querySelectorAll('.opacity-0');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      animatedElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);
  const preloadImages = () => {

    for (let i = 0; i <= vals.maxIndex; i++) {
      const imageUrl = `/canvas/frame_${i.toString().padStart(4, '0')}.jpeg`;
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        imagesLoader.current++;
        if (imagesLoader.current === vals.maxIndex) {
          loadImage(vals.currentIndex);
        }
      };
      imageObject.current.push(img);
    }
  };

  const loadImage = (index) => {
    if (index >= 0 && index <= vals.maxIndex) {
      const img = imageObject.current[index];
      const canvas = canvasRef.current;

      if (canvas && img) {
        let ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          const scaleX = canvas.width / img.width;
          const scaleY = canvas.height / img.height;
          const scale = Math.max(scaleX, scaleY);

          const newWidth = img.width * scale;
          const newHeight = img.height * scale;

          const offsetX = (canvas.width - newWidth) / 2;
          const offsetY = (canvas.height - newHeight) / 2;

          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high"
          ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight)

          setVals((prevVals) => ({
            ...prevVals,
            currentIndex: index,
          }));
        }
      }
    }
  }

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentDivRed.current,
        start: "top top",
        scrub: 2,
        end: "bottom bottom",
      }
    })
    tl.to(vals, {
      currentIndex: vals.maxIndex,
      onUpdate: () => {
        loadImage(Math.floor(vals.currentIndex))
      }
    })
  })

  return (
    <div className='w-full  ' style={{ background: 'linear-gradient(180deg, #4F46E5 0%, #7E22CE 35%, #BE185D 65%, #DB2777 100%)' }} >
      <div ref={parentDivRed} className='w-[100%] mx-auto h-[800vh]' >
        <div className='w-full h-screen sticky left-0 top-0'>
          <canvas ref={canvasRef} className='w-full h-screen'></canvas>
        </div>
      </div>


      {/* About Us Section */}
      <div className='  px-4 md:px-8 lg:px-16' >

        <div className='mx-auto'>
          <div className='mb-16 text-center !mt-10'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 opacity-0 animate-fadeIn' id='about-title'>
              <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-200  text uppercase text-shadow-2xl'>About Us</span>

            </h1>

          </div>

          <div className='flex flex-col md:flex-row justify-center !mt-10 items-center gap-12 md:mb-20'>
            <img className='h-90 md:h-140 rounded-2xl' src="./images/founder.webp" alt="" />

            <div className='opacity-0 md:w-1/2 animate-slideInLeft bg-gradient-to-br from-pink-700/20 to-pink-800  !p-6 md:!p-18 rounded-xl shadow-lg backdrop-blur-md  transform transition-all duration-500 hover:shadow-pink-500/20 hover:border-pink-500/40'>
              <h2 className='text-2xl md:text-3xl font-bold text-white mb-4 flex items-center'>

                Our Founder: Aayush Sapra
              </h2>
              <p className='text-blue-100 h-50 !mt-10 leading-relaxed'>Aayush Sapra, a culinary connoisseur with an insatiable love for all things food, has always believed that the best experiences are shared. His popular YouTube channel, known for its captivating food adventures and challenges, has garnered a massive following. However, Aayush's passion for chocolate led him to embark on a new and exciting venture.</p>

            </div>

          </div>


        </div>
      </div>


      {/* Testimonials Section */}
      <div className=' !px-4 !md:px-8 !mt-20 !lg:px-16'>
        <div className=' mx-auto'>
          <div className='mb-16 text-center'>
            <h2 className='text-4xl md:text-5xl font-bold text-white mb-6 opacity-0 animate-fadeIn'>
              <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-400 text to-pink-200 '>What Our Customers Say</span>
            </h2>
          </div>

          <div className='flex justify-center items-center flex-col md:flex-row !mt-20  gap-8'>
            {/* Testimonial 1 */}
            <div className='bg-gradient-to-br from-pink-700/20 to-pink-800 !p-8 rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 opacity-0 animate-fadeIn delay-100  hover:shadow-pink-500/20 backdrop-blur-md'>
              <div className='flex items-center mb-6'>
                <div className='w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold !mr-4 shadow-lg'>
                  <span className='text-xl'>S</span>
                </div>
                <div>
                  <h3 className='text-white font-bold text-lg'>Sarah Johnson</h3>
                  <p className='text-pink-400 text-sm font-medium'>Chocolate Enthusiast</p>
                </div>
              </div>
              <div className='mb-6  !p-4 rounded-lg border-l-4 border-pink-500'>
                <p className='text-blue-100 italic leading-relaxed'>"The flavors in Harmony Chocolates are unlike anything I've ever experienced. Each bite tells a story and takes you on a journey. The dark chocolate with sea salt is my absolute favorite – it's the perfect balance of sweet and savory. Absolutely divine!"</p>
              </div>
              <div className='flex !mt-4 text-pink-500'>
                <span className='text-xl'>★</span>
                <span className='text-xl'>★</span>
                <span className='text-xl'>★</span>
                <span className='text-xl'>★</span>
                <span className='text-xl'>★</span>
                <span className='!ml-2 text-blue-200 text-sm !mt-1.5'>5.0</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className='bg-gradient-to-br from-pink-700/20 to-pink-800 !p-8 rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 opacity-0 animate-fadeIn delay-300  hover:shadow-pink-500/20 backdrop-blur-md'>
              <div className='flex items-center mb-6'>
                <div className='w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold !mr-4 shadow-lg'>
                  <span className='text-xl '>M</span>
                </div>
                <div>
                  <h3 className='text-white font-bold text-lg'>Michael Chen</h3>
                  <p className='text-pink-400 text-sm font-medium'>Food Critic</p>
                </div>
              </div>
              <div className='mb-6  !p-4 rounded-lg border-l-4 border-pink-500'>
                <p className='text-blue-100 italic leading-relaxed'>"As a food critic, I've tasted chocolates from around the world, but Harmony Chocolates stands in a league of its own. The attention to flavor profiles and texture is remarkable. The praline collection showcases Aayush's understanding of balance and craftsmanship. A true masterpiece."</p>
              </div>
              <div className='flex !mt-4 text-pink-500'>
                <span className='text-xl'>★</span>
                <span className='text-xl'>★</span>
                <span className='text-xl'>★</span>
                <span className='text-xl'>★</span>
                <span className='text-xl'>★</span>
                <span className='!ml-2 text-blue-200 text-sm !mt-1'>5.0</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className='bg-gradient-to-br from-pink-700/20 to-pink-800 !p-8 rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 opacity-0 animate-fadeIn delay-500 hover:shadow-pink-500/20 backdrop-blur-md'>
              <div className='flex items-center mb-6'>
                <div className='w-14 h-14 rounded-full bg-gradient-to-br  from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold !mr-4 shadow-lg'>
                  <span className='text-xl'>A</span>
                </div>
                <div>
                  <h3 className='text-white font-bold text-lg'>Amelia Rodriguez</h3>
                  <p className='text-pink-400 text-sm font-medium'>Pastry Chef</p>
                </div>
              </div>
              <div className='mb-6  !p-4 rounded-lg border-l-4 border-pink-500'>
                <p className='text-blue-100 italic leading-relaxed'>"As a pastry chef, I'm extremely particular about the chocolate I use. Harmony Chocolates has become my go-to for both professional and personal indulgence. The quality and consistency are unmatched, and they elevate even my simplest pastries."</p>
              </div>
              <div className='flex !mt-4 text-pink-500'>
                <span className='text-xl'>★</span>
                <span className='text-xl'>★</span>
                <span className='text-xl'>★</span>
                <span className='text-xl'>★</span>
                <span className='text-xl'>★</span>
                <span className='!ml-2 text-blue-200 text-sm !mt-1'>5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className='!py-20 px-4 !md:px-8 !lg:px-16'>
        <div className=' mx-auto'>
          <div className='mb-12 text-center'>
            <h2 className='text-4xl md:text-5xl font-bold text-white mb-6 opacity-0 animate-fadeIn'>
              <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-200'>Get In Touch</span>
            </h2>


          </div>

          <div className='flex justify-center items-center flex-col md:flex-row w-full gap-8 !mt-20'>
            <div className=' w-100 bg-gradient-to-br from-pink-700/20 to-pink-800 !p-8 rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 opacity-0 animate-fadeIn delay-100  hover:shadow-pink-500/20 text-center backdrop-blur-md'>
              <div className='w-16 h-16  bg-gradient-to-br from-pink-700/20 to-pink-800 rounded-full flex items-center justify-center !mx-auto !mb-6'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-white mb-4'>Email Us</h3>
              <p className='text-pink-400 font-medium'>info@harmonychocolates.com</p>
            </div>

            <div className=' w-100 bg-gradient-to-br from-pink-700/20 to-pink-800 !p-8 rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 opacity-0 animate-fadeIn delay-300  hover:shadow-pink-500/20 text-center backdrop-blur-md'>
              <div className='w-16 h-16 bg-gradient-to-br from-pink-700/20 to-pink-800 rounded-full flex items-center justify-center !mx-auto !mb-6'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-white mb-4'>Call Us</h3>
              <p className='text-pink-400 font-medium'>+91 98765 43210</p>
            </div>

            <div className=' w-100 bg-gradient-to-br from-pink-700/20 to-pink-800 !p-8 rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 opacity-0 animate-fadeIn delay-500 hover:shadow-pink-500/20 text-center backdrop-blur-md'>
              <div className='w-16 h-16 bg-gradient-to-br from-pink-700/20 to-pink-800 rounded-full flex items-center justify-center !mx-auto !mb-6'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-white mb-4'>Visit Us</h3>
              <p className='text-pink-400 font-medium'>123 Chocolate Lane,</p>
              <p className='text-pink-400 font-medium'>New Delhi, India</p>
            </div>
          </div>

        
        </div>
      </div>


    </div>
  )
}

export default About