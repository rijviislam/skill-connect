// "use client";

// import 'animate.css';
// import { Chart, registerables } from 'chart.js';
// import { useEffect, useState } from 'react';
// import { Bar, Line, Pie } from 'react-chartjs-2'; // Import Pie
// import { FaDollarSign, FaUsers } from 'react-icons/fa';

// // Register the necessary Chart.js components
// Chart.register(...registerables);

// function Dashboard() {
//   const [users, setUsers] = useState([]);
//   const [totalFreelancerEarnings, setTotalFreelancerEarnings] = useState(0);
//   const [totalClientPayments, setTotalClientPayments] = useState(0);
//   const [clientsCount, setClientsCount] = useState(0);
//   const [freelancersCount, setFreelancersCount] = useState(0);
//   const [paymentData, setPaymentData] = useState({});
//   const [earningsData, setEarningsData] = useState({});
//   const [earningsPieData, setEarningsPieData] = useState({}); // New state for pie chart
//   const [loading, setLoading] = useState(true);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/get-all-users");
//       if (!response.ok) throw new Error("Network response was not ok");
//       const data = await response.json();
//       setUsers(data);
//       updateUserStats(data);
//     } catch (error) {
//       console.error("Failed to fetch users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateUserStats = (data) => {
//     const freelancers = data.filter(user => user.role === 'freelancer');
//     const clients = data.filter(user => user.role === 'client');

//     setFreelancersCount(freelancers.length);
//     setClientsCount(clients.length);

//     const earnings = freelancers.reduce((acc, user) => acc + user.paymentInfo.totalEarnings, 0);
//     setTotalFreelancerEarnings(earnings);

//     const payments = clients.reduce((acc, user) => acc + user.paymentInfo.totalPayments, 0);
//     setTotalClientPayments(payments);

//     // Bar chart data for payments distribution
//     setPaymentData({
//       labels: clients?.map(client => client.username || "Unknown"),
//       datasets: [{
//         label: 'Payments Distribution',
//         data: clients?.map(client => client.paymentInfo?.totalPayments || 0),
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       }],
//     });
    

//     // Line chart data for freelancer earnings over time
//     setEarningsData({
//       labels: freelancers?.map(user => user.username),
//       datasets: [{
//         label: 'Earnings',
//         data: freelancers?.map(user => user.paymentInfo.totalEarnings),
//         fill: false,
//         borderColor: 'rgba(255, 206, 86, 1)',
//         tension: 0.1,
//       }],
//     });

//     // Pie chart data for freelancer earnings distribution
//     setEarningsPieData({
//       labels: freelancers?.map(user => user.username),
//       datasets: [{
//         label: 'Freelancer Earnings Distribution',
//         data: freelancers?.map(user => user.paymentInfo.totalEarnings),
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.6)',
//           'rgba(54, 162, 235, 0.6)',
//           'rgba(255, 206, 86, 0.6)',
//           'rgba(75, 192, 192, 0.6)',
//           'rgba(153, 102, 255, 0.6)',
//         ],
//       }],
//     });
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="">
//       {/* Loading state */}
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           {/* Dashboard Statistics */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
//             {/* Total Freelancers Earnings */}
//             <div className="flex flex-col items-center p-6 bg-gradient-to-r from-green-400 to-blue-500 shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn">
//               <FaDollarSign className="text-white text-3xl mb-2" />
//               <h2 className="text-lg md:text-xl font-semibold text-white">Total Freelancer Earnings</h2>
//               <p className="text-2xl font-bold text-white">${totalFreelancerEarnings}</p>
//             </div>

//             {/* Total Clients */}
//             <div className="flex flex-col items-center p-6 bg-gradient-to-r from-purple-400 to-pink-500 shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn">
//               <FaUsers className="text-white text-3xl mb-2" />
//               <h2 className="text-lg md:text-xl font-semibold text-white">Total Clients</h2>
//               <p className="text-2xl font-bold text-white">{clientsCount}</p>
//             </div>

//             {/* Total Freelancers */}
//             <div className="flex flex-col items-center p-6 bg-gradient-to-r from-orange-400 to-red-500 shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn">
//               <FaUsers className="text-white text-3xl mb-2" />
//               <h2 className="text-lg md:text-xl font-semibold text-white">Total Freelancers</h2>
//               <p className="text-2xl font-bold text-white">{freelancersCount}</p>
//             </div>
//           </div>

//           {/* Chart Section */}
//           <div className="mt-8 flex flex-col md:flex-row justify-between w-full">
//             {/* Payments Distribution Bar Chart */}
//             <div className="flex-grow m-2 bg-white shadow-md rounded-lg p-4 max-w-lg animate__animated animate__fadeIn">
//               <h2 className="text-xl md:text-2xl font-semibold mb-4">Payments Distribution</h2>
//               <div style={{ height: '300px' }}>
//                 <Bar data={paymentData} options={{ responsive: true }} />
//               </div>
//             </div>

//             {/* Earnings Over Time Line Chart */}
//             <div className="flex-grow m-2 bg-white shadow-md rounded-lg p-4 max-w-lg animate__animated animate__fadeIn">
//               <h2 className="text-xl md:text-2xl font-semibold mb-4">Freelancer Earnings</h2>
//               <div style={{ height: '300px' }}>
//                 <Line data={earningsData} options={{ responsive: true }} />
//               </div>
//             </div>
//           </div>

//           {/* Earnings Distribution Pie Chart */}
//           <div className="mt-8 flex justify-center w-full">
//             <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-lg animate__animated animate__fadeIn">
//               <h2 className="text-xl md:text-2xl font-semibold mb-4">Freelancer Earnings Distribution</h2>
//               <div style={{ height: '300px' }}>
//                 <Pie data={earningsPieData} options={{ responsive: true }} />
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Dashboard;


"use client";

import 'animate.css';
import { Chart, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import { FaDollarSign } from 'react-icons/fa';

Chart.register(...registerables);

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [totalFreelancerEarnings, setTotalFreelancerEarnings] = useState(0);
  const [totalClientPayments, setTotalClientPayments] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [freelancersCount, setFreelancersCount] = useState(0);
  const [paymentData, setPaymentData] = useState({});
  const [earningsData, setEarningsData] = useState({});
  const [earningsPieData, setEarningsPieData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-all-users");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setUsers(data);
      updateUserStats(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStats = (data) => {
    const freelancers = data.filter(user => user.role === 'freelancer');
    const clients = data.filter(user => user.role === 'client');

    setFreelancersCount(freelancers.length);
    setClientsCount(clients.length);

    const earnings = freelancers.reduce((acc, user) => acc + (user.paymentInfo?.totalEarnings || 0), 0);
    setTotalFreelancerEarnings(earnings);

    const payments = clients.reduce((acc, user) => acc + (user.paymentInfo?.totalPayments || 0), 0);
    setTotalClientPayments(payments);

    setPaymentData({
      labels: clients?.map(client => client.username || "Unknown"),
      datasets: [{
        label: 'Payments Distribution',
        data: clients?.map(client => client.paymentInfo?.totalPayments || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }],
    });

    setEarningsData({
      labels: freelancers?.map(user => user.username || "Unknown"),
      datasets: [{
        label: 'Earnings',
        data: freelancers?.map(user => user.paymentInfo?.totalEarnings || 0),
        fill: false,
        borderColor: 'rgba(255, 206, 86, 1)',
        tension: 0.1,
      }],
    });

    setEarningsPieData({
      labels: freelancers?.map(user => user.username || "Unknown"),
      datasets: [{
        label: 'Freelancer Earnings Distribution',
        data: freelancers?.map(user => user.paymentInfo?.totalEarnings || 0),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      }],
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* Dashboard Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {/* Total Freelancers Earnings */}
            <div className="flex flex-col items-center p-6 bg-gradient-to-r from-green-400 to-blue-500 shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn">
              <FaDollarSign className="text-white text-3xl mb-2" />
              <h2 className="text-lg md:text-xl font-semibold text-white">Total Freelancer Earnings</h2>
              <p className="text-2xl font-bold text-white">${totalFreelancerEarnings}</p>
            </div>
            {/* Additional sections */}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
