import connectDB from '@/lib/connectDB';

export const POST = async(request) => {
    try {
        const db = await connectDB()
        const userCollection = db.collection("users")
        const newUser = await request.json()
        const req = await userCollection.insertOne(newUser)
        return Response.json({message: "User created"})
    } catch (error) {
        return Response.json({message: "something went wrong"})

    }
}