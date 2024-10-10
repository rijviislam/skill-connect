import connectDB from '@/lib/connectDB';
import { ObjectId } from 'mongodb';

export const PATCH = async (request) => {
    try {
        const db = await connectDB(); // Connect to the database
        const jobPostCollection = db.collection("jobs");

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id'); // Get the job ID from query parameters

        if (!id) {
            return new Response(JSON.stringify({ message: "ID is required" }), { status: 400 });
        }

        // Ensure the id is valid before trying to create an ObjectId
        if (!ObjectId.isValid(id)) {
            return new Response(JSON.stringify({ message: "Invalid ID format" }), { status: 400 });
        }

        const updatedData = await request.json(); // Get the updated data from the request body
        console.log('UpdatedData',updatedData)
        const { appliedPeople } = updatedData;
        const user = appliedPeople[0]; // Assuming `appliedPeople` contains only one user at a time
console.log("Applie user",user)
        if (!user) {
            return new Response(JSON.stringify({ message: "User information is required" }), { status: 400 });
        }

        // Find the job post by its ID
        const job = await jobPostCollection.findOne({ _id: new ObjectId(id) });

        if (!job) {
            return new Response(JSON.stringify({ message: "Job not found" }), { status: 404 });
        }

        // Check if the user has already applied
        const hasAlreadyApplied = job.appliedPeople?.some(person => person.email === user.email);

        if (hasAlreadyApplied) {
            return new Response(JSON.stringify({ message: "User has already applied" }), { status: 400 });
        }

        // Perform the update operation if the user has not applied yet
        const result = await jobPostCollection.updateOne(
            { _id: new ObjectId(id) },
            { $addToSet: { appliedPeople: user } } // Use $addToSet to ensure the user is only added once
        );

        if (result.modifiedCount === 0) {
            return new Response(JSON.stringify({ message: "No changes made" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Job applied successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error updating job:", error);
        return new Response(JSON.stringify({ message: "Something went wrong", error: error.message }), { status: 500 });
    }
};