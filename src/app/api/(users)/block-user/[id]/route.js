import { NextResponse } from 'next/server';
import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export const PATCH = async (request, { params }) => {
    try {
        const db = await connectDB();
        const userCollection = db.collection("users");

        if (!params.id) {
            return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
        }

       
        console.log("User ID:", params.id); 

        const updateResult = await userCollection.updateOne(
            { _id: new ObjectId(params.id) },
            { $set: { isBlocked: true } } 
        );

     
        console.log("Update Result:", updateResult); 

        if (updateResult.modifiedCount === 0) {
            return NextResponse.json({ message: "User not found or already blocked" }, { status: 404 });
        }

        return NextResponse.json({ message: "User blocked successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error during user blocking:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
