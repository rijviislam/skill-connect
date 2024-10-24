"use client";

import Image from "next/image";
import { motion } from "framer-motion"; 
import banner from "../../../Image/Telecommuting-rafiki.png";
import background from "../../../Image/Banner11.png"; 

const BannerSlider = () => {
  const oscillateY = {
    hidden: { y: 0 },
    visible: {
      y: [0, -20, 0],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };
  
  const slideIn = {
    hidden: { x: '-50%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1.5 } },
  };

  return (
    <div>
      <div
        className="h-[600px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${background.src})`, 
        }}
      >
        <div className="container mx-auto flex flex-col lg:flex-row-reverse items-center justify-center py-5 px-4 h-full">
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={oscillateY}
            className="max-w-full lg:max-w-xl rounded-lg h-auto mb-4 sm:mb-6" 
          >
            <Image
              src={banner}
              alt="Digital Web Design"
              layout="responsive"
              width={400} 
              height={300} 
              objectFit="cover"
              className="" 
            />
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideIn}
            className="text-center lg:text-left lg:mb-0 mb-6 lg:mr-10"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800">
              FIND THE 
              <br/>
              RIGHT <span className="text-white">FREELANCER</span>
            </h1>
            <p className="py-2 text-lg sm:text-xl md:text-xl text-violet-800">
              FOR YOUR NEXT PROJECT
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
