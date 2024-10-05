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


// import connectDB from '@/lib/connectDB';

// export const GET = async (request) => {
//   try {
//     const db = await connectDB();
//     const servicesPostCollection = db.collection("my-services");


//     const url = new URL(request.url);
//     const email = url.searchParams.get('email');

//     if (!email) {
//       return Response.json({ message: 'Email query parameter is missing' }, { status: 400 });
//     }

//     // Filter by email
//     const jobPosts = await servicesPostCollection.find({ email: email }).toArray();

//     return Response.json(jobPosts);
//   } catch (error) {
//     return Response.json({ message: "Something went wrong" }, { status: 500 });
//   }
// };
