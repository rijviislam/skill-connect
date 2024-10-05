console.log("my services")

import connectDB from '@/lib/connectDB';

export const POST = async(request) => {

    const newPost = await request.json()
    try {
        const db = await connectDB()
        const servicesPostCollection = db.collection("my-services")      
        const resp = await servicesPostCollection.insertOne(newPost)
        console.log(resp)
        return Response.json({message: " post created"})
    } catch (error) {
        return Response.json({message: "something went wrong"})

    }
}