  import connectDB from '@/lib/connectDB';

  export const dynamic = 'force-dynamic'; 
  
  export const GET = async (request) => {
    try {
      const db = await connectDB();
      const jobPostCollection = db.collection("jobs");
  
      const { searchParams } = new URL(request.url);
      const email = searchParams.get('email'); 
      let jobPosts;
  
      if (email) {
        jobPosts = await jobPostCollection.find({ userEmail: email }).toArray();
      } else {
        jobPosts = await jobPostCollection.find({}).toArray();
      }
  
      return new Response(JSON.stringify(jobPosts), { status: 200 });
    } catch (error) {
     
    console.error(error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
};

