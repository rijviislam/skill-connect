"use client";

import { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User } from "@nextui-org/react";

export default function ReportsList() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/report-get");
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Reported Users</h2>
      <Table aria-label="Reported Users Table">
        <TableHeader columns={[
          { uid: "avatar", name: "Avatar" },
          { uid: "username", name: "Username" },
          { uid: "email", name: "Email" },
          { uid: "role", name: "Role" },
          { uid: "reason", name: "Reason" },
          { uid: "createdAt", name: "Reported At" },
        ]}>
          {(column) => (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={reports}>
          {(item) => (
            <TableRow key={item._id}>
              <TableCell>
                <User 
                  avatarProps={{ src: item.avatarUrl, radius: 'lg' }} 
                  name={item.username} 
                />
              </TableCell>
              <TableCell>{item.username}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell>{item.reason}</TableCell>
              <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
