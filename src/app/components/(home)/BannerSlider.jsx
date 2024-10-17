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
      {/* <div className="h-[500px] md:h-[800px] lg:h-[400px] xl:h-[400px] bg-gradient-to-r from-green-400 to-blue-300">
        <div className="container mx-auto flex flex-col lg:flex-row-reverse items-center justify-center py-5 px-4 h-full">
       
          <div className="text-center lg:text-left mb-10 md:mb-56 lg:mb-1 lg:mr-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-gray-800">
              FIND THE RIGHT FREELANCER
            </h1>
            <p className="py-2 text-lg sm:text-xl md:text-xl text-gray-100">
              FOR YOUR NEXT PROJECT
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BannerSlider;
