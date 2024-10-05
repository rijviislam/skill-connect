import connectDB from '@/lib/connectDB';

export const dynamic = 'force-dynamic';  // Force dynamic rendering

export const GET = async (request) => {
  try {
    const db = await connectDB();
    const serviceCollection = db.collection("services");

    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('search');

    let query = {};

    if (searchTerm) {
      query = {
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },  
          { category: { $regex: searchTerm, $options: 'i' } } 
        ]
      };
    }

    const services = await serviceCollection.find(query).toArray();

    return new Response(JSON.stringify(services), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
};
