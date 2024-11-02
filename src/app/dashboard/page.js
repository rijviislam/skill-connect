"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { BiUser } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend, Title);

function Dashboard() {
  const { data: session } = useSession();
  const currentUserRole = session?.user?.role;
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch("/api/get-all-users");
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const totalUsers = users.length;
  const totalClients = users.filter(user => user.role === "client").length;
  const totalFreelancers = users.filter(user => user.role === "freelancer").length;

  const countryData = users.reduce((acc, user) => {
    acc[user.country] = (acc[user.country] || 0) + 1;
    return acc;
  }, {});

  const roleData = {
    labels: ['Clients', 'Freelancers'],
    datasets: [
      {
        label: 'Role Distribution',
        data: [totalClients, totalFreelancers],
        backgroundColor: ['#8A2BE2', '#4682B4'], // Violet and Blue
      },
    ],
  };

  const countryChartData = {
    labels: Object.keys(countryData),
    datasets: [
      {
        label: 'Users by Country',
        data: Object.values(countryData),
        backgroundColor: '#8A2BE2', // Violet
      },
    ],
  };

  return (
    <div>
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-9">
        {currentUserRole === "admin" && (
          <div className="flex flex-col items-center p-4 w-11/12 max-w-xs bg-gradient-to-r from-green-400 to-blue-500 shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn">
            <BiUser className="text-white text-3xl mb-2" />
            <h2 className="text-lg md:text-xl font-semibold text-white">Total Users</h2>
           <p className="text-2xl font-bold text-white">{totalUsers}</p>
             
          </div>
          )}

          <div className="flex flex-col items-center p-4 w-11/12 max-w-xs bg-gradient-to-r from-purple-400 to-pink-500 shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn">
            <FaUsers className="text-white text-3xl mb-2" />
            <h2 className="text-lg md:text-xl font-semibold text-white">Total Clients</h2>
            <p className="text-2xl font-bold text-white">{totalClients}</p>
          </div>

          <div className="flex flex-col items-center p-4 w-11/12 max-w-xs bg-gradient-to-r from-orange-400 to-red-500 shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn">
            <FaUsers className="text-white text-3xl mb-2" />
            <h2 className="text-lg md:text-xl font-semibold text-white">Total Freelancers</h2>
            <p className="text-2xl font-bold text-white">{totalFreelancers}</p>
          </div>
        </div>
     

      {/* Charts container for side-by-side display on larger screens */}
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        {/* Bar chart for users by country */}
        <div className="lg:w-1/2 w-full">
          <h3 className="text-xl font-semibold mb-4">User Distribution by Country</h3>
          <Bar data={countryChartData} options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Users by Country' },
            },
          }} />
        </div>

        {/* Pie chart for role distribution */}
        <div className="lg:w-2/4 w-full mt-8 lg:mt-0">
          <h3 className="text-xl font-semibold mb-4">Role Distribution</h3>
          <Pie data={roleData} options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Role Distribution (Clients vs Freelancers)' },
            },
          }} />
        </div>
      </div>

      {/* List of users */}
      <div>
        {users.map((user) => (
          <div key={user?._id} className="hover:bg-gray-100 ">
            {/* Add user details here if needed */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;
