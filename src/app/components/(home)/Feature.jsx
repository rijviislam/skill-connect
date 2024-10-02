import React from 'react';
import Image from 'next/image';
import Img9 from '../../../Image/Artificial intelligence-cuate.png';
import Img10 from '../../../Image/Resume-amico.png';
import Img11 from '../../../Image/Payment Information-bro.png';
import { FaArrowRight } from 'react-icons/fa';

const Feature = () => {
    return (
        <section className="py-12 ">
            <div className="container mx-auto px-4">
            <h2 className="text-left text-4xl font-medium text-[#2e8b57] mb-7 mt-8 flex items-center ">
            Features 
  <FaArrowRight className="ml-2" />
</h2>
               
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-green-50 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-green-100 hover:shadow-xl ">
                        <div className="flex items-center justify-center mb-4">
                            <Image className="w-32 h-32 rounded-full" src={Img9} alt="AI-Powered Job Matching" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-[#2e8b57]">
                            AI-Powered Job Matching
                        </h3>
                        <p className="text-gray-700">
                            Leverage advanced AI algorithms to find the best job matches based on your skills and preferences.
                        </p>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-gray-100 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-200 hover:shadow-xl ">
                        <div className="flex items-center justify-center mb-4">
                            <Image className="w-32 h-32 rounded-full" src={Img10} alt="Verified Skills" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-[#2e8b57]">
                            Verified Skills
                        </h3>
                        <p className="text-gray-700">
                            Ensure that the skills and qualifications listed by freelancers are verified for credibility and accuracy.
                        </p>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-green-50 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-green-100 hover:shadow-xl ">
                        <div className="flex items-center justify-center mb-4">
                            <Image className="w-32 h-32 rounded-full" src={Img11} alt="Secure Payments" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-[#2e8b57]">
                            Secure Payments
                        </h3>
                        <p className="text-gray-700">
                            Enjoy secure and reliable payment transactions with our integrated payment gateway.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feature;
