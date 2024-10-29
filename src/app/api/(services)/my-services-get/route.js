import connectDB from '@/lib/connectDB';

export const GET = async (request) => {
  try {
    const db = await connectDB();
    const servicesPostCollection = db.collection("my-services");

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    let jobPosts;

    if (email) {
      jobPosts = await servicesPostCollection.find({ userEmail: email }).toArray();
    } else {
      jobPosts = await servicesPostCollection.find({}).toArray();
    }

    return Response.json(jobPosts);
  } catch (error) {
    return Response.json({ message: "something went wrong" });
  }
};