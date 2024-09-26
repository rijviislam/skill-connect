"use client";

import { useEffect, useState } from 'react';
import { FaUser, FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons from react-icons

const UsersManagementPage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_NEXT_URL;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${baseUrl}/api/get-all-users`);
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, [baseUrl]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Users Management</h1>
      <table className="min-w-full bg-green-50 border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">
              <FaUser className="inline-block mr-2" /> Name
            </th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="py-2 px-4">{user.name || "Dummy Name"}</td>
              <td className="py-2 px-4">{user.email || "dummy@example.com"}</td>
              <td className="py-2 px-4 flex">
                <button className="bg-blue-500 text-green-50 px-3 py-1 rounded hover:bg-blue-700 flex items-center">
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button className="bg-red-500 text-green-50 px-3 py-1 rounded hover:bg-red-700 flex items-center ml-2">
                  <FaTrash className="mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersManagementPage;
