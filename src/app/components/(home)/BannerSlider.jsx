"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import banner from "../../../Image/Working remotely-cuate.png";

const BannerSlider = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  return (
    <div>
      <div className="h-[500px] md:h-[800px] lg:h-[400px] xl:h-[400px] bg-gradient-to-r from-green-400 to-blue-300">
        <div className="container mx-auto flex flex-col lg:flex-row-reverse items-center justify-center py-5 px-4 h-full">
          <Image
            src={banner}
            alt="Digital Web Design"
            className="max-w-full lg:max-w-2xl rounded-lg h-auto"
            layout="responsive"
            objectFit="cover"
          />
          <div className="text-center lg:text-left mb-10 md:mb-56 lg:mb-1 lg:mr-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-gray-800">
              FIND THE RIGHT FREELANCER
            </h1>
            <p className="py-2 text-lg sm:text-xl md:text-xl text-gray-100">
              FOR YOUR NEXT PROJECT
            </p>
            {!isAuthenticated && (
              <Link href="/api/auth/signup">
                <button className="bg-transparent border-2 border-green-900 hover:bg-green-500 hover:text-white text-green-800 font-semibold py-2 px-6 transition duration-300 w-28 rounded-xl">
                  Sign Up
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
