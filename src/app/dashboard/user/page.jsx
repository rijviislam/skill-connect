"use client";

import { useEffect, useState } from "react";
import { FaUser, FaTrash, FaBan, FaClock } from "react-icons/fa";
import Swal from "sweetalert2";

const UsersManagementPage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch("/api/get-all-users");
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Deletion
  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/delete-user/${userId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error deleting user:", errorData.message);
          return;
        }

        const data = await response.json();
        console.log("User deleted successfully:", data);
        Swal.fire("Deleted!", "The user has been deleted.", "success");
        fetchUsers();
      } catch (error) {
        console.error("Error during user deletion:", error);
      }
    }
  };

  // Block user
  const handleBlock = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be blocked!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, block it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/block-user/${userId}`, {
          method: "PATCH",
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error blocking user:", errorData.message);
          return;
        }

        const data = await response.json();
        console.log("User blocked successfully:", data);
        Swal.fire("Blocked!", "The user has been blocked.", "success");
        fetchUsers();
      } catch (error) {
        console.error("Error during user blocking:", error);
      }
    }
  };

  // Suspend user
  const handleSuspend = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be suspended for 12 hours!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, suspend it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/suspend-user/${userId}`, {
          method: "PATCH",
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error suspending user:", errorData.message);
          return;
        }

        const data = await response.json();
        console.log("User suspended successfully:", data);
        Swal.fire("Suspended!", "The user has been suspended for 12 hours.", "success");
        fetchUsers();
      } catch (error) {
        console.error("Error during user suspension:", error);
      }
    }
  };

  const getUserActionButtons = (user) => {
    const isBlocked = user.isBlocked; 
    const isSuspended = user.isSuspended; 

    return (
      <td className="py-2 px-4 flex">
        {isBlocked ? (
          <button className="bg-gray-500 text-white px-3 py-1 rounded flex items-center mr-2 font-bold">
            Blocked
          </button>
        ) : (
          <button onClick={() => handleBlock(user._id)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700 flex items-center mr-2">
            <FaBan className="mr-1" /> Block
          </button>
        )}

        {isSuspended ? (
          <button className="bg-gray-500 text-white px-3 py-1 rounded flex items-center font-bold">
            Suspended
          </button>
        ) : (
          <button onClick={() => handleSuspend(user._id)} className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-700 flex items-center mr-2">
            <FaClock className="mr-1" /> Suspend
          </button>
        )}

        <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center">
          <FaTrash className="mr-1" /> Delete
        </button>
      </td>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Users Management</h1>

      <div className="overflow-x-auto max-w-full">
        <div className="max-h-screen overflow-y-auto border border-gray-300 rounded-lg shadow-md">
          <table className="min-w-full bg-green-50">
            <thead className="bg-gray-200 sticky top-0 z-10">
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
              {users?.map((user) => (
                <tr key={user?._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4">{user?.username || "Dummy Name"}</td>
                  <td className="py-2 px-4">{user?.email || "dummy@example.com"}</td>
                  <td className="py-2 px-4">{user?.role || "guest"}</td>
                  {getUserActionButtons(user)}
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
