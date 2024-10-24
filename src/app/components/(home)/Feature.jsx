"use client"; 

import React from 'react';
import { FaArrowRight, FaCheckCircle, FaClipboardList, FaLock, FaHandsHelping, FaStar, FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { 
        scale: 1.05, 
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)", 
        backgroundColor: "#f0f0ff", // Subtle background color change
        borderColor: "#8A2BE2", // Border color change
        transition: { duration: 0.3 }
    },
};

const iconVariants = {
    hover: { color: "#8A2BE2", transition: { duration: 0.3 } }, // Icon color change
};

const Feature = () => {
    return (
        <section className="py-6">
            <div className="container mx-auto px-2">
                <h2 className="text-left text-4xl font-medium text-[#8A2BE2] mb-5 mt-6 flex items-center">
                    Features 
                    <FaArrowRight className="ml-2" />
                </h2>
                <div className="container px-2 py-6 mx-auto">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Card 1 */}
                        <motion.div 
                            className="flex flex-col items-center p-5 bg-violet-50   rounded-lg shadow-xl  border-2 border-transparent transition-all"
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                        >
                            <motion.div className="icon-container" variants={iconVariants} whileHover="hover">
                                <FaUserCircle className="w-12 h-12 text-violet-600 mb-3" />
                            </motion.div>
                            <h1 className="mt-2 text-base font-semibold text-gray-800">User Profiles</h1>
                            <p className="mt-1 text-center text-sm text-gray-500">Create and manage detailed profiles showcasing skills, portfolios, and client reviews.</p>
                        </motion.div>
                        {/* Card 2 */}
                        <motion.div 
                            className="flex flex-col items-center p-5 bg-violet-50   rounded-lg shadow-xl  border-2 border-transparent transition-all"
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                        >
                            <motion.div className="icon-container" variants={iconVariants} whileHover="hover">
                                <FaClipboardList className="w-12 h-12 text-violet-600 mb-3" />
                            </motion.div>
                            <h1 className="mt-2 text-base font-semibold text-gray-800">Job Posting & Bidding</h1>
                            <p className="mt-1 text-center text-sm text-gray-500">Clients can post jobs with specific requirements, and freelancers can bid on projects.</p>
                        </motion.div>
                        {/* Card 3 */}
                        <motion.div 
                            className="flex flex-col items-center p-5 bg-violet-50   
                            
                            rounded-lg shadow-xl  border-2 border-transparent transition-all"
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                        >
                            <motion.div className="icon-container" variants={iconVariants} whileHover="hover">
                                <FaLock className="w-12 h-12 text-violet-600 mb-3" />
                            </motion.div>
                            <h1 className="mt-2 text-base font-semibold text-gray-800">Secure Payment System</h1>
                            <p className="mt-1 text-center text-sm text-gray-500">Integrated payment gateway ensures secure transactions between clients and freelancers.</p>
                        </motion.div>
                        {/* Card 4 */}
                        <motion.div 
                            className="flex flex-col items-center p-5 bg-violet-50   rounded-lg shadow-xl  border-2 border-transparent transition-all"
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                        >
                            <motion.div className="icon-container" variants={iconVariants} whileHover="hover">
                                <FaCheckCircle className="w-12 h-12 text-violet-600 mb-3" />
                            </motion.div>
                            <h1 className="mt-2 text-base font-semibold text-gray-800">Skill Verification</h1>
                            <p className="mt-1 text-center text-sm text-gray-500">Freelancers can verify their skills, boosting credibility and trust with clients.</p>
                        </motion.div>
                        {/* Card 5 */}
                        <motion.div 
                            className="flex flex-col items-center p-5 bg-violet-50   rounded-lg shadow-xl  border-2 border-transparent transition-all"
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                        >
                            <motion.div className="icon-container" variants={iconVariants} whileHover="hover">
                                <FaHandsHelping className="w-12 h-12 text-violet-600 mb-3" />
                            </motion.div>
                            <h1 className="mt-2 text-base font-semibold text-gray-800">Dispute Resolution</h1>
                            <p className="mt-1 text-center text-sm text-gray-500">Dedicated support for resolving disputes between freelancers and clients.</p>
                        </motion.div>
                        {/* Card 6 */}
                        <motion.div 
                            className="flex flex-col items-center p-5 bg-violet-50   rounded-lg shadow-xl  border-2 border-transparent transition-all"
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                        >
                            <motion.div className="icon-container" variants={iconVariants} whileHover="hover">
                                <FaStar className="w-12 h-12 text-violet-600 mb-3" />
                            </motion.div>
                            <h1 className="mt-2 text-base font-semibold text-gray-800">Ratings & Reviews</h1>
                            <p className="mt-1 text-center text-sm text-gray-500">Clients can leave feedback on completed projects, helping others make informed decisions.</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feature;
