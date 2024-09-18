"use client";


import React from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const BannerSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };
    
    return (
        <div>
             <div className="banner-slider">
      <Slider {...settings}>
        <div  >
          <img    src="https://i.postimg.cc/c1R5cPK2/Green-and-White-Modern-Job-Vacation-Banner-2.png" alt="Banner 1" />
        </div>
        <div>
          <img src="https://i.postimg.cc/FKbJ6bjr/Blue-White-Modern-Online-Business-Webinar-Banner-Landscape-1.png" alt="Banner 2" />
        </div>
        <div>
          <img src="https://i.postimg.cc/T11LhZB1/Digital-Marketing.png" alt="Banner 3" />
        </div>
      </Slider>
     
      <style jsx>{`
        .banner-slider img {
          width: 100%;
          padding : 50px;
          max-height: 550px;
        }
      `}</style>
    </div>
        </div>
    );
};

export default BannerSlider;