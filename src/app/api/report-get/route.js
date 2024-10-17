// File: /pages/api/reports.js

import connectDB from '@/lib/connectDB';

export const GET = async (request) => {
  const db = await connectDB();
  const reportsCollection = db.collection('reports');

  try {
    const reports = await reportsCollection.find({}).toArray();

    
    return new Response(JSON.stringify(reports), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return new Response(JSON.stringify({ message: 'Error fetching reports' }), { status: 500 });
  }
};
