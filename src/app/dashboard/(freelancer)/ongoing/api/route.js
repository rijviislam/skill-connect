import connectDB from "@/lib/connectDB";

export const GET = async (request) => {
  const db = await connectDB();
  const jobPostCollection = db.collection("jobs");

  const { searchParams } =  new URL(request.url);
  const email =  searchParams.get("email");
  try {
    const res = await jobPostCollection
      .find({
        freelancer: email,
      })
      .toArray();

    return Response.json({res});
  } catch (error) {
    
    return new Response(
      JSON.stringify({ message: "Something went wrong with the ongoing API" }),
      { status: 500 }
    );
  }
};
