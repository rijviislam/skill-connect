"use client"

import React, { useState } from 'react';

const JobPostingForm = () => {
  const baseUrl = process.env.NEXT_PUBLIC_NEXT_URL;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [timeline, setTimeline] = useState('');
    const [skills, setSkills] = useState([]);

    const availableTitles = [
        "Website Development",
        "Mobile App Development",
        "Graphic Design",
        "SEO Services",
        "Content Writing",
        "Digital Marketing",
        "Data Analysis",
        "Virtual Assistant"
    ];

    const availableBudgets = [
        "Under $100",
        "$100 - $500",
        "$500 - $1000",
        "$1000 - $5000",
        "Above $5000"
    ];

    const availableTimelines = [
        "Less than a week",
        "1 week",
        "2 weeks",
        "1 month",
        "More than a month"
    ];

    const availableSkills = [
        "Web Development",
        "Graphic Design",
        "Content Writing",
        "Digital Marketing",
        "Data Entry",
        "SEO",
        "Mobile App Development",
        "Software Development"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Create a job object to send to the server
        const jobData = {
            title,
            description,
            budget,
            timeline,
            skills,
        };

        try {
            // Make a POST request to your server
            const response = await fetch((`${baseUrl}/api/post-job`),
             {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

           
            const result = await response.json();
            console.log('Job posted successfully:', result);

           
            setTitle('');
            setDescription('');
            setBudget('');
            setTimeline('');
            setSkills([]);
        } catch (error) {
            console.error('Error posting job:', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Post a Job Offer</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Job Title</label>
                    <select
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    >
                        <option value="">Select Job Title</option>
                        {availableTitles.map((jobTitle) => (
                            <option key={jobTitle} value={jobTitle}>
                                {jobTitle}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        rows="4"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Budget</label>
                    <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    >
                        <option value="">Select Budget</option>
                        {availableBudgets.map((budgetOption) => (
                            <option key={budgetOption} value={budgetOption}>
                                {budgetOption}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Timeline</label>
                    <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    >
                        <option value="">Select Timeline</option>
                        {availableTimelines.map((timeOption) => (
                            <option key={timeOption} value={timeOption}>
                                {timeOption}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Required Skills</label>
                    <select
                        multiple
                        value={skills}
                        onChange={(e) => setSkills([...e.target.selectedOptions].map(option => option.value))}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    >
                        {availableSkills.map((skill) => (
                            <option key={skill} value={skill}>
                                {skill}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-300"
                >
                    Post Job Offer
                </button>
            </form>
        </div>
    );
};

export default JobPostingForm;
