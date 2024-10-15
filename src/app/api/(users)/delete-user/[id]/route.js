import { NextResponse } from 'next/server';
import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export const DELETE = async (request, { params }) => {
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");

    
    if (!params.id) {
      return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
    }

   
    const resp = await userCollection.deleteOne({
      _id: new ObjectId(params.id),
    });

    // If no users were deleted, respond with a 404 status
    if (resp.deletedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully", response: resp }, { status: 200 });
  } catch (error) {
    console.error("Error during user deletion:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
