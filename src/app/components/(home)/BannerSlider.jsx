"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import background from "../../../Image/Banner11.png";
import banner from "../../../Image/Telecommuting-rafiki.png";

const BannerSlider = () => {
  const { data: session } = useSession();
  const [bannerText, setBannerText] = useState("");
  const userType = session?.user?.role;

  useEffect(() => {
    switch (userType) {
      case "freelancer":
        setBannerText(
          "Welcome Freelancer! Showcase your skills and find great projects."
        );
        break;
      case "client":
        setBannerText(
          "Hello Client! Discover talented freelancers for your projects."
        );
        break;
      default:
        setBannerText(
          "Welcome! Explore opportunities and find the right talent for your needs."
        );
    }
  }, [userType]);

  const oscillateY = {
    hidden: { y: 0 },
    visible: {
      y: [0, -60, 0],
      transition: {
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  const slideIn = {
    hidden: { x: "-50%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1.5 } },
  };

  return (
    <div className="w-full">
      <div
        className="h-[500px] md:h-[600px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${background.src})`,
        }}
      >
        <div className="container mx-auto flex flex-col lg:flex-row-reverse items-center justify-center py-5 px-4 h-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={oscillateY}
            className="max-w-[90%] md:max-w-md lg:max-w-xl rounded-lg h-auto mb-4 sm:mb-6 transition-transform transform hover:scale-105"
          >
            <Image
              src={banner}
              alt="Digital Web Design"
              layout="responsive"
              width={500}
              height={400}
              objectFit="cover"
              className="rounded-lg"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideIn}
            className="text-center lg:text-left lg:mb-0 mb-6 lg:mr-10 px-4 sm:px-6"
          >
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-snug">
              {bannerText.split("\n").map((line, index) => (
                <span key={index} className="block mb-2">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              Join us and make your mark in the freelance world!
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
