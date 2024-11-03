"use client";

import Aos from 'aos';
import { useEffect } from 'react';
import { FaArrowRight, FaBriefcase, FaHandshake, FaMoneyBillWave, FaSearch } from 'react-icons/fa';
import 'aos/dist/aos.css'; 

const WorkflowSteps = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 }); 
  }, []);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-left text-3xl sm:text-4xl font-medium text-[#ba6ae8] mb-6 sm:mb-8 mt-8 flex items-center">
          How It Works
          <FaArrowRight className="ml-2" />
        </h2>
        
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8">
          
          {/* Step 1 */}
          <div 
            data-aos="zoom-in-up" 
            className="flex flex-col items-center text-center p-4 w-64 h-64 border-2 hover:border-violet-700 bg-violet-50 shadow-md rounded-2xl transform transition-transform hover:scale-105 hover:bg-violet-50 hover:shadow-xl">
            <div className="w-16 h-16 flex items-center justify-center bg-[#ba6ae8] text-white mb-3 rounded-full transition-colors hover:bg-violet-600">
              <FaBriefcase className="text-3xl" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Post a Job</h3>
            <p className="text-gray-600 p-2">Clients post job listings with details of the project they need help with.</p>
          </div>
          
          {/* Step 2 */}
          <div 
            className="flex flex-col items-center text-center p-4 w-64 h-64 border-2 hover:border-violet-700 bg-violet-50 shadow-md rounded-2xl transform transition-transform hover:scale-105 hover:bg-violet-50 hover:shadow-xl" 
            data-aos="fade-up" 
            data-aos-delay="100"
            >
            <div className="w-16 h-16 flex items-center justify-center bg-[#ba6ae8] text-white mb-3 rounded-full transition-colors hover:bg-violet-600">
              <FaSearch className="text-3xl" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Get Proposals</h3>
            <p className="text-gray-600 p-2">Freelancers submit proposals for the job, detailing their approach and pricing.</p>
          </div>

          {/* Step 3 */}
          <div 
            className="flex flex-col items-center text-center p-4 w-64 h-64 border-2 hover:border-violet-700 bg-violet-50 shadow-md rounded-2xl transform transition-transform hover:scale-105 hover:bg-violet-50 hover:shadow-xl" 
            data-aos="fade-up" 
            data-aos-delay="200"
            >
            <div className="w-16 h-16 flex items-center justify-center bg-[#ba6ae8] text-white mb-3 rounded-full transition-colors hover:bg-violet-600">
              <FaHandshake className="text-3xl" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Hire</h3>
            <p className="text-gray-600 p-2">Clients review proposals and hire the freelancer who best matches their needs.</p>
          </div>
          
          {/* Step 4 */}
          <div 
            className="flex flex-col items-center text-center p-4 w-64 h-64 border-2 hover:border-violet-700 bg-violet-50 shadow-md rounded-2xl transform transition-transform hover:scale-105 hover:bg-violet-50 hover:shadow-xl" 
            data-aos="fade-up" 
            data-aos-delay="300"
            >
            <div className="w-16 h-16 flex items-center justify-center bg-[#ba6ae8] text-white mb-3 rounded-full transition-colors hover:bg-violet-600">
              <FaMoneyBillWave className="text-3xl" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Pay Securely</h3>
            <p className="text-gray-600 p-2">Payment is made through the platform, ensuring secure and reliable transactions.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkflowSteps;
