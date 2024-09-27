"use client";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import Image from "next/image";
import Img4 from "../../../Image/photo-1500648767791-00dcc994a43e.avif";
import Img5 from "../../../Image/photo-1667053508464-eb11b394df83.avif";
import Img6 from "../../../Image/photo-1723200166097-4eed8c141f03.avif";
import Img7 from "../../../Image/photo-1724159768353-55b083d0d435.avif";
import Img8 from "../../../Image/photo-1630026317249-c1c83b21ea07.avif";

const Review = () => {
  const [reviews, setReviews] = useState([]);

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
        review: "Outstanding work and a smooth collaboration process. Highly recommended! The team went above and beyond to ensure that all my requirements were met. The final product exceeded my expectations in every way. Will definitely work with them again.",
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
        review: "A game-changer for freelancers looking for consistent work! The project opportunities are plentiful, and the payment process is seamless. I’ve found the platform to be very reliable, and it has significantly improved my workflow.",
        image: Img8,
        rating: 4,
      },
    ]);
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="py-16 ">
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8  ">
        <h2 className="col-span-full text-center text-5xl font-semibold  text-[#2e8b57] mb-4 mt-8">
          Client & Freelancer Reviews
        </h2>
        <hr className="border-t-2 border-[#2e8b57] mb-8 mx-auto w-2/12 md:w-1/3" />
        
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="bg-green-50 p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:bg-teal-50 hover:shadow-2xl">
              <div className="flex justify-center mb-4">
                <Image
                  src={review.image}
                  alt={`${review.name} Image`}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-[#2e8b57]"
                />
              </div>
              <h3 className="text-lg font-semibold text-center mb-2 text-[#2e8b57]">{review.name}</h3>
              <p className="text-center text-gray-700 mb-4 leading-relaxed max-w-[90%] mx-auto">{review.review}</p>
              <div className="flex justify-center">
                <span className="text-yellow-500 text-xl">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Review;
