"use client";
import Image from "next/image";

import Img1 from "../../Image/Blue White Modern Online Business Webinar Banner Landscape (1).png";
import Img2 from "../../Image/Digital Marketing.png";
import Img3 from "../../Image/Green and White Modern Job Vacation Banner (2).png"

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerSlider = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
      <div className="relative overflow-hidden">
      <div className="banner-slider rounded-lg overflow-hidden px-5 ">
          <Slider {...settings}>
              <div className="flex justify-center items-center">
                  <Image
                      className="w-full h-[500px] rounded-2xl" 
                      src={Img1}
                      alt="Banner 1"
                  />
              </div>
              <div className="flex justify-center items-center">
                  <Image
                      className="w-full h-[500px] rounded-2xl"
                      src={Img2}
                      alt="Banner 2"
                  />
              </div>
              <div className="flex justify-center items-center">
                  <Image
                      className="w-full h-[500px] rounded-2xl" 
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
