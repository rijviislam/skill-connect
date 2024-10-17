"use client";
import Image from "next/image";
import banner from "../../../Image/skill-connect_mv2-removebg-preview.png";

const BannerSlider = () => {
  return (
    <div className=" w-full relative">
      <Image
        src={banner}
        alt="Digital Web Design"
        className="max-w-full lg:max-w-full rounded-lg h-auto"
        layout="responsive"
        objectFit="cover"
      />
      <div className=" absolute left-20 z-50  top-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-white">
          FIND THE RIGHT <br /> FREELANCER
        </h1>
      </div>
    </div>
  );
};

export default BannerSlider;
