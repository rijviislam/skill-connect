import connectDB from '@/lib/connectDB';
import { ObjectId } from 'mongodb';

export const DELETE = async (request) => {
  try {
    const db = await connectDB();
    const servicesPostCollection = db.collection("my-services");

    // Extract the ID from the request (assuming it's in the query params)
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response.json({ message: "ID is required" }, { status: 400 });
    }

    // Delete the document with the given ID
    const result = await servicesPostCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response.json({ message: "No document found with this ID" }, { status: 404 });
    }

    return new Response.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (error) {
    return new Response.json({ message: "Something went wrong", error }, { status: 500 });
  }
};
