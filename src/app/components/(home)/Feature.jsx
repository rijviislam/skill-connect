import React from 'react';
import { FaArrowRight, FaCheckCircle, FaClipboardList, FaLock, FaHandsHelping, FaStar, FaUserCircle } from 'react-icons/fa';

const Feature = () => {
    return (
        <section className="py-6">
            <div className="container mx-auto px-2">
                <h2 className="text-left text-2xl font-medium text-[#8A2BE2] mb-5 mt-6 flex items-center">
                    Features 
                    <FaArrowRight className="ml-2" />
                </h2>
                <div className="bg-violet-100 dark:bg-gray-900">
                    <div className="container px-2 py-6 mx-auto">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {/* Card 1 */}
                            <div className="flex flex-col items-center p-3 bg-white rounded-md shadow-sm">
                                <FaUserCircle className="w-5 h-5 text-violet-600" />
                                <h1 className="mt-2 text-base font-semibold text-gray-800 dark:text-white">User Profiles</h1>
                                <p className="mt-1 text-center text-xs text-gray-500 dark:text-gray-400">Create and manage detailed profiles showcasing skills, portfolios, and client reviews.</p>
                            </div>
                            {/* Card 2 */}
                            <div className="flex flex-col items-center p-3 bg-white rounded-md shadow-sm">
                                <FaClipboardList className="w-5 h-5 text-violet-600" />
                                <h1 className="mt-2 text-base font-semibold text-gray-800 dark:text-white">Job Posting & Bidding</h1>
                                <p className="mt-1 text-center text-xs text-gray-500 dark:text-gray-400">Clients can post jobs with specific requirements, and freelancers can bid on projects.</p>
                            </div>
                            {/* Card 3 */}
                            <div className="flex flex-col items-center p-3 bg-white rounded-md shadow-sm">
                                <FaLock className="w-5 h-5 text-violet-600" />
                                <h1 className="mt-2 text-base font-semibold text-gray-800 dark:text-white">Secure Payment System</h1>
                                <p className="mt-1 text-center text-xs text-gray-500 dark:text-gray-400">Integrated payment gateway ensures secure transactions between clients and freelancers.</p>
                            </div>
                            {/* Card 4 */}
                            <div className="flex flex-col items-center p-3 bg-white rounded-md shadow-sm">
                                <FaCheckCircle className="w-5 h-5 text-violet-600" />
                                <h1 className="mt-2 text-base font-semibold text-gray-800 dark:text-white">Skill Verification</h1>
                                <p className="mt-1 text-center text-xs text-gray-500 dark:text-gray-400">Freelancers can verify their skills, boosting credibility and trust with clients.</p>
                            </div>
                            {/* Card 5 */}
                            <div className="flex flex-col items-center p-3 bg-white rounded-md shadow-sm">
                                <FaHandsHelping className="w-5 h-5 text-violet-600" />
                                <h1 className="mt-2 text-base font-semibold text-gray-800 dark:text-white">Dispute Resolution</h1>
                                <p className="mt-1 text-center text-xs text-gray-500 dark:text-gray-400">Dedicated support for resolving disputes between freelancers and clients.</p>
                            </div>
                            {/* Card 6 */}
                            <div className="flex flex-col items-center p-3 bg-white rounded-md shadow-sm">
                                <FaStar className="w-5 h-5 text-violet-600" />
                                <h1 className="mt-2 text-base font-semibold text-gray-800 dark:text-white">Ratings & Reviews</h1>
                                <p className="mt-1 text-center text-xs text-gray-500 dark:text-gray-400">Clients can leave feedback on completed projects, helping others make informed decisions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feature;
