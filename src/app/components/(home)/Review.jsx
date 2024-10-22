"use client";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import Image from "next/image";
import Img4 from "../../../Image/photo-1500648767791-00dcc994a43e.avif";
import Img5 from "../../../Image/photo-1667053508464-eb11b394df83.avif";
import Img6 from "../../../Image/photo-1723200166097-4eed8c141f03.avif";
import Img7 from "../../../Image/photo-1724159768353-55b083d0d435.avif";
import Img8 from "../../../Image/photo-1630026317249-c1c83b21ea07.avif";
import { FaArrowRight } from "react-icons/fa";


const Review = () => {
  const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setReviews([
            {
                name: "Alice Johnson",
                review: "Working with the team was a great experience! Highly professional and always on time. The project was delivered ahead of schedule, and the communication was top-notch. Highly recommend this service to anyone looking for quality work.",
                image: Img4,
                rating: 4,
            },
            {
                name: "Michael Lee",
                review: "Working with the team was a great experience! Highly professional and always on time. The project was delivered ahead of schedule, and the communication was top-notch. Highly recommend this service to anyone looking for quality work.",
                image: Img5,
                rating: 5,
            },
            {
                name: "Sophie Brown",
                review: "Great platform for freelancers! Got several clients and smooth payments. The interface is user-friendly and the support team is very responsive. It has been a fantastic experience so far, and I am excited to continue using the platform.",
                image: Img6,
                rating: 4,
            },
            {
                name: "Emily Davis",
                review: "Very easy to use platform, and the support team is really helpful. The tools provided are excellent for managing projects, and the overall experience has been positive. The attention to detail and customer service are exceptional.",
                image: Img7,
                rating: 5,
            },
            {
                name: "James Parker",
                review: "A game-changer for freelancers looking for consistent work! The project opportunities are plentiful, and the payment process is seamless. I have found the platform to be very reliable, and it has significantly improved my workflow.",
                image: Img8,
                rating: 4,
            },
        ]);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
    };

    if (reviews.length === 0) return null; 

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-6xl px-6 py-10 mx-auto">
                
            <h2 className="text-left text-4xl font-medium text-[#8a2be2] mb-7 mt-8 flex items-center">
        What clients are saying
        <FaArrowRight className="ml-2" />
      </h2>

                <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
                    <div className="absolute w-full bg-violet-400 -z-10 md:h-96 rounded-2xl"></div>
                    <div className="w-full p-6 bg-violet-400 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
                    <Image
                  className="h-20 w-20 md:mx-6 rounded-full object-cover shadow-md md:h-[24rem] md:w-60 lg:h-[32rem] lg:w-[20rem] md:rounded-2xl"
                       src={reviews[currentIndex].image}
                          alt="client photo"
                             />
                        <div className="mt-2 md:mx-6">
                            <div>
                                <p className="text-xl font-medium tracking-tight text-white">{reviews[currentIndex].name}</p>
                                <p className="text-blue-200">Rating: {reviews[currentIndex].rating} stars</p>
                            </div>
                            <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">{reviews[currentIndex].review}</p>
                            <div className="flex items-center justify-between mt-6 md:justify-start">
                                <button title="left arrow" onClick={handlePrev} className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button title="right arrow" onClick={handleNext} className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 md:mx-6 hover:bg-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default Review;
