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
      {/* Wrapping the table in a scrollable div with fixed height and width */}
      <div className="overflow-x-auto max-w-full">
        <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg shadow-md"> {/* Fixed height */}
          <table className="min-w-full bg-green-50">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">
                  <FaUser className="inline-block mr-2" /> Name
                </th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Role</th> {/* Role Column */}
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4">{user.name || "Dummy Name"}</td>
                  <td className="py-2 px-4">{user.email || "dummy@example.com"}</td>
                  <td className="py-2 px-4">
                    {/* Role Buttons */}
                    <div className="flex space-x-2">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700">
                        Freelancer
                      </button>
                      <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700">
                        Admin
                      </button>
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700">
                        Client
                      </button>
                    </div>
                  </td>
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
      </div>
    </div>
  );
};

export default UsersManagementPage;
