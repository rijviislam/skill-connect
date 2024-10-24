"use client";

import React from 'react';
import { Line, Bar } from 'react-chartjs-2'; 
import { Chart, registerables } from 'chart.js'; 
import { FaDollarSign, FaUsers, FaProjectDiagram } from 'react-icons/fa'; 
import 'animate.css'; 

// Register the necessary Chart.js components
Chart.register(...registerables);

function Dashboard() {
  // Sample data for charts
  const earningsData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Earnings',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const projectsData = {
    labels: ['Project A', 'Project B', 'Project C', 'Project D'],
    datasets: [
      {
        label: 'Number of Projects',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: [12, 19, 3, 5],
      },
    ],
  };

  return (
    <div className="">
      
      {/* Dashboard Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {/* Total Earnings */}
        <div className="flex flex-col items-center p-6 bg-gradient-to-r from-green-400 to-blue-500 shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn">
          <FaDollarSign className="text-white text-3xl mb-2" />
          <h2 className="text-lg md:text-xl font-semibold text-white">Total Earnings</h2>
          <p className="text-2xl font-bold text-white">$10,000</p>
        </div>
        
        {/* Total Clients */}
        <div className="flex flex-col items-center p-6 bg-gradient-to-r from-purple-400 to-pink-500 shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn">
          <FaUsers className="text-white text-3xl mb-2" />
          <h2 className="text-lg md:text-xl font-semibold text-white">Total Clients</h2>
          <p className="text-2xl font-bold text-white">250</p>
        </div>
        
        {/* Ongoing Projects */}
        <div className="flex flex-col items-center p-6 bg-gradient-to-r from-orange-400 to-red-500 shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn">
          <FaProjectDiagram className="text-white text-3xl mb-2" />
          <h2 className="text-lg md:text-xl font-semibold text-white">Ongoing Projects</h2>
          <p className="text-2xl font-bold text-white">15</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-8 flex flex-col md:flex-row justify-between w-full">
        {/* Earnings Over Time (Line Chart) */}
        <div className="flex-grow m-2 bg-white shadow-md rounded-lg p-4 max-w-lg animate__animated animate__fadeIn">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Earnings Over Time</h2>
          <Line data={earningsData} options={{ responsive: true }} />
        </div>

        {/* Number of Projects (Bar Chart) */}
        <div className="flex-grow m-2 bg-white shadow-md rounded-lg p-4 max-w-lg animate__animated animate__fadeIn">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Number of Projects</h2>
          <Bar data={projectsData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
