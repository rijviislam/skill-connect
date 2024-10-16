"use client";

import React from 'react';
import { Card, CardFooter, Image, Button } from '@nextui-org/react';
import { FaDesktop, FaCode, FaPen, FaCamera, FaMusic, FaMobileAlt, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';  // Import Next.js Link component

const TopCategories = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-left text-4xl font-medium text-[#2e8b57] mb-7 mt-8 flex items-center">
        Most Popular Categories
        <FaArrowRight className="ml-2" />
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Graphic Design */}
        
          <Card
            isFooterBlurred
            radius="lg"
            className="border-4 border-transparent hover:border-[#92ff67] transition duration-300 ease-in-out w-full transform hover:scale-105 hover:shadow-xl"
          >
            <Image
              alt="Graphic Design"
              className="object-cover"
              height={250}
              src="https://i.postimg.cc/x88nq8Js/dose-media-gx-Gtq-G5ul2g-unsplash.jpg"
              width="100%"
            />
            <CardFooter className="justify-between before:bg-white/55 border-white/40 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-lg bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <div className="flex items-center space-x-2 text-center">
                <div className="text-3xl text-green-500"><FaDesktop size={24} /></div>
                <div className="text-lg font-bold text-green-400">Graphic Design</div>
              </div>
              <Link href="graphic-design" >  <Button className="text-sm text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                Explore
              </Button>
              </Link>
            </CardFooter>
          </Card>
        

        {/* Web Development */}
   
          <Card
            isFooterBlurred
            radius="lg"
            className="border-4 border-transparent hover:border-[#92ff67] transition duration-300 ease-in-out w-full transform hover:scale-105 hover:shadow-xl"
          >
            <Image
              alt="Web Development"
              className="object-cover"
              height={250}
              src="https://i.postimg.cc/cCWZMhbb/farzad-p-x-Sl33-Wxyc-unsplash.jpg"
              width="100%"
            />
            <CardFooter className="justify-between before:bg-white/55 border-white/40 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-lg bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <div className="flex items-center space-x-2 text-center">
                <div className="text-3xl text-green-500"><FaCode size={24} /></div>
                <div className="text-lg font-bold text-green-400">Web Development</div>
              </div>
              <Link href="/web-development" > <Button className="text-sm text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                Explore
              </Button>
              </Link>
            </CardFooter>
          </Card>
        

        {/* Content Writing */}
        {/* Route for Content Writing */}
          <Card
            isFooterBlurred
            radius="lg"
            className="border-4 border-transparent hover:border-[#92ff67] transition duration-300 ease-in-out w-full transform hover:scale-105 hover:shadow-xl"
          >
            <Image
              alt="Content Writing"
              className="object-cover"
              height={250}
              src="https://i.postimg.cc/mkpX22Cy/unseen-studio-s9-CC2-SKy-SJM-unsplash.jpg"
              width="100%"
            />
            <CardFooter className="justify-between before:bg-white/55 border-white/40 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-lg bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <div className="flex items-center space-x-2 text-center">
                <div className="text-3xl text-green-500"><FaPen size={24} /></div>
                <div className="text-lg font-bold text-green-400">Content Writing</div>
              </div>
              <Link href="/content-writing" > <Button className="text-sm text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                Explore
              </Button>
              </Link>
            </CardFooter>
          </Card>
       

        {/* Photography */}
          {/* Route for Photography */}
          <Card
            isFooterBlurred
            radius="lg"
            className="border-4 border-transparent hover:border-[#92ff67] transition duration-300 ease-in-out w-full transform hover:scale-105 hover:shadow-xl"
          >
            <Image
              alt="Photography"
              className="object-cover"
              height={250}
              src="https://i.postimg.cc/mZm6SVJ1/jamie-street-q-WYv-QMIJyf-E-unsplash.jpg"
              width="100%"
            />
            <CardFooter className="justify-between before:bg-white/55 border-white/40 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-lg bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <div className="flex items-center space-x-2 text-center">
                <div className="text-3xl text-green-500"><FaCamera size={24} /></div>
                <div className="text-lg font-bold text-green-400">Photography</div>
              </div>
              <Link href="/photography" > <Button className="text-sm text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                Explore
              </Button>
              </Link>
            </CardFooter>
          </Card>
       

        {/* Music Production */}
          {/* Route for Music Production */}
          <Card
            isFooterBlurred
            radius="lg"
            className="border-4 border-transparent hover:border-[#92ff67] transition duration-300 ease-in-out w-full transform hover:scale-105 hover:shadow-xl"
          >
            <Image
              alt="Music Production"
              className="object-cover"
              height={250}
              src="https://i.postimg.cc/tgGrgcZw/caught-in-joy-Puk-ZSAi-K5o-unsplash.jpg"
              width="100%"
            />
            <CardFooter className="justify-between before:bg-white/55 border-white/40 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-lg bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <div className="flex items-center space-x-2 text-center">
                <div className="text-3xl text-green-500"><FaMusic size={24} /></div>
                <div className="text-lg font-bold text-green-400">Music Production</div>
              </div>
              <Link href="/music-production" > <Button className="text-sm text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                Explore
              </Button>
              </Link>

            </CardFooter>
          </Card>
      

        {/* App Development */}
          {/* Route for App Development */}
          <Card
            isFooterBlurred
            radius="lg"
            className="border-4 border-transparent hover:border-[#92ff67] transition duration-300 ease-in-out w-full transform hover:scale-105 hover:shadow-xl"
          >
            <Image
              alt="App Development"
              className="object-cover"
              height={250}
              src="https://i.postimg.cc/QtX0QWqq/wahid-khene-i-Kd-QCIi-SMl-Q-unsplash.jpg"
              width="100%"
            />
            <CardFooter className="justify-between before:bg-white/55 border-white/40 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-lg bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <div className="flex items-center space-x-2 text-center">
                <div className="text-3xl text-green-500"><FaMobileAlt size={24} /></div>
                <div className="text-lg font-bold text-green-400">App Development</div>
              </div>
              <Link href="/app-development" > <Button className="text-sm text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                Explore
              </Button>
              </Link>
            </CardFooter>
          </Card>
       
      </div>
    </div>
  );
};

export default TopCategories;
