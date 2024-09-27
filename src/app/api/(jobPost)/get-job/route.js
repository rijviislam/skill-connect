import connectDB from '@/lib/connectDB';

export const GET = async (request) => {
  try {
    const db = await connectDB();
    const jobPostCollection = db.collection("jobs");
    const jobPosts = await jobPostCollection.find({}).toArray();
    return Response.json(jobPosts);
  } catch (error) {
    return Response.json({ message: "something went wrong" });
  }
};
