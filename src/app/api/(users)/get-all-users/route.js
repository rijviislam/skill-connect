import connectDB from '@/lib/connectDB';

export const GET = async (request) => {
    try {
        const db = await connectDB();
        const userCollection = db.collection("users");
        const users = await userCollection.find({}).toArray();
        return Response.json(users);
    } catch (error) {
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
}
