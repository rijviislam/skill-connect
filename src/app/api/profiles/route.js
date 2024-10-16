// import connectDB from '@/lib/connectDB';
// import { user } from '@nextui-org/react';

// export const dynamic = 'force-dynamic';  // Force dynamic rendering

// export const GET = async (request) => {
//     try {
//         const db = await connectDB();
//         const userCollection = db.collection("profiles");

//         // Extract query parameters
//         const url = new URL(request.url);
//         const profession = url.searchParams.get('profession');

//         // Fetch users based on profession if provided
//         let users;
//         if (profession) {
//             users = await userCollection.find({ profession }).toArray();
//             console.log(user)
//         } else {
//             // If no profession is specified, return all users
//             users = await userCollection.find({}).toArray();
//             console.log(user)
//         }

//         return new Response(JSON.stringify(users), {
//             status: 200,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     } catch (error) {
//         console.error('Error fetching profiles:', error);
//         return new Response(JSON.stringify({ message: "Something went wrong" }), {
//             status: 500,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     }
// };

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

