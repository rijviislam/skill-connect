"use client";

import { useEffect, useState } from 'react';
import { FaUser, FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons from react-icons

const UsersManagementPage = () => {
  const [users, setUsers] = useState([]);
  console.log(users)

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/get-all-users');
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Users Management</h1>
      {/* Wrapping the table in a scrollable div with fixed height and width */}
      <div className="overflow-x-auto max-w-full">
        <div className="max-h-screen overflow-y-auto border border-gray-300 rounded-lg shadow-md"> {/* Fixed height */}
          <table className="min-w-full bg-green-50">
          <thead className="bg-gray-200 sticky top-0 z-10"> {/* Sticky header */}
              <tr className="bg-gray-200">
                <th className="py-2 px-4">
                  <FaUser className="inline-block mr-2" /> Name
                </th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map(user => (
                <tr key={user?._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4">{user?.name || "Dummy Name"}</td>
                  <td className="py-2 px-4">{user?.email || "dummy@example.com"}</td>
                  <td className="py-2 px-4">{ user?.type || "guest"}</td>
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
