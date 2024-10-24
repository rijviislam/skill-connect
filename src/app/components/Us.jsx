"use client"; 

import React, { useRef } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';

const Us = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_oc810c5', 'template_mkxn43o', form.current, 'Lx8Fuf5oLGPVQgKm2')
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent!',
                    text: 'Your message has been successfully sent.',
                    confirmButtonColor: '#38a169',
                });
                form.current.reset();
            }, () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again later.',
                    confirmButtonColor: '#e53e3e',
                });
            });
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-12 mx-auto">
                <div>
                    <p className="font-bold text-violet-600 dark:text-blue-400 uppercase tracking-widest">Contact Us</p>
                    <h1 className="mt-2 text-3xl font-extrabold text-gray-800 md:text-4xl dark:text-white">
                        Chat with our <span className="text-violet-500">Friendly Team</span>
                    </h1>
                    <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                        We’d love to hear from you! Please fill out this form or send us an email.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                        <div className="p-6 rounded-lg shadow-lg bg-blue-50 dark:bg-gray-800">
                            <span className="inline-block p-3 text-violet-600 rounded-full bg-blue-200/80 dark:bg-gray-800">
                                <FaEnvelope className="w-6 h-6" />
                            </span>
                            <h2 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">Email</h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Our friendly team is here to help.</p>
                            <p className="mt-2 text-sm text-violet-600 dark:text-blue-400 font-semibold">hello@skillconnect.com</p>
                        </div>

                        <div className="p-6 rounded-lg shadow-lg bg-blue-50 dark:bg-gray-800">
                            <span className="inline-block p-3 text-violet-600 rounded-full bg-blue-200/80 dark:bg-gray-800">
                                <FaPhone className="w-6 h-6" />
                            </span>
                            <h2 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">Phone</h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Mon-Fri from 8am to 5pm.</p>
                            <p className="mt-2 text-sm text-violet-600 dark:text-blue-400 font-semibold">+1 (555) 000-0000</p>
                        </div>

                        <div className="p-6 rounded-lg shadow-lg bg-blue-50 dark:bg-gray-800">
                            <span className="inline-block p-3 text-violet-600 rounded-full bg-blue-200/80 dark:bg-gray-800">
                                <FaMapMarkerAlt className="w-6 h-6" />
                            </span>
                            <h2 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">Office</h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Visit us at our HQ office.</p>
                            <p className="mt-2 text-sm text-violet-600 dark:text-blue-400 font-semibold">100 Smith St, Collingwood, VIC 3066</p>
                        </div>

                        <div className="p-6 rounded-lg shadow-lg bg-blue-50 dark:bg-gray-800">
                            <span className="inline-block p-3 text-violet-600 rounded-full bg-blue-200/80 dark:bg-gray-800">
                                <FaEnvelope className="w-6 h-6" />
                            </span>
                            <h2 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">Live Chat</h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">We’re here to assist you online.</p>
                            <p className="mt-2 text-sm text-violet-600 dark:text-blue-400 font-semibold">Start new chat</p>
                        </div>
                    </div>

                    <div className="p-6 py-6 rounded-lg bg-white dark:bg-gray-800 md:p-8 shadow-lg">
                        <form ref={form} onSubmit={sendEmail}>
                            <div className="-mx-2 md:items-center md:flex">
                                <div className="flex-1 px-2">
                                    <label className="block mb-2 text-sm font-bold text-gray-600 dark:text-gray-200">First Name</label>
                                    <input 
                                        type="text" 
                                        name="first_name" 
                                        className="block w-full px-5 py-2.5 mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        required 
                                    />
                                </div>

                                <div className="flex-1 px-2 mt-4 md:mt-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-600 dark:text-gray-200">Last Name</label>
                                    <input 
                                        type="text" 
                                        name="last_name" 
                                        className="block w-full px-5 py-2.5 mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-bold text-gray-600 dark:text-gray-200">Email Address</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    className="block w-full px-5 py-2.5 mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    required 
                                />
                            </div>

                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-bold text-gray-600 dark:text-gray-200">Message</label>
                                <textarea 
                                    name="message" 
                                    className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    placeholder="Type your message..." 
                                    required
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full px-6 py-3 mt-4 text-sm font-semibold text-white bg-violet-600 rounded-lg hover:bg-violet-500 focus:ring-4 focus:ring-blue-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Us;
