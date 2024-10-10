"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

const JobPostingForm = () => {
  const { data: session } = useSession();
  console.log(session?.user?.email);
  const userEmail = session?.user?.email;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [skills, setSkills] = useState([]);

  const availableTitles = [
    "Website Development",
    "Mobile App Development",
    "Graphic Design",
    "SEO Services",
    "Content Writing",
    "Digital Marketing",
    "Data Analysis",
    "Virtual Assistant",
  ];

  const availableBudgets = [
    "Under $100",
    "$100 - $500",
    "$500 - $1000",
    "$1000 - $5000",
    "Above $5000",
  ];

  const availableTimelines = [
    "Less than a week",
    "1 week",
    "2 weeks",
    "1 month",
    "More than a month",
  ];

  const availableSkills = [
    "Web Development",
    "Graphic Design",
    "Content Writing",
    "Digital Marketing",
    "Data Entry",
    "SEO",
    "Mobile App Development",
    "Software Development",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      userEmail,
      title,
      description,
      budget,
      timeline,
      skills,
    };

    try {
      const response = await fetch("/api/post-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Job posted successfully:", result);

      // Clear the form
      setTitle("");
      setDescription("");
      setBudget("");
      setTimeline("");
      setSkills([]);
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Post a Job Offer</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-blue-50 p-6 rounded-lg shadow-md space-y-4"
      >
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full text-lg py-3 px-4 rounded-md shadow-sm focus:ring bg-blue-200 focus:ring-blue-300"
            >
              <option value="">Select Job Title</option>
              {availableTitles.map((jobTitle) => (
                <option key={jobTitle} value={jobTitle}>
                  {jobTitle}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Budget
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
              className="mt-1 block w-full bg-blue-200 text-lg py-3 px-4 rounded-md shadow-sm focus:ring focus:ring-blue-300"
            >
              <option value="">Select Budget</option>
              {availableBudgets.map((budgetOption) => (
                <option key={budgetOption} value={budgetOption}>
                  {budgetOption}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col lg:space-x-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full bg-blue-200 text-lg py-3 px-4 rounded-md shadow-sm focus:ring focus:ring-blue-300 overflow-y-auto"
              rows="4"
              style={{ maxHeight: "150px" }} // Scrollbar appears when content exceeds height
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Timeline
            </label>
            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              required
              className="mt-1 block w-full bg-blue-200 text-lg py-3 px-4 rounded-md shadow-sm focus:ring focus:ring-blue-300"
            >
              <option value="">Select Timeline</option>
              {availableTimelines.map((timeOption) => (
                <option key={timeOption} value={timeOption}>
                  {timeOption}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Required Skills
            </label>
            <select
              value={skills}
              onChange={(e) => setSkills([e.target.value])}
              required
              className="mt-1 block w-full text-lg py-3 px-4 rounded-md shadow-sm focus:ring bg-blue-200 focus:ring-blue-300"
            >
              <option value="">Select Required Skill</option>
              {availableSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition duration-300"
        >
          Post Job Offer
        </button>
      </form>
    </div>
  );
};

export default JobPostingForm;
