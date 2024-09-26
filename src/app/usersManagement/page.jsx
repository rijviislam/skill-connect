"use client"

import { useEffect, useState } from 'react';

const UsersManagementPage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_NEXT_URL
  const [users, setUsers] = useState([]);
  console.log(users)

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${baseUrl}/api/get-all-users`);
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user._id}>{user.name}</div> // Adjust property names as needed
      ))}
    </div>
  );
};

export default UsersManagementPage;
