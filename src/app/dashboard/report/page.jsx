"use client";

import { useEffect, useState } from 'react';
import { Card } from "@nextui-org/react";
import Image from 'next/image';

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
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {reports.map((report) => (
          <Card key={report._id} className="p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105 bg-gradient-to-r from-green-300 to-blue-400">
            <div className="flex items-center mb-4">
              <Image 
                src={report.avatarUrl} 
                alt={report.username} 
                className="w-16 h-16 rounded-full border-2 border-gray-300"
                width={64} 
                height={64} 
              />
              <div className="ml-4">
                <h3 className="font-semibold text-lg text-white">{report.username}</h3>
                <p className="text-white"><strong>Email:</strong> {report.email}</p>
                <p className="text-white"><strong>Role:</strong> {report.role}</p>
              </div>
            </div>
            <p className="mb-4 text-white"><strong>Reason:</strong> {report.reason}</p>
            <p className="text-white"><strong>Reported At:</strong> {new Date(report.createdAt).toLocaleString()}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
