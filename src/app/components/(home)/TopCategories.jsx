"use client";

import React from 'react';
import { Card, CardFooter, Image, Button } from '@nextui-org/react';
import { FaDesktop, FaCode, FaPen, FaCamera, FaMusic, FaVideo, FaMobileAlt, FaShoppingCart, FaBook, FaArrowRight } from 'react-icons/fa';

const cardData = [
  {
    id: 1,
    title: 'Graphic Design',
    description: 'Explore stunning designs.',
    imageUrl: 'https://i.postimg.cc/x88nq8Js/dose-media-gx-Gtq-G5ul2g-unsplash.jpg',
    icon: <FaDesktop size={24} />,
  },
  {
    id: 2,
    title: 'Web Development',
    description: 'Build dynamic websites.',
    imageUrl: 'https://i.postimg.cc/cCWZMhbb/farzad-p-x-Sl33-Wxyc-unsplash.jpg',
    icon: <FaCode size={24} />,
  },
  {
    id: 3,
    title: 'Content Writing',
    description: 'Engage with great content.',
    imageUrl: 'https://i.postimg.cc/mkpX22Cy/unseen-studio-s9-CC2-SKy-SJM-unsplash.jpg',
    icon: <FaPen size={24} />,
  },
  {
    id: 4,
    title: 'Photography',
    description: 'Capture perfect moments.',
    imageUrl: 'https://i.postimg.cc/mZm6SVJ1/jamie-street-q-WYv-QMIJyf-E-unsplash.jpg',
    icon: <FaCamera size={24} />,
  },
  {
    id: 5,
    title: 'Music Production',
    description: 'Produce inspiring tracks.',
    imageUrl: 'https://i.postimg.cc/tgGrgcZw/caught-in-joy-Puk-ZSAi-K5o-unsplash.jpg',
    icon: <FaMusic size={24} />,
  },
  {
    id: 6,
    title: 'Video Editing',
    description: 'Edit stunning videos.',
    imageUrl: 'https://i.postimg.cc/QtX0QWqq/wahid-khene-i-Kd-QCIi-SMl-Q-unsplash.jpg',
    icon: <FaVideo size={24} />,
  },
  {
    id: 7,
    title: 'App Development',
    description: 'Develop innovative apps.',
    imageUrl: 'https://i.postimg.cc/hjpMpPyR/jexo-y-Vx-UC9-I9-Cik-unsplash.jpg',
    icon: <FaMobileAlt size={24} />,
  },
  {
    id: 8,
    title: 'E-commerce',
    description: 'Build online stores.',
    imageUrl: 'https://i.postimg.cc/7hR9rtrB/shoper-sl-Lo94w-ES2-M-unsplash.jpg',
    icon: <FaShoppingCart size={24} />,
  },
  {
    id: 9,
    title: 'Writing & Translation',
    description: 'Craft engaging translations.',
    imageUrl: 'https://i.postimg.cc/2Shwgxcw/aaron-burden-y02j-EX-B0-O0-unsplash.jpg',
    icon: <FaBook size={24} />,
  },
];

const TopCategories = () => (

    <div className="container mx-auto p-6">
      <h2 className="text-left text-4xl font-medium text-[#2e8b57] mb-7 mt-8 flex items-center">
        Most Popular Categories 
        <FaArrowRight className="ml-2" />
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <Card
            key={card.id}
            isFooterBlurred
            radius="lg"
            className="border-4 border-transparent hover:border-[#92ff67] transition duration-300 ease-in-out w-full transform hover:scale-105 hover:shadow-xl"
          >
            <Image
              alt={card.title}
              className="object-cover"
              height={250} // Adjusted height to make the image bigger
              src={card.imageUrl}
              width="100%"
            />
            <CardFooter className="justify-between before:bg-white/55 border-white/40 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-lg bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <div className="flex items-center space-x-2 text-center">
                <div className="text-3xl text-green-500">{card.icon}</div>
                <div className="text-lg font-bold text-green-400">{card.title}</div>
              </div>
              <Button className="text-sm text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                Explore
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
 
  
);

export default TopCategories;
