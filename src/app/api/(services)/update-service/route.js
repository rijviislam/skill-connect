import connectDB from '@/lib/connectDB';
import { ObjectId } from 'mongodb';

export const PATCH = async (request) => {
    try {
        const db = await connectDB(); 
        const servicesPostCollection = db.collection("my-services");

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id'); 

        if (!id) {
            return new Response(JSON.stringify({ message: "ID is required" }), { status: 400 });
        }

        if (!ObjectId.isValid(id)) {
            return new Response(JSON.stringify({ message: "Invalid ID format" }), { status: 400 });
        }

        const updatedData = await request.json(); 
        console.log("Received Data:", updatedData); 
        const { _id, ...updateFields } = updatedData;

        const result = await servicesPostCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateFields } 
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