import connectDB from '@/lib/connectDB';
import { ObjectId } from 'mongodb';

export const POST = async (request) => {
  const { userId, reason } = await request.json();

  const db = await connectDB();
  const userCollection = db.collection('users');


  const user = await userCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
  }

 
  const reportData = {
    userId: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    avatarUrl: user.profile?.avatarUrl,
    reason,
    createdAt: new Date(),
  };

  const reportsCollection = db.collection('reports');
  await reportsCollection.insertOne(reportData);

  return new Response(JSON.stringify({ message: 'User reported successfully.' }), { status: 201 });
};
