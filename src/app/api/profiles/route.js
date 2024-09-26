// import connectDB from '@/lib/connectDB';

// export const GET = async (request) => {
//     try {
//         const db = await connectDB();
//         const userCollection = db.collection("profiles");
//         const users = await userCollection.find({}).toArray();
//         return Response.json(users);
//     } catch (error) {
//         return Response.json({ message: "Something went wrong" }, { status: 500 });
//     }
// }


import connectDB from '@/lib/connectDB';

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
        } else {
            // If no profession is specified, return all users
            users = await userCollection.find({}).toArray();
        }

        return Response.json(users);
    } catch (error) {
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
};
