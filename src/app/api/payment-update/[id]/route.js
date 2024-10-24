import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from 'next/server';

export const PATCH = async (request, { params }) => {
    try {
        const db = await connectDB();
        const userCollection = db.collection("users");

        if (!params.id) {
            return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
        }

        const { paymentIntent } = await request.json(); 

        console.log("User ID:", params.id); 

        const updateResult = await userCollection.updateOne(
            { _id: new ObjectId(params.id) },
            { $push: { "paymentInfo.paymentMethods": paymentIntent } }
        );

        console.log("Update Result:", updateResult); 

        if (updateResult.modifiedCount === 0) {
            return NextResponse.json({ message: "User not found or payment intent not added" }, { status: 404 });
        }

        return NextResponse.json({ message: "Payment method added successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error during payment method update:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
