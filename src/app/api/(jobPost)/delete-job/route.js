import connectDB from '@/lib/connectDB';
import { ObjectId } from 'mongodb';

export const DELETE = async (request) => {
  try {
    const db = await connectDB();
    const jobPostCollection = db.collection("jobs");

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ message: "ID is required" }), { status: 400 });
    }

    // Ensure the id is valid before trying to create an ObjectId
    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid ID format" }), { status: 400 });
    }

    const result = await jobPostCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: "No document found with this ID" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Post deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return new Response(JSON.stringify({ message: "Something went wrong", error: error.message }), { status: 500 });
  }
};

