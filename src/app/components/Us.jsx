import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';
import us from "../../Image/Contact us-cuate.png"

const Us = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-4xl font-bold mb-8 text-center text-sea-green-600">
                Get in Touch
            </h1>

            <div className="flex flex-col md:flex-row md:space-x-8 mb-12">
                {/* Contact Information */}
                <div className="bg-green-50 shadow-md rounded-2xl p-6 flex-1 transition-transform transform hover:scale-105">
                    <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                    <div className="flex items-center mb-4">
                        <FaEnvelope className="text-sea-green-600 mr-2" />
                        <span className="text-gray-700">info@skillconnect.com</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <FaPhone className="text-sea-green-600 mr-2" />
                        <span className="text-gray-700">+1 234 567 890</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <FaMapMarkerAlt className="text-sea-green-600 mr-2" />
                        <span className="text-gray-700">123 Freelance St, City, Country</span>
                    </div>
                </div>

                {/* Contact Form */}
                <form className="bg-green-50 shadow-2xl rounded-lg p-6 flex-1 transition-transform transform hover:scale-105 ">
                    <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="border border-green-200 p-2 mb-4 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-400 transition duration-300 hover:border-green-ring-green-400"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="border border-green-200 p-2 mb-4 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-400 transition duration-300 hover:border-green-ring-green-400"
                        required
                    />
                    <textarea
                        placeholder="Your Message"
                        className="border border-green-200 p-2 mb-4 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-400 transition duration-300 hover:border-green-ring-green-400"
                        rows="4"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-green-200 text-black    font-bold py-2 px-4 rounded-lg hover:bg-green-ring-green-400 transition duration-300"
                    >
                        Send Message
                    </button>
                </form>
            </div>

            {/* Contact Image */}
            <div className="relative mb-12 w-full max-w-md ">
                <Image
                    src={us}
                    alt="Contact Us"
                    layout="responsive"
                    className="rounded-lg shadow-md transition-transform transform hover:scale-105"
                />
            </div>
        </div>
    );
};

export default Us;
