import connectDB from '@/lib/connectDB';

export const GET = async (request) => {
    try {
        const db = await connectDB();
        const userCollection = db.collection("users");

        
        const freelancers = await userCollection.find({ role: "freelancer" }).toArray();

        return Response.json(freelancers);
    } catch (error) {
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}