import connectDB from '@/lib/connectDB';

export const POST = async(request) => {

    const newPost = await request.json()
    try {
        const db = await connectDB()
        const jobPostCollection = db.collection("jobs")      
        const resp = await jobPostCollection.insertOne(newPost)
        return Response.json({message: " post created"})
        console.log(resp)
    } catch (error) {
        return Response.json({message: "something went wrong"})

    }
}