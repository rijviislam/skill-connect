// import connectDB from '@/lib/connectDB';

// export const POST = async(request) => {
//     try {
//         const db = await connectDB()
//         const userCollection = db.collection("users")
//         const newUser = await request.json()
//         const req = await userCollection.insertOne(newUser)
//         return Response.json({message: "User created"})
//     } catch (error) {
//         return Response.json({message: "something went wrong"})

//     }
// }

import connectDB from '@/lib/connectDB';

export const POST = async (request) => {
    try {
        const db = await connectDB();
        const userCollection = db.collection("users");
        const newUser = await request.json();

        // Validate required fields
        if (!newUser.email || !newUser.name) {
            return Response.json({ message: "Email and name are required" }, { status: 400 });
        }

        // Check for existing user
        const existingUser = await userCollection.findOne({ email: newUser.email });
        if (existingUser) {
            return Response.json({ message: "User already exists" }, { status: 409 });
        }

        await userCollection.insertOne(newUser);

        return Response.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error(error); // Log error
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
};
