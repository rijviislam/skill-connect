"use client";
import Image from "next/image";

import Img2 from "../../../Image/Blue White Modern Online Business Webinar Banner Landscape (1).png";
import Img3 from "../../../Image/Digital Marketing.png";
import Img1 from "../../../Image/Img1.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const BannerSlider = () => {
  const settings = {
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="relative overflow-hidden">
      <div className="banner-slider rounded-lg overflow-hidden ">
        <Slider {...settings}>
          <div className="flex justify-center items-center">
            <Image
              className="w-full h-auto max-h-[400px] md:max-h-[500px] lg:max-h-[500px] object-cover rounded-b-xl"
              src={Img1}
              alt="Banner 1"
            />
          </div>
          <div className="flex justify-center items-center">
            <Image
              className="w-full h-auto max-h-[400px] md:max-h-[500px] lg:max-h-[500px] object-cover rounded-b-xl"
              src={Img2}
              alt="Banner 2"
            />
          </div>
          <div className="flex justify-center items-center">
            <Image
              className="w-full h-auto max-h-[400px] md:max-h-[500px] lg:max-h-[500px] object-cover rounded-b-xl"
              src={Img3}
              alt="Banner 3"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default BannerSlider;
