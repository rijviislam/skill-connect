"use client";

import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaArrowRight,
  FaCamera,
  FaCode,
  FaDesktop,
  FaMobileAlt,
  FaMusic,
  FaPen,
} from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TopCategories = () => {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 relative">
      <h2 className="text-left text-2xl md:text-3xl lg:text-4xl font-medium text-[#8a2be2] mb-5 md:mb-7 mt-4 md:mt-8 flex items-center">
        Most Popular Categories
        <FaArrowRight className="ml-2" />
      </h2>
      <div className="absolute bottom-0 right-10 lg:right-14 w-[200px] md:w-[300px] lg:w-[400px] h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-full animate-spin-slow hidden sm:block">
        <Image
          src="https://i.postimg.cc/KzNCx060/photo-2024-10-21-13-35-50.jpg"
          alt="Category Background"
          width={400}
          height={400}
          className="rounded-full"
        />
      </div>
      {/* First row */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {[
          {
            title: "Graphic Design",
            icon: <FaDesktop size={24} />,
            imageSrc:
              "https://i.postimg.cc/x88nq8Js/dose-media-gx-Gtq-G5ul2g-unsplash.jpg",
            link: "/graphic-design",
          },
          {
            title: "Web Development",
            icon: <FaCode size={24} />,
            imageSrc:
              "https://i.postimg.cc/cCWZMhbb/farzad-p-x-Sl33-Wxyc-unsplash.jpg",
            link: "/web-development",
          },
          {
            title: "Content Writing",
            icon: <FaPen size={24} />,
            imageSrc:
              "https://i.postimg.cc/mkpX22Cy/unseen-studio-s9-CC2-SKy-SJM-unsplash.jpg",
            link: "/content-writing",
          },
        ].map((category, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              isFooterBlurred
              radius="lg"
              className="border-4 border-transparent hover:border-[#d8b9ff] transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              <Image
                alt={category.title}
                className="object-cover"
                height={250}
                src={category.imageSrc}
                width="100%"
              />
              <CardFooter className="justify-between bg-white/80 border-white/40 border-1 overflow-hidden py-2 absolute rounded-lg bottom-1 w-[calc(100%-8px)] shadow-small mx-1 z-10">
                <div className="flex items-center space-x-2 text-center">
                  <div className="text-3xl text-[#8a2be2]">{category.icon}</div>
                  <div className="text-lg font-bold text-black bg-white/70 px-3 py-1 rounded-md">
                    {category.title}
                  </div>
                </div>
                <Link href={category.link}>
                  <Button
                    className="text-sm text-white bg-[#8a2be2]"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    Explore
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-5">
        {[
          {
            title: "Photography",
            icon: <FaCamera size={24} />,
            imageSrc:
              "https://i.postimg.cc/mZm6SVJ1/jamie-street-q-WYv-QMIJyf-E-unsplash.jpg",
            link: "/photography",
          },
          {
            title: "Music Production",
            icon: <FaMusic size={24} />,
            imageSrc:
              "https://i.postimg.cc/tgGrgcZw/caught-in-joy-Puk-ZSAi-K5o-unsplash.jpg",
            link: "/music-production",
          },
        ].map((category, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              isFooterBlurred
              radius="lg"
              className="border-4 border-transparent hover:border-[#d8b9ff] transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              <Image
                alt={category.title}
                className="object-cover"
                height={250}
                src={category.imageSrc}
                width="100%"
              />
              <CardFooter className="justify-between bg-white/80 border-white/40 border-1 overflow-hidden py-2 absolute rounded-lg bottom-1 w-[calc(100%-8px)] shadow-small mx-1 z-10">
                <div className="flex items-center space-x-2 text-center">
                  <div className="text-3xl text-[#8a2be2]">{category.icon}</div>
                  <div className="text-lg font-bold text-black bg-white/70 px-3 py-1 rounded-md">
                    {category.title}
                  </div>
                </div>
                <Link href={category.link}>
                  <Button
                    className="text-sm text-white bg-[#8a2be2]"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    Explore
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Third row */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-5">
        {[
          {
            title: "App Development",
            icon: <FaMobileAlt size={24} />,
            imageSrc:
              "https://i.postimg.cc/QtX0QWqq/wahid-khene-i-Kd-QCIi-SMl-Q-unsplash.jpg",
            link: "/app-development",
          },
        ].map((category, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              isFooterBlurred
              radius="lg"
              className="border-4 border-transparent hover:border-[#d8b9ff] transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              <Image
                alt={category.title}
                className="object-cover"
                height={250}
                src={category.imageSrc}
                width="100%"
              />
              <CardFooter className="justify-between bg-white/80 border-white/40 border-1 overflow-hidden py-2 absolute rounded-lg bottom-1 w-[calc(100%-8px)] shadow-small mx-1 z-10">
                <div className="flex items-center space-x-2 text-center">
                  <div className="text-3xl text-[#8a2be2]">{category.icon}</div>
                  <div className="text-lg font-bold text-black bg-white/70 px-3 py-1 rounded-md">
                    {category.title}
                  </div>
                </div>
                <Link href={category.link}>
                  <Button
                    className="text-sm text-white bg-[#8a2be2]"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    Explore
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
