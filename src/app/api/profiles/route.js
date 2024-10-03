import connectDB from '@/lib/connectDB';
import { user } from '@nextui-org/react';

export const GET = async (request) => {
    try {
        const db = await connectDB();
        const userCollection = db.collection("profiles");

        // Extract query parameters
        const url = new URL(request.url);
        const profession = url.searchParams.get('profession');

        // Fetch users based on profession if provided
        let users;
        if (profession) {
            users = await userCollection.find({ profession: profession }).toArray();
            console.log(user)
        } else {
            // If no profession is specified, return all users
            users = await userCollection.find({}).toArray();
            console.log(user)

        }

        return Response.json(users);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
};
