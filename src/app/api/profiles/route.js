import connectDB from '@/lib/connectDB';

export const dynamic = 'force-dynamic';  // Force dynamic rendering

export const GET = async (request) => {
    try {
        const db = await connectDB();
        const userCollection = db.collection("users");

        const users = await userCollection.find({}).toArray();

        return new Response(JSON.stringify(users), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return new Response(JSON.stringify({ message: "Something went wrong" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
