import connectDB from '@/lib/connectDB'; // Adjust the import according to your project structure
import { ObjectId } from 'mongodb';

export const PATCH = async (request) => {
    try {
        const db = await connectDB(); // Connect to the database
        const jobPostCollection = db.collection("jobs");

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id'); // Get the service ID from query parameters

        if (!id) {
            return new Response(JSON.stringify({ message: "ID is required" }), { status: 400 });
        }

        // Ensure the id is valid before trying to create an ObjectId
        if (!ObjectId.isValid(id)) {
            return new Response(JSON.stringify({ message: "Invalid ID format" }), { status: 400 });
        }

        const updatedData = await request.json(); // Get the updated data from the request body

        // Exclude _id from the updatedData to prevent modification of the immutable field
        const { _id, ...updateFields } = updatedData;

        // Perform the update operation
        const result = await jobPostCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateFields } // Only update fields other than _id
        );

        if (result.modifiedCount === 0) {
            return new Response(JSON.stringify({ message: "Service not found or no changes made" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Service updated successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error updating service:", error);
        return new Response(JSON.stringify({ message: "Something went wrong", error: error.message }), { status: 500 });
    }
};