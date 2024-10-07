import connectDB from '@/lib/connectDB';

export const GET = async (request) => {
  try {
    const db = await connectDB();
    const servicesPostCollection = db.collection("my-services");
    const jobPosts = await servicesPostCollection.find({}).toArray();
    return Response.json(jobPosts);
  } catch (error) {
    return Response.json({ message: "something went wrong" });
  }
};

