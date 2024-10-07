import connectDB from '@/lib/connectDB';

export const GET = async (request) => {
  try {
    const db = await connectDB();
    const servicesPostCollection = db.collection("my-services");

    // Get the email from the request URL query parameters
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    let jobPosts;

    if (email) {
      // Find services by userEmail
      jobPosts = await servicesPostCollection.find({ userEmail: email }).toArray();
    } else {
      // If no email is provided, return all job posts
      jobPosts = await servicesPostCollection.find({}).toArray();
    }

    return Response.json(jobPosts);
  } catch (error) {
    return Response.json({ message: "something went wrong" });
  }
};